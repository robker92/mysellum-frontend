<template>
  <v-dialog
    v-model="show"
    max-width="600px"
    @keydown.esc="cancel"
    @click:outside="cancel"
  >
    <v-card>
      <v-card-title>
        <span class="reviewDialogHeadline">Add Review</span>
      </v-card-title>
      <v-card-text>
        <v-container fluid class="ma-0 pa-0">
          <v-row>
            <v-col>
              {{ this.rating }}
              <v-rating
                v-model="rating"
                background-color="orange lighten-3"
                color="orange"
                dense
                hover
                large
              />
              <v-textarea
                v-model="reviewText"
                :counter="1000"
                label="Review Text"
                :error-messages="reviewTextErrors"
                @input="$v.reviewText.$touch()"
                @blur="$v.reviewText.$touch()"
                required
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo" text @click="cancel">Close</v-btn>
        <v-btn
          color="primary"
          @click="submitReview"
          :disabled="buttonIsDisabled"
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { storeService, reviewService } from "../../services";

import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  name: "ReviewDialog",

  mixins: [validationMixin],

  validations: {
    reviewText: {
      required,
      minLength: minLength(20),
      maxLength: maxLength(1000)
    }
  },

  data() {
    return {
      dialog: false,
      reviewText: "",
      rating: 0
    };
  },

  props: {
    value: Boolean,
    reviewToEdit: Object
  },

  watch: {
    reviewToEdit: function(newVal) {
      if (newVal != null) {
        this.rating = newVal.rating;
        this.reviewText = newVal.text;
      }
    }
  },

  computed: {
    ...mapState("account", ["user", "loggedIn"]),
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },

    buttonIsDisabled() {
      if (!this.$v.reviewText.$invalid && this.rating > 0) {
        //Register User with input data
        return false;
      } else {
        return true;
      }
    },

    reviewTextErrors() {
      const errors = [];
      if (!this.$v.reviewText.$dirty) return errors;
      !this.$v.reviewText.maxLength &&
        errors.push("The review text must be at most 1000 characters long.");
      !this.$v.reviewText.minLength &&
        errors.push("The review text must be at least 20 characters long.");
      !this.$v.reviewText.required &&
        errors.push("A review text ist required.");
      return errors;
    }
  },

  methods: {
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),
    submitReview: async function() {
      console.log(this.reviewText);
      let data = {
        storeId: this.$route.params.id,
        rating: this.rating,
        text: this.reviewText
      };

      if (this.reviewToEdit === null) {
        this.$emit("overlay-start");
        let newReview;
        try {
          newReview = await reviewService.addReview(data);
        } catch (error) {
          this.$emit("overlay-end");
          return;
        }
        this.$emit("add-new-review", newReview);
        this.addSuccessSnackbar("Review was successfully added!");
        this.$emit("overlay-end");
        //
      } else if (this.reviewToEdit !== null) {
        this.$emit("overlay-start");
        data["reviewId"] = this.reviewToEdit.reviewId;
        let updatedReview;
        try {
          updatedReview = await reviewService.editReview(data);
        } catch (error) {
          this.$emit("overlay-end");
          return;
        }
        this.$emit("update-review", updatedReview);
        this.addSuccessSnackbar("Review was successfully edited!");
        this.$emit("overlay-end");
      }
      //console.log(data);
      this.cancel();
      return;
    },
    cancel() {
      this.$v.$reset();
      this.rating = 0;
      this.reviewText = "";
      this.$emit("reviewToEdit-to-null");
      this.show = false;
    }
  }
};
</script>

<style></style>

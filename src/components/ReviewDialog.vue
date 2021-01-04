<template>
  <v-dialog v-model="show" max-width="600px" @keydown.esc="cancel">
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
          color="indigo"
          dark
          @click="submitReview"
          :disabled="submitButtonIsDisabled"
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { storeService } from "../services";

import { required, maxLength, minLength } from "vuelidate/lib/validators";
//import passwordValidator from './customValidators/passwordValidator'
//import { helpers } from "vuelidate/lib/validators";
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
      submitButtonIsDisabled: false,
      reviewText: "",
      rating: 0
      //reviewToEditCopy: this.reviewToEdit
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
    /*     overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 3000);
    } */
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
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
    },
    /* ratingComputed: {
      get() {
        //console.log(this.reviewToEditCopy);
        if (this.reviewToEdit == null) {
          //console.log("=null");
          return this.rating;
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          //this.rating = this.reviewToEdit.rating;
          return this.reviewToEdit.rating;
        }
      },
      set(value) {
        if (this.reviewToEdit == null) {
          this.rating = value;
        } else {
          //  console.log("hi");
          //this.$emit("change-reviewToEdit-rating", value);
          this.rating = value;
          //console.log(this.rating);
          //Event to change reviewEdit
          //this.$emit("change-reviewToEdit-rating", this.rating);
          //this.reviewToEditCopy.rating = value;
        }
      }
    },
    reviewTextComputed: {
      get() {
        //console.log(this.reviewToEditCopy);
        if (this.reviewToEdit == null) {
          //console.log("=null");
          return this.reviewText;
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          //this.rating = this.reviewToEdit.rating;
          return this.reviewToEdit.text;
        }
      },
      set(value) {
        if (this.reviewToEdit == null) {
          this.reviewText = value;
        } else {
          //console.log("hi");
          //this.$emit("change-reviewToEdit-text", value);
          this.reviewText = value;
          //console.log(this.reviewText);
          //Event to change reviewEdit
          //this.$emit("change-reviewToEdit-rating", this.rating);
          //this.reviewToEditCopy.rating = value;
        }
      } 
    },*/
    // reviewText() {
    //   return this.reviewToEdit != null ? this.reviewToEdit.text : "";
    // },
    // rating() {
    //   return this.reviewToEdit != null ? this.reviewToEdit.rating : 0;
    // },
    ...mapState("account", ["user", "loggedIn"])
  },

  // beforeUpdate() {
  //   if (this.reviewToEdit != null) {
  //     console.log("@before update");
  //     this.ratingTest = this.reviewToEdit.rating;
  //     this.reviewText = this.reviewToEdit.text;
  //   }
  // },

  methods: {
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),
    submitReview: async function() {
      console.log(this.reviewText);
      //console.log(this.$route.params.id);
      let data = {
        storeId: this.$route.params.id,
        //userEmail: this.user.email,
        //datetime: new Date(),
        rating: this.rating,
        text: this.reviewText
      };

      // this.$db.find({}, (err, docs) => {
      //   this.database = docs
      // });
      if (this.reviewToEdit === null) {
        this.$emit("overlay-start");
        let newReview;
        try {
          newReview = await storeService.addReview(data);
        } catch (error) {
          this.$emit("overlay-end");
          return;
        }
        //data["reviewId"] = response.reviewId;
        this.$emit("add-new-review", newReview);
        this.addSuccessSnackbar("Review was successfully added!");
        this.$emit("overlay-end");
        //
      } else if (this.reviewToEdit !== null) {
        this.$emit("overlay-start");
        data["reviewId"] = this.reviewToEdit.reviewId;
        let updatedReview;
        try {
          updatedReview = await storeService.editReview(data);
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
      // this.ratingComputed = 0;
      // this.reviewTextComputed = "";
      // this.show = false;
    },
    cancel() {
      this.rating = 0;
      this.reviewText = "";
      this.$emit("reviewToEdit-to-null");
      this.show = false;
    }
  }
};
</script>

<style></style>

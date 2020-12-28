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

export default {
  name: "ReviewDialog",
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
      var data = {
        storeId: this.$route.params.id,
        //userEmail: this.user.email,
        //datetime: new Date(),
        rating: this.rating,
        text: this.reviewText
      };

      // this.$db.find({}, (err, docs) => {
      //   this.database = docs
      // });
      if (this.reviewToEdit == null) {
        this.$emit("overlay-start");
        var newReview = await storeService.addReview(data);
        this.$emit("add-new-review", newReview);
        this.$emit("overlay-end");
        this.addSuccessSnackbar("Review was successfully added!");
      } else if (this.reviewToEdit != null) {
        this.$emit("overlay-start");
        data["reviewId"] = this.reviewToEdit.reviewId;
        var updatedReview = await storeService.editReview(data);
        this.$emit("update-review", updatedReview);
        this.$emit("overlay-end");
        this.addSuccessSnackbar("Review was successfully edited!");
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

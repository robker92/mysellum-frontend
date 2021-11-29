<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" xs="2" sm="2" md="1" lg="1" xl="1" align-self="center">
          <div class="text-left">
            <v-avatar :color="clrs">
              <v-icon dark>mdi-account</v-icon>
            </v-avatar>
          </div>
        </v-col>
        <v-col cols="12" xs="6" sm="6" md="5" lg="4" xl="4" align-self="center">
          <v-row dense>
            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
              <div class="text-left">
                <v-rating
                  v-model="reviewRating"
                  background-color="orange lighten-3"
                  color="orange"
                  dense
                  readonly
                />
              </div>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
              <div class="text-body-2 text-left">
                {{ $t("storeProfile.reviewListItem.userLabel1") }}
                {{ reviewUserName }}
                {{ $t("storeProfile.reviewListItem.userLabel2") }}
                {{ reviewDateTimeComputed }}
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          v-if="user.email === review.userEmail"
          cols="12"
          xs="4"
          sm="3"
          md="2"
          lg="1"
          xl="1"
          align-self="center"
        >
          <v-btn icon @click="editReview">
            <v-icon color="primary">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteReview">
            <v-icon color="primary">mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row dense class="mt-3">
        <v-col
          cols="12"
          offset-xs="1"
          xs="11"
          offset-sm="1"
          sm="11"
          offset-md="1"
          md="11"
          offset-lg="1"
          lg="11"
          offset-xl="1"
          xl="11"
        >
          <div class="text-body-1 text-left">{{ review.text }}</div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
//<v-btn @click="printClrs">Print Colors</v-btn>
import { mapState, mapActions } from "vuex";
import { getMdColors } from "../../helpers/index";
import { reviewService } from "../../services";

export default {
  name: "StoreProfileReviewListItem",
  props: {
    review: Object,
  },
  data() {
    return {
      amountTextField: 1,
      //colors: ["red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","blue-grey","grey"]
      clrs: getMdColors()[Math.floor(Math.random() * getMdColors().length)],
    };
  },
  computed: {
    ...mapState("account", ["user", "loggedIn"]),
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    reviewDateTimeComputed: {
      get() {
        let dateCreated;
        if (this.review.datetime) {
          dateCreated = this.review.datetime.substring(
            0,
            this.review.datetime.indexOf("T")
          );
        } else {
          dateCreated = this.review.datetimeCreated.substring(
            0,
            this.review.datetimeCreated.indexOf("T")
          );
        }
        return dateCreated;
      },
    },
    reviewUserName: {
      get() {
        console.log(this.review.userName);
        return this.review.userName;
      },
    },
    reviewRating: {
      get() {
        return parseInt(this.review.rating);
      },
    },
  },
  methods: {
    printClrs() {
      //var colors = getMdColors();
      console.log(
        getMdColors()[Math.floor(Math.random() * getMdColors().length)]
      );
      console.log(this.user.email);
      console.log(this.review.userEmail);
    },

    deleteReview: async function() {
      const data = {
        storeId: this.$route.params.id,
        reviewId: this.review._id,
      };
      this.$emit("overlay-start");
      let response;
      try {
        response = await reviewService.deleteReview(data);
      } catch (error) {
        this.addErrorSnackbar(
          "There was an unexpected error. Review was not deleted."
        );
        this.$emit("overlay-end");
        return;
      }
      console.log(response);

      this.$emit("remove-review", {
        reviewId: response._id,
        avgRating: response.avgRating,
      });
      this.$emit("overlay-end");
      // this.addSuccessSnackbar("Review was successfully deleted.");
      return;
    },

    editReview() {
      this.$emit("edit-review", this.review);
    },
  },
};
</script>

<style></style>

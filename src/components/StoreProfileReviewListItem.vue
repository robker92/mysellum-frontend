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
                  v-model="review.rating"
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
                By {{ review.userName }} on
                {{ reviewDateTimeComputed }}
              </div>
            </v-col>
          </v-row>
        </v-col>
        <!-- <v-col cols="12" lg="4" xl="3">
          <p class="text-justify">
            By {{ review.userName }} on
            {{ review.datetime.substring(0, review.datetime.indexOf("T")) }}
          </p>
        </v-col> -->
        <v-col
          cols="12"
          xs="4"
          sm="3"
          md="2"
          lg="1"
          xl="1"
          v-if="this.user.email === this.review.userEmail"
          align-self="center"
        >
          <v-btn icon @click="editReview">
            <v-icon color="indigo">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteReview">
            <v-icon color="indigo">mdi-delete</v-icon>
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
import { mapState } from "vuex";
import { getMdColors } from "../helpers/index";
import { storeService } from "../services";

export default {
  name: "StoreProfileReviewListItem",
  props: {
    review: Object
  },
  data() {
    return {
      amountTextField: 1,
      //colors: ["red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","blue-grey","grey"]
      clrs: getMdColors()[Math.floor(Math.random() * getMdColors().length)]
    };
  },
  computed: {
    //...mapState("shoppingCart", ["productsInCart", "counter"]),
    ...mapState("account", ["user", "loggedIn"]),
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
      }
    }
    // checkEmails() {
    //   if (this.user.email === this.review.userEmail) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
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
      let data = {
        storeId: this.$route.params.id,
        reviewId: this.review.reviewId
      };
      this.$emit("overlay-start");
      let response;
      try {
        response = await storeService.deleteReview(data);
      } catch (error) {
        this.$emit("overlay-end");
        return;
      }
      console.log(response);
      let eventData = {
        reviewId: this.review.reviewId,
        avgRating: response.avgRating
      };
      this.$emit("remove-review", eventData);
      this.$emit("overlay-end");
    },
    editReview() {
      this.$emit("edit-review", this.review);
    }
  }
};
</script>

<style></style>

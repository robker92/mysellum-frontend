<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="2" align-self="start">
          <v-avatar :color="clrs">
            <v-icon dark>mdi-account</v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="3">
          <v-rating
            v-model="review.rating"
            background-color="orange lighten-3"
            color="orange"
            dense
            readonly
          />
        </v-col>
        <v-col cols="4">
          <p class="text-justify">
            By {{ review.userName }} on
            {{ review.datetime.substring(0, review.datetime.indexOf("T")) }}
          </p>
        </v-col>
        <v-col cols="2" v-if="this.user.email === this.review.userEmail">
          <v-btn icon @click="editReview">
            <v-icon color="indigo">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteReview">
            <v-icon color="indigo">mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="2"></v-col>
        <v-col cols="10" align-self="start">
          <p class="text-justify">{{ review.text }}</p>
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
    ...mapState("account", ["user", "loggedIn"])
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
      var data = {
        storeId: this.$route.params.id,
        reviewId: this.review.reviewId
      };
      this.$emit("overlay-start");
      var response = await storeService.deleteReview(data);
      console.log(response);
      var eventData = {
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

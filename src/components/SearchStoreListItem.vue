<template>
  <div class="container">
    <!-- <v-btn @click="print">Print</v-btn> -->
    <!-- <router-link :to="{ name: 'StoreProfile', params: { id: store._id } }" tag="button"> -->
    <!-- <router-link to="/storeprofile/" tag="button"> -->
    <div class="div">
      <v-carousel
        cycle
        show-arrows-on-hover
        height="200px"
        style="width:300px;"
      >
        <v-carousel-item
          v-for="(img, i) in store.profileData.images"
          :key="i"
          :to="{ name: 'StoreProfile', params: { id: store._id } }"
          eager
        >
          <v-img :src="img.src" height="100%" eager>
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-2"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="div">
      <router-link
        :to="{ name: 'StoreProfile', params: { id: store._id } }"
        tag="button"
        >{{ store.profileData.title }}</router-link
      >
      <v-btn v-if="favorite" icon color="pink" @click="favoriteButtonClick">
        <v-icon dark>mdi-heart</v-icon>
      </v-btn>
      <v-btn v-else icon color="grey" @click="favoriteButtonClick">
        <v-icon dark>mdi-heart</v-icon>
      </v-btn>
      <v-rating
        v-model="avgRatingFloatValue"
        background-color="orange lighten-3"
        color="orange"
        medium
        :dense="true"
        :readonly="true"
      />
      {{ Math.round(store.profileData.avgRating * 10) / 10 }} ({{
        store.profileData.reviews ? store.profileData.reviews.length : ""
      }})
      {{ store.profileData.description }}
    </div>
    <div>
      <v-divider inset />
    </div>
  </div>
</template>

<script>
//v-model="avgRating"
//
//{{ ok ? 'YES' : 'NO' }}
import { mapState } from "vuex";

export default {
  name: "SearchStoreListItem",
  props: {
    store: Object
  },
  data() {
    return {
      amountTextField: this.amount,
      //avgRating: parseFloat(this.store.profileData.avgRating),
      //avgRating: 0,
      //avgRating: parseFloat(this.getAvgRating()),
      favorite: false
      //numberRatings: this.store.profileData.reviews.length
    };
  },
  computed: {
    //...mapState("shoppingCart", ["productsInCart", "counter"]),

    ...mapState("account", ["user", "loggedIn"]),
    avgRatingFloatValue: {
      get() {
        //this function will determine what is displayed in the input
        return parseFloat(this.store.profileData.avgRating);
      }
    }
  },
  methods: {
    print() {
      console.log(this.store);
    },
    favoriteButtonClick() {
      if (this.favorite == true) {
        this.favorite = false;
      } else {
        this.favorite = true;
      }
    }
    // getAvgRating() {
    //   if (this.store != null) {
    //     return this.store.profileData.avgRating;
    //   } else {
    //     return null;
    //   }
    // }
  }
};
</script>

<style>
.div {
  float: left;
  width: 50%;
}
</style>

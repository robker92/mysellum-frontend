<template>
  <div class="container">
    <v-hover v-slot:default="{ hover }">
      <v-card
        height="550px"
        :class="{ 'on-hover': hover }"
        :elevation="hover ? 16 : 2"
      >
        <v-carousel
          cycle
          show-arrows-on-hover
          height="200px"
          style="width:400px;"
        >
          <v-carousel-item
            v-for="(img, i) in store.profileData.images"
            :key="i"
            :to="{
              name: 'StoreProfile',
              params: { id: store._id, locale: $i18n.locale }
            }"
            ,
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

        <router-link
          :to="{
            name: 'StoreProfile',
            params: { id: store._id, locale: $i18n.locale }
          }"
          style="text-decoration: none; color: inherit;"
        >
          <v-card-title>{{ store.profileData.title }}</v-card-title>

          <v-card-text>
            <v-row class="mx-2 mb-2">{{ store.mapData.address.city }} </v-row>
            <v-row align="center" class="mx-1">
              <v-rating
                :value="Math.round(store.profileData.avgRating * 10) / 10"
                background-color="amber lighten-3"
                dense
                color="amber"
                small
                :readonly="true"
              />
              <div class="grey--text ml-4">
                {{ Math.round(store.profileData.avgRating * 10) / 10 }}
                ({{
                  store.profileData.reviews
                    ? store.profileData.reviews.length
                    : ""
                }})
              </div>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div v-if="store">
                  <v-chip-group column>
                    <v-chip
                      outlined
                      class="ma-1"
                      color="primary"
                      v-for="(tag, index) in store.profileData.tags"
                      :key="index"
                      :to="{
                        name: 'StoreProfile',
                        params: { id: store._id, locale: $i18n.locale }
                      }"
                      >{{ tag }}</v-chip
                    >
                  </v-chip-group>
                </div>
              </v-col>
            </v-row>
            <v-divider class="mx-1 mb-3"></v-divider>
            <v-row>{{
              getCutDescription(store.profileData.description)
            }}</v-row>
          </v-card-text>
        </router-link>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
//v-model="avgRating"
//
//{{ ok ? 'YES' : 'NO' }}
//import { mapState } from "vuex";

export default {
  name: "SearchStoreListItem",
  props: {
    store: Object
  },
  data() {
    return {
      //amountTextField: this.amount,
      //avgRating: parseFloat(this.store.profileData.avgRating),
      //avgRating: 0,
      //avgRating: parseFloat(this.getAvgRating()),
      //favorite: false
      //numberRatings: this.store.profileData.reviews.length
    };
  },
  computed: {
    //...mapState("shoppingCart", ["productsInCart", "counter"]),
    // ...mapState("account", ["user", "loggedIn"]),
    // avgRatingFloatValue: {
    //   get() {
    //     //this function will determine what is displayed in the input
    //     return parseFloat(this.store.profileData.avgRating);
    //   }
    // }
  },
  methods: {
    print() {
      console.log(this.store);
    },
    // favoriteButtonClick() {
    //   if (this.favorite == true) {
    //     this.favorite = false;
    //   } else {
    //     this.favorite = true;
    //   }
    // },
    getCutDescription(description) {
      return description.substr(0, 100) + "\u2026";
    },
    getAvgRating(store) {
      return parseFloat(store.profileData.avgRating);
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

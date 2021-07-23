<template>
  <div class="container">
    <v-hover v-slot:default="{ hover }">
      <!-- height="550px" -->
      <v-card
        :class="{ 'on-hover': hover }"
        :elevation="hover || elevated ? 20 : 2"
      >
        <v-carousel
          cycle
          :show-arrows-on-hover="store.profileData.images.length > 1"
          :show-arrows="store.profileData.images.length > 1"
          :hide-delimiters="store.profileData.images.length < 2"
          height="200px"
          style="width:400px;"
        >
          <!-- :to="{
              name: 'StoreProfile',
              params: { id: store._id },
            }" -->
          <v-carousel-item
            v-for="(img, i) in store.profileData.images"
            :key="i"
            eager
            @click="goToStore()"
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
              <v-row class="mt-2 mr-2">
                <v-spacer />
                <v-tooltip
                  v-if="!checkFavoriteStore || loggedIn === false"
                  bottom
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      :ripple="false"
                      v-on="on"
                      @click.stop="addFavorites()"
                    >
                      <v-icon color="pink">mdi-heart-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Add to favorites</span>
                </v-tooltip>

                <v-tooltip
                  v-if="checkFavoriteStore && loggedIn === true"
                  bottom
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      :ripple="false"
                      v-on="on"
                      @click.stop="removeFavorites()"
                    >
                      <v-icon color="pink">mdi-heart</v-icon>
                    </v-btn>
                  </template>
                  <span>Remove from favorites</span>
                </v-tooltip>
              </v-row>
            </v-img>
          </v-carousel-item>
        </v-carousel>

        <router-link
          :to="{
            name: 'StoreProfile',
            params: { id: store._id, locale: $i18n.locale },
          }"
          style="text-decoration: none; color: inherit;"
        >
          <v-card-title>{{ store.profileData.title }}</v-card-title>

          <v-card-text>
            <!-- <v-icon>mdi-hand-heart</v-icon>
            <v-icon>mdi-truck-delivery</v-icon> -->
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
                      v-for="(tag, index) in store.profileData.tags"
                      :key="index"
                      small
                      outlined
                      class="ma-1"
                      color="primary"
                      :to="{
                        name: 'StoreProfile',
                        params: { id: store._id },
                      }"
                      >{{ tag }}</v-chip
                    >
                  </v-chip-group>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </router-link>

        <v-card-actions>
          <v-tooltip v-if="store.pickup" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                v-bind="attrs"
                class="ma-0 mr-2 primary"
                outlined
                :to="{
                  name: 'StoreProfile',
                  params: { id: store._id },
                }"
                v-on="on"
              >
                <v-icon color="primary">mdi-hand-heart</v-icon>
              </v-chip>
            </template>
            <span>Offers self pickup</span>
          </v-tooltip>

          <v-tooltip v-if="store.delivery" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                v-bind="attrs"
                class="ma-0 primary"
                :to="{
                  name: 'StoreProfile',
                  params: { id: store._id },
                }"
                outlined
                v-on="on"
              >
                <v-icon color="primary">mdi-truck-delivery</v-icon>
              </v-chip>
            </template>
            <span>Offers delivery</span>
          </v-tooltip>

          <v-spacer></v-spacer>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                v-if="getStoreOpened(store)"
                v-bind="attrs"
                class="ma-0"
                color="green"
                text-color="white"
                :to="{
                  name: 'StoreProfile',
                  params: { id: store._id },
                }"
                v-on="on"
              >
                Opened
              </v-chip>
              <v-chip
                v-else
                v-bind="attrs"
                class="ma-0"
                :to="{
                  name: 'StoreProfile',
                  params: { id: store._id },
                }"
                v-on="on"
              >
                Closed
              </v-chip>
            </template>
            <span v-if="getStoreOpened(store)"
              >This store is currently opened</span
            >
            <span v-else>This store is currently closed</span>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import { checkIfStoreOpened } from "../../helpers";
import { mapState, mapActions } from "vuex";

export default {
  name: "SearchStoreListItem",
  props: {
    store: Object,
    elevated: Boolean,
    view: String,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("account", ["user", "loggedIn", "favoriteStores"]),
    checkFavoriteStore() {
      if (
        this.loggedIn === true &&
        this.favoriteStores.includes(this.store._id)
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions("snackbar", [
      "addSuccessSnackbar",
      "addErrorSnackbar",
      "addInfoSnackbar",
    ]),
    ...mapActions("account", [
      "addStoreToFavorites",
      "removeStoreFromFavorites",
    ]),

    async removeFavorites() {
      if (this.loggedIn === false) {
        this.addInfoSnackbar(
          "Please login to remove this store from your favorites."
        );
        return;
      }
      try {
        await this.removeStoreFromFavorites(this.store._id);
      } catch (error) {
        // console.log(error);
        this.addErrorSnackbar("Error while removing store from favorites.");
        return;
      }
      this.addSuccessSnackbar("Store was removed from favorites.");
      if (this.view === "FavoriteStores") {
        this.$emit("reload-stores");
      }
      return;
    },

    async addFavorites() {
      if (this.loggedIn === false) {
        this.addInfoSnackbar(
          "Please login to add this store to your favorites."
        );
        return;
      }
      try {
        await this.addStoreToFavorites(this.store._id);
      } catch (error) {
        // console.log(error);
        this.addErrorSnackbar("Error while adding store to favorites.");
        return;
      }
      this.addSuccessSnackbar("Store was added to favorites.");
      if (this.view === "FavoriteStores") {
        this.$emit("reload-stores");
      }
      return;
    },

    goToStore() {
      this.$router.push({
        name: "StoreProfile",
        params: { id: this.store._id },
      });
    },

    print() {
      console.log(this.store);
    },
    getCutDescription(description) {
      return description.substr(0, 100) + "\u2026";
    },
    getAvgRating(store) {
      return parseFloat(store.profileData.avgRating);
    },
    getStoreOpened(store) {
      const check = checkIfStoreOpened(store.openingHours);
      return check.opened;
    },
  },
};
</script>

<style>
.div {
  float: left;
  width: 50%;
}
.btnNoHover:before {
  display: none;
}
.btnNoHover input {
  cursor: pointer;
}
.btnNoHover:hover:before {
  cursor: pointer;
}
.btnNoHover:hover {
  cursor: pointer;
}
.btnNoHover:focus:before {
  cursor: pointer;
}
.btnNoHover:hover:after {
  cursor: pointer;
}

.btnNoHover2:hover {
  transition: box-shadow 0.4s ease-in-out;
  cursor: pointer;
}
.btnNoHover2:hover:after {
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 100px inset;
  transition: box-shadow 0.1s ease-in-out;
  cursor: pointer;
}
</style>

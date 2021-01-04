<template>
  <v-container>
    <!-- SEARCH -->
    <!-- <v-icon color="yellow darken-1">mdi-glass-mug-variant</v-icon>-->
    <!-- <v-icon color="red" large>mdi-map-marker</v-icon>
    <v-icon color="grey" large>mdi-fish</v-icon> -->
    <div class="text-left text-h4">Stores in your area</div>
    <v-text-field
      v-model="searchTerm"
      :append-outer-icon="'mdi-send'"
      type="text"
      label="Search"
      clear-icon="mdi-close-circle"
      clearable
      @click:clear="clearMessage"
      @click:append-outer="addTermToTagArray('tags')"
      @keyup.enter="addTermToTagArray('tags')"
      class="mb-4"
    ></v-text-field>
    <!--        @click:clear="clearMessage"
      @click:append-outer="searchForTerm"
      @keyup.enter="searchForTerm"-->
    <v-row>
      <v-chip
        v-for="tag in filterArray"
        :key="tag[1]"
        close
        outlined
        label
        class="ma-2"
        @click:close="removeFromTagArray(tag)"
      >
        {{ tag[1] }}
      </v-chip>
    </v-row>

    <!-- MAP v-if="computedStores"-->
    <div v-if="storeData" class="mb-4">
      <GoogleMap
        v-bind:markers="computedStores"
        v-bind:stores="computedStores"
        v-on:map-boundaries-changed="fetchStoresByLocation"
        style="height: 500px; width: 100%; display: block; margin-left: auto; margin-right: auto"
      />
    </div>

    <div v-if="storeData && storeData.length == 0" class="text-body-1 my-5">
      We are sorry, we could not find a suitable store for your search criteria.
    </div>

    <!-- LIST -->
    <div v-if="storeData">
      <v-row>
        <v-col
          cols="12"
          xs="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          v-for="(store, index) in computedStores"
          v-bind:key="index"
          v-bind:store="store"
        >
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
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
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
                      <div v-if="storeData">
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
          <!-- </router-link> -->
        </v-col>
      </v-row>
      <v-row>
        <v-pagination
          v-model="currentPage"
          :length="numOfPages"
          v-if="storeData.length > storesPerPage"
          class="py-5"
        />
      </v-row>
    </div>

    <!-- </div> -->
  </v-container>
</template>

<script>
import { storeService } from "../services";
import GoogleMap from "../components/GoogleMap.vue";

export default {
  name: "SearchPickupView",
  components: {
    GoogleMap: GoogleMap
  },
  data() {
    return {
      storeData: null,
      searchTerm: "",
      filterArray: [
        // ["test", "test1"],
        // ["test", "test2"] //Array Aufbau: [Quelle/Art des Filterbegriffs, Filterbegriff]
      ],
      filterObject: {
        tags: []
      },
      //Pagination
      currentPage: 1,
      storesPerPage: 5,
      numSkeletonLoaders: 10
    };
  },
  async mounted() {
    var result = await storeService.getAllStores();
    this.storeData = result.stores;
  },

  computed: {
    numberOfRows: {
      get() {
        return Math.ceil(this.storeData.length / 4);
      }
    },

    //Pagination:
    numOfPages() {
      return Math.ceil(this.storeData.length / this.storesPerPage);
    },
    computedStores() {
      return this.storeData.slice(this.sliceStart, this.sliceEnd);
    },
    sliceStart() {
      return (this.currentPage - 1) * this.storesPerPage;
    },
    sliceEnd() {
      return this.sliceStart + this.storesPerPage;
    }

    // avgRatingFloatValue: {
    //   get() {
    //     //this function will determine what is displayed in the input
    //     return parseFloat(this.store.profileData.avgRating);
    //   }
    // }
  },

  methods: {
    async fetchStoresByLocation(mapBoundaries) {
      //console.log(mapBoundaries);
      var fetchResult = await storeService.getStoresByLocation(mapBoundaries);
      //console.log(fetchResult.stores);
      this.storeData = fetchResult.stores;
    },
    getAvgRating(store) {
      return parseFloat(store.profileData.avgRating);
    },
    getCutDescription(description) {
      return description.substr(0, 100) + "\u2026";
    },
    searchForTerm: async function() {
      var result;
      console.log(this.searchTerm);
      if (this.searchTerm != "" && this.searchTerm != null) {
        result = await storeService.getFilteredStores(this.searchTerm);
        // this.testIdArray = result.idArray;
        // this.dataset = result.stores;
      } else if (this.searchTerm == "" || this.searchTerm == null) {
        result = await storeService.getAllStores();
      }
      this.storeData = result.stores;
      if (this.searchTerm != "") {
        this.filterArray.push(["searchTerm", this.searchTerm]);
      }
      this.searchTerm = "";
    },
    addTermToTagArray(type) {
      if (this.searchTerm != "") {
        this.filterArray.push([type, this.searchTerm]);

        this.filterObject[type].push(this.searchTerm);
        this.searchTerm = "";
        //this.getFilteredStores();
        console.log(this.filterArray);
        console.log(this.filterObject);
        this.getFilteredStores();
      }
    },
    removeFromTagArray(tag) {
      var index = this.filterArray.indexOf(tag);
      console.log(index);
      if (index > -1) {
        this.filterArray.splice(index, 1);
      }
      console.log("Object:");
      var type = "tags";
      //console.log(this.filterObject[tag[0]].indexOf(tag[1]));

      index = this.filterObject[tag[0]].indexOf(tag[1]);
      console.log(index);
      if (index > -1) {
        this.filterObject[type].splice(index, 1);
      }
      console.log(this.filterObject);
      //delete this.filterObject[type];
      //this.searchForTerm();
      this.getFilteredStores();
    },
    getFilteredStores: async function() {
      //var result = await storeService.getFilteredStores(this.filterArray);
      var result = await storeService.getFilteredStores2(this.filterObject);
      this.storeData = result.stores;
    },
    clearMessage() {
      this.searchTerm = "";
      //this.searchForTerm();
    }
    // deleteFilterTag(tag) {
    //   console.log(tag);
    //   var index = this.filterArray.indexOf(tag);
    //   if (index > -1) {
    //     this.filterArray.splice(index, 1);
    //   }
    //   this.searchForTerm();
    // }
  }
};
</script>

<style></style>

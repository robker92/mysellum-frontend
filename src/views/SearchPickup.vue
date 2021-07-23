<template>
  <v-container>
    <!-- SEARCH -->
    <div class="text-left text-h4 mb-3">Stores in your area</div>
    <v-text-field
      v-model="searchTerm"
      :append-outer-icon="'mdi-magnify'"
      type="text"
      label="Search"
      clear-icon="mdi-close"
      clearable
      outlined
      dense
      class="mb-1"
      @click:clear="clearMessage"
      @click:append-outer="fetchStores()"
      @keyup.enter="fetchStores()"
    >
      <!-- <template slot="append-outer">
        <v-icon @click="fetchStores()">mdi-magnify</v-icon>
        <v-btn
              icon
              color="green"
              @click="fetchStores()"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
      </template> -->
    </v-text-field>
    <!-- :append-outer-icon="'mdi-magnify'" -->
    <!-- @click:append-outer="addTermToTagArray('tags')"
      @keyup.enter="addTermToTagArray('tags')" -->
    <!-- <v-row class="mb-3 ml-1">
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
    </v-row> -->

    <!-- MAP -->
    <div class="mb-4">
      <GoogleMap
        :markers="computedStores"
        :stores="computedStores"
        style="height: 600px; width: 100%; display: block; margin-left: auto; margin-right: auto"
        @map-boundaries-changed="setMapBoundaries"
        @unelevate-all-stores="setElevationArray"
        @elevate-store="elevateStore"
        @unelevate-store="unelevateStore"
      />
    </div>
    <!-- v-bind:mapBoundries="mapBoundaries" -->

    <div v-if="storeData && storeData.length == 0" class="text-body-1 my-5">
      We are sorry, we could not find a suitable store for your search criteria.
    </div>

    <!-- LIST -->
    <div v-if="storeData">
      <v-row>
        <v-col
          v-for="(store, index) in computedStores"
          :key="index"
          cols="12"
          xs="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          :store="store"
        >
          <SearchStoreListItem
            :store="store"
            :elevated="elevationArray[index]"
          />
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-pagination
          v-model="currentPage"
          :length="numOfPages"
          v-if="storeData.length > storesPerPage"
          class="py-5"
        />
      </v-row> -->
    </div>
  </v-container>
</template>

<script>
import SearchStoreListItem from "../components/searchComponents/SearchStoreListItem";
import { storeService, searchService } from "../services";
import GoogleMap from "../components/searchComponents/GoogleMap.vue";

export default {
  name: "SearchPickupView",
  components: {
    GoogleMap: GoogleMap,
    SearchStoreListItem: SearchStoreListItem,
  },
  data() {
    return {
      storeData: [],
      searchTerm: "",
      mapBoundaries: null,
      filterArray: [],
      filterObject: {
        tags: [],
      },
      elevationArray: [],
      //Pagination
      currentPage: 1,
      storesPerPage: 5,
      numSkeletonLoaders: 10,
    };
  },

  // async mounted() {
  //   this.setStartUpQueryParams();
  //   this.fetchStores();
  // },

  computed: {
    numberOfRows: {
      get() {
        return Math.ceil(this.storeData.length / 4);
      },
    },

    //Pagination:
    // numOfPages() {
    //   return Math.ceil(this.storeData.length / this.storesPerPage);
    // },
    computedStores() {
      return this.storeData;
      // .slice(this.sliceStart, this.sliceEnd);
    },
    // sliceStart() {
    //   return (this.currentPage - 1) * this.storesPerPage;
    // },
    // sliceEnd() {
    //   return this.sliceStart + this.storesPerPage;
    // }
  },

  watch: {
    mapBoundaries: function(newVal) {
      console.log(newVal);
      // this.setStartUpQueryParams();
      this.fetchStores();
    },
  },

  methods: {
    setMapBoundaries(mapBoundaries) {
      this.mapBoundaries = mapBoundaries;
    },

    getAvgRating(store) {
      return parseFloat(store.profileData.avgRating);
    },

    getCutDescription(description) {
      return description.substr(0, 100) + "\u2026";
    },

    async fetchStores() {
      // const filter = this.filterObject.tags ? this.filterObject : {};
      const data = {
        pickup: true,
        delivery: true,
      };

      if (this.searchTerm) {
        data.searchTerm = this.searchTerm;
      }
      let fetchResult = await searchService.getStoresByLocation(
        this.mapBoundaries,
        data
      );
      this.setQueryUrlParams();
      this.storeData = fetchResult.stores;
      this.setElevationArray();
    },

    setStartUpQueryParams() {
      if (this.$route.query.searchTerm) {
        this.searchTerm = this.$route.query.searchTerm;
      }
      if (this.$route.query.delivery) {
        this.checkBoxDelivery = this.$route.query.delivery;
      }
      if (this.$route.query.pickup) {
        this.checkBoxPickup = this.$route.query.pickup;
      }
    },

    addTermToTagArray(type) {
      if (this.searchTerm !== "") {
        this.filterArray.push([type, this.searchTerm]);

        this.filterObject[type].push(this.searchTerm);
        this.searchTerm = "";

        console.log(this.filterArray);
        console.log(this.filterObject);
        this.fetchStores();
      }
    },

    removeFromTagArray(tag) {
      let index = this.filterArray.indexOf(tag);
      console.log(index);
      if (index > -1) {
        this.filterArray.splice(index, 1);
      }
      console.log("Object:");
      const type = "tags";

      index = this.filterObject[tag[0]].indexOf(tag[1]);
      console.log(index);
      if (index > -1) {
        this.filterObject[type].splice(index, 1);
      }
      console.log(this.filterObject);
      this.fetchStores();
    },

    getFilteredStores: async function() {
      const result = await storeService.getFilteredStores2(this.filterObject);
      this.storeData = result.stores;
    },

    clearMessage() {
      this.searchTerm = "";
      this.fetchStores();
    },

    setElevationArray() {
      if (!this.storeData) {
        this.elevationArray = [];
        return;
      }
      for (let i = 0; i < this.storeData.length; i++) {
        this.elevationArray = [];
        this.elevationArray.push(false);
      }
    },
    elevateStore(storeId) {
      let index = 0;
      let found = false;
      for (let i = 0; i < this.storeData.length; i++) {
        if (this.storeData[i]._id === storeId) {
          index = i;
          found = true;
          break;
        }
      }
      console.log(storeId);
      // console.log(index);
      // this.elevationArray[index] = true;
      if (found === true) {
        this.elevationArray.splice(index, 1, true);
      }
      console.log(this.elevationArray);
    },
    unelevateStore(storeId) {
      let index = 0;
      let found = false;
      for (let i = 0; i < this.storeData.length; i++) {
        if (this.storeData[i]._id === storeId) {
          index = i;
          found = true;
          break;
        }
      }
      // this.elevationArray[index] = false;
      if (found === true) {
        this.elevationArray.splice(index, 1, false);
      }
    },

    setQueryUrlParams() {
      // this.updateParam(this.searchTerm, "sort");
      this.updateParam({ param: "searchTerm", value: this.searchTerm });
      this.updateParam({ param: "delivery", value: true });
      this.updateParam({ param: "pickup", value: true });
      this.updateParam({ param: "min_lat", value: this.mapBoundaries.min_lat });
      this.updateParam({ param: "max_lat", value: this.mapBoundaries.max_lat });
      this.updateParam({ param: "min_lng", value: this.mapBoundaries.min_lng });
      this.updateParam({ param: "max_lng", value: this.mapBoundaries.max_lng });
      this.updateParam({ param: "zoom", value: this.mapBoundaries.zoom });
      // this.updateParam({ param: "pageSize", value: this.selectedPageSize });
      // this.updateParam({ param: "pageNum", value: this.currentPage });
    },

    updateParam(objct) {
      if (objct.value) {
        // Value is not an empty string -> check of param was added before, if yes update it via remove and add
        // if not, just add it
        let paramPayload = {};
        paramPayload[objct.param] = objct.value;
        if (this.$route.query[objct.param]) {
          this.removeQueryParam(objct.param);
          this.addQueryParam(paramPayload);
        } else {
          this.addQueryParam(paramPayload);
        }
      } else {
        // Value is an empty string -> remove param if it was added before
        if (this.$route.query[objct.param]) {
          this.removeQueryParam(objct.param);
        }
      }
    },

    addQueryParam(queryObject) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, queryObject),
      });
    },

    removeQueryParam(param) {
      let query = Object.assign({}, this.$route.query);
      delete query[param];
      this.$router.replace({ query });
    },
  },
};
</script>

<style></style>

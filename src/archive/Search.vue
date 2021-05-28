<template>
  <div>
    <router-link to="/">Home</router-link>
    <h1>This is a search page</h1>
    <v-btn @click="print">Print</v-btn>
    <v-text-field
      v-model="searchTerm"
      :append-outer-icon="'mdi-send'"
      type="text"
      label="Search"
      clear-icon="mdi-close-circle"
      clearable
      @click:clear="clearMessage"
      @click:append-outer="searchForTerm"
      @keyup.enter="searchForTerm"
    ></v-text-field>
    <v-row no-gutters>
      <v-col key="col1">
        <div v-if="dataset">
          <SearchStoreListItem
            v-for="(store, index) in computedStores"
            v-bind:key="index"
            v-bind:store="store"
          />
          <v-pagination
            v-model="currentPage"
            :length="numOfPages"
            v-if="dataset.length > storesPerPage"
            class="py-5"
          />
        </div>
      </v-col>
      <v-col key="col2">
        <GoogleMap v-if="mapData" v-bind:markers="mapData" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GoogleMap from "../components/searchComponents/GoogleMap.vue";
import fakeBackendData from "../fakeBackend/retailerMapInfo.json";

import { storeService } from "../services";

import SearchStoreListItem from "../components/searchComponents/SearchStoreListItem";

export default {
  name: "SearchView",
  components: {
    GoogleMap,
    SearchStoreListItem
  },
  data() {
    return {
      markers: fakeBackendData,
      mapData: null,
      dataset: null,
      headers: null,
      searchTerm: "",
      //Pagination
      currentPage: 1,
      storesPerPage: 2
    };
  },
  async mounted() {
    var result = await storeService.getAllStores();
    this.dataset = result.stores;
    this.mapData = result.stores;
    this.headers = [
      {
        text: "Store",
        align: "start",
        value: "profileData.title"
      },
      { text: "Tags", value: "profileData.tags" }
    ];
    console.log(result);
  },
  computed: {
    //Pagination:
    numOfPages() {
      return Math.ceil(this.dataset.length / this.storesPerPage);
    },
    computedStores() {
      return this.dataset.slice(this.sliceStart, this.sliceEnd);
    },
    sliceStart() {
      return (this.currentPage - 1) * this.storesPerPage;
    },
    sliceEnd() {
      return this.sliceStart + this.storesPerPage;
    }
  },
  methods: {
    handleRowClick(row) {
      console.log(row);
      this.$router.push({ name: "StoreProfile", params: { id: row._id } });
    },
    clearMessage() {
      this.searchTerm = "";
      this.searchForTerm();
    },
    searchForTerm: async function() {
      let result;
      console.log(this.searchTerm);
      if (this.searchTerm != "" && this.searchTerm != null) {
        result = await storeService.getFilteredStores(this.searchTerm);
        // this.testIdArray = result.idArray;
        // this.dataset = result.stores;
      } else if (this.searchTerm == "" || this.searchTerm == null) {
        result = await storeService.getAllStores();
      }
      this.dataset = result.stores;
    },
    print() {
      console.log(this.testdata);
      console.log(this.filteredStores);
    }
  }
};
</script>

<style></style>

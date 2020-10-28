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
    <!-- <v-row no-gutters v-if="dataset">
      <SearchStoreListItem
        v-for="(store, index) in computedStores"
        v-bind:key="index"
        v-bind:store="store"
      />
    </v-row>
    <div v-if="dataset">
      <v-pagination
        v-model="currentPage"
        :length="numOfPages"
        v-if="dataset.length > storesPerPage"
      />
    </div> -->
    <!-- <v-data-table
      v-if="dataset"
      :headers="headers"
      :items="dataset"
      hide-default-header
      hide-default-footer
      class="elevation-1"
      @click:row="handleRowClick"
    ></v-data-table> -->
  </div>
</template>

<script>
//style="height: 400px;"
//<div id="searchViewDiv" class="searchDiv" height="auto">
import GoogleMap from "../components/GoogleMap.vue";
import fakeBackendData from "../fakeBackend/retailerMapInfo.json";

import { storeService } from "../services";

//import axios from "axios";

import SearchStoreListItem from "../components/SearchStoreListItem";

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
    // axios
    //   //.get("http://localhost:3000/stores/5edfa27995ec324a216ea1c0")
    //   .get("http://localhost:3000/stores")
    //   .then(response => {
    //     console.log(response.data);
    //     this.dataset = response.data;
    //     this.mapData = response.data;
    //     this.headers = [
    //       {
    //         text: "Store",
    //         align: "start",
    //         value: "profileData.title"
    //       },
    //       { text: "Tags", value: "profileData.tags" }
    //     ];
    //     //this.productList = response.data.profileData
    //   });
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
      // if (this.offset > this.profileData.reviews.length) {
      //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      //   this.currentPage = this.numOfPages;
      // }
      return this.dataset.slice(this.sliceStart, this.sliceEnd);
    },
    sliceStart() {
      return (this.currentPage - 1) * this.storesPerPage;
    },
    sliceEnd() {
      return this.sliceStart + this.storesPerPage;
    }
    // filteredStores: function() {
    //   if (this.idArray == null) {
    //     return this.dataset;
    //   } else {
    //     return this.dataset.filter(store => {
    //       //var found = this.dataset.some(el => el._id === name)
    //       var found = this.testIdArray.includes(store._id);
    //       return found;
    //       // var found = this.dataset.some(el => this.testdata.includes(el._id));
    //       // return found;

    //       //return store._id == this.testdata._id;
    //     });
    //   }
    // }
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
      var result;
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

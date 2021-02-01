<template>
  <v-container>
    <!-- SEARCH ROW -->
    <v-row>
      <v-text-field
        v-model="searchTerm"
        :append-outer-icon="'mdi-send'"
        type="text"
        label="Search"
        clear-icon="mdi-close-circle"
        clearable
        outlined
        dense
        @click:clear="clearMessage"
        @click:append-outer="searchFilterSort(true)"
        @keyup.enter="searchFilterSort(true)"
      ></v-text-field>
      <!-- @click:append-outer="addTermToTagArray('tags')"
        @keyup.enter="addTermToTagArray('tags')" -->
      <!-- FILTER MENU -->
      <v-menu
        bottom
        left
        :nudge-bottom="10"
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" outlined color="primary" class="ml-3">
            <v-icon color="primary">mdi-filter-menu</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-container>
            <div class="text-left text-h6">Filters:</div>
            <v-autocomplete
              v-model="selectedCountries"
              :items="countries"
              outlined
              dense
              chips
              small-chips
              label="Countries"
              multiple
              clearable
              @change="filterChanged = true"
              style="width:300px"
              ><template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" small>
                  <span>{{ item }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption">
                  (+{{ selectedCountries.length - 1 }} others)
                </span>
              </template>
            </v-autocomplete>
            <v-autocomplete
              v-model="selectedStates"
              :items="states"
              outlined
              dense
              chips
              small-chips
              label="States"
              multiple
              clearable
              @change="filterChanged = true"
              style="width:300px"
              ><template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" small>
                  <span>{{ item }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption">
                  (+{{ selectedStates.length - 1 }} others)
                </span>
              </template>
            </v-autocomplete>
            <v-autocomplete
              v-model="selectedCities"
              :items="cities"
              outlined
              dense
              chips
              small-chips
              label="Cities"
              multiple
              clearable
              @change="filterChanged = true"
              style="width:300px"
              ><template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" small>
                  <span>{{ item }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption">
                  (+{{ selectedCities.length - 1 }} others)
                </span>
              </template>
            </v-autocomplete>
            <v-checkbox
              v-model="checkBoxPickup"
              label="Pick-Up"
              @change="filterChanged = true"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="checkBoxDelivery"
              label="Delivery"
              @change="filterChanged = true"
              hide-details
            ></v-checkbox>
          </v-container>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              :disabled="filterChanged ? false : true"
              @click="searchFilterSort(true)"
              >Set</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-menu>
      <!-- SORT MENU -->
      <v-menu bottom left :nudge-bottom="10" offset-y max-width="250px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" outlined color="primary" class="ml-3">
            <v-icon color="primary">mdi-sort</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list dense nav>
            <v-list-item-group v-model="selectedSort" color="primary">
              <v-list-item
                v-for="(item, index) in sortTypes"
                :key="index"
                @click="sortListClicked(index)"
                link
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-left">
                    {{ item.type }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
    </v-row>
    <!--        @click:clear="clearMessage"
      @click:append-outer="searchForTerm"
      @keyup.enter="searchForTerm"-->

    <!-- FILTER ARRAY APPROACH  -->
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
    <div v-if="storeData && storeData.length == 0">
      <p>
        We are sorry, we could not find a suitable store for your search
        criteria.
      </p>
    </div>
    <div v-if="loadingStoreData === false">
      <!-- <div
        v-for="(store, index) in storeData"
        v-bind:key="index"
        v-bind:store="store"
      > -->
      <v-row>
        <v-col
          cols="12"
          xs="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          v-for="(store, index) in this.storeData"
          v-bind:key="index"
          v-bind:store="store"
        >
          <!-- <router-link :to="{ path: `/storeprofile/${store._id}` }"> -->
          <!--height="200px"
              style="width:300px;" -->

          <SearchStoreListItem :store="store" />
          <!-- <v-hover v-slot:default="{ hover }">
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
                  <v-row class="mx-2">{{ store.mapData.address.city }} </v-row>
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
          </v-hover> -->
          <!-- </router-link> v-if="totalStoreCount > parseInt(selectedPageSize)"-->
        </v-col>
      </v-row>
      <v-row align="center">
        <v-spacer />
        <div style="width:150px">
          <v-select
            :items="pageSizes"
            v-model="selectedPageSize"
            label="Stores per page"
            outlined
            dense
          ></v-select>
        </div>
        <v-pagination v-model="currentPage" :length="numOfPages" class="py-5" />
        <v-spacer />
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col
          cols="12"
          xs="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          v-for="n in numSkeletonLoaders"
          :key="n"
        >
          <v-skeleton-loader
            elevation="2"
            class="ma-3"
            type="card-avatar, article"
          />
        </v-col>
      </v-row>
    </div>
    <!-- </div> -->
  </v-container>
</template>

<script>
import SearchStoreListItem from "../components/SearchStoreListItem";
import { storeService } from "../services";

export default {
  name: "SearchDeliveryView",
  components: {
    SearchStoreListItem: SearchStoreListItem
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
      selectedSort: 0,
      sortTypes: [
        { type: "Date", icon: "mdi-sort-calendar-ascending", tooltip: "" },
        { type: "Date", icon: "mdi-sort-calendar-descending", tooltip: "" },
        { type: "Order Id", icon: "mdi-sort-numeric-ascending", tooltip: "" },
        { type: "Order Id", icon: "mdi-sort-numeric-descending", tooltip: "" },
        {
          type: "Completion",
          icon: "mdi-sort-bool-ascending-variant",
          tooltip: ""
        },
        {
          type: "Completion",
          icon: "mdi-sort-bool-descending-variant",
          tooltip: ""
        }
      ],
      filterChanged: false,
      selectedCountries: [],
      selectedStates: [],
      selectedCities: [],
      countries: ["Germany", "France", "Great-Britain"],
      states: ["Bayern", "Baden-Württemberg", "Niedersachen"],
      cities: ["München", "Ingolstadt", "Great-Britain"],
      checkBoxDelivery: true,
      checkBoxPickup: true,
      //Pagination
      totalStoreCount: 0,
      selectedPageSize: "3",
      pageSizes: ["3", "5", "10", "50", "100"],
      currentPage: 1,
      //storesPerPage: 3,
      numSkeletonLoaders: 10,

      loadingStoreData: true
    };
  },
  watch: {
    filterArray() {
      console.log("changed");
    },
    currentPage() {
      this.searchFilterSort(false);
      // let result = await storeService.filterSortSearch(this.getPayload());
      // this.storeData = result.stores;
      // this.totalStoreCount = result.totalCount;
    },
    selectedPageSize() {
      this.searchFilterSort(true);
    }
  },
  async mounted() {
    this.searchFilterSort(true);
    // this.loadingStoreData = true;
    // let result = await storeService.filterSortSearch(this.getPayload());
    // this.storeData = result.stores;
    // this.totalStoreCount = result.totalCount;
  },

  computed: {
    numberOfRows: {
      get() {
        return Math.ceil(this.storeData.length / 4);
      }
    },

    //Pagination:
    numOfPages() {
      return Math.ceil(this.totalStoreCount / parseInt(this.selectedPageSize));
    }
    // computedStores() {
    //   return this.storeData.slice(this.sliceStart, this.sliceEnd);
    // },
    // sliceStart() {
    //   return (this.currentPage - 1) * parseInt(this.selectedPageSize);
    // },
    // sliceEnd() {
    //   return this.sliceStart + parseInt(this.selectedPageSize);
    // }

    // avgRatingFloatValue: {
    //   get() {
    //     //this function will determine what is displayed in the input
    //     return parseFloat(this.store.profileData.avgRating);
    //   }
    // }
  },

  methods: {
    // getAvgRating(store) {
    //   return parseFloat(store.profileData.avgRating);
    // },
    // getCutDescription(description) {
    //   return description.substr(0, 100) + "\u2026";
    // },
    getPayload() {
      let payload = {
        searchTerm: this.searchTerm,
        countries: this.selectedCountries,
        states: this.selectedStates,
        cities: this.selectedCities,
        sort: "",
        pickup: this.checkBoxPickup,
        delivery: this.checkBoxDelivery,
        pageSize: parseInt(this.selectedPageSize),
        pageNum: this.currentPage
      };
      return payload;
    },
    async searchFilterSort(resetToPage1) {
      // let payload = {
      //   searchTerm: this.searchTerm,
      //   countries: this.selectedCountries,
      //   states: this.selectedStates,
      //   cities: this.selectedCities,
      //   sort: "",
      //   pickup: this.checkBoxPickup,
      //   delivery: this.checkBoxDelivery,
      //   pageSize: parseInt(this.selectedPageSize),
      //   pageNum: this.currentPage
      // };
      let payload = this.getPayload();
      if (resetToPage1 === true) {
        payload.pageNum = 1;
        this.currentPage = 1;
      }
      //console.log(this.getPayload());
      this.loadingStoreData = true;
      let queryResult;
      try {
        queryResult = await storeService.filterSortSearch(payload);
      } catch (error) {
        console.log(error);
        return;
      }
      this.storeData = queryResult.stores;
      this.totalStoreCount = queryResult.totalCount;
      this.loadingStoreData = false;
      //console.log(payload);
      this.filterChanged = false;
    },
    // searchForTerm: async function() {
    //   var result;
    //   console.log(this.searchTerm);
    //   if (this.searchTerm !== "" && this.searchTerm !== null) {
    //     result = await storeService.getFilteredStores(this.searchTerm);
    //     // this.testIdArray = result.idArray;
    //     // this.dataset = result.stores;
    //   } else if (this.searchTerm === "" || this.searchTerm === null) {
    //     result = await storeService.getAllStores();
    //   }
    //   this.storeData = result.stores;
    //   if (this.searchTerm !== "") {
    //     this.filterArray.push(["searchTerm", this.searchTerm]);
    //   }
    //   this.searchTerm = "";
    // },
    // addCountriesToFilterArray() {
    //   //this.filterArray.push([type, this.searchTerm]);
    // },
    addTermToTagArray(type) {
      if (this.searchTerm !== "") {
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
    // getFilteredStores: async function() {
    //   //var result = await storeService.getFilteredStores(this.filterArray);
    //   console.log("at function in view");
    //   let result = await storeService.getFilteredStores2(this.filterObject);
    //   this.storeData = result.stores;
    // },
    clearMessage() {
      this.searchTerm = "";
      this.searchFilterSort();
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

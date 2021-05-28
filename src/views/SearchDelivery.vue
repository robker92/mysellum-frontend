<template>
  <v-container>
    <!-- SEARCH ROW -->
    <v-row>
      <v-text-field
        v-model="searchTerm"
        :append-outer-icon="'mdi-magnify'"
        type="text"
        label="Search"
        clear-icon="mdi-close"
        clearable
        outlined
        dense
        @click:clear="clearMessage"
        @click:append-outer="searchFilterSort(true)"
        @keyup.enter="searchFilterSort(true)"
      ></v-text-field>

      <!-- FILTER MENU -->
      <v-menu
        bottom
        left
        :nudge-bottom="10"
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" outlined color="primary" class="ml-6">
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
        </v-col>
      </v-row>
      <v-row align="baseline">
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div style="width:100px; height:15px;" v-bind="attrs" v-on="on">
              <v-select
                :items="pageSizes"
                v-model="selectedPageSize"
                label=""
                outlined
                dense
              ></v-select>
            </div>
          </template>
          <span>Stores per Page</span>
        </v-tooltip>
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
import SearchStoreListItem from "../components/searchComponents/SearchStoreListItem";
import { storeService, searchService } from "../services";

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
    },
    selectedPageSize() {
      this.searchFilterSort(true);
    }
  },
  async mounted() {
    this.setStartUpQueryParams();
    this.searchFilterSort(false);
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
  },

  methods: {
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
      console.log(this.currentPage);
      return payload;
    },

    async searchFilterSort(resetToPage1) {
      let payload = this.getPayload();
      console.log(payload);
      if (resetToPage1 === true) {
        payload.pageNum = 1;
        this.currentPage = 1;
      }
      //console.log(this.getPayload());
      this.loadingStoreData = true;
      let queryResult;
      try {
        queryResult = await searchService.filterSortSearch(payload);
      } catch (error) {
        console.log(error);
        return;
      }
      this.setQueryUrlParams();
      this.storeData = queryResult.stores;
      this.totalStoreCount = queryResult.totalCount;
      this.loadingStoreData = false;
      //console.log(payload);
      this.filterChanged = false;

      let result;
      try {
        result = await searchService.searchTest(payload);
      } catch (error) {
        console.log(error);
        return;
      }
      console.log(result);
    },

    setQueryUrlParams() {
      // this.updateParam(this.searchTerm, "sort");
      this.updateParam({ param: "searchTerm", value: this.searchTerm });
      this.updateParam({ param: "countries", value: this.selectedCountries });
      this.updateParam({ param: "states", value: this.selectedStates });
      this.updateParam({ param: "cities", value: this.selectedCities });
      this.updateParam({ param: "delivery", value: this.checkBoxDelivery });
      this.updateParam({ param: "pickup", value: this.checkBoxPickup });
      this.updateParam({ param: "pageSize", value: this.selectedPageSize });
      this.updateParam({ param: "pageNum", value: this.currentPage });
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

    setStartUpQueryParams() {
      if (this.$route.query.searchTerm) {
        this.searchTerm = this.$route.query.searchTerm;
      }
      if (this.$route.query.countries) {
        // check if countries is an array, if not then we need to add the value as an array
        if (!Array.isArray(this.$route.query.countries)) {
          this.selectedCountries = [this.$route.query.countries];
        } else {
          this.selectedCountries = this.$route.query.countries;
        }
      }
      if (this.$route.query.states) {
        // check if states is an array, if not then we need to add the value as an array
        if (!Array.isArray(this.$route.query.states)) {
          this.selectedStates = [this.$route.query.states];
        } else {
          this.selectedStates = this.$route.query.states;
        }
      }
      if (this.$route.query.cities) {
        // check if states is an array, if not then we need to add the value as an array
        if (!Array.isArray(this.$route.query.cities)) {
          this.selectedCities = [this.$route.query.cities];
        } else {
          this.selectedCities = this.$route.query.cities;
        }
      }
      if (this.$route.query.delivery) {
        this.checkBoxDelivery = this.$route.query.delivery;
      }
      if (this.$route.query.pickup) {
        this.checkBoxPickup = this.$route.query.pickup;
      }
      if (this.$route.query.pageSize) {
        this.selectedPageSize = this.$route.query.pageSize;
      }
      if (this.$route.query.pageNum) {
        this.currentPage = parseInt(this.$route.query.pageNum);
      }
    },

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
      this.getFilteredStores();
    },

    clearMessage() {
      this.searchTerm = "";
      this.searchFilterSort();
    },

    addQueryParam(queryObject) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, queryObject)
      });
    },

    removeQueryParam(param) {
      let query = Object.assign({}, this.$route.query);
      delete query[param];
      this.$router.replace({ query });
    }
  }
};
</script>

<style></style>

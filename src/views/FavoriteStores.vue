<template>
  <div>
    <v-container v-if="loaded === true">
      <div class="text-h4 text-left">
        Your Favorite Stores
      </div>
      <div class="text-body-1 text-left mb-2 mt-2">
        Find your saved favorite stores here. You can have a maximum number of
        20 stores.
      </div>
      <v-row>
        <v-col
          v-for="(store, index) in stores"
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
            :view="'FavoriteStores'"
            @reload-stores="loadStores()"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { storeService } from "../services";
import SearchStoreListItem from "../components/searchComponents/SearchStoreListItem";

export default {
  name: "FavoriteStoresView",
  components: { SearchStoreListItem: SearchStoreListItem },
  mixins: [],
  props: {},
  data() {
    return {
      stores: [],
      loaded: false,
    };
  },
  watch: {},
  computed: {
    ...mapState("account", ["user", "loggedIn", "favoriteStores"]),
  },
  async mounted() {
    await this.loadStores();
    this.loaded = true;
  },
  methods: {
    async loadStores() {
      let promises = [];
      for (const storeId of this.favoriteStores) {
        promises.push(storeService.getSingleStore(storeId));
      }
      // TODO what if store was deleted? -> don't show
      const results = await Promise.all(promises);
      this.stores = [];
      for (const store of results) {
        this.stores.push(store);
      }
      return;
    },
  },
};
</script>

<style></style>

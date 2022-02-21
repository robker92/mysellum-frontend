<template>
  <v-row class="">
    <v-col
      v-for="(category, index) in categories"
      :key="index"
      cols="12"
      xs="4"
      sm="4"
      md="3"
      lg="3"
      xl="3"
    >
      <router-link
        :to="{
          name: 'SearchPickup',
          query: {
            searchTerm: category.title,
            pickup: 'true',
            delivery: 'true',
          },
        }"
        style="text-decoration: none; color: inherit"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            flat
            :elevation="hover ? 8 : 0"
            :class="{ 'on-hover': hover }"
          >
            <v-container>
              <v-img
                :src="category.imgSrc"
                color="grey lighten-3"
                max-height="160"
              />
              <div class="mt-3 text-body-1">
                {{ title(category.id) }}
              </div>
            </v-container>
          </v-card>
        </v-hover>
      </router-link>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ProductCategories",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      categories: [
        {
          id: "meat",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-meat.jpg",
        },
        {
          id: "fish",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-fish.jpg",
        },
        {
          id: "wine",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-wine.jpg",
        },
        {
          id: "beer",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-beer.jpg",
        },
        {
          id: "bakery",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-bakery.jpg",
        },
        {
          id: "dairyAndEggs",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-dairy.jpg",
        },
        {
          id: "farm",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-farm.jpg",
        },
        {
          id: "vegetables",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-vegetables.jpg",
        },
      ],
    };
  },
  computed: {
    title() {
      return (id) => {
        switch (id) {
          case "meat":
            return this.$t("home.categories.meat");
          case "fish":
            return this.$t("home.categories.fish");
          case "wine":
            return this.$t("home.categories.wine");
          case "beer":
            return this.$t("home.categories.beer");
          case "bakery":
            return this.$t("home.categories.bakery");
          case "dairyAndEggs":
            return this.$t("home.categories.dairyAndEggs");
          case "farm":
            return this.$t("home.categories.farm");
          case "vegetables":
            return this.$t("home.categories.vegetables");
        }
      };
    },
  },
  watch: {},
  methods: {},
};
</script>

<style></style>

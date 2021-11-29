<template>
  <v-container>
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
          style="text-decoration: none; color: inherit;"
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
                  max-height="150"
                />
                <div class="mt-3 text-body-1">
                  {{ category.title }}
                </div>
              </v-container>
            </v-card>
          </v-hover>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
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
          title: "Meat",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-meat.jpg",
        },
        {
          title: "Fish",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-fish.jpg",
        },
        {
          title: "Wine",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-wine.jpg",
        },
        {
          title: "Beer",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-beer.jpg",
        },
        {
          title: "Bakery",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-bakery.jpg",
        },
        {
          title: "Dairy and Eggs",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-dairy.jpg",
        },
        {
          title: "Farm",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-farm.jpg",
        },
        {
          title: "Vegetables",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/category-vegetables.jpg",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style></style>

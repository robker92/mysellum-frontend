<template>
  <v-container>
    <SearchArea />

    <v-row dense class="mt-8 mb-4">
      <v-spacer />
      <div class="text-center">
        <v-img src="@/assets/mysellum_text_with_subtitle.png" width="800" />
      </div>
      <v-spacer />
    </v-row>

    <div class="text-h4 mt-16">
      {{ this.$t("home.categories.headline") }}
    </div>

    <ProductCategories class="mt-3" />
    <div style="margin-top: 40px; display: inline-block" />

    <v-card flat height="300" />

    <HowDoesItWork class="mb-9"/>

    <v-card flat height="300" />

    <div class="text-h4">{{ $t("home.reasonsToBuy.headline") }}</div>
    <Reasons type="buy" class="my-3" />

    <v-card flat height="300" />

    <div class="text-h4">{{ $t("home.reasonsToSell.headline") }}</div>
    <Reasons type="sell" class="my-3" />

    <v-card flat height="300" />

    <div class="text-h4">{{ $t("home.experiences.headline") }}</div>
    <Testimonials class="mt-3" />

    <v-card flat height="300" class=""/>

    <v-row dense class="">
      <v-spacer />
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-hover v-slot:default="{ hover }">
          <v-card
            :class="{ 'on-hover': hover }"
            :elevation="hover ? 16 : 0"
            flat
            :to="{
              name: 'SearchDelivery',
            }"
          >
            <v-container>
              <div class="text-h5 mb-3">{{ $t("home.explore.headlineDeliver") }}</div>
              <v-img
                src="../assets/home_searchDelivery3.jpg"
                :height="imgHeight"
                eager
              >
              </v-img>
            </v-container>
          </v-card>
        </v-hover>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-hover v-slot:default="{ hover }">
          <v-card
            :class="{ 'on-hover': hover }"
            :elevation="hover ? 16 : 0"
            :to="{ name: 'SearchPickup' }"
            flat
          >
            <v-container>
              <div class="text-h5 mb-3">{{ $t("home.explore.headlinePickup") }}</div>
              <v-img
                src="../assets/home_searchPickup1.jpg"
                :height="imgHeight"
                eager
              >
              </v-img>
            </v-container>
          </v-card>
        </v-hover>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import SearchArea from "../components/homeComponents/SearchArea";
import ProductCategories from "../components/homeComponents/ProductCategories";
import Testimonials from "../components/aboutComponents/Testimonials.vue";
import Reasons from "../components/aboutComponents/Reasons.vue";
import HowDoesItWork from "../components/aboutComponents/HowDoesItWork.vue";

export default {
  name: "HomeView",
  components: {
    SearchArea: SearchArea,
    ProductCategories: ProductCategories,
    Testimonials: Testimonials,
    Reasons: Reasons,
    HowDoesItWork: HowDoesItWork
  },
  data() {
    return {
      imgHeight: "500px",
      searchTerm: "",
      selectedDistributionItem: "",
      distributionItems: ["delivery", "pickup"],
    };
  },
  methods: {
    search() {
      console.log(this.searchTerm);
      console.log(this.selectedDistributionItem);
      if (this.selectedDistributionItem === "delivery") {
        this.$router.push({
          name: "SearchDelivery",
          query: { searchTerm: this.searchTerm },
        });
      } else if (this.selectedDistributionItem === "pickup") {
        this.$router.push({
          name: "SearchPickup",
          query: { searchTerm: this.searchTerm },
        });
      }
    },
    print() {
      console.log(this.$i18n.locale);
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}

.marginTop40 {
  margin-top: 30px;
}
</style>

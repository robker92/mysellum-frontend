<template>
  <v-container>
    <SearchArea />
    <!-- 
    <div class="text-h4 mt-8  mb-6">
      Willkommen bei <strong>Mysellum</strong> - deiner Online Markthalle
    </div> -->

    <v-row dense class="mt-3">
      <v-spacer />
      <div class="text-center">
        <v-img src="@/assets/mysellum_text_with_subtitle.png" width="800" />
      </div>
      <v-spacer />
    </v-row>

    <div class="text-h4 mt-8">
      Explore Popular Categories In Your Region
    </div>
    <ProductCategories class="mt-3" />

    <!-- <div>
      Landing Page Content:
      <ul class="text-left">
        <li>What is mysellum?</li>
        <li>Why you should use it</li>
        <li>How to become a store owner</li>
      </ul>
    </div> -->

    <div class="text-h4 mt-8">
      Reasons to buy via Mysellum
    </div>
    <Reasons type="buy" class="mt-3" />

    <div class="text-h4 mt-8">
      Reasons to sell via Mysellum
    </div>
    <Reasons type="sell" class="mt-3" />

    <div class="text-h4 mt-8">
      Experiences by others
    </div>
    <Testimonials class="mt-3" />

    <v-row dense class="mt-8">
      <v-spacer />
      <v-col cols="12" xs="12" sm="12" md="6" lg="5" xl="4">
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
              <div class="text-h5 mb-3">
                Explore stores that deliver
              </div>
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

      <v-col cols="12" xs="12" sm="12" md="6" lg="5" xl="4">
        <v-hover v-slot:default="{ hover }">
          <v-card
            :class="{ 'on-hover': hover }"
            :elevation="hover ? 16 : 0"
            :to="{ name: 'SearchPickup' }"
            flat
          >
            <v-container>
              <div class="text-h5 mb-3">
                Explore stores in your region
              </div>
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

export default {
  name: "HomeView",
  components: {
    SearchArea: SearchArea,
    ProductCategories: ProductCategories,
    Testimonials: Testimonials,
    Reasons: Reasons,
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
</style>

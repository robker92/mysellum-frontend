<template>
  <v-container fluid>
    <v-row dense>
      <v-spacer />
      <v-col cols="12" xs="12" sm="12" md="6" lg="5" xl="4">
        <v-hover v-slot:default="{ hover }">
          <v-card :class="{ 'on-hover': hover }" :elevation="hover ? 16 : 2">
            <v-carousel
              cycle
              show-arrows-on-hover
              hide-delimiters
              hide-delimiter-background
              :height="imgHeight"
            >
              <v-carousel-item
                :to="{
                  name: 'SearchDelivery',
                  params: { locale: $i18n.locale }
                }"
                eager
              >
                <v-img
                  src="../assets/home_searchDelivery1.jpg"
                  :height="imgHeight"
                  eager
                >
                </v-img>
              </v-carousel-item>
              <v-carousel-item
                :to="{
                  name: 'SearchDelivery',
                  params: { locale: $i18n.locale }
                }"
                eager
              >
                <v-img
                  src="../assets/home_searchDelivery2.jpg"
                  :height="imgHeight"
                  eager
                >
                </v-img>
              </v-carousel-item>
              <v-carousel-item
                :to="{
                  name: 'SearchDelivery',
                  params: { locale: $i18n.locale }
                }"
                eager
              >
                <v-img
                  src="../assets/home_searchDelivery3.jpg"
                  :height="imgHeight"
                  eager
                >
                </v-img>
              </v-carousel-item>
            </v-carousel>

            <router-link
              :to="{
                name: 'SearchDelivery',
                params: { locale: $i18n.locale }
              }"
              style="text-decoration: none; color: inherit;"
            >
              <v-card-title>Delivery</v-card-title>
            </router-link>
          </v-card>
        </v-hover>
      </v-col>

      <!-- style="width:700px;" -->
      <v-col cols="12" xs="12" sm="12" md="6" lg="5" xl="4">
        <v-hover v-slot:default="{ hover }">
          <v-card :class="{ 'on-hover': hover }" :elevation="hover ? 16 : 2">
            <v-carousel
              cycle
              show-arrows-on-hover
              hide-delimiters
              hide-delimiter-background:height="imgHeight"
            >
              <v-carousel-item :to="{ name: 'SearchPickup' }" eager>
                <v-img
                  src="../assets/home_searchPickup1.jpg"
                  :height="imgHeight"
                  eager
                >
                </v-img>
              </v-carousel-item>
              <v-carousel-item :to="{ name: 'SearchPickup' }" eager>
                <v-img
                  src="../assets/home_searchPickup2.jpg"
                  :height="imgHeight"
                  eager
                >
                </v-img>
              </v-carousel-item>
              <v-carousel-item :to="{ name: 'SearchPickup' }" eager>
                <v-img
                  src="../assets/home_searchPickup3.jpg"
                  :height="imgHeight"
                  eager
                >
                </v-img>
              </v-carousel-item>
            </v-carousel>

            <router-link
              :to="{ name: 'SearchPickup' }"
              style="text-decoration: none; color: inherit;"
            >
              <v-card-title>Pick-up</v-card-title>
            </router-link>
          </v-card>
        </v-hover>
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      imgHeight: "500px"
    };
  },
  methods: {
    print() {
      console.log(this.$i18n.locale);
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>

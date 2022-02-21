<template>
  <v-container>
    <v-card rounded="xl" elevation="6" height="80">
      <v-container>
        <!--  height="100" -->
        <!-- <div height=""> -->
        <!-- <v-card-actions primary-title class="justify-center"> -->
        <!-- justify="center" align="center" -->
        <v-row>
          <v-col cols="12" xs="6" sm="7" md="8" lg="8" xl="8">
            <v-text-field
              v-model="searchTerm"
              label="Search"
              placeholder="What are you looking for?"
              absolute
              outlined
              @keyup.enter="search()"
            ></v-text-field>
          </v-col>

          <v-col cols="12" xs="2" sm="3" md="3" lg="3" xl="3">
            <v-select
              v-model="selectedDistributionItem"
              :items="distributionItems"
              label="Distribution"
              absolute
              outlined
            >
              <!-- <template v-slot:append-outer>
              <v-btn color="primary" medium dark class="mr-4" @click="search">
                <v-icon>
                  mdi-magnify
                </v-icon>
              </v-btn>
            </template> -->
            </v-select>
          </v-col>

          <v-col cols="12" xs="2" sm="2" md="1" lg="1" xl="1">
            <v-btn
              :color="mysellum_main_green_name"
              dark
              fab
              class="mr-4"
              @click="search"
            >
              <v-icon>
                mdi-magnify
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <!-- </div> -->
      <!-- </v-card-actions> -->
    </v-card>
  </v-container>
</template>

<script>
import { MysellumColors } from "../../helpers";

export default {
  name: "SearchAreaComponent",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      searchTerm: "",
      selectedDistributionItem: "",
      distributionItems: ["delivery", "pickup"],
      // Colors
      mysellum_main_green_name: MysellumColors.MYSELLUM_MAIN_GREEN_NAME,
    };
  },
  computed: {},
  watch: {},
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
      //   else {
      //       this.$router.push({
      //       name: "SearchPickup",
      //       query: { searchTerm: this.searchTerm },
      //     });
      //   }
    },
  },
};
</script>

<style></style>

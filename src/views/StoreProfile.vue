<template>
  <div class="mainDiv">
    <v-carousel cycle show-arrows-on-hover height="800px">
      <v-carousel-item v-for="(img, i) in storeData.images" :key="i" :src="img.src"></v-carousel-item>
    </v-carousel>
    <v-btn @click="printData">Print</v-btn>
    <h1>{{ storeData.title }}</h1>
    <p>{{ storeData.description }}</p>
    <v-container>
      <StoreProfileListItem
        v-for="(prod, index) in productList"
        v-bind:key="index"
        v-bind:product="prod"
      />
    </v-container>
  </div>
</template>

<script>
/*
Aufbau:
Bilder, Titel und Beschreibung, Liste mit Produkten, Reviews
*/
import fakeBackendDataStore from "../fakeBackend/storeProfileStore1.json";
import fakeBackendDataProducts from "../fakeBackend/storeProfileProducts1.json";

import StoreProfileListItem from "../components/StoreProfileListItem";

import { mapState, mapActions } from "vuex";

export default {
  name: "StoreProfileView",
  components: {
    StoreProfileListItem: StoreProfileListItem
  },
  data() {
    return {
      storeData: fakeBackendDataStore,
      productList: fakeBackendDataProducts
    };
  },
  computed: {
    ...mapState("account", ["user", "loggedIn"]),
    ...mapState("shoppingCart", ["productsInCart", "counter"])
  },
  methods: {
    ...mapActions("shoppingCart", ["addProduct", "removeProduct"]),
    printData() {
      //console.log(this.storeData.images);
      console.log(this.productsInCart);
      console.log(this.counter);
      console.log(this.user);
    },
    putInCart(product) {
      //console.log(product);
      //hardcoded amount 1 for the time being
      this.addProduct({ product: product, amount: 1 });
    }
  }
};
</script>

<style>
.mainDiv {
  width: 80%;
  align-items: center;
  display: inline-block;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>

<template>
  <div>
    <v-row no-gutters height="60px">
      <v-col cols="12" sm="1">
        <v-img :src="product.imgSrc" aspect-ratio="1.7" height="45px" width="45px"></v-img>
      </v-col>
      <v-col cols="12" sm="1">
        <h3>{{ product.title }}</h3>
      </v-col>
      <v-col cols="12" sm="4">
        <p>{{ product.description }}</p>
      </v-col>
      <v-col cols="12" sm="1">
        <p>{{ product.price }}{{ product.currencySymbol }}</p>
      </v-col>
      <v-col cols="12" sm="4">
        <v-btn class="mx-2" fab dark x-small color="indigo" @click.stop="decreaseAmountByOne()">
          <v-icon dark>mdi-minus</v-icon>
        </v-btn>
        {{ this.amountTextField }}
        <v-btn class="mx-2" fab dark x-small color="indigo" @click.stop="increaseAmountByOne()">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="1">
        <v-btn small @click.stop="putInCart(product)">Add to bag</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
/*

*/
import { mapState, mapActions } from "vuex";

export default {
  name: "StoreProfileListItem",
  props: {
    product: Object
  },
  data() {
    return {
      amountTextField: 1
    };
  },
  computed: {
    ...mapState("shoppingCart", ["productsInCart", "counter"])
  },
  methods: {
    ...mapActions("shoppingCart", ["addProduct", "removeProduct"]),
    increaseAmountByOne() {
      this.amountTextField = this.amountTextField + 1;
    },
    decreaseAmountByOne() {
      if (this.amountTextField > 1) {
        this.amountTextField = this.amountTextField - 1;
      }
    },
    putInCart(product) {
      this.addProduct({ product: product, amount: this.amountTextField });
    }
  }
};
</script>

<style></style>

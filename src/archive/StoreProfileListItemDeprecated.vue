<template>
  <div>
    <v-row no-gutters height="60px">
      <v-col cols="12" sm="1">
        <v-img
          :src="product.imgSrc"
          aspect-ratio="1.7"
          height="45px"
          width="45px"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-2"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
      <v-col cols="12" sm="1">
        <h3>{{ product.title }}</h3>
      </v-col>
      <v-col cols="12" sm="3">
        <p>{{ product.description }}</p>
      </v-col>
      <v-col cols="12" sm="1">
        <p>{{ product.price }}{{ product.currencySymbol }}</p>
      </v-col>
      <v-col cols="12" sm="4">
        <v-btn
          class="mx-2"
          fab
          dark
          x-small
          color="indigo"
          @click.stop="decreaseAmountByOne()"
        >
          <v-icon dark>mdi-minus</v-icon>
        </v-btn>
        {{ this.amountTextField }}
        <v-btn
          class="mx-2"
          fab
          dark
          x-small
          color="indigo"
          @click.stop="increaseAmountByOne()"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col v-if="modifiable == true" sm="1">
        <v-btn icon class="mx-2" fab x-small @click.stop="deleteProduct()">
          <v-icon dark>mdi-delete</v-icon>
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
import { productService } from "../services";

export default {
  name: "StoreProfileListItem",
  props: {
    product: Object,
    modifiable: Boolean,
  },
  data() {
    return {
      amountTextField: 1,
    };
  },
  computed: {
    //...mapState("shoppingCart", ["productsInCart", "counter"]),
    ...mapState("account", ["user", "loggedIn"]),
  },
  methods: {
    ...mapActions("account", ["addProduct"]),
    increaseAmountByOne() {
      this.amountTextField = this.amountTextField + 1;
    },
    decreaseAmountByOne() {
      if (this.amountTextField > 1) {
        this.amountTextField = this.amountTextField - 1;
      }
    },
    putInCart(product) {
      //if user loggedin -> Database; if not -> Local storage
      if (this.loggedIn == false) {
        //User is not logged in
        //Check if shoppingCart in local storage already
        var products = [];
        var payload = [product, this.amountTextField];
        //Check if cart already created in local storage and create new one if not
        if (localStorage.getItem("cart") == null) {
          products[0] = payload;
          localStorage.setItem("cart", JSON.stringify(products));
        } else {
          // Add to already existing cart
          var currentCart = JSON.parse(localStorage.getItem("cart"));
          //check if product already in cart
          var found = false;
          for (var i = 0; i < currentCart.length; i++) {
            if (product.id == currentCart[i][0].id) {
              //Product already in cart
              found = true;
              currentCart[i][1] =
                currentCart[i][1] + parseInt(this.amountTextField);
              localStorage.setItem("cart", JSON.stringify(currentCart));
              break;
            }
          }
          //Product not in cart
          if (found == false) {
            currentCart.push(payload);
            localStorage.setItem("cart", JSON.stringify(currentCart));
          }
        }
      } else {
        //Logged In routine
        this.addProduct({
          email: this.user.email,
          product: product,
          amount: this.amountTextField,
        });
      }
    },
    deleteProduct: async function() {
      var data = {
        storeId: this.$route.params.id,
        productId: this.product.productId,
      };
      var response = await productService.deleteProduct(data);
      console.log(response);
      this.$emit("delete-product", this.product.productId);
    },
  },
};
</script>

<style></style>

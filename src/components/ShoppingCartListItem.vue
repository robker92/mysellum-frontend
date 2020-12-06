<template>
  <div>
    <v-row no-gutters height="60px">
      <v-col sm="1">
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
      <v-col sm="1">
        <div class="text-left text-body-1 font-weight-bold">
          {{ product.title }}
        </div>
      </v-col>
      <v-col sm="4">
        <div class="text-left text-body-1">{{ product.description }}</div>
      </v-col>

      <v-col v-if="modifiable == true" sm="1">
        <v-btn
          class="mx-2"
          :dark="minusButtonDark"
          x-small
          color="primary"
          @click.stop="decreaseProductAmount(1)"
          :disabled="minusButtonDisabled"
        >
          <v-icon dark>mdi-minus</v-icon>
        </v-btn>
      </v-col>
      <v-col sm="1">
        <div class="text-body-1">{{ this.amount }}</div>
      </v-col>
      <v-col v-if="modifiable == true" sm="1">
        <v-btn
          class="mx-2"
          dark
          x-small
          color="primary"
          @click.stop="putInCart()"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col v-if="modifiable == true" sm="1">
        <v-btn
          icon
          class="mx-2"
          x-small
          fab
          @click.stop="decreaseProductAmount(amount)"
        >
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </v-col>
      <!-- <v-col v-else cols="12" sm="4"> </v-col> -->

      <v-col sm="1">
        <div class="text-right text-body-1">
          {{ product.price }}{{ product.currencySymbol }}
        </div>
      </v-col>

      <v-col sm="1">
        <div class="text-right text-body-1">{{ computedRowSum }}</div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
/*

*/
import { mapState, mapActions } from "vuex";
//import { storeService } from "../services";

export default {
  name: "ShoppingCartListItem",
  props: {
    product: Object,
    amount: Number,
    modifiable: Boolean
  },
  data() {
    return {
      amountTextField: this.amount
    };
  },
  computed: {
    //...mapState("shoppingCart", ["productsInCart", "counter"]),
    ...mapState("account", ["user", "loggedIn"]),
    computedRowSum: {
      get() {
        var rowSum = (this.product.price * this.amount).toFixed(2);
        console.log(rowSum);
        return `${rowSum}${this.product.currencySymbol}`;
      }
    },
    minusButtonDisabled: {
      get() {
        if (this.amount > 1) {
          return false;
        } else {
          return true;
        }
      }
    },
    minusButtonDark: {
      get() {
        if (this.amount > 1) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  methods: {
    ...mapActions("account", ["addProduct", "decreaseAmountByValue"]),
    // increaseAmountByOne() {
    //   //this.amountTextField = this.amountTextField + 1;
    //   this.putInCart(this.product);
    // },
    // decreaseAmountByOne() {
    //   this.removeFromCart(this.product);
    // },
    putInCart() {
      var product = this.product;
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
          amount: 1
        });
      }
    },

    decreaseProductAmount(value) {
      var product = this.product;
      console.log(product);
      this.decreaseAmountByValue({
        email: this.user.email,
        product: product,
        amount: value
      });
    },

    printProduct() {
      console.log(this.product);
      console.log(this.amount);
    }
  }
};
</script>

<style></style>

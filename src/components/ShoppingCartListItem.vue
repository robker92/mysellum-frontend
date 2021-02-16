<template>
  <div>
    <v-row no-gutters height="60px" align="center">
      <v-col sm="1">
        <v-img :src="image" aspect-ratio="1.7" height="45px" width="45px">
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

      <v-col v-if="modifiable === true" sm="1">
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

      <v-col
        v-if="modifiable === false"
        cols="12"
        xs="1"
        sm="1"
        md="1"
        lg="1"
        xl="1"
      />

      <v-col sm="1">
        <div class="text-body-1">{{ this.amount }}x</div>
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

      <v-col
        v-if="modifiable === false"
        cols="12"
        xs="2"
        sm="2"
        md="2"
        lg="2"
        xl="2"
      />
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
import { storeService } from "../services";
//import { checkAuthentication } from "../helpers";

//import { addProductLoggedOut, removeProductLoggedOut } from "../helpers";
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
      amountTextField: this.amount,
      image: ""
    };
  },

  async mounted() {
    let productId = this.product._id;
    this.image = await storeService.getProductImage(
      this.product.storeId,
      productId
    );
  },

  computed: {
    //...mapState("shoppingCart", ["productsInCart", "counter"]),
    ...mapState("account", [
      "user",
      "loggedIn",
      "shoppingCart",
      "productCounter"
    ]),
    shoppingCartComputed: {
      get() {
        return this.shoppingCart;
      }
    },
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
    ...mapActions("account", [
      "addProduct",
      "removeProduct",
      "addProductLoggedOut",
      "removeProductLoggedOut"
    ]),
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),
    // increaseAmountByOne() {
    //   //this.amountTextField = this.amountTextField + 1;
    //   this.putInCart(this.product);
    // },
    // decreaseAmountByOne() {
    //   this.removeFromCart(this.product);
    // },
    async putInCart() {
      //var product = this.product;
      //if user loggedin -> Database; if not -> Local storage
      if (this.loggedIn === false) {
        this.addProductLoggedOut({
          product: this.product,
          quantity: 1
        });
        //User is not logged in
        //Check if shoppingCart in local storage already
        // var products = [];
        // var payload = [product, this.amountTextField];
        // //Check if cart already created in local storage and create new one if not
        // if (localStorage.getItem("cart") == null) {
        //   products[0] = payload;
        //   localStorage.setItem("cart", JSON.stringify(products));
        // } else {
        //   // Add to already existing cart
        //   var currentCart = JSON.parse(localStorage.getItem("cart"));
        //   //check if product already in cart
        //   var found = false;
        //   for (var i = 0; i < currentCart.length; i++) {
        //     if (product.id == currentCart[i][0].id) {
        //       //Product already in cart
        //       found = true;
        //       currentCart[i][1] =
        //         currentCart[i][1] + parseInt(this.amountTextField);
        //       localStorage.setItem("cart", JSON.stringify(currentCart));
        //       break;
        //     }
        //   }
        //   //Product not in cart
        //   if (found == false) {
        //     currentCart.push(payload);
        //     localStorage.setItem("cart", JSON.stringify(currentCart));
        //   }
        //}
      } else {
        //Logged In routine
        //try {
        this.addProduct({
          email: this.user.email,
          product: this.product,
          amount: 1
        });
        //} catch (error) {
        // if (checkAuthentication(error)) {
        //   //this.addErrorSnackbar("Error while adding product.");
        // }
        //}
      }
    },

    async decreaseProductAmount(value) {
      let product = this.product;
      if (this.loggedIn === false) {
        this.removeProductLoggedOut({
          product: product,
          quantity: value
        });
      } else {
        //try {
        await this.removeProduct({
          email: this.user.email,
          product: product,
          amount: value
        });
        // } catch (error) {
        //   if (checkAuthentication(error)) {
        //     this.addErrorSnackbar("Error while decreasing amount.");
        //   }
        // }
      }
    },

    printProduct() {
      console.log(this.product);
      console.log(this.amount);
    }
  }
};
</script>

<style></style>

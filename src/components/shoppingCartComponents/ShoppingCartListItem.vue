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
          :disabled="minusButtonDisabled"
          @click.stop="decreaseProductAmount(1)"
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
          x-small
          color="primary"
          :dark="plusButtonDark"
          :disabled="plusButtonDisabled"
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
import { productService } from "../../services";
//import { checkAuthentication } from "../helpers";

//import { addProductLoggedOut, removeProductLoggedOut } from "../helpers";
//import { storeService } from "../services";

export default {
  name: "ShoppingCartListItem",
  props: {
    product: Object,
    amount: Number,
    modifiable: Boolean,
  },

  data() {
    return {
      amountTextField: this.amount,
      image: "",
    };
  },

  async mounted() {
    let result;
    try {
      result = await productService.getProductImage(
        this.product.storeId,
        this.product._id
      );
    } catch (error) {
      console.log(error);
      this.addErrorSnackbar("An unexpected error has occurred, we are sorry.");
    }
    this.image = result.imgSrc;
  },

  computed: {
    //...mapState("shoppingCart", ["productsInCart", "counter"]),
    ...mapState("account", [
      "user",
      "loggedIn",
      "shoppingCart",
      "productCounter",
    ]),
    shoppingCartComputed: {
      get() {
        return this.shoppingCart;
      },
    },
    computedRowSum: {
      get() {
        var rowSum = (this.product.price * this.amount).toFixed(2);
        // console.log(rowSum);
        return `${rowSum}${this.product.currencySymbol}`;
      },
    },
    minusButtonDisabled: {
      get() {
        if (this.amount > 1) {
          return false;
        } else {
          return true;
        }
      },
    },
    minusButtonDark: {
      get() {
        if (this.amount > 1) {
          return true;
        } else {
          return false;
        }
      },
    },
    plusButtonDisabled: {
      get() {
        if (this.amount >= this.product.stockAmount) {
          return true;
        } else {
          return false;
        }
      },
    },
    plusButtonDark: {
      get() {
        if (this.amount >= this.product.stockAmount) {
          return false;
        } else {
          return true;
        }
      },
    },
  },
  methods: {
    ...mapActions("account", [
      "addProduct",
      "removeProduct",
      "addProductLoggedOut",
      "removeProductLoggedOut",
    ]),
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),
    async putInCart() {
      //var product = this.product;
      //if user loggedin -> Database; if not -> Local storage
      if (this.loggedIn === false) {
        this.addProductLoggedOut({
          product: this.product,
          quantity: 1,
        });
      } else {
        //Logged In routine
        this.addProduct({
          email: this.user.email,
          product: this.product,
          amount: 1,
        });
      }
    },

    async decreaseProductAmount(value) {
      let product = this.product;
      if (this.loggedIn === false) {
        this.removeProductLoggedOut({
          product: product,
          quantity: value,
        });
      } else {
        this.removeProduct({
          email: this.user.email,
          product: product,
          amount: value,
        });
      }
    },

    printProduct() {
      console.log(this.product);
      console.log(this.amount);
    },
  },
};
</script>

<style></style>

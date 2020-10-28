<template>
  <v-card width="250px" height="350px">
    <v-speed-dial
      v-if="modifiable"
      absolute
      top
      right
      v-model="fab"
      direction="left"
      :open-on-hover="false"
      transition="scale-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="pink" dark fab small>
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-dots-horizontal
          </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="orange" @click.stop="editProduct()">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" @click.stop="deleteProduct()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>

    <!-- <v-navigation-drawer stateless permanent floating right>
      <v-btn fab dark small color="red" @click.stop="deleteProduct()">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" @click.stop="deleteProduct()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-navigation-drawer> -->
    <!-- <template>
      <v-layout column top left absolute>
        <v-btn fab dark small color="red" @click.stop="deleteProduct()">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn fab dark small color="red" @click.stop="deleteProduct()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-layout>
    </template> -->

    <!-- <v-container absolute top right> class="fab-container"
      <v-btn fab dark small color="red" @click.stop="deleteProduct()">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" @click.stop="deleteProduct()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-container> -->

    <v-img height="150px" width="250px" :src="product.imgSrc"></v-img>

    <v-card-title>{{ product.title }}</v-card-title>
    <v-card-text>
      <div>
        {{ descriptionComputed }}
      </div>
      <!-- <v-divider class="mx-2"></v-divider> -->
      <!-- <v-card-title class="text-right"
      >{{ product.price }} {{ product.currencySymbol }}</v-card-title
    > -->
    </v-card-text>
    <p class="text-right mx-2">
      {{ product.price }}{{ product.currencySymbol }}
    </p>

    <!-- <v-row>
        <v-col cols="12" lg="2">
          <v-btn
            class="mx-2"
            fab
            dark
            x-small
            color="indigo"
            @click.stop="decreaseAmountByOne()"
          >
            <v-icon dark>mdi-minus</v-icon>
          </v-btn></v-col
        >
        <v-col cols="12" lg="2"> {{ this.amountTextField }} </v-col>
        <v-col cols="12" lg="2">
          <v-btn
            class="mx-2"
            fab
            dark
            x-small
            color="indigo"
            @click.stop="increaseAmountByOne()"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn></v-col
        >
        <v-col lg="1">
          <v-btn small @click.stop="putInCart(product)">Add to bag</v-btn>
        </v-col>
      </v-row> class="mx-2"-->

    <!--     <v-row>
      <v-col cols="12" lg="2">
        <v-btn
          fab
          dark
          x-small
          color="indigo"
          @click.stop="decreaseAmountByOne()"
        >
          <v-icon dark>mdi-minus</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" lg="2">
        {{ this.amountTextField }}
      </v-col>
      <v-col cols="12" lg="2">
        <v-btn
          fab
          dark
          x-small
          color="indigo"
          @click.stop="increaseAmountByOne()"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" lg="2">
        <v-btn small @click.stop="putInCart(product)">To bag</v-btn>
      </v-col>
    </v-row> -->

    <v-row>
      <v-btn
        class="ml-7 mr-2 mb-2"
        fab
        dark
        x-small
        color="indigo"
        @click.stop="decreaseAmountByOne()"
      >
        <v-icon dark>mdi-minus</v-icon>
      </v-btn>
      <div class="ml-2 mb-2">
        {{ this.amountTextField }}
      </div>
      <v-btn
        class="ml-3 mr-2 mb-2"
        fab
        dark
        x-small
        color="indigo"
        @click.stop="increaseAmountByOne()"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <v-btn class="mx-2" small @click.stop="putInCart(product)">To bag</v-btn>
    </v-row>
  </v-card>
</template>

<script>
/*

*/
import { mapState, mapActions } from "vuex";
import { storeService } from "../services";

export default {
  name: "StoreProfileListItem",
  props: {
    product: Object,
    modifiable: Boolean
  },
  data() {
    return {
      amountTextField: 1,
      fab: false
    };
  },
  computed: {
    //...mapState("shoppingCart", ["productsInCart", "counter"]),
    ...mapState("account", ["user", "loggedIn"]),
    descriptionComputed: {
      get() {
        if (this.product.quantityType == "Kilograms") {
          return `${this.product.description}, ${this.product.quantityValue}kg (1kg = ${this.pricePerKilogramComputed}€)`;
        } else if (this.product.quantityType == "Grams") {
          return `${this.product.description}, ${this.product.quantityValue}g (100g = ${this.pricePerGramComputed}€)`;
        } else if (this.product.quantityType == "Pieces") {
          let suffix = this.product.quantityValue == "1" ? "" : "s";
          return `${this.product.description}, ${this.product.quantityValue} piece${suffix}`;
        } else {
          return this.product.description;
        }
      }
    },
    pricePerKilogramComputed: {
      get() {
        return (this.product.price / this.product.quantityValue).toFixed(2);
      }
    },
    pricePerGramComputed: {
      get() {
        var pricePerGram = (
          (100 * this.product.price) /
          this.product.quantityValue
        ).toFixed(2);
        return pricePerGram;
      }
    }
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
          amount: this.amountTextField
        });
      }
    },

    deleteProduct: async function() {
      var data = {
        storeId: this.$route.params.id,
        productId: this.product.productId
      };
      this.$emit("overlay-start");
      var response = await storeService.deleteProduct(data);
      console.log(response);
      this.$emit("delete-product", this.product.productId);
      this.$emit("overlay-end");
    },

    editProduct() {
      this.$emit("edit-product", this.product);
    }
  }
};
</script>

<style>
.fab-container {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>

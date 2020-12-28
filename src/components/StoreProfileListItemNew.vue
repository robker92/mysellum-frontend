<template>
  <div>
    <v-card :disabled="cardDisabled">
      <v-speed-dial
        v-if="modifiable"
        absolute
        top
        right
        v-model="fab"
        direction="left"
        :open-on-hover="true"
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
    </v-container>width="250px" -->

      <v-img height="150px" :src="product.imgSrc" class="rounded-t"></v-img>

      <v-card-title>
        <div>
          {{ product.title }}
        </div>
        <!--       <div class="text-right">
        <v-rating
          background-color="orange lighten-3"
          :value="4"
          color="orange"
          dense
          size="14"
          half-increments
          readonly
        />
      </div> -->
      </v-card-title>

      <!-- v-model="avgRatingComputed"-->
      <v-card-text>
        <div class="text-left text-body-1">
          {{ descriptionComputed }}
        </div>
        <!-- <v-divider class="mx-2"></v-divider> -->
        <!-- <v-card-title class="text-right"
      >{{ product.price }} {{ product.currencySymbol }}</v-card-title
    > -->
        <div class="text-right black--text text-body-1 font-weight-bold">
          {{ product.price }}{{ product.currencySymbol }}
        </div>
        <div class="text-right grey--text text-caption">
          plus shipping costs
        </div>
        <div class="text-right text-body-2">
          <div :class="stockStatusColor + '--text'">
            {{ stockStatusLabel }}
          </div>
        </div>
        <!--       <div class="text-right warning--text text-body-2">
        only few left
      </div>
      <div class="text-right error--text text-body-2">
        out of stock
      </div> -->
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
        <!-- <v-card v-if="modifiable == false" flat>
        <v-row align="center" class="mt-3" justify="center">
          <v-btn
            class="ml-3 mr-2"
            width="45"
            dark
            small
            color="indigo"
            @click.stop="decreaseAmountByOne()"
          >
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
          <div class="mx-2 text-body-1 font-weight-bold" width="40px">
            {{ this.amountTextField }}
          </div>
          <v-btn
            class="ml-3 mr-2"
            width="45"
            dark
            small
            color="indigo"
            @click.stop="increaseAmountByOne()"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn
            class="mr-3"
            width="45"
            small
            @click.stop="putInCart(product)"
            color="pink"
            dark
          >
            <v-icon>mdi-cart-plus</v-icon>
          </v-btn>
        </v-row>
      </v-card> -->
        <!--       <v-card v-if="modifiable == false" flat class="mt-5">
        <v-select :items="quantityItems" label="Quantity" dense>
          <template v-slot:append-outer>
            <v-btn
              class="mr-3"
              small
              fab
              @click.stop="putInCart(product)"
              color="pink"
              dark
            >
              <v-icon>mdi-cart-plus</v-icon>
            </v-btn>
          </template>
        </v-select>
      </v-card> -->
        <v-card v-if="modifiable === false" flat class="mt-5">
          <v-row class="mt-3" no-gutters>
            <v-col cols="12" xs="5" sm="9" md="9" lg="9" xl="9">
              <v-combobox
                :items="quantityItemsComputed"
                v-model="productQuantity"
                label="Quantity"
                required
                :error-messages="quantityErrors"
                @input="$v.quantity.$touch()"
                @blur="$v.quantity.$touch()"
                dense
              ></v-combobox>
            </v-col>
            <v-col cols="12" xs="3" sm="1" md="1" lg="1" xl="1">
              <v-btn
                class="mx-3"
                x-small
                fab
                @click.stop="putInCart(product)"
                :disabled="putInCartButtonDisabled"
                color="pink"
                :dark="putInCartButtonDark"
              >
                <v-icon>mdi-cart-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <div v-else>
          <v-divider />
          <div class="text-left black--text text-body-1 mt-3">
            In Stock: <b>{{ product.stockAmount || 0 }}</b> units
          </div>
          <!-- <v-row>
          <v-btn
            class=""
            width="40"
            x-small
            dark
            color="blue-grey darken-1"
            @click.stop="increaseStock(1)"
          >
            +1
          </v-btn>
          <v-btn
            class="ml-1"
            width="40"
            dark
            x-small
            color="grey darken-3"
            @click.stop="increaseStock(5)"
          >
            +5
          </v-btn>
          <v-btn
            class="ml-1"
            width="40"
            dark
            x-small
            color="green lighten-1"
            @click.stop="increaseStock(10)"
          >
            +10
          </v-btn>
          <v-btn
            class="ml-1"
            width="40"
            dark
            x-small
            color="green lighten-1"
            @click.stop="increaseStock(50)"
          >
            +50
          </v-btn>
          <v-btn
            class="ml-1"
            width="40"
            dark
            x-small
            color="green lighten-1"
            @click.stop="increaseStock(100)"
          >
            +100
          </v-btn>
        </v-row>
        <v-row>
          <v-btn
            class="mt-1"
            width="40"
            dark
            x-small
            color="blue-grey lighten-2"
            @click.stop="decreaseStock(1)"
          >
            -1
          </v-btn>
          <v-btn
            class="ml-1 mt-1"
            width="40"
            dark
            x-small
            color="grey darken-1"
            @click.stop="decreaseStock(5)"
          >
            -5
          </v-btn>
          <v-btn
            class="ml-1 mt-1"
            width="40"
            dark
            x-small
            color="red lighten-1"
            @click.stop="decreaseStock(10)"
          >
            -10
          </v-btn>
          <v-btn
            class="ml-1 mt-1"
            width="40"
            dark
            x-small
            color="red lighten-1"
            @click.stop="decreaseStock(50)"
          >
            -50
          </v-btn>
          <v-btn
            class="ml-1 mt-1"
            width="40"
            dark
            x-small
            color="red lighten-1"
            @click.stop="decreaseStock(100)"
          >
            -100
          </v-btn>
        </v-row> -->
          <div>
            <v-text-field
              v-model="stockAmount"
              label="Update Stock"
              type="number"
              @keyup.enter="updateStock()"
              ><template v-slot:append-outer>
                <v-btn icon @click="updateStock()">
                  <v-icon color="primary">mdi-content-save</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <div v-if="cardDisabled" id="notificationButtonDiv">
      <v-tooltip bottom nudge-top="5px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark small color="primary" class="" v-bind="attrs" v-on="on">
            <v-icon>mdi-email</v-icon>
          </v-btn>
        </template>
        <span>Get a notification when the product is available again</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
/*

*/
import { mapState, mapActions } from "vuex";
import { storeService } from "../services";
//import { addProductLoggedOut } from "../helpers";

//import { required, maxLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

//Custom validation
function quantityNotInStock(value) {
  if (this.product.stockAmount < this.productQuantity) {
    return this.other.nested.field.contains(value);
  }
}

export default {
  name: "StoreProfileListItem",

  mixins: [validationMixin],

  validations: {
    quantity: { quantityNotInStock }
  },

  props: {
    product: Object,
    modifiable: Boolean
  },

  data() {
    return {
      amountTextField: 1,
      fab: false,
      stockAmount: "",
      productQuantity: parseInt(this.product.stockAmount) <= 0 ? 0 : 1
      // quantityItems: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      // quantityItems2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },

  computed: {
    //...mapState("shoppingCart", ["productsInCart", "counter"]),
    ...mapState("account", [
      "user",
      "loggedIn",
      "shoppingCart",
      "productCounter"
    ]),
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
    },
    stockStatusLabel: {
      get() {
        if (parseInt(this.product.stockAmount) >= 10) {
          return "available";
        } else if (parseInt(this.product.stockAmount) > 0) {
          return "only few left";
        } else {
          console.log(this.product.stockAmount);
          console.log(parseInt(this.product.stockAmount));
          return "out of stock";
        }
      }
    },
    stockStatusColor: {
      get() {
        if (parseInt(this.product.stockAmount) >= 10) {
          return "success";
        } else if (parseInt(this.product.stockAmount) > 0) {
          return "warning";
        } else {
          return "error";
        }
      }
    },
    cardDisabled: {
      //disables the complete card when product is out of stock (only for non store owner)
      get() {
        if (this.modifiable === false) {
          if (parseInt(this.product.stockAmount) <= 0) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    },
    putInCartButtonDisabled: {
      get() {
        if (this.product.stockAmount < this.productQuantity) {
          return true;
        } else {
          return false;
        }
      }
    },
    putInCartButtonDark: {
      get() {
        if (this.product.stockAmount < this.productQuantity) {
          return false;
        } else {
          return true;
        }
      }
    },
    quantityItemsComputed: {
      get() {
        let arr = [];
        for (let index = 1; index <= this.product.stockAmount; index++) {
          if (index <= 10) {
            arr.push(index);
          }
          if ((index > 20) & (index < 50)) {
            arr.push(20);
          }
          if ((index > 50) & (index < 100)) {
            arr.push(50);
          }
          if (index > 100) {
            arr.push(100);
            break;
          }
        }
        return arr;
      }
    },
    quantityErrors: {
      get() {
        const errors = [];
        if (this.product.stockAmount < this.productQuantity) {
          errors.push("Quantity not in stock!");
          return errors;
        }
        return errors;
      }
    }
  },
  methods: {
    ...mapActions("account", ["addProduct", "addProductLoggedOut"]),
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),
    increaseAmountByOne() {
      this.amountTextField = this.amountTextField + 1;
    },
    decreaseAmountByOne() {
      if (this.amountTextField > 1) {
        this.amountTextField = this.amountTextField - 1;
      }
    },
    async putInCart(product) {
      //if user loggedin -> Database; if not -> Local storage
      if (this.loggedIn == false) {
        console.log(this.productQuantity);
        this.addProductLoggedOut({
          product: product,
          quantity: parseInt(this.productQuantity),
          currentCart: this.shoppingCart
        });
        //User is not logged in
        //Check if shoppingCart in local storage already
        // let payload = [product, parseInt(this.productQuantity)];
        // //Check if cart already created in local storage and create new one if not
        // if (localStorage.getItem("cart") == null) {
        //   let products = [];
        //   products[0] = payload;
        //   localStorage.setItem("cart", JSON.stringify(products));
        // } else {
        //   // Add to already existing cart
        //   let currentCart = JSON.parse(localStorage.getItem("cart"));
        //   //let currentCart2 = vuexObjct.account.shoppingCart;
        //   //check if product already in cart
        //   let found = false;
        //   for (let i = 0; i < currentCart.length; i++) {
        //     if (product.id === currentCart[i][0].id) {
        //       //Product already in cart
        //       found = true;
        //       currentCart[i][1] =
        //         currentCart[i][1] + parseInt(this.productQuantity);
        //       localStorage.setItem("cart", JSON.stringify(currentCart));
        //       break;
        //     }
        //   }
        //   //Product not in cart
        //   if (found == false) {
        //     currentCart.push(payload);
        //     localStorage.setItem("cart", JSON.stringify(currentCart));
        //   }
        // }
      } else {
        //Logged In routine
        //try {
        this.addProduct({
          email: this.user.email,
          product: product,
          amount: this.productQuantity
        });
        // } catch (error) {
        //   this.addErrorSnackbar("Error while adding product.");
        // }
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
    },

    increaseStock(amount) {
      console.log(amount);
    },

    decreaseStock(amount) {
      console.log(amount);
    },

    updateStock: async function() {
      var data = {
        storeId: this.$route.params.id,
        productId: this.product.productId,
        stockAmount: parseInt(this.stockAmount)
      };
      this.$emit("overlay-start");
      var response = await storeService.updateStockAmount(data);
      console.log(response);
      this.$emit("update-stock", this.product.productId, this.stockAmount);
      this.$emit("overlay-end");
      this.stockAmount = "";
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

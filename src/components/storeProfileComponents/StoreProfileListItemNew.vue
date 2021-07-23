<template>
  <div>
    <ProductAvailabilityNotificationDialog
      v-model="showProductAvailabilityNotificationDialog"
      :product-id="product._id"
      :store-id="product.storeId"
    />
    <v-card :disabled="cardDisabled">
      <v-speed-dial
        v-if="modifiable"
        v-model="fab"
        absolute
        top
        right
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

      <v-img height="150px" :src="product.imgSrc" class="rounded-t"></v-img>

      <v-card-title>
        {{ product.title }}
      </v-card-title>

      <!-- v-model="avgRatingComputed"-->
      <v-card-text>
        <div class="text-left text-body-1 text-justify">
          {{ descriptionComputed }}
        </div>
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
        <!-- <v-card v-if="modifiable === false" flat class="mt-3"> -->
        <div v-if="modifiable === false" class="mt-3">
          <v-row class="mt-2" no-gutters>
            <v-col cols="12" xs="10" sm="8" md="7" lg="9" xl="9">
              <v-combobox
                v-model="productQuantity"
                :items="quantityItemsComputed"
                label="Quantity"
                required
                :error-messages="quantityErrors"
                dense
                @input="$v.quantity.$touch()"
                @blur="$v.quantity.$touch()"
              ></v-combobox>
            </v-col>
            <v-col cols="12" xs="2" sm="4" md="3" lg="1" xl="1">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    class="mx-3"
                    :disabled="putInCartButtonDisabled"
                    small
                    color="primary"
                    :dark="putInCartButtonDark"
                    v-on="on"
                    @click.stop="putInCart(product)"
                  >
                    <v-icon>mdi-cart-plus</v-icon>
                  </v-btn>
                </template>
                <span>Add to shopping cart</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <!-- </v-card> -->
        </div>
        <div v-else>
          <v-divider />
          <div class="text-left black--text text-body-1 mt-3">
            In Stock: <b>{{ product.stockAmount || 0 }}</b> units
          </div>
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
          <v-btn
            dark
            small
            color="primary"
            class=""
            v-bind="attrs"
            v-on="on"
            @click="showProductAvailabilityNotificationDialog = true"
          >
            <v-icon>mdi-email</v-icon>
          </v-btn>
        </template>
        <span>Get a notification when the product is available again</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { productService } from "../../services";
import { validationMixin } from "vuelidate";
import ProductAvailabilityNotificationDialog from "./ProductAvailabilityNotificationDialog";

//Custom validation
function quantityNotInStock(value) {
  if (this.product.stockAmount < this.productQuantity) {
    return this.other.nested.field.contains(value);
  }
}

export default {
  name: "StoreProfileListItem",

  components: {
    ProductAvailabilityNotificationDialog: ProductAvailabilityNotificationDialog,
  },

  mixins: [validationMixin],

  validations: {
    quantity: { quantityNotInStock },
  },

  props: {
    product: Object,
    modifiable: Boolean,
  },

  data() {
    return {
      amountTextField: 1,
      fab: false,
      stockAmount: "",
      productQuantity: parseInt(this.product.stockAmount) <= 0 ? 0 : 1, //parseInt(this.product.stockAmount) <= 0 ? 0 : 1,
      showProductAvailabilityNotificationDialog: false,
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
      "productCounter",
    ]),
    descriptionComputed: {
      get() {
        if (this.product.quantityType === "Kilograms") {
          return `${this.product.description}, ${this.product.quantityValue}kg (1kg = ${this.pricePerKilogramComputed}€)`;
        } else if (this.product.quantityType === "Grams") {
          return `${this.product.description}, ${this.product.quantityValue}g (100g = ${this.pricePerGramComputed}€)`;
        } else if (this.product.quantityType === "Pieces") {
          let suffix = this.product.quantityValue === "1" ? "" : "s";
          return `${this.product.description}, ${this.product.quantityValue} piece${suffix}`;
        } else {
          return this.product.description;
        }
      },
    },
    pricePerKilogramComputed: {
      get() {
        return (this.product.price / this.product.quantityValue).toFixed(2);
      },
    },
    pricePerGramComputed: {
      get() {
        var pricePerGram = (
          (100 * this.product.price) /
          this.product.quantityValue
        ).toFixed(2);
        return pricePerGram;
      },
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
      },
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
      },
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
      },
    },
    putInCartButtonDisabled: {
      get() {
        if (this.product.stockAmount < this.productQuantity) {
          return true;
        } else {
          return false;
        }
      },
    },
    putInCartButtonDark: {
      get() {
        if (this.product.stockAmount < this.productQuantity) {
          return false;
        } else {
          return true;
        }
      },
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
      },
    },
    quantityErrors: {
      get() {
        const errors = [];
        if (this.product.stockAmount < this.productQuantity) {
          errors.push("Quantity not in stock!");
          return errors;
        }
        return errors;
      },
    },
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
        //console.log(product);
        this.addProductLoggedOut({
          product: product,
          quantity: parseInt(this.productQuantity),
          currentCart: this.shoppingCart,
        });
      } else {
        //Logged In routine
        this.addProduct({
          email: this.user.email,
          product: product,
          amount: this.productQuantity,
        });
      }
    },

    deleteProduct: async function() {
      let data = {
        storeId: this.$route.params.id,
        productId: this.product._id,
      };
      console.log(data);
      this.$emit("overlay-start");
      let response = await productService.deleteProduct(data);
      console.log(response);
      this.$emit("delete-product", this.product._id);
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
        _id: this.product._id,
        stockAmount: parseInt(this.stockAmount),
      };
      this.$emit("overlay-start");
      try {
        await productService.updateStockAmount(data);
      } catch (error) {
        this.$emit("overlay-end");
        this.addErrorSnackbar("Stock update was not successful.");
        return;
      }
      //console.log(response);
      this.$emit("update-stock", this.product._id, this.stockAmount);
      this.$emit("overlay-end");
      this.addSuccessSnackbar("Stock update was successful.");
      this.stockAmount = "";
    },
    print() {
      console.log(this.productQuantity);
      console.log(this.product.stockAmount);
      console.log(this.stockAmount);
      console.log(this.quantityItemsComputed);
    },
  },
};
</script>

<style>
.fab-container {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>

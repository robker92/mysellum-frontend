<template>
  <v-dialog
    v-model="show"
    max-width="90%"
    max-height="90%"
    @click:outside="cancel"
  >
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>{{ product.title }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title>
        <!-- <div class="text-h4 black--text">
          {{ product.title }}
        </div> -->
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
            <v-img :src="product.imgSrc" />
          </v-col>
          <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
            <div class="text-h5 text-left black--text">
              {{ $t("storeProfile.productDetailDialog.shortDescHeadline") }}:
            </div>
            <div class="text-left black--text">
              {{ product.description }}
            </div>
            <div class="text-h5 text-left black--text mt-5">
              {{ $t("storeProfile.productDetailDialog.longDescHeadline") }}:
            </div>
            <div class="text-left black--text">
              {{ product.longDescription }}
            </div>
            <!-- <div class="text-h5 text-left black--text mt-5">
              Ingredients:
            </div>
            <div class="text-left black--text">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </div> -->
            <div class="text-h5 text-left black--text mt-5">
              {{ $t("storeProfile.productDetailDialog.quantityHeadline") }}:
            </div>
            <div class="text-left black--text">
              {{ quantityDescriptionComputed }}
            </div>

            <v-spacer />

            <v-row class="mt-3 mr-1">
              <v-spacer />
              <v-tooltip v-if="product.pickup === true" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="primary" class="mr-1" v-bind="attrs" v-on="on"
                    >mdi-hand-heart
                  </v-icon>
                </template>
                <span>
                  {{ $t("storeProfile.productDetailDialog.pickupTooltip") }}
                </span>
              </v-tooltip>
              <v-tooltip v-if="product.delivery === true" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="primary" large v-bind="attrs" v-on="on">
                    mdi-truck-delivery
                  </v-icon>
                </template>
                <span>
                  {{ $t("storeProfile.productDetailDialog.deliveryTooltip") }}
                </span>
              </v-tooltip>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6"> </v-col>
              <v-col>
                <div
                  class="text-right black--text text-body-1 font-weight-bold"
                >
                  {{ product.price }}{{ product.currencySymbol }}
                </div>
                <div class="text-right grey--text text-caption">
                  {{ $t("storeProfile.productDetailDialog.taxDeliveryLabel") }}
                </div>
                <div class="text-right text-body-2">
                  <div :class="stockStatusColor + '--text'">
                    {{ stockStatusLabel }}
                  </div>
                </div>
                <div v-if="modifiable === false" class="mt-3">
                  <v-row class="mt-6 mr-0 text-right" no-gutters>
                    <v-col cols="12" sm="4" md="4" lg="4"> </v-col>
                    <v-col cols="12" sm="5" md="5" lg="5">
                      <v-combobox
                        v-model="productQuantity"
                        :items="quantityItemsComputed"
                        :label="
                          $t(
                            'storeProfile.productDetailDialog.addToCartTooltip'
                          )
                        "
                        required
                        :error-messages="quantityErrors"
                        dense
                        @input="$v.quantity.$touch()"
                        @blur="$v.quantity.$touch()"
                      />
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            class="ml-3"
                            :disabled="putInCartButtonDisabled"
                            small
                            color="primary"
                            :dark="putInCartButtonDark"
                            v-on="on"
                            @click.stop="putInCart()"
                          >
                            <v-icon>mdi-cart-plus</v-icon>
                          </v-btn>
                        </template>
                        <span>
                          {{
                            $t(
                              "storeProfile.productDetailDialog.addToCartTooltip"
                            )
                          }}
                        </span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </div>
                <div v-else>
                  <v-divider />
                  <div
                    class="text-left black--text text-body-1 mt-3 mouse-pointer"
                  >
                    {{ $t("storeProfile.productDetailDialog.inStockLabel1") }}:
                    <b>{{ product.stockAmount || 0 }}</b>
                    {{ $t("storeProfile.productDetailDialog.inStockLabel2") }}
                  </div>
                  <v-row class="mt-2" no-gutters>
                    <v-col
                      cols="12"
                      sm="0"
                      md="0"
                      lg="0"
                      class="mouse-pointer"
                    />
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <v-text-field
                        v-model="stockAmount"
                        :placeholder="
                          $t(
                            'storeProfile.productDetailDialog.updateStockPlaceholder'
                          )
                        "
                        :label="
                          $t(
                            'storeProfile.productDetailDialog.updateStockLabel'
                          )
                        "
                        type="number"
                        @keyup.enter="updateStock()"
                      >
                        <template v-slot:append-outer>
                          <v-btn icon @click="updateStock()">
                            <v-icon color="primary">mdi-content-save</v-icon>
                          </v-btn>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="cancel">Close</v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
import { productService } from "../../services";
import { mapState, mapActions } from "vuex";
import { validationMixin } from "vuelidate";

//Custom validation
function quantityNotInStock(value) {
  if (this.product.stockAmount < this.productQuantity) {
    return this.other.nested.field.contains(value);
  }
}

export default {
  name: "StoreProfileProductDetailDialogComponent",
  components: {},
  mixins: [validationMixin],
  props: {
    value: Boolean,
    product: Object,
    modifiable: Boolean,
  },
  data() {
    return {
      productQuantity: parseInt(this.product.stockAmount) <= 0 ? 0 : 1,
      stockAmount: "",
    };
  },
  validations: {
    quantity: { quantityNotInStock },
  },
  computed: {
    ...mapState("account", [
      "loggedIn",
      "user",
      "shoppingCart",
      "productCounter",
    ]),

    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },

    quantityDescriptionComputed: {
      get() {
        if (this.product.quantityType === "Kilograms") {
          return `${this.product.quantityValue}kg (1kg = ${this.pricePerKilogramComputed}€)`;
        } else if (this.product.quantityType === "Grams") {
          return `${this.product.quantityValue}g (100g = ${this.pricePerGramComputed}€)`;
        } else if (this.product.quantityType === "Pieces") {
          let suffix = this.product.quantityValue === "1" ? "" : "s";
          return `${this.product.quantityValue} piece${suffix}`;
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
          return this.$t("storeProfile.availableStatusLabel");
        } else if (parseInt(this.product.stockAmount) > 0) {
          return this.$t("storeProfile.fewInStockStatusLabel");
        } else {
          // console.log(this.product.stockAmount);
          // console.log(parseInt(this.product.stockAmount));
          return this.$t("storeProfile.outOfStockStatusLabel");
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
    putInCartButtonDark: {
      get() {
        if (this.product.stockAmount < this.productQuantity) {
          return false;
        } else {
          return true;
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

  watch: {},

  methods: {
    ...mapActions("account", ["addProduct", "addProductLoggedOut"]),
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    async putInCart() {
      // if user loggedin -> Database; if not -> Local storage
      if (this.loggedIn == false) {
        try {
          this.addProductLoggedOut({
            product: this.product,
            quantity: parseInt(this.productQuantity),
            currentCart: this.shoppingCart,
          });
        } catch (error) {
          console.log(error);
          this.addErrorSnackbar(
            "Error while adding product to the shopping cart."
          );
          return;
        }
        this.addSuccessSnackbar("Product added to cart.");
      } else {
        // Logged In routine
        console.log(this.user);
        try {
          this.addProduct({
            email: this.user.email,
            product: this.product,
            amount: this.productQuantity,
          });
        } catch (error) {
          console.log(error);
          this.addErrorSnackbar(
            "Error while adding product to the shopping cart."
          );
          return;
        }
        this.addSuccessSnackbar("Product added to cart.");
      }
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

    cancel() {
      //   this.$v.$reset();
      this.show = false;
    },
  },
};
</script>

<style></style>

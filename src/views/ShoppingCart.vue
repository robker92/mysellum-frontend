<template>
  <div id="cartViewDiv">
    <v-overlay v-model="overlay">
      <v-progress-circular indeterminate size="128"></v-progress-circular>
    </v-overlay>
    <LoginDialog v-model="showLoginDialog" />

    <v-container v-if="shoppingCart">
      <v-stepper v-model="e1" flat>
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1" editable>
            Your Shopping Cart
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2" :editable="step2Editable">
            Checkout
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3" :editable="step3Editable">
            Final Overview
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card flat min-height="500">
              <v-container v-if="shoppingCart">
                <div class="text-h5 text-left font-weight-medium mb-5">
                  Your Shopping Cart
                </div>
                <div
                  v-if="shoppingCart.length == 0"
                  class="text-left text-body-1 mb-5"
                >
                  <v-alert text dense type="warning" border="left">
                    You did not add any products to your shopping cart.
                  </v-alert>
                </div>

                <v-row
                  v-if="shoppingCart.length > 0"
                  no-gutters
                  height="60px"
                  align="center"
                >
                  <v-col sm="7"> </v-col>
                  <v-col sm="1">
                    <div class="text-center font-weight-bold">
                      Quantity
                    </div>
                  </v-col>
                  <v-col sm="2"> </v-col>
                  <v-col sm="1">
                    <div class="text-center font-weight-bold">
                      Price
                    </div>
                  </v-col>
                  <v-col sm="1">
                    <div class="text-center font-weight-bold">
                      Total
                    </div>
                  </v-col>
                </v-row>

                <div v-if="shoppingCart.length > 0">
                  <ShoppingCartListItem
                    v-for="(prod, index) in shoppingCart"
                    :key="index"
                    :product="prod[0]"
                    :amount="prod[1]"
                    :modifiable="true"
                    class="my-3"
                  />
                </div>

                <div v-if="loadedCart.length > 0">
                  <v-divider />
                  <div class="text-left text-h5 my-3">
                    Loaded Cart:
                  </div>
                  <v-alert text dense type="info" border="left">
                    <v-row align="center">
                      <v-col class="grow text-left">
                        We loaded your shopping cart from your last session. Do
                        you want to merge the cart from your last session with
                        your current shopping cart?
                      </v-col>
                      <v-col class="shrink">
                        <v-btn color="primary" @click="mergeProcedure()">
                          <v-icon left>mdi-merge</v-icon>
                          Merge
                        </v-btn>
                      </v-col>
                      <v-col class="shrink">
                        <v-btn color="orange" @click="abortMerge()">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-alert>
                  <ShoppingCartListItem
                    v-for="(prod, index) in loadedCart"
                    :key="index"
                    :product="prod[0]"
                    :amount="prod[1]"
                    :modifiable="false"
                    class="my-3"
                  />
                </div>

                <v-divider />
                <v-row
                  v-if="shoppingCart.length > 0"
                  no-gutters
                  height="60px"
                  class="mt-2"
                >
                  <v-col cols="12" sm="2" offset-sm="9" offset-md="9">
                    <div class="text-left text-body-1">Shipping costs:</div>
                  </v-col>
                  <v-col cols="12" sm="1">
                    <div class="text-right text-body-1">
                      {{ shippingCosts }}€
                    </div>
                  </v-col>
                </v-row>

                <v-row v-if="shoppingCart.length > 0" no-gutters height="60px">
                  <v-col cols="12" sm="2" offset-sm="9" offset-md="9">
                    <div class="text-left text-body-1">Total costs:</div>
                  </v-col>
                  <v-col cols="12" sm="1">
                    <div class="text-right text-body-1">
                      {{ computedTotalSum }}€
                    </div>
                  </v-col>
                </v-row>
                <v-row v-if="shoppingCart.length > 0" no-gutters height="60px">
                  <v-spacer />
                  <div class="text-caption text-right">
                    incl. VAT
                  </div>
                </v-row>

                <v-row
                  v-if="
                    shoppingCart.length > 0 &&
                      deliveryAvailable === false &&
                      pickupAvailable === false
                  "
                >
                  <div class="mt-5">
                    <v-alert type="info" text dense class="text-left">
                      Unfortunately, the product combination you have chosen
                      cannot be processed. Make sure that all products in your
                      shopping cart are available for either delivery or
                      collection.
                    </v-alert>
                  </div>
                </v-row>

                <v-card-actions class="mt-3">
                  <v-spacer />
                  <v-btn
                    color="primary"
                    :disabled="goToCheckoutDisabled"
                    @click="goToStep2"
                  >
                    To Checkout
                  </v-btn>
                </v-card-actions>
              </v-container>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <ShoppingCartCheckout
              :delivery-available="deliveryAvailable"
              :pickup-available="pickupAvailable"
              @step2-continue-button="continueButtonStep2"
              @go-to-step3="goToStep3"
              @go-back="e1 = e1 - 1"
            />
          </v-stepper-content>

          <v-stepper-content step="3">
            <ShoppingCartFinalOverview
              :computed-total-sum="computedTotalSum"
              :shipping-costs="shippingCosts"
              @paypal-order-successful="paypalOrderCreated"
              @overlay-start="setOverlay(true)"
              @overlay-end="setOverlay(false)"
              @go-back="e1 = e1 - 1"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
</template>

<script>
import { calculateTotalCartSum, shoppingCartMerge } from "../helpers";
import { mapState, mapActions } from "vuex";
import ShoppingCartListItem from "../components/shoppingCartComponents/ShoppingCartListItem";
import ShoppingCartCheckout from "../components/shoppingCartComponents/ShoppingCartCheckout";
import ShoppingCartFinalOverview from "../components/shoppingCartComponents/ShoppingCartFinalOverview";
import LoginDialog from "../components/LoginDialog";

import { orderService } from "../services";

export default {
  name: "ShoppingCartView",

  components: {
    ShoppingCartListItem,
    ShoppingCartCheckout,
    ShoppingCartFinalOverview,
    LoginDialog,
  },

  data() {
    return {
      mapData: null,
      e1: 1,
      step2Editable: false,
      step3Editable: false,
      step2ContinueDisabled: true,

      showLoginDialog: false,

      overlay: false,
    };
  },

  async mounted() {
    console.log(this.shoppingCart);
    console.log(typeof this.shippingCosts);
    console.log(this.loggedIn);
  },

  computed: {
    ...mapState("order", ["orderData"]),
    ...mapState("account", [
      "user",
      "loggedIn",
      "shoppingCart",
      "shippingCosts",
      "loadedCart",
      "productCounter",
    ]),
    computedTotalSum: {
      get() {
        return (
          parseFloat(calculateTotalCartSum(this.shoppingCart)) +
          parseFloat(this.shippingCosts)
        ).toFixed(2);
      },
    },

    deliveryAvailable: {
      get() {
        if (this.shoppingCart) {
          for (var i = 0; i < this.shoppingCart.length; i++) {
            if (this.shoppingCart[i][0].delivery === false) {
              return false;
            }
          }
          return true;
        }
        return false;
      },
    },

    pickupAvailable: {
      get() {
        if (this.shoppingCart) {
          for (var i = 0; i < this.shoppingCart.length; i++) {
            if (this.shoppingCart[i][0].pickup === false) {
              return false;
            }
          }
          return true;
        }
        return false;
      },
    },

    goToCheckoutDisabled: {
      get() {
        // check if at least one item is in shopping cart
        if (this.shoppingCart.length === 0) {
          return true;
        }

        // check if at least delivery or pickup is available
        if (
          this.pickupAvailable === false &&
          this.deliveryAvailable === false
        ) {
          return true;
        }

        return false;
      },
    },
  },

  methods: {
    ...mapActions("account", [
      "mergeCarts",
      "undoMerge",
      "updateCart",
      "emptyLoadedCart",
      "emptyShoppingCart",
    ]),
    ...mapActions("snackbar", [
      "addSuccessSnackbar",
      "addInfoSnackbar",
      "addErrorSnackbar",
    ]),

    goToStep2() {
      if (this.loggedIn === false) {
        this.addInfoSnackbar("You need to login before you can continue.");
        this.showLoginDialog = true;
        return;
      }
      this.e1 = 2;
      this.step2Editable = true;
    },

    goToStep3() {
      this.e1 = 3;
      //this.step3Editable = true;
    },

    continueButtonStep2(value) {
      this.step2ContinueDisabled = value;
    },

    removeProductFromArray(productId) {
      var indexOfProduct = this.profileData.products.findIndex(
        (r) => r.productId === productId
      );
      this.profileData.products.splice(indexOfProduct, 1);
    },

    createOrder: async function() {
      console.log(this.shoppingCart);
      console.log(this.orderData);
      var data = {
        user: {
          email: this.user.email,
        },
        date: new Date(),
        // type: "pickUp",
        // status: { overall: "inProcess", orderReceived: 1, packageReady: 0, packagePickUp: 0 },
        type: "delivery",
        status: {
          finished: false,
          successfully: false,
          steps: {
            orderReceived: 1,
            paymentReceived: 0,
            inDelivery: 0,
          },
        },
        shippingAddress: this.orderData.shippingAddress,
        billingAddress: this.orderData.billingAddress,
        products: this.shoppingCart,
        payment: this.orderData.payment,
        totalSum: calculateTotalCartSum(this.shoppingCart),
        currency: "EUR",
        currencySymbol: "€",
      };
      try {
        await orderService.createOrder(data);
      } catch (error) {
        // this.addErrorSnackbar("Error while creating the order.");
        return;
      }

      // empty shopping cart
      this.emptyShoppingCart();
      this.$router.push({ name: "SuccessfulOrder" });
    },

    async mergeProcedure() {
      // merge function
      let mergedCart;
      try {
        mergedCart = await shoppingCartMerge(
          this.shoppingCart,
          this.loadedCart
        );
      } catch (error) {
        this.addErrorSnackbar("Error while merging.");
        return;
      }
      console.log(`Merged Cart:`);
      console.log(mergedCart);
      // update cart in database
      try {
        await this.updateCart(mergedCart);
      } catch (error) {
        this.addErrorSnackbar("Error while merging.");
        return;
      }
      // at success remove items from loaded cart
      this.emptyLoadedCart();
      calculateTotalCartSum(this.shoppingCart);
      this.addSuccessSnackbar("Shopping carts successfully merged!");
    },

    async abortMerge() {
      try {
        await this.updateCart(this.shoppingCart);
      } catch (error) {
        this.addErrorSnackbar("Error while merge abort.");
        return;
      }
      this.emptyLoadedCart();
      this.addSuccessSnackbar("Merge was aborted!");
    },

    paypalOrderCreated() {
      // empty shopping cart
      this.emptyShoppingCart();
      this.$router.push({ name: "SuccessfulOrder" });
    },

    setOverlay(value) {
      this.overlay = value;
    },
  },
};
</script>

<style>
.bottomright {
  position: absolute;
  bottom: 8px;
  right: 16px;
}
</style>

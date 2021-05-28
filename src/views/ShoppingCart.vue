<template>
  <div id="cartViewDiv">
    <v-overlay v-model="overlay">
      <v-progress-circular indeterminate size="128"></v-progress-circular>
    </v-overlay>
    <LoginDialog v-model="showLoginDialog" />

    <v-container v-if="this.shoppingCart">
      <v-stepper v-model="e1">
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
            <v-card flat>
              <v-container v-if="this.shoppingCart">
                <div class="text-h5 text-left font-weight-medium mb-5">
                  Your Shopping Cart
                </div>
                <div
                  v-if="this.shoppingCart.length == 0"
                  class="text-left text-body-1 mb-5"
                >
                  <v-alert text dense type="warning" border="left">
                    You did not add any products to your shopping cart.
                  </v-alert>
                </div>

                <ShoppingCartListItem
                  v-else
                  v-for="(prod, index) in this.shoppingCart"
                  v-bind:key="index"
                  v-bind:product="prod[0]"
                  v-bind:amount="prod[1]"
                  :modifiable="true"
                  class="my-3"
                />
                <div v-if="this.loadedCart.length > 0">
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
                    v-for="(prod, index) in this.loadedCart"
                    v-bind:key="index"
                    v-bind:product="prod[0]"
                    v-bind:amount="prod[1]"
                    :modifiable="false"
                    class="my-3"
                  />
                </div>

                <v-divider />
                <v-row no-gutters height="60px" class="mt-2">
                  <v-col cols="12" sm="2" offset-sm="9" offset-md="9">
                    <div class="text-left text-body-1">Shipping costs:</div>
                  </v-col>
                  <v-col cols="12" sm="1">
                    <div class="text-right text-body-1">0.00€</div>
                  </v-col>
                </v-row>

                <v-row no-gutters height="60px">
                  <v-col cols="12" sm="2" offset-sm="9" offset-md="9">
                    <div class="text-left text-body-1">Total costs:</div>
                  </v-col>
                  <v-col cols="12" sm="1">
                    <div class="text-right text-body-1">
                      {{ computedTotalSum }}€
                    </div>
                  </v-col>
                </v-row>

                <v-card-actions class="mt-3">
                  <v-spacer />
                  <v-btn
                    color="primary"
                    @click="goToStep2"
                    :disabled="
                      this.shoppingCart.length > 0 &&
                      this.loadedCart.length === 0
                        ? false
                        : true
                    "
                  >
                    To Checkout
                  </v-btn>
                </v-card-actions>
              </v-container>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card flat>
              <v-container>
                <div class="text-h5 text-left font-weight-medium mb-4">
                  Checkout - Adresses and Payment
                </div>
                <ShoppingCartCheckout
                  v-on:step2-continue-button="continueButtonStep2"
                />
                <v-card-actions class="mt-3">
                  <v-spacer />
                  <v-btn text @click="e1 = e1 - 1">
                    Back
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="goToStep3"
                    :disabled="step2ContinueDisabled"
                  >
                    To final Overview
                  </v-btn>
                </v-card-actions>
              </v-container>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card flat>
              <v-container>
                <div class="text-h5 text-left font-weight-medium mb-4">
                  Final Overview
                </div>
                <ShoppingCartFinalOverview
                  :computedTotalSum="computedTotalSum"
                />

                <v-card-actions class="mt-3">
                  <v-spacer />
                  <v-btn text @click="e1 = e1 - 1">
                    back
                  </v-btn>
                  <v-btn color="primary" @click="createOrder">
                    Complete Purchase
                  </v-btn>

                  <!-- Smart Buttons -->
                  <v-card
                    width="250px"
                    class="mt-3"
                    v-if="this.shoppingCart.length > 0"
                  >
                    <v-container>
                      <PaypalSmartButton
                        :orderData="getPaypalCreateOrderData()"
                        v-on:paypal-order-successful="paypalOrderCreated"
                        v-on:overlay-start="setOverlay(true)"
                        v-on:overlay-end="setOverlay(false)"
                      />
                    </v-container>
                  </v-card>
                </v-card-actions>
              </v-container>
            </v-card>
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

import PaypalSmartButton from "../components/shoppingCartComponents/PaypalSmartButton.vue";

export default {
  name: "ShoppingCartView",

  components: {
    ShoppingCartListItem,
    ShoppingCartCheckout,
    ShoppingCartFinalOverview,
    LoginDialog,
    PaypalSmartButton
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

      orderData2: {
        description: "Buy thing",
        amount: {
          currency_code: "USD",
          value: 1000
        }
      }
      //step3CompletePurchaseDisabled: true
    };
  },

  mounted() {
    console.log(this.shoppingCart);
  },

  computed: {
    ...mapState("order", ["orderData"]),
    ...mapState("account", [
      "user",
      "loggedIn",
      "shoppingCart",
      "loadedCart",
      "productCounter"
    ]),
    computedTotalSum: {
      get() {
        return calculateTotalCartSum(this.shoppingCart);
      }
    }
  },

  methods: {
    ...mapActions("account", [
      "mergeCarts",
      "undoMerge",
      "updateCart",
      "emptyLoadedCart",
      "emptyShoppingCart"
    ]),
    ...mapActions("snackbar", [
      "addSuccessSnackbar",
      "addInfoSnackbar",
      "addErrorSnackbar"
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
        r => r.productId === productId
      );
      this.profileData.products.splice(indexOfProduct, 1);
    },

    createOrder: async function() {
      console.log(this.shoppingCart);
      console.log(this.orderData);
      var data = {
        user: {
          email: this.user.email
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
            inDelivery: 0
          }
        },
        shippingAddress: this.orderData.shippingAddress,
        billingAddress: this.orderData.billingAddress,
        products: this.shoppingCart,
        payment: this.orderData.payment,
        totalSum: calculateTotalCartSum(this.shoppingCart),
        currency: "EUR",
        currencySymbol: "€"
      };
      try {
        await orderService.createOrder(data);
      } catch (error) {
        //this.addErrorSnackbar("Error while creating the order.");
        return;
      }

      // empty shopping cart
      this.emptyShoppingCart();
      this.$router.push({ name: "SuccessfulOrder" });
    },

    async mergeProcedure() {
      //merge function
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
      //update cart in database
      try {
        await this.updateCart({ email: this.user.email, cart: mergedCart });
      } catch (error) {
        this.addErrorSnackbar("Error while merging.");
        return;
      }
      //at success remove items from loaded cart
      this.emptyLoadedCart();
      calculateTotalCartSum(this.shoppingCart);
      this.addSuccessSnackbar("Shopping carts successfully merged!");
    },

    async abortMerge() {
      try {
        await this.updateCart({
          email: this.user.email,
          cart: this.shoppingCart
        });
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

    getPaypalCreateOrderData() {
      const data = {
        products: this.shoppingCart,
        billingAddress: this.orderData.billingAddress,
        shippingAddress: this.orderData.shippingAddress,
        currencyCode: "EUR"
      };
      return data;
    },

    setOverlay(value) {
      this.overlay = value;
    }
  }
};
</script>

<style>
.bottomright {
  position: absolute;
  bottom: 8px;
  right: 16px;
}
</style>

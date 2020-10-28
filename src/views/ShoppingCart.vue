<template>
  <div id="cartViewDiv">
    <v-container v-if="this.user.shoppingCart">
      <!--  <ShoppingCartListItem
        v-for="(prod, index) in this.user.shoppingCart"
        v-bind:key="index"
        v-bind:product="prod[0]"
        v-bind:amount="prod[1]"
        :modifiable="true"
      />
      <v-divider />
      <v-row no-gutters height="60px">
        <v-col cols="12" sm="2" offset-sm="9" offset-md="9">
          <p>Shipping costs:</p>
        </v-col>
        <v-col cols="12" sm="1">
          <p>0.00€</p>
        </v-col>
      </v-row>

      <v-row no-gutters height="60px">
        <v-col cols="12" sm="2" offset-sm="9" offset-md="9">
          <p>Total costs:</p>
        </v-col>
        <v-col cols="12" sm="1">
          <p>{{ computedTotalSum }}€</p>
        </v-col>
      </v-row>

      <v-timeline>
        <v-timeline-item fill-dot small left class="text-right font-weight-bold"
          >Your Shopping Cart</v-timeline-item
        >
        <v-timeline-item fill-dot small color="grey" class="text-right">
          Checkout
        </v-timeline-item>
        <v-timeline-item fill-dot small color="grey" left class="text-right"
          >Final Overview</v-timeline-item
        >
      </v-timeline>

      <router-link :to="{ name: 'Checkout' }">
        <v-btn class="bottomright" dark color="indigo">Checkout</v-btn>
      </router-link> -->

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
            <v-container v-if="this.user.shoppingCart">
              <div class="text-h5 text-left font-weight-medium mb-5">
                Your Shopping Cart
              </div>
              <!-- text-h4 text-sm-h4 text-md-h4 text-lg-h3 text-xl-h3 -->
              <ShoppingCartListItem
                v-for="(prod, index) in this.user.shoppingCart"
                v-bind:key="index"
                v-bind:product="prod[0]"
                v-bind:amount="prod[1]"
                :modifiable="true"
              />
              <v-divider />
              <v-row no-gutters height="60px">
                <v-col cols="12" sm="2" offset-sm="9" offset-md="9">
                  <p>Shipping costs:</p>
                </v-col>
                <v-col cols="12" sm="1">
                  <p>0.00€</p>
                </v-col>
              </v-row>

              <v-row no-gutters height="60px">
                <v-col cols="12" sm="2" offset-sm="9" offset-md="9">
                  <p>Total costs:</p>
                </v-col>
                <v-col cols="12" sm="1">
                  <p>{{ computedTotalSum }}€</p>
                </v-col>
              </v-row>
            </v-container>

            <v-btn
              color="primary"
              @click="goToStep2"
              :disabled="this.user.shoppingCart.length > 0 ? false : true"
            >
              To Checkout
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <div class="text-h5 text-left font-weight-medium mb-4">
              Checkout - Adresses and Payment
            </div>
            <ShoppingCartCheckout
              v-on:step2-continue-button="continueButtonStep2"
            />

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
          </v-stepper-content>

          <v-stepper-content step="3">
            <div class="text-h5 text-left font-weight-medium mb-4">
              Final Overview
            </div>
            <ShoppingCartFinalOverview :computedTotalSum="computedTotalSum" />

            <v-btn text @click="e1 = e1 - 1">
              back
            </v-btn>
            <v-btn color="primary" @click="createOrder">
              Complete Purchase
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
</template>

<script>
/*
      <div
        id="divider"
        style="background-color:#441468; height: 1px; width:20%; float: right; "
      ></div>
*/
import { calculateTotalCartSum } from "../helpers";
import { mapState } from "vuex";
import ShoppingCartListItem from "../components/ShoppingCartListItem";
import ShoppingCartCheckout from "../components/ShoppingCartCheckout";
import ShoppingCartFinalOverview from "../components/ShoppingCartFinalOverview";

import { orderService } from "../services";

export default {
  name: "ShoppingCartView",

  components: {
    ShoppingCartListItem,
    ShoppingCartCheckout,
    ShoppingCartFinalOverview
  },

  data() {
    return {
      mapData: null,
      e1: 1,
      step2Editable: false,
      step3Editable: false,
      step2ContinueDisabled: true
      //step3CompletePurchaseDisabled: true
    };
  },

  computed: {
    //console.log(this.user.shoppingCart);
    ...mapState("order", ["orderData"]),
    ...mapState("account", ["user", "loggedIn"]),
    computedTotalSum: {
      get() {
        // var sum = 0.0;
        // for (var i = 0; i < this.user.shoppingCart.length; i++) {
        //   sum =
        //     sum +
        //     parseFloat(this.user.shoppingCart[i][0].price) *
        //       this.user.shoppingCart[i][1];
        // }
        // return sum.toFixed(2);
        return calculateTotalCartSum(this.user.shoppingCart);
      }
    }
  },

  mounted() {},

  methods: {
    goToStep2() {
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
      var data = {
        user: {
          email: this.user.email
        },
        date: new Date(),
        shippingAddress: this.orderData.shippingAddress,
        billingAddress: this.orderData.billingAddress,
        products: this.user.shoppingCart,
        payment: this.orderData.payment,
        totalSum: calculateTotalCartSum(this.user.shoppingCart)
      };
      var response = await orderService.createOrder(data);
      console.log(response);
      if (response.status == 200) {
        //Delete Shopping Cart
        //Delete Order State Info
        this.$router.push({ name: "SuccessfulOrder" });
      }
    }
    // enableCompletePurchaseStep3() {
    //   this.step3CompletePurchaseDisabled = false;
    // }
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

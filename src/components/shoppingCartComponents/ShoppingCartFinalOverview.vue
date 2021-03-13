<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="text-h6 text-left font-weight-medium">
          Products
        </div>
      </v-card-title>
      <ShoppingCartListItem
        v-for="(prod, index) in this.shoppingCart"
        v-bind:key="index"
        v-bind:product="prod[0]"
        v-bind:amount="prod[1]"
        :modifiable="false"
        class="ma-4"
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
    </v-card>

    <!-- <v-sheet color="gray darken-2" :elevation="elevation" class="my-5">
      <div class="text-h6 text-left font-weight-medium ma-4">
        Shipping Address
      </div>
      <div class="mb-3">
        <v-row>
          <v-col cols="12" xl="2">
            Name:
          </v-col>
          <v-col cols="12" xl="2">
            {{ this.orderData.shippingAddress.firstName }},
            {{ this.orderData.shippingAddress.lastName }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xl="2">
            Address:
          </v-col>
          <v-col cols="12" xl="2">
            {{ this.orderData.shippingAddress.addressLine1 }},
            {{ this.orderData.shippingAddress.postcode }}
            {{ this.orderData.shippingAddress.city }}</v-col
          >
        </v-row>
      </div>
    </v-sheet>

    <v-sheet color="gray darken-2" :elevation="elevation" class="my-5">
      <div class="text-h6 text-left font-weight-medium ma-4">
        Billing Address
      </div>
      <v-row>
        <v-col cols="12" xl="2">
          Name:
        </v-col>
        <v-col cols="12" xl="2">
          {{ this.orderData.billingAddress.firstName }},
          {{ this.orderData.billingAddress.lastName }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xl="2">
          Address:
        </v-col>
        <v-col cols="12" xl="2">
          <div>
            {{ this.orderData.billingAddress.addressLine1 }},
            {{ this.orderData.billingAddress.postcode }}
            {{ this.orderData.billingAddress.city }}
          </div></v-col
        >
      </v-row>
    </v-sheet>

    <v-sheet color="gray darken-2" :elevation="elevation" class="my-5">
      <div class="text-h6 text-left font-weight-medium ma-4">
        Payment
      </div>
      <p>{{ this.orderData.payment }}</p>
    </v-sheet> -->

    <v-row class="mt-3">
      <v-col cols="12" sm="6" lg="4" xl="4">
        <v-card v-if="this.orderData.shippingAddress">
          <v-card-title>
            <div class="text-xl-h6">Shipping Address</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>Name:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ this.orderData.shippingAddress.firstName }},
                {{ this.orderData.shippingAddress.lastName }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>Address:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ this.orderData.shippingAddress.addressLine1 }},
                {{ this.orderData.shippingAddress.postcode }}
                {{ this.orderData.shippingAddress.city }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="4" xl="4">
        <v-card v-if="this.orderData.billingAddress">
          <v-card-title>
            <div class="text-xl-h6">Billing Address</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>Name:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ this.orderData.billingAddress.firstName }},
                {{ this.orderData.billingAddress.lastName }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>Address:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ this.orderData.billingAddress.addressLine1 }},
                {{ this.orderData.billingAddress.postcode }}
                {{ this.orderData.billingAddress.city }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="4" xl="4">
        <v-card v-if="this.orderData.billingAddress">
          <v-card-title>
            <div class="text-xl-h6">Credit Card Payment</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>Card Number:</v-list-item-content>
              <v-list-item-content class="align-end">
                11111111111111111
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>Name on Card:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ this.orderData.billingAddress.firstName }},
                {{ this.orderData.billingAddress.lastName }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>Expiry Date:</v-list-item-content>
              <v-list-item-content class="align-end">
                01/23
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>Security Code:</v-list-item-content>
              <v-list-item-content class="align-end">
                123
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-timeline>
      <v-timeline-item fill-dot small left class="text-right">
        <router-link
          :to="{ name: 'ShoppingCart' }"
          style="text-decoration: none; color: inherit;"
          >Your Shopping Cart</router-link
        ></v-timeline-item
      >
      <v-timeline-item fill-dot small class="text-right">
        <router-link
          :to="{ name: 'Checkout' }"
          style="text-decoration: none; color: inherit;"
          >Checkout</router-link
        >
      </v-timeline-item>
      <v-timeline-item fill-dot small left class="text-right  font-weight-bold"
        >Final Overview</v-timeline-item
      >
    </v-timeline> -->

    <!-- <v-btn class="bottomright" dark color="indigo" @click.stop="createOrder"
      >Complete Purchase</v-btn
    > -->
  </div>
</template>

<script>
import ShoppingCartListItem from "./ShoppingCartListItem";
// import { calculateTotalCartSum } from "../helpers";
// import { orderService } from "../services";
//mapActions
import { mapState } from "vuex";

export default {
  name: "ShoppingCartFinalOverview",

  props: { computedTotalSum: String },
  components: {
    ShoppingCartListItem: ShoppingCartListItem
  },

  data() {
    return {
      elevation: 1
    };
  },

  computed: {
    ...mapState("order", ["orderData"]),
    ...mapState("account", ["user", "loggedIn", "shoppingCart"])
  },

  methods: {
    // createOrder: async function() {
    //   var data = {
    //     user: {
    //       email: this.user.email
    //     },
    //     date: new Date(),
    //     shippingAddress: this.orderData.shippingAddress,
    //     billingAddress: this.orderData.billingAddress,
    //     products: this.user.shoppingCart,
    //     payment: this.orderData.payment,
    //     totalSum: calculateTotalCartSum(this.user.shoppingCart)
    //   };
    //   var response = await orderService.createOrder(data);
    //   console.log(response);
    //   if (response.status == 200) {
    //     //Delete Shopping Cart
    //     //Delete Order State Info
    //     this.$router.push({ name: "SuccessfulOrder" });
    //   }
    // }
  }
};
</script>

<style></style>

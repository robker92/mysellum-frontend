<template>
  <div>
    <v-card>
      <v-container>
        <div class="text-h5 text-left font-weight-medium mb-5">
          Products
        </div>
        <v-row no-gutters height="60px" align="center">
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
        <ShoppingCartListItem
          v-for="(prod, index) in this.shoppingCart"
          :key="index"
          :product="prod[0]"
          :amount="prod[1]"
          :modifiable="false"
          class="my-3"
        />
        <v-divider />
        <v-row no-gutters height="60px" class="mt-2">
          <v-col cols="12" sm="2" offset-sm="9" offset-md="9">
            <div class="text-left text-body-1">Shipping costs:</div>
          </v-col>
          <v-col cols="12" sm="1">
            <div class="text-right text-body-1">{{ shippingCosts }}€</div>
          </v-col>
        </v-row>

        <v-row no-gutters height="60px">
          <v-col cols="12" sm="2" offset-sm="9" offset-md="9">
            <div class="text-left text-body-1">Total costs:</div>
          </v-col>
          <v-col cols="12" sm="1">
            <div class="text-right text-body-1">{{ computedTotalSum }}€</div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-row class="mt-3">
      <v-col v-if="orderData.shippingAddress" cols="12" sm="6" lg="4" xl="4">
        <v-card>
          <v-card-title>
            <div class="text-xl-h6">Shipping Address</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text-left text-body-1 black--text">
            <div>
              {{ orderData.shippingAddress.firstName }}
              {{ orderData.shippingAddress.lastName }}
            </div>
            <div>
              {{ orderData.shippingAddress.addressLine1 }},
              {{ orderData.shippingAddress.postcode }}
              {{ orderData.shippingAddress.city }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="orderData.billingAddress" cols="12" sm="6" lg="4" xl="4">
        <v-card>
          <v-card-title>
            <div class="text-xl-h6">Billing Address</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text-left text-body-1 black--text">
            <div>
              {{ orderData.billingAddress.firstName }}
              {{ orderData.billingAddress.lastName }}
            </div>
            <div>
              {{ orderData.billingAddress.addressLine1 }},
              {{ orderData.billingAddress.postcode }}
              {{ orderData.billingAddress.city }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ShoppingCartListItem from "./ShoppingCartListItem";
import { mapState } from "vuex";

export default {
  name: "ShoppingCartFinalOverview",
  components: {
    ShoppingCartListItem: ShoppingCartListItem,
  },

  props: { computedTotalSum: String, shippingCosts: String },

  data() {
    return {
      elevation: 1,
    };
  },

  computed: {
    ...mapState("order", ["orderData"]),
    ...mapState("account", ["user", "loggedIn", "shoppingCart"]),
  },

  methods: {},
};
</script>

<style></style>

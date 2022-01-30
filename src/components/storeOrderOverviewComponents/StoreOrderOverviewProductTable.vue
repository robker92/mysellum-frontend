<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4" md="4">
        <div class="mb-1 text-left font-weight-bold black--text">
          Product
        </div>
        <div
          class="text-left black--text"
          v-for="(product, index) in products"
          :key="index"
        >
          {{ product.title }}
        </div>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <div class="mb-1 text-left font-weight-bold black--text">
          Quantity Type
        </div>
        <div
          class="text-left black--text"
          v-for="(product, index) in products"
          :key="index"
        >
          {{ product.quantityValueType }}
        </div>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <div class="mb-1 font-weight-bold black--text">
          Price
        </div>
        <div
          class="black--text"
          v-for="(product, index) in products"
          :key="index"
        >
          {{ product.price }} {{ currencySymbol }}
        </div>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <div class="mb-1 font-weight-bold black--text">
          Quantity
        </div>
        <div
          v-for="(product, index) in products"
          :key="index"
          class="black--text"
        >
          {{ product.quantity }}
        </div>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <div class="mb-1 text-right font-weight-bold black--text">
          Total
        </div>
        <div
          class="text-right black--text"
          v-for="(product, index) in products"
          :key="index"
        >
          {{ product.totalRowSum }}
        </div>
      </v-col>
    </v-row>

    <v-divider class="my-2" />

    <v-row>
      <v-col cols="12" sm="10" md="10">
        <div class="text-left font-weight-bold black--text">
          Product Total
        </div>
        <div class="text-left black--text">
          Shipping Costs
        </div>
        <div class="text-left black--text">
          Platform Fee
        </div>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <div class="text-right font-weight-bold black--text">
          {{ grossItemTotal }} {{ currencySymbol }}
        </div>
        <div class="text-right black--text">
          + {{ grossShippingCosts }} {{ currencySymbol }}
        </div>
        <div class="text-right black--text">
          - {{ platformFeeTotal }} {{ currencySymbol }}
        </div>
      </v-col>
    </v-row>

    <v-divider class="my-2" />

    <v-row>
      <v-col cols="12" sm="10" md="10">
        <div class="text-left font-weight-bold black--text">
          Transfer Amount
        </div>
        <div class="text-left black--text">
          Of which Taxes
        </div>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <div class="text-right font-weight-bold black--text">
          {{ transferTotal }} {{ currencySymbol }}
        </div>
        <div class="text-right black--text">
          {{ taxForTransferAmount }} {{ currencySymbol }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "StoreOrderOverviewProductTable",
  components: {},
  mixins: [],
  props: {
    products: Array,
    // totalSum: String,
    // totalTax: String,
    // transferAmount: String,
    // platformFee: String,
    // shippingCosts: String,
    currencySymbol: String,

    grossItemTotal: String,
    grossShippingCosts: String,
    platformFeeTotal: String,
    transferTotal: String,
    taxForTransferAmount: String,

  },
  data() {
    return {
      emptyString: ""
    };
  },
  watch: {},
  computed: {},
  methods: {}
};
</script>

<style></style>

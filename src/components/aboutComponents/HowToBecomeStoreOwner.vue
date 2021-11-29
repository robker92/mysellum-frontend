<template>
  <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      :color="item.color"
      :icon="item.icon"
      fill-dot
    >
      <v-card :color="item.color" dark>
        <v-card-title class="text-h6">
          {{ item.title }}
        </v-card-title>
        <v-card-text class="white text--primary">
          <div class="text-left text--primary text-body-2">
            {{ item.description }}
          </div>
          <!-- <v-btn :color="item.color" class="mx-0" outlined>
            Button
          </v-btn> -->
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  name: "HowToBecomeStoreOwnerComponent",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      items: [
        {
          title: "Register",
          description: "Register as user at Mysellum",
          color: "red lighten-2",
          icon: "mdi-account",
        },
        {
          title: "Open Store",
          description: "Open a store at Mysellum",
          color: "purple darken-1",
          icon: "mdi-store",
        },
        {
          title: "Payment",
          description: "Connect to a payment method",
          color: "green lighten-1",
          icon: "mdi-cash-multiple",
        },
        {
          title: "Shipping costs",
          description: "Add information about your shipping costs",
          color: "indigo",
          icon: "mdi-truck",
        },
        {
          title: "Products",
          description: "Add products to your store on your store's profile",
          color: "orange",
          icon: "mdi-food-variant",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style></style>

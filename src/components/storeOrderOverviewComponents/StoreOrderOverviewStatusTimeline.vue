<template>
  <v-row v-if="type != undefined" class="mb-2">
    <v-col cols="12" md="2" lg="2" xl="2">
      <v-card flat>
        <v-icon color="success" large>mdi-file-document</v-icon>
        <div class="success--text">Order Received</div>
      </v-card>
    </v-col>

    <v-col cols="12" md="1" lg="1" xl="1">
      <v-icon large>mdi-chevron-right</v-icon>
    </v-col>

    <v-col v-if="type === 'pickUp'" cols="12" md="2" lg="2" xl="2">
      <v-card v-if="status.packageReady == 1" flat>
        <v-icon color="success" large>mdi-package-variant-closed</v-icon>
        <div class="success--text">Package Ready For Pick-Up</div>
      </v-card>
      <v-hover v-else v-slot="{ hover }">
        <v-card :elevation="hover ? 10 : 2" @click="setStatus('packageReady')">
          <v-icon color="grey" large>mdi-package-variant-closed</v-icon>
          <div class="grey--text">Set Status: Package Ready For Pick-Up</div>
        </v-card>
      </v-hover>
    </v-col>

    <v-col v-if="type === 'delivery'" cols="12" md="2" lg="2" xl="2">
      <v-card v-if="status.steps.paymentReceived == true" flat>
        <v-icon color="success" large>mdi-cash-multiple</v-icon>
        <div class="success--text">Payment Received</div>
      </v-card>
      <v-hover v-else v-slot="{ hover }">
        <v-card
          :elevation="hover ? 10 : 2"
          @click="setStatus('paymentReceived')"
        >
          <v-icon color="grey" large>mdi-cash-multiple</v-icon>
          <div class="grey--text">Set Status: Payment Received</div>
        </v-card>
      </v-hover>
    </v-col>

    <v-col cols="12" md="1" lg="1" xl="1">
      <v-icon large>mdi-chevron-right</v-icon>
    </v-col>

    <v-col v-if="type == 'pickUp'" cols="12" md="2" lg="2" xl="2">
      <v-card v-if="status.packagePickUp == 1" flat>
        <v-icon color="success" large>mdi-handshake-outline</v-icon>
        <div class="success--text">Handover completed</div>
      </v-card>
      <v-hover
        v-else-if="status.packagePickUp == 0 && status.packageReady == 1"
        v-slot="{ hover }"
      >
        <v-card :elevation="hover ? 10 : 2" @click="setStatus('packagePickUp')">
          <v-icon color="grey" large>mdi-handshake-outline</v-icon>
          <div class="grey--text">Set Status: Handover completed</div>
        </v-card>
      </v-hover>
      <v-card v-else flat>
        <v-icon color="grey" large>mdi-handshake-outline</v-icon>
        <div class="grey--text">Handover completed</div>
      </v-card>
    </v-col>

    <SetStatusDialog
      v-model="showSetStatusDialog"
      v-on:set-status="setStatus"
    />

    <v-col v-if="type == 'delivery'" cols="12" md="2" lg="2" xl="2">
      <v-card v-if="status.steps.inDelivery == true" flat>
        <v-icon color="success" large>mdi-truck-delivery</v-icon>
        <div class="success--text">Order in delivery</div>
      </v-card>
      <v-hover
        v-else-if="
          status.steps.inDelivery == 0 && status.steps.paymentReceived == 1
        "
        v-slot="{ hover }"
      >
        <v-card :elevation="hover ? 10 : 2" @click="showSetStatusDialog = true">
          <v-icon color="grey" large>mdi-truck-delivery</v-icon>
          <div class="grey--text">Set Status: In Delivery</div>
        </v-card>
      </v-hover>
      <v-card v-else flat>
        <v-icon color="grey" large>mdi-truck-delivery</v-icon>
        <div class="grey--text">In Delivery</div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import SetStatusDialog from "./SetStatusDialog";

export default {
  name: "StoreOrderOverviewStatusTimeline",
  components: {
    SetStatusDialog: SetStatusDialog
  },
  props: {
    status: Object,
    type: String
  },
  data() {
    return {
      showSetStatusDialog: false
    };
  },
  methods: {
    setStatus(options) {
      const data = {
        type: "delivery",
        step: options.step,
        value: true,
        trackingId: options.trackingId
      };
      this.$emit("set-status", data);
    }
  }
};
</script>

<style></style>

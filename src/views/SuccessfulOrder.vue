<template>
  <v-container>
    <v-row align="center">
      <v-spacer />
      <v-col cols="12" sm="6" md="6" lg="6">
        <div class="text-h4 text-left">
          Your order was successfully completed!
        </div>
        <div class="text-body-1 text-left">
          You will receive a confirmation by e-mail promptly. Your order will be
          forwarded to the corresponding stores and they will process your order
          as soon as possible.
        </div>
        <div class="text-body-1 text-left">
          In case you have any further questions, don't hesitate to contact our
          customer service.
        </div>
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="4">
        <v-img src="../assets/undraw-images/undraw_shopping_app.svg" />
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SuccessfulOrderView",
};
</script>

<style></style>

<template>
  <div ref="paypal"></div>
</template>

<script>
import { arrayRemoveDuplicates } from "../../helpers";
import { mapActions, mapState } from "vuex";
import { paypalService } from "../../services";

export default {
  props: {
    orderData: Object,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("account", ["loggedIn"]),
  },
  mounted: async function() {
    if (this.loggedIn === true) {
      // https://developer.paypal.com/docs/checkout/reference/customize-sdk/
      const script = document.createElement("script");
      const clientId =
        "AZ4Ot1_cYotHmBv5ljIROuwrazfyUOkvSR2hDVfCrAaB1wTpkkaTzi9C7dIp08HTX6lEVMdOZ4l4FZrc";
      console.log(this.orderData.products);
      const storeIds = arrayRemoveDuplicates(
        this.getStoreIdsFromShoppingCart(this.orderData.products)
      );
      console.log(storeIds);
      const merchantIds = await paypalService.fetchMerchantIds({
        storeIds: storeIds,
      });
      console.log(merchantIds);
      if (merchantIds.length === 1) {
        // products of exactly one store in cart
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&merchant-id=${merchantIds[0]}&currency=EUR&intent=capture`;
      } else {
        console.log("multiple stores");
        // products of more than one store in cart
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&merchant-id=*&currency=EUR&intent=capture`;
        const merchaneIdString = this.getMerchantIdString(merchantIds);
        script.setAttribute("data-merchant-id", merchaneIdString);
      }

      // script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&merchant-id=*&currency=EUR&intent=capture`;
      // script.setAttribute("data-merchant-id", "UW8X6XK7RGLP8,5FHJ5NA2X94VG");
      // console.log(script);
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);
    }
  },

  methods: {
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),
    // Docs:
    // https://developer.paypal.com/docs/platforms/checkout/set-up-payments/
    // https://developer.paypal.com/docs/checkout/reference/server-integration/capture-transaction/

    setLoaded() {
      window.paypal
        .Buttons({
          createOrder: async () => {
            this.$emit("overlay-start");
            // let response;
            // try {
            console.log(JSON.stringify(this.orderData));
            let response = await paypalService.createPaypalOrder(
              this.orderData
            );
            // } catch (error) {
            //   console.log(error);
            //   this.$emit("overlay-end");
            //   return;
            // }
            return response.id;
          },

          onApprove: async (data, actions) => {
            // console.log("approve");
            // console.log(data.orderID);

            try {
              await paypalService.capturePaypalOrder({
                orderId: data.orderID,
                orderData: this.orderData,
              });
            } catch (error) {
              //console.log(error.response);
              // if the funding source fails, we restart the process to that the customer can choose another one
              if (
                error.response.data.details &&
                error.response.data.details[0].issue === "INSTRUMENT_DECLINED"
              ) {
                this.addErrorSnackbar(
                  "Unfortunately there was an issue with your chosen funding source, please choose another one."
                );
                return actions.restart();
              }
              throw error;
              // this.addErrorSnackbar("Error while creating your order.");
              // this.$emit("overlay-end");
              // return;
            }
            console.log("Paypal Order successfully captured!");
            this.$emit("paypal-order-successful");
            this.$emit("overlay-end");
            return;
          },

          onCancel: (data) => {
            console.log(data);
            // Show a cancel page, or return to cart
            this.$emit("overlay-end");
          },

          onError: (error) => {
            console.log("at error handler");
            console.log(error);

            this.addErrorSnackbar("Error while creating your order.");
            this.$emit("overlay-end");
            return;
          },
        })
        .render(this.$refs.paypal);
    },

    getMerchantIdString(uniqueStoreIds) {
      let merchantIdString = "";
      for (const storeId of uniqueStoreIds) {
        merchantIdString = merchantIdString + storeId + ",";
      }
      merchantIdString = merchantIdString.substring(
        0,
        merchantIdString.length - 1
      );
      return merchantIdString;
    },

    getStoreIdsFromShoppingCart(list) {
      let storeIds = [];
      for (const element of list) {
        storeIds.push(element[0].storeId);
      }
      return storeIds;
    },
  },
};
</script>

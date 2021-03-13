<template>
  <div ref="paypal"></div>
</template>

<script>
import { mapActions } from "vuex";
import { paypalService } from "../../services";

export default {
  data() {
    return {
      order: {
        description: "Buy thing",
        amount: {
          currency_code: "USD",
          value: 1000
        }
      }
    };
  },

  props: {
    data: Object
  },

  mounted: function() {
    const script = document.createElement("script");
    const clientId =
      "AZ4Ot1_cYotHmBv5ljIROuwrazfyUOkvSR2hDVfCrAaB1wTpkkaTzi9C7dIp08HTX6lEVMdOZ4l4FZrc";
    const merchantId = "CAD3FBJY72FE8"; //
    // &vault=true&commit=false
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&merchant-id=${merchantId}&currency=EUR&intent=capture`;
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
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
            console.log(paypalService);
            let response;
            try {
              response = await paypalService.createPaypalOrder(this.data);
            } catch (error) {
              console.log(error);
              return;
            }
            return response.id;
          },

          onApprove: async (data, actions) => {
            console.log("approve");
            console.log(data.orderID);

            try {
              await paypalService.capturePaypalOrder({
                orderId: data.orderID,
                ordeData: this.data
              });
            } catch (error) {
              //console.log(error.response);
              // if the funding source fails, we restart the process to that the customer can choose another one
              if (
                error.response?.data?.details[0]?.issue ===
                "INSTRUMENT_DECLINED"
              ) {
                this.addErrorSnackbar(
                  "Unfortunately there was an issue with your chosen funding source, please choose another one."
                );
                return actions.restart();
              }
              this.addErrorSnackbar("Error while creating your order.");
              return;
            }
            console.log("Paypal Order successfully captured!");
            return;
          }

          // onError: err => {
          //   console.log("at error handler");
          //   console.log(err);
          //   //emit error message
          // }
        })
        .render(this.$refs.paypal);
    }
  }
};
</script>

<template>
  <div>
    <v-row>
      <div v-if="checkAllSteps === true" class="mb-6 ml-3">
        <v-row align="center">
          <v-icon color="green" large>mdi-checkbox-marked</v-icon>
          <div class="text-body-2 font-weight-bold text-left green--text">
            Activation:
          </div>
          <div class="text-body-2 text-left green--text ml-3">
            Congratulations! Your store is activated and visible to customers.
          </div>
        </v-row>
      </div>
      <div v-if="checkAllSteps === false" class="mb-6 ml-3">
        <v-row align="center">
          <v-icon color="red" large>mdi-close-box</v-icon>
          <div class="text-body-2 font-weight-bold text-left red--text">
            Activation:
          </div>
          <div class="text-body-2 text-left red--text ml-3">
            Your store is not activated yet and therefore not visible to
            customers.
          </div>
        </v-row>
      </div>
    </v-row>
    <v-row class="mb-3">
      <!-- STEP 1 -->
      <v-col
        cols="12"
        lg="3"
        v-if="
          storeActivationSteps.profileComplete === true &&
            checkAllSteps === false
        "
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                Profile
              </v-list-item-title>
              <div class="text-body-2 text-left">
                The information of your store is complete.
              </div>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-icon color="green" large>mdi-checkbox-marked</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="3"
        v-if="
          storeActivationSteps.profileComplete === false &&
            checkAllSteps === false
        "
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                Profile
              </v-list-item-title>
              <div class="text-body-2 text-left">
                You need to completeley fill out your stores profile in order to
                activate your store.
              </div>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-icon color="red" large>mdi-close-box</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>

      <!-- STEP 2 -->
      <v-col
        cols="12"
        lg="3"
        v-if="
          storeActivationSteps.minOneProduct === true && checkAllSteps === false
        "
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                Products
              </v-list-item-title>
              <div class="text-body-2 text-left">
                You have registered at least one product in your store.
              </div>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-icon color="green" large>mdi-checkbox-marked</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="3"
        v-if="
          storeActivationSteps.minOneProduct === false &&
            checkAllSteps === false
        "
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                Products
              </v-list-item-title>
              <div class="text-body-2 text-left">
                You have to register at least one product in order to be visible
                to customers.
              </div>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-icon color="red" large>mdi-close-box</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>

      <!-- STEP 3 -->
      <v-col
        cols="12"
        lg="3"
        v-if="
          storeActivationSteps.shippingRegistered === true &&
            checkAllSteps === false
        "
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                Shipping
              </v-list-item-title>
              <div class="text-body-2 text-left">
                You did register shipping information.
              </div>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-icon color="green" large>mdi-checkbox-marked</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="3"
        v-if="
          storeActivationSteps.shippingRegistered === false &&
            checkAllSteps === false
        "
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                Shipping
              </v-list-item-title>
              <div class="text-body-2 text-left">
                You did not register shipping information yet.
              </div>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-icon color="red" large>mdi-close-box</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>

      <!-- STEP 4 -->
      <v-col
        cols="12"
        lg="3"
        v-if="
          storeActivationSteps.paymentMethodRegistered === true &&
            checkAllSteps === false
        "
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                Payment
              </v-list-item-title>
              <div class="text-body-2 text-left">
                You have registered a payment method for your store.
              </div>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-icon color="green" large>mdi-checkbox-marked</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="3"
        v-if="
          storeActivationSteps.paymentMethodRegistered === false &&
            checkAllSteps === false
        "
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                Payment
              </v-list-item-title>
              <div class="text-body-2 text-left">
                You did not register a payment method for your store yet.
              </div>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-icon color="red" large>mdi-close-box</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "StoreProfileActivationSteps",

  data() {
    return {
      stepProfileCompletionDone: false,
      stepMinOneProductDone: true,
      stepPaymentMethodRegisterDone: false
    };
  },

  props: {
    storeActivationSteps: Object
  },

  computed: {
    checkAllSteps: {
      get() {
        if (
          this.storeActivationSteps.profileComplete === true &&
          this.storeActivationSteps.minOneProduct === true &&
          this.storeActivationSteps.shippingRegistered === true &&
          this.storeActivationSteps.paymentMethodRegistered === true
        ) {
          return true;
        }
        return false;
      }
    }
  }
};
</script>

<style></style>

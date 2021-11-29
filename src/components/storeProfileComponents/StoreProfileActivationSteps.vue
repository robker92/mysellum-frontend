<template>
  <div>
    <v-row>
      <!-- <div v-if="checkAllSteps === true" class="mb-6 ml-3">
        <v-row align="center">
          <v-icon color="green" large>mdi-checkbox-marked</v-icon>
          <div class="text-body-2 font-weight-bold text-left green--text">
            Activation:
          </div>
          <div class="text-body-2 text-left green--text ml-3">
            Congratulations! Your store is activated and visible to customers.
          </div>
        </v-row>
      </div> -->
      <div class="mb-6 ml-3">
        <v-row align="center">
          <v-icon v-if="checkAllSteps === true" color="green" large>
            mdi-checkbox-marked
          </v-icon>
          <v-icon v-if="checkAllSteps === false" color="red" large>
            mdi-close-box
          </v-icon>

          <div
            v-if="checkAllSteps === true"
            class="text-body-2 font-weight-bold text-left green--text"
          >
            {{ $t("storeProfile.activationSteps.headline") }}:
          </div>
          <div
            v-if="checkAllSteps === false"
            class="text-body-2 font-weight-bold text-left red--text"
          >
            {{ $t("storeProfile.activationSteps.headline") }}:
          </div>

          <div
            v-if="checkAllSteps === true"
            class="text-body-2 text-left green--text ml-3"
          >
            {{ $t("storeProfile.activationSteps.activatedLabel") }}
          </div>
          <div
            v-if="checkAllSteps === false"
            class="text-body-2 text-left red--text ml-3"
          >
            {{ $t("storeProfile.activationSteps.notActivatedLabel") }}
          </div>
        </v-row>
      </div>
    </v-row>
    <v-row class="mb-3">
      <!-- STEP 1 -->
      <v-col
        v-if="
          storeActivationSteps.profileComplete === true &&
            checkAllSteps === false
        "
        cols="12"
        lg="3"
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                {{ $t("storeProfile.activationSteps.profileStep.headline") }}
              </v-list-item-title>
              <div class="text-body-2 text-left">
                {{
                  $t("storeProfile.activationSteps.profileStep.activatedLabel")
                }}
              </div>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-icon color="green" large>mdi-checkbox-marked</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col
        v-if="
          storeActivationSteps.profileComplete === false &&
            checkAllSteps === false
        "
        cols="12"
        lg="3"
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                {{ $t("storeProfile.activationSteps.profileStep.headline") }}
              </v-list-item-title>
              <div class="text-body-2 text-left">
                {{
                  $t(
                    "storeProfile.activationSteps.profileStep.notActivatedLabel"
                  )
                }}
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
        v-if="
          storeActivationSteps.minOneProduct === true && checkAllSteps === false
        "
        cols="12"
        lg="3"
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                {{ $t("storeProfile.activationSteps.productsStep.headline") }}
              </v-list-item-title>
              <div class="text-body-2 text-left">
                {{
                  $t("storeProfile.activationSteps.productsStep.activatedLabel")
                }}
              </div>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-icon color="green" large>mdi-checkbox-marked</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col
        v-if="
          storeActivationSteps.minOneProduct === false &&
            checkAllSteps === false
        "
        cols="12"
        lg="3"
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                {{ $t("storeProfile.activationSteps.productsStep.headline") }}
              </v-list-item-title>
              <div class="text-body-2 text-left">
                {{
                  $t(
                    "storeProfile.activationSteps.productsStep.notActivatedLabel"
                  )
                }}
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
        v-if="
          storeActivationSteps.shippingRegistered === true &&
            checkAllSteps === false
        "
        cols="12"
        lg="3"
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                {{ $t("storeProfile.activationSteps.shippingStep.headline") }}
              </v-list-item-title>
              <div class="text-body-2 text-left">
                {{
                  $t("storeProfile.activationSteps.shippingStep.activatedLabel")
                }}
              </div>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-icon color="green" large>mdi-checkbox-marked</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col
        v-if="
          storeActivationSteps.shippingRegistered === false &&
            checkAllSteps === false
        "
        cols="12"
        lg="3"
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                {{ $t("storeProfile.activationSteps.shippingStep.headline") }}
              </v-list-item-title>
              <div class="text-body-2 text-left">
                {{
                  $t(
                    "storeProfile.activationSteps.shippingStep.notActivatedLabel"
                  )
                }}
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
        v-if="
          storeActivationSteps.paymentMethodRegistered === true &&
            checkAllSteps === false
        "
        cols="12"
        lg="3"
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                {{ $t("storeProfile.activationSteps.paymentStep.headline") }}
              </v-list-item-title>
              <div class="text-body-2 text-left">
                {{
                  $t("storeProfile.activationSteps.paymentStep.activatedLabel")
                }}
              </div>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-icon color="green" large>mdi-checkbox-marked</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col
        v-if="
          storeActivationSteps.paymentMethodRegistered === false &&
            checkAllSteps === false
        "
        cols="12"
        lg="3"
      >
        <v-card outlined class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 text-left">
                {{ $t("storeProfile.activationSteps.paymentStep.headline") }}
              </v-list-item-title>
              <div class="text-body-2 text-left">
                {{
                  $t(
                    "storeProfile.activationSteps.paymentStep.notActivatedLabel"
                  )
                }}
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

  props: {
    storeActivationSteps: Object,
  },

  data() {
    return {
      stepProfileCompletionDone: false,
      stepMinOneProductDone: true,
      stepPaymentMethodRegisterDone: false,
    };
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
      },
    },
  },
};
</script>

<style></style>

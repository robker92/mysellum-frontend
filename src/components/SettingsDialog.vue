<template>
  <v-dialog v-model="show" max-width="80%" @click:outside="cancel">
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Settings</v-toolbar-title>
      </v-toolbar>
      <v-tabs>
        <v-tab>
          <v-icon left>
            mdi-account
          </v-icon>
          Account
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-map-marker-radius
          </v-icon>
          Location
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-bell-ring
          </v-icon>
          Notifications
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-credit-card-outline
          </v-icon>
          Payment
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-lock
          </v-icon>
          Security
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-cog
          </v-icon>
          Settings
        </v-tab>

        <!-- LOCATION -->
        <v-tab-item>
          <v-card class="ma-3">
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="addressLine1"
                    :counter="40"
                    label="Address Line 1*"
                    required
                    :error-messages="addressLine1Errors"
                    @input="$v.addressLine1.$touch()"
                    @blur="$v.addressLine1.$touch()"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="2" md="2">
                  <v-text-field
                    v-model="postcode"
                    label="Postcode*"
                    class="inputPostcode"
                    required
                    type="number"
                    maxlength="5"
                    oninput="if(Number(this.value.length) > Number(this.maxLength)) this.value = this.value.substring(0,this.value.length-1);"
                    :error-messages="postcodeErrors"
                    @input="$v.postcode.$touch()"
                    @blur="$v.postcode.$touch()"
                  />
                </v-col>
                <v-col cols="12" sm="10" md="10">
                  <v-text-field
                    v-model="city"
                    label="City*"
                    :counter="20"
                    required
                    :error-messages="cityErrors"
                    @input="$v.city.$touch()"
                    @blur="$v.city.$touch()"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <div>Hello World</div>
        </v-tab-item>
      </v-tabs>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancel">Close</v-btn>
        <v-btn color="primary" dark @click="cancel">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//minLength
import { required, maxLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  name: "SettingsDialog",

  mixins: [validationMixin],

  validations: {
    city: { required, maxLength: maxLength(20) },
    postcode: { required },
    addressLine1: { required, maxLength: maxLength(40) }
  },
  props: {
    value: Boolean
  },
  data() {
    return {
      dialog: false,

      //location
      addressLine1: "",
      postcode: "",
      city: ""
    };
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.city.$dirty) return errors;
      !this.$v.city.required && errors.push("The city is required.");
      !this.$v.city.maxLength &&
        errors.push("The city must be at most 20 characters long.");
      return errors;
    },
    postcodeErrors() {
      const errors = [];
      if (!this.$v.postcode.$dirty) return errors;
      !this.$v.postcode.required && errors.push("Postcode is required.");
      return errors;
    },
    addressLine1Errors() {
      const errors = [];
      if (!this.$v.addressLine1.$dirty) return errors;
      !this.$v.addressLine1.required &&
        errors.push("The addressline is required.");
      !this.$v.addressLine1.maxLength &&
        errors.push("The addressline must be at most 40 characters long.");
      return errors;
    }
  },
  methods: {
    cancel() {
      this.show = false;
    }
  }
};
</script>

<style></style>

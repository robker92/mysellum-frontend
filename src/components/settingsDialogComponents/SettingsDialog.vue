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
          Personal Data
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

        <!-- PERSONAL DATA -->
        <v-tab-item>
          <PersonalDataTab
            :user-data="{}"
            @personal-data-validation="setPersonalDataValidation"
          />
        </v-tab-item>

        <v-tab-item>
          <div>Hello World</div>
        </v-tab-item>
      </v-tabs>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancel">Close</v-btn>
        <v-btn
          color="primary"
          :dark="!saveButtonDisabled"
          :disabled="saveButtonDisabled"
          @click="cancel"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import PersonalDataTab from "./PersonalDataTab";

//minLength
import { required, maxLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  name: "SettingsDialog",

  components: { PersonalDataTab },

  mixins: [validationMixin],

  validations: {
    city: { required, maxLength: maxLength(20) },
    postcode: { required },
    addressLine1: { required, maxLength: maxLength(40) },
  },

  props: {
    value: Boolean,
  },

  data() {
    return {
      dialog: false,

      saveButtonDisabled: true,
      personalDataValid: false,
    };
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },

  methods: {
    checkSaveButtonDisabled() {
      if (!this.personalDataValid) {
        // Button is not disabled
        this.saveButtonDisabled = true;
        return;
      } else {
        this.saveButtonDisabled = false;
        return;
      }
    },

    setPersonalDataValidation(value) {
      this.personalDataValid = value;
      this.checkSaveButtonDisabled();
    },

    cancel() {
      this.show = false;
    },
  },
};
</script>

<style></style>

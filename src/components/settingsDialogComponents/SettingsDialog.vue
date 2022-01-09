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
            :user-data="userData"
            @cancel-dialog="cancel"
            @set-overlay="setOverlay"
          />
        </v-tab-item>

        <v-tab-item>
          <div>Hello World</div>
        </v-tab-item>
      </v-tabs>
      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancel">Close</v-btn>
        <v-btn
          color="primary"
          :dark="!saveButtonDisabled"
          :disabled="saveButtonDisabled"
          @click="saveUser"
        >
          Save
        </v-btn>
      </v-card-actions> -->
      <v-overlay v-model="overlay">
        <v-progress-circular indeterminate size="128"></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-dialog>
</template>

<script>
import PersonalDataTab from "./PersonalDataTab";
import { userService } from "../../services";

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
      overlay: false,
      userData: {},
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

  watch: {
    value: function(newVal) {
      if (newVal === true) {
        this.loadUserData();
      }
    },
  },

  methods: {
    async loadUserData() {
      let userData;
      try {
        userData = await userService.getSingleUser();
      } catch (error) {
        console.log(error);
        return;
      }
      this.userData = userData;
    },

    cancel() {
      this.show = false;
    },

    setOverlay(value) {
      this.overlay = value;
    },
  },
};
</script>

<style></style>

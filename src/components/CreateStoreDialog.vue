<template>
  <v-dialog v-model="show" max-width="90%">
    <v-card>
      <v-card-title>
        <span class="dialogHeadline">Create a Store</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 > 1" step="1" :editable="true"
            >General Information</v-stepper-step
          >
          <v-stepper-content step="1">
            <v-text-field v-model="storeTitle" label="Store Title*" required />
            <v-textarea
              v-model="storeDescription"
              :counter="1000"
              label="Store Description*"
              required
            />
            <v-combobox
              v-model="tagsComboBoxModel"
              :items="tagsComboBoxItems"
              label="Store Tags*"
              multiple
              chips
              deletable-chips
            />
            <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
            <v-btn text @click="printInputs">Print</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2" :editable="true"
            >Enter the Address</v-stepper-step
          >
          <v-stepper-content step="2">
            <v-container fluid class="ma-0 pa-0">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="addressLine1"
                    :counter="30"
                    label="Address Line 1*"
                    required
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
                  />
                </v-col>
                <v-col cols="12" sm="10" md="10">
                  <v-text-field v-model="city" label="City*" required />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="lat" label="Latitude*" required />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="lng" label="Longitude*" required />
                </v-col>
              </v-row>
            </v-container>
            <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
            <v-btn text @click="printInputs">Print</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3" :editable="true"
            >Upload your Images</v-stepper-step
          >
          <v-stepper-content step="3">
            <v-file-input
              prepend-icon="mdi-camera"
              accept="image/*"
              multiple
              chips
              deletable-chips
              show-size
              counter
              label="Upload your Images"
            />
            <v-text-field
              v-model="imagesTextField"
              label="Images Text Field"
              required
            />
            <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
            <v-btn text @click="printInputs">Print</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 4" step="4" :editable="true"
            >Payment Methods</v-stepper-step
          >
          <v-stepper-content step="4">
            <v-card color="grey lighten-1" class="mb-12" height="50px"></v-card>
            <v-btn color="primary" @click="e6 = 5">Continue</v-btn>
            <v-btn text @click="printInputs">Print</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 5" step="5" :editable="true"
            >Products (optional)</v-stepper-step
          >
          <v-stepper-content step="5">
            <v-btn color="primary" @click="submitCreation">Create</v-btn>
            <v-btn text @click="printInputs">Print</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
//<v-btn text @click="e6 = e6 - 1">Cancel</v-btn>
//<small>Summarize if needed</small>
import { mapState, mapActions } from "vuex";

export default {
  name: "CreateStoreDialog",
  props: {
    value: Boolean
  },
  data() {
    return {
      //dialog: false,
      e6: 1,
      storeTitle: "",
      storeSubtitle: "",
      storeDescription: "",
      imagesTextField: "",
      tagsComboBoxModel: [],
      tagsComboBoxItems: [
        "Food",
        "Meat",
        "Beef",
        "Pork",
        "Chicken",
        "Beverages",
        "Wine",
        "Beer"
      ],
      addressLine1: "",
      postcode: "",
      city: "",
      lat: "",
      lng: ""
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
    ...mapState("account", ["user", "loggedIn"])
  },
  methods: {
    ...mapActions("stores", ["createStore"]),
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    printInputs() {
      console.log(this.storeTitle);
      console.log(this.storeDescription);
      console.log(this.tagsComboBoxModel);
      console.log(this.addressLine1);
      console.log(this.postcode);
      console.log(this.city);
      console.log(this.lat);
      console.log(this.lng);
    },

    submitCreation: async function() {
      var payload = {
        userEmail: this.user.email,
        title: this.storeTitle,
        subtitle: this.storeSubtitle,
        description: this.storeDescription,
        tags: this.tagsComboBoxModel,
        images: this.imagesTextField,
        address: {
          postcode: this.postcode,
          city: this.city,
          addressLine1: this.addressLine1,
          country: "Germany"
        },
        mapImg: "http://i.stack.imgur.com/g672i.png",
        lat: this.lat,
        lng: this.lng
      };
      console.log(payload);
      this.createStore(payload);
      this.addSuccessSnackbar("Store successfully created!");
      this.show = false;
    },

    closeDialog() {
      this.show = false;
    }
  }
};
</script>

<style>
.inputPostcode input[type="number"] {
  -moz-appearance: textfield;
}
.inputPostcode input::-webkit-outer-spin-button,
.inputPostcode input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>

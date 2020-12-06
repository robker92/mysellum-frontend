<template>
  <v-dialog v-model="show" max-width="400px" @click:outside="cancel">
    <v-card> </v-card>
  </v-dialog>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  name: "SettingsDialog",

  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required }
  },
  props: {
    value: Boolean
  },
  data() {
    return {
      dialog: false,

      email: "",
      password: "",
      showPassword: false
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
    }
  },
  methods: {
    cancel() {
      console.log(this.profileData);
      this.storeTitle = this.profileData.title;
      this.storeDescription = this.profileData.description;
      this.editedHtmlText = this.profileData.description;
      document.getElementById("editor").innerHTML = this.editedHtmlText;
      this.tagsComboBoxModel = this.profileData.tags;
      this.storeImages = [...this.profileData.images];
      //this.$forceUpdate();
      this.show = false;
    }
  }
};
</script>

<style></style>

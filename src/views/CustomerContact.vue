<template>
  <v-container>
    <div class="text-h4 mb-6">
      Contact us
    </div>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="6">
        <v-text-field
          v-model="email"
          label="Your E-Mail Address"
          placeholder="You will receive our answer to this address"
          outlined
          dense
          :error-messages="emailErrors"
          counter="50"
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6">
        <v-text-field
          v-model="subject"
          label="Your Message Subject"
          outlined
          dense
          :error-messages="subjectErrors"
          counter="100"
          @input="$v.subject.$touch()"
          @blur="$v.subject.$touch()"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="6">
        <v-text-field
          v-model="phoneNr"
          label="Your telephone number (optional)"
          outlined
          dense
          :error-messages="phoneNrErrors"
          counter="20"
          @input="$v.phoneNr.$touch()"
          @blur="$v.phoneNr.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6">
        <v-select
          v-model="topic"
          :items="topics"
          label="Your Message Topic"
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-textarea
          v-model="message"
          outlined
          label="Your Message"
          :error-messages="messageErrors"
          counter="2000"
          @input="$v.message.$touch()"
          @blur="$v.message.$touch()"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer />
      <v-btn
        color="primary"
        class="ma-2 white--text"
        :disabled="buttonIsDisabled"
        @click="sendMessage"
      >
        Send Message
        <v-icon right dark>
          mdi-email
        </v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import {
  required,
  email,
  maxLength,
  minLength,
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { sendCustomerContactMessgae } from "../services";
import { mapActions } from "vuex";

export default {
  name: "CustomerContactView",
  components: {},
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email,
      minLength: minLength(5),
      maxLength: maxLength(50),
    },
    subject: { required, minLength: minLength(5), maxLength: maxLength(100) },
    message: { required, minLength: minLength(20), maxLength: maxLength(2000) },
    phoneNr: { minLength: minLength(5), maxLength: maxLength(20) },
  },
  props: {},
  data() {
    return {
      email: "",
      subject: "",
      message: "",
      phoneNr: "",
      topic: "",
      topics: ["Question", "Technical", "Help Request"],
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email &&
        errors.push("Your input does not match an e-mail format.");
      !this.$v.email.required &&
        errors.push(
          "An e-mail address is required. Without it we can't answer you!"
        );
      !this.$v.email.maxLength &&
        errors.push("The max length for the e-mail is 50 characters.");
      !this.$v.email.minLength &&
        errors.push("The min length for the e-mail is 5 characters.");
      return errors;
    },
    subjectErrors() {
      const errors = [];
      if (!this.$v.subject.$dirty) return errors;
      !this.$v.subject.required && errors.push("An subject is required.");
      !this.$v.subject.maxLength &&
        errors.push("The max length for the subject is 100 characters.");
      !this.$v.subject.minLength &&
        errors.push("The min length for the subject is 5 characters.");
      return errors;
    },
    messageErrors() {
      const errors = [];
      if (!this.$v.message.$dirty) return errors;
      !this.$v.message.required && errors.push("An message is required.");
      !this.$v.message.maxLength &&
        errors.push("The max length for the subject is 2000 characters.");
      !this.$v.message.minLength &&
        errors.push("The min length for the message is 20 characters.");
      return errors;
    },
    phoneNrErrors() {
      const errors = [];
      if (!this.$v.phoneNr.$dirty) return errors;
      !this.$v.phoneNr.maxLength &&
        errors.push(
          "The max length for the telephone number is 20 characters."
        );
      !this.$v.phoneNr.minLength &&
        errors.push("The min length for the telephone number is 5 characters.");
      return errors;
    },
    buttonIsDisabled() {
      if (
        !this.$v.email.$invalid &&
        !this.$v.subject.$invalid &&
        !this.$v.message.$invalid
      ) {
        //Register User with input data
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {},

  mounted() {
    // console.log(`hi1`);
    // this.$vuetify.goTo(0);
  },

  methods: {
    ...mapActions("alert", ["successAlert", "errorAlert", "clearAlert"]),

    async sendMessage() {
      try {
        await sendCustomerContactMessgae(
          this.email,
          this.subject,
          this.phoneNr,
          this.topic,
          this.message
        );
      } catch (error) {
        console.log(error.response.data.message);
        this.errorAlert("Error while sending the contact message!");
        setTimeout(() => {
          this.clearAlert();
        }, 5000);
        return;
      }
      this.successAlert(
        "Successfully sent the message. You will receive our answer very soon!"
      );
      setTimeout(() => {
        this.clearAlert();
      }, 5000);
      return;
    },
  },
};
</script>

<style></style>

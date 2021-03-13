<template>
  <v-dialog v-model="show" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="imageDialogHeadline">Add Image</span>
      </v-card-title>
      <v-card-text>
        <v-container fluid class="ma-0 pa-0">
          <v-row>
            <v-col>
              <!-- <v-text-field v-model="imageSrc" label="Image Src*" required /> -->
              <v-file-input
                prepend-icon="mdi-camera"
                v-model="file"
                accept="image/*"
                label="Upload Image*"
                show-size
                truncate-length="15"
                required
                @input="$v.file.$touch()"
                @blur="$v.file.$touch()"
                :error-messages="fileErrors"
              ></v-file-input>
              <!-- @change="Preview_image" -->
              <v-text-field
                v-model="imageTitle"
                label="Image Title*"
                required
                @keyup.enter="submitImage()"
                @input="$v.imageTitle.$touch()"
                @blur="$v.imageTitle.$touch()"
                :error-messages="imageTitleErrors"
              />
              <v-img :src="url"></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancel">Close</v-btn>
        <v-btn
          color="primary"
          @click="submitImage"
          :disabled="submitButtonDisabled"
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//import { mapState } from "vuex";
import { storeService } from "../services";
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

//Custom validator
//TODO custom validator for image dimensions
const file_size_validation = file => {
  if (!file) {
    return true;
  }
  console.log(file);
  console.log(file.size);
  return file.size <= 4000000; //4mb
  //return file.size < 100; // 100 = 100byte
};

export default {
  name: "AddStoreImageDialog",

  mixins: [validationMixin],

  validations: {
    file: { required, file_size_validation },
    imageTitle: { required }
  },

  data() {
    return {
      dialog: false,
      //imageSrc: "",
      imageTitle: "",
      file: null,
      url: ""
    };
  },

  props: {
    value: Boolean
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$v.$reset();
        this.$emit("input", value);
      }
    },
    imageTitleErrors() {
      const errors = [];
      if (!this.$v.imageTitle.$dirty) return errors;
      !this.$v.imageTitle.required && errors.push("A title is required");
      return errors;
    },
    fileErrors() {
      const errors = [];
      if (!this.$v.file.$dirty) return errors;
      !this.$v.file.required && errors.push("A file is required");
      !this.$v.file.file_size_validation &&
        errors.push("The file is too large");
      return errors;
    },
    submitButtonDisabled() {
      if (!this.file || !this.imageTitle) {
        return true;
      }
      return false;
    }
    //...mapState("account", ["user", "loggedIn"])
  },

  methods: {
    submitImage: async function() {
      //Another image preview method:
      //Note that URL may be prefixed in webkit-browsers, so use: var url = (URL || webkitURL).createObjectURL(...);
      //let imageURL = URL.createObjectURL(this.imageUpload);
      //console.log(imageURL);
      //URL.revokeObjectURL(imageURL); //"destroys" the blob url
      console.log(this.file.size);
      let response = "";
      if (!this.file) {
        return;
      }
      try {
        response = await storeService.getImageBuffer(this.file);
      } catch (error) {
        console.log(error);
        return;
      }

      let data = {
        //src: this.imageSrc,
        src: response.buffer,
        size: this.file.size,
        //file: this.imageUpload,
        title: this.imageTitle
      };
      this.$emit("add-store-image", data);

      //console.log(data);
      //this.imageSrc = "";
      this.imageTitle = "";
      this.url = "";
      this.file = null;
      this.$v.$reset();
      this.show = false;
    },
    cancel() {
      this.$v.$reset();
      //this.imageSrc = "";
      this.imageTitle = "";
      this.url = "";
      this.file = null;
      this.show = false;
    }
  }
};
</script>

<style></style>

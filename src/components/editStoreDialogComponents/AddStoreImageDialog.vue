<template>
  <v-dialog v-model="show" max-width="600px">
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>
          {{
            $t(
              "storeProfile.editStoreDialog.tabs.storeProfile.images.dialog.headline"
            )
          }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- <v-card-title>
        <span class="imageDialogHeadline">
          {{
            $t(
              "storeProfile.editStoreDialog.tabs.storeProfile.images.dialog.headline"
            )
          }}
        </span>
      </v-card-title> -->
      <v-card-text class="mt-3">
        <v-container fluid class="ma-0 pa-0">
          <v-row>
            <v-col>
              <!-- <v-text-field v-model="imageSrc" label="Image Src*" required /> -->
              <v-file-input
                v-model="file"
                prepend-icon="mdi-camera"
                accept="image/*"
                :label="
                  $t(
                    'storeProfile.editStoreDialog.tabs.storeProfile.images.dialog.inputLabel'
                  ) + '*'
                "
                show-size
                truncate-length="15"
                required
                :error-messages="fileErrors"
                @input="$v.file.$touch()"
                @blur="$v.file.$touch()"
              ></v-file-input>
              <!-- @change="Preview_image" -->
              <v-text-field
                v-model="imageTitle"
                :label="
                  $t(
                    'storeProfile.editStoreDialog.tabs.storeProfile.images.dialog.titleLabel'
                  ) + '*'
                "
                required
                :error-messages="imageTitleErrors"
                @keyup.enter="submitImage()"
                @input="$v.imageTitle.$touch()"
                @blur="$v.imageTitle.$touch()"
              />
              <v-img :src="url"></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancel">
          {{
            $t(
              "storeProfile.editStoreDialog.tabs.storeProfile.images.dialog.closeButton"
            )
          }}
        </v-btn>
        <v-btn
          color="primary"
          :disabled="submitButtonDisabled"
          @click="submitImage()"
        >
          {{
            $t(
              "storeProfile.editStoreDialog.tabs.storeProfile.images.dialog.saveButton"
            )
          }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { getBase64StringFromFile } from "../../helpers";

//Custom validator
// TODO custom validator for image dimensions
const file_size_validation = (file) => {
  if (!file) {
    return true;
  }
  // console.log(file);
  // console.log(file.size);
  return file.size <= 4000000; //4mb
  //return file.size < 100; // 100 = 100byte
};

export default {
  name: "AddStoreImageDialog",

  mixins: [validationMixin],

  validations: {
    file: { required, file_size_validation },
    imageTitle: { required },
  },

  props: {
    value: Boolean,
  },

  data() {
    return {
      dialog: false,
      imageTitle: "",
      file: null,
      url: "",
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$v.$reset();
        this.$emit("input", value);
      },
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
    },
    //...mapState("account", ["user", "loggedIn"])
  },

  methods: {
    async submitImage() {
      //Another image preview method:
      //Note that URL may be prefixed in webkit-browsers, so use: var url = (URL || webkitURL).createObjectURL(...);
      //let imageURL = URL.createObjectURL(this.imageUpload);
      //console.log(imageURL);
      //URL.revokeObjectURL(imageURL); //"destroys" the blob url
      console.log(this.file.size);
      console.log(this.file);

      if (!this.file) {
        return;
      }

      let base64String;
      try {
        console.log(this.file);
        base64String = await getBase64StringFromFile(this.file);
        console.log(base64String.substr(0, 50));
        // console.log(Buffer.from(buffer, "base64"));
        // console.log(
        //   Buffer.from(buffer.substr("data:image/jpeg;base64,".length), "base64")
        // );
        // response = await storeService.getImageBuffer(this.file);
        // console.log(response.buffer.substr(0, 50));
      } catch (error) {
        console.log(error);
        return;
      }
      const data = {
        src: base64String,
        size: this.file.size,
        title: this.imageTitle,
        name: this.file.name,
        originalName: this.file.originalName,
      };

      this.$emit("add-store-image", data);

      this.imageTitle = "";
      this.url = "";
      this.file = null;
      this.$v.$reset();
      this.show = false;
    },

    cancel() {
      this.$v.$reset();
      this.imageTitle = "";
      this.url = "";
      this.file = null;
      this.show = false;
    },
  },
};
</script>

<style></style>

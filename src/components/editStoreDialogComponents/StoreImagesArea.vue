<template>
  <v-card class="ma-1">
    <v-container>
      <v-row>
        <AddStoreImageDialog
          v-model="showAddStoreImageDialog"
          v-on:add-store-image="addNewImageToArray"
        />
        <v-col
          v-for="(img, index) in this.storeImages"
          :key="index"
          cols="12"
          xs="6"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card flat tile>
            <v-img :src="img.src" height="200px" class="grey lighten-2">
              <v-btn
                icon
                outlined
                absolute
                top
                left
                color="red"
                @click="deleteImage(index)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-row align="center">
              <v-card-title>{{ img.title }}</v-card-title>
              <v-spacer />
              <v-btn
                icon
                :disabled="getImgSortArrLeftDisabled(index)"
                @click="sortArrowLeftClick(index)"
              >
                <v-icon color="primary"> mdi-arrow-left-bold </v-icon>
              </v-btn>
              <v-btn
                icon
                :disabled="getImgSortArrRightDisabled(index)"
                @click="sortArrowRightClick(index)"
              >
                <v-icon color="primary"> mdi-arrow-right-bold </v-icon>
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          xs="6"
          sm="6"
          md="4"
          lg="3"
          v-if="storeImages.length !== storeImagesMax"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              tile
              color="grey lighten-3"
              class="d-flex justify-center align-center"
              height="200px"
              @click="showAddStoreImageDialog = true"
            >
              <v-btn xLarge dark color="grey lighten-1">
                <v-icon xLarge>mdi-plus</v-icon>
              </v-btn>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <div
        v-if="
          storeImages.length <= storeImagesMax &&
            storeImages.length >= storeImagesMin
        "
        class="text-caption text-right"
      >
        {{ storeImages.length }} / {{ storeImagesMax }}
      </div>
      <div v-else class="text-caption text-right red--text">
        {{ storeImages.length }} / {{ storeImagesMax }}
      </div>
      <div v-if="$v.storeImages.$invalid" class="text-body-2 red--text">
        {{ storeImagesErrors[0] }}
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

import AddStoreImageDialog from "../AddStoreImageDialog";
import { StoreImagesAreaMode } from "./StoreImagesAreaMode";

export default {
  name: "StoreImagesArea",

  components: {
    AddStoreImageDialog: AddStoreImageDialog
  },

  mixins: [validationMixin],

  props: {
    mode: String
  },

  validations: {
    storeImages: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(10)
    }
  },

  data() {
    return {
      storeImages: [],
      storeImagesMin: 1,
      storeImagesMax: 10,
      showAddStoreImageDialog: false
    };
  },

  watch: {},

  computed: {
    storeImagesErrors() {
      const errors = [];
      var imageArray = this.$v.storeImages;
      if (!imageArray.$dirty) return errors;
      !imageArray.maxLength &&
        errors.push(
          `There must be at most ${this.storeImagesMax} images for a store.`
        );
      !imageArray.minLength &&
        errors.push(
          `There must be at least ${this.storeImagesMin} images for a store.`
        );
      !imageArray.required &&
        errors.push("At least one store image is required.");
      return errors;
    }
  },

  methods: {
    addNewImageToArray(newImage) {
      newImage["id"] = this.storeImages.length + 1;
      this.storeImages.push(newImage);
      this.$v.storeImages.$touch();
      console.log(this.storeImages);
      this.$emit("set-store-images-array", this.storeImages);
      this.enableButton();
    },

    deleteImage(index) {
      this.storeImages.splice(index, 1);
      this.$v.storeImages.$touch();
      this.$emit("set-store-images-array", this.storeImages);
      if (this.storeImages.length === 0) {
        this.disableButton();
      }
    },

    disableButton() {
      if (this.mode === StoreImagesAreaMode.CREATE) {
        this.$emit("disable-continue-button-3");
      } else if (this.mode === StoreImagesAreaMode.EDIT) {
        this.$emit("disable-save-button");
      }
    },
    enableButton() {
      if (this.mode === StoreImagesAreaMode.CREATE) {
        this.$emit("enable-continue-button-3");
      } else if (this.mode === StoreImagesAreaMode.EDIT) {
        this.$emit("enable-save-button");
      }
    },
    array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr; // for testing
    },

    sortArrowLeftClick(index) {
      if (index > 0) {
        this.storeImages = this.array_move(this.storeImages, index, index - 1);
        this.$emit("set-store-images-array", this.storeImages);
      }
    },

    sortArrowRightClick(index) {
      if (index + 1 < this.storeImages.length) {
        this.storeImages = this.array_move(this.storeImages, index, index + 1);
        this.$emit("set-store-images-array", this.storeImages);
      }
    },

    getImgSortArrLeftDisabled(index) {
      if (index === 0) {
        return true;
      } else {
        return false;
      }
    },

    getImgSortArrRightDisabled(index) {
      if (index + 1 === this.storeImages.length) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style></style>

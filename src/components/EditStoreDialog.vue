<template>
  <v-dialog v-model="show" max-width="80%" @click:outside="cancel">
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit Your Store</span>
      </v-card-title>

      <v-card class="ma-3">
        <v-container fluid>
          <div class="text-subtitle-1 text-left">Images</div>
          <!--           <v-btn
            @click.stop="showAddStoreImageDialog = true"
            fab
            absolute
            top
            right
            dark
            color="pink"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn> -->
          <AddStoreImageDialog
            v-model="showAddStoreImageDialog"
            v-on:add-store-image="addNewImageToArray"
          />

          <v-row>
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
                <v-img :src="img.src" height="150px" class="grey lighten-2">
                  <v-btn
                    icon
                    outlined
                    absolute
                    top
                    left
                    color="white"
                    @click="deleteImage(index)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <v-card-title>{{ img.title }}</v-card-title>
              </v-card>
            </v-col>
            <v-col cols="12" xs="6" sm="6" md="4" lg="3">
              <v-hover v-slot:default="{ hover }">
                <v-card
                  :elevation="hover ? 16 : 2"
                  :class="{ 'on-hover': hover }"
                  tile
                  color="grey lighten-3"
                  class="d-flex justify-center align-center"
                  height="150px"
                  @click="showAddStoreImageDialog = true"
                >
                  <!-- <v-row>
                    <v-col> -->
                  <v-btn xLarge dark color="grey lighten-1">
                    <v-icon xLarge>mdi-plus</v-icon>
                  </v-btn>
                  <!-- </v-col>
                  </v-row> -->
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-card class="ma-3">
        <v-container>
          <v-text-field
            v-model="storeTitle"
            :counter="100"
            label="Store Title*"
            required
          />
        </v-container>
      </v-card>

      <v-card class="ma-3">
        <v-container>
          <v-combobox
            v-model="tagsComboBoxModel"
            :items="tagsComboBoxItems"
            label="Store Tags*"
            multiple
            chips
            deletable-chips
          />
        </v-container>
      </v-card>

      <v-card class="ma-3">
        <v-container>
          <v-textarea
            v-model="storeDescription"
            :counter="1000"
            label="Store Description*"
            required
          />
        </v-container>
      </v-card>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo" text @click="cancel">Close</v-btn>
        <v-btn color="indigo" dark @click="submitEditStore">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//<v-btn text @click="e6 = e6 - 1">Cancel</v-btn>
//<small>Summarize if needed</small>

import AddStoreImageDialog from "../components/AddStoreImageDialog";
import { mapState, mapActions } from "vuex";

import { storeService } from "../services";

export default {
  name: "EditStoreDialog",
  components: {
    AddStoreImageDialog: AddStoreImageDialog
  },
  props: {
    value: Boolean,
    profileData: Object
  },
  watch: {
    profileData: function(newVal) {
      if (newVal != null) {
        this.storeTitle = newVal.title;
        this.storeSubtitle = "";
        this.storeDescription = newVal.description;
        this.tagsComboBoxModel = newVal.tags;
        this.storeImages = [...newVal.images];
      }
    }
  },
  data() {
    return {
      showAddStoreImageDialog: false,
      //dialog: false,
      storeTitle: "",
      storeSubtitle: "",
      storeDescription: "",
      storeImages: [],
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
    submitEditStore: async function() {
      var payload = {
        storeId: this.$route.params.id,
        title: this.storeTitle,
        description: this.storeDescription,
        tags: this.tagsComboBoxModel,
        images: this.storeImages
      };
      this.$emit("overlay-start");
      await storeService.editStore(payload);
      this.$emit("edit-store", payload);
      this.$emit("overlay-end");
      this.show = false;
    },
    cancel() {
      console.log(this.profileData);
      this.storeTitle = this.profileData.title;
      this.storeDescription = this.profileData.description;
      this.tagsComboBoxModel = this.profileData.tags;
      this.storeImages = [...this.profileData.images];
      this.show = false;
    },
    printTest() {
      console.log("hi");
    },
    deleteImage(index) {
      this.storeImages.splice(index, 1);
    },
    addNewImageToArray(newImage) {
      newImage["id"] = this.storeImages.length + 1;
      this.storeImages.push(newImage);
      console.log(this.storeImages);
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

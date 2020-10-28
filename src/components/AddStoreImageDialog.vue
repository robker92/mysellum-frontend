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
              <v-text-field v-model="imageSrc" label="Image Src*" required />
              <v-text-field
                v-model="imageTitle"
                label="Image Title*"
                required
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="cancel">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submitImage">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//import { mapState } from "vuex";
//import { storeService } from "../services";

export default {
  name: "AddStoreImageDialog",
  data() {
    return {
      dialog: false,
      imageSrc: "",
      imageTitle: ""
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
        this.$emit("input", value);
      }
    }
    //...mapState("account", ["user", "loggedIn"])
  },

  methods: {
    /*     submitImage: async function() {
      var data = {
        storeId: this.$route.params.id,
        imageSrc: this.imageSrc,
        title: this.imageTitle
      };
      console.log(data);

      var addImageResult = await storeService.addStoreImage(data);
      this.$emit("add-store-image", addImageResult.imageData);

      //console.log(data);
      this.imageSrc = "";
      this.imageTitle = "";
      this.show = false;
    }, */
    submitImage: async function() {
      var data = {
        src: this.imageSrc,
        title: this.imageTitle
      };

      this.$emit("add-store-image", data);

      //console.log(data);
      this.imageSrc = "";
      this.imageTitle = "";
      this.show = false;
    },
    cancel() {
      this.imageSrc = "";
      this.imageTitle = "";
      this.show = false;
    }
  }
};
</script>

<style></style>

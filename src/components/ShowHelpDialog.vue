<template>
  <v-dialog v-model="show" max-width="600px" @keydown.esc="cancel">
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-icon left>mdi-information-outline</v-icon>
        <v-toolbar-title> {{ title }}</v-toolbar-title>
      </v-toolbar>
      <!-- <v-card-title>
        <span class="reviewDialogHeadline">{{ title }}</span>
      </v-card-title> -->
      <v-card-text>
        <v-container>
          <div class="text-body-1">
            {{ text }}
          </div>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" dark @click="close">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//
export default {
  name: "ShowHelpDialog",

  data() {
    return {
      //dialog: false
    };
  },

  props: {
    value: Boolean,
    title: String,
    text: String
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
    close() {
      this.show = false;
    }
  }
};
</script>

<style></style>

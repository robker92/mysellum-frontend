<template>
  <v-dialog v-model="show" max-width="85%" @click:outside="cancel">
    <v-card>
      <v-card-title> Confirmation </v-card-title>
      <v-card-text>
        You are about to leave the dialog, but you made some changes.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo" text @click="cancel">Close</v-btn>
        <v-btn color="indigo" dark @click="submitEditStore">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Confirmation Dialog",
  components: {},
  mixins: [],
  props: {
    value: Boolean
  },
  data() {
    return {};
  },
  watch: {},
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
  methods: {}
};
</script>

<style></style>

<template>
  <v-dialog v-model="show" max-width="60%" @click:outside="close">
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title
          >Enter the Opening and Close Times for
          {{ dayInTitle }}</v-toolbar-title
        >
        <v-spacer />
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-row justify="space-around" align="center">
          <v-col cols="12" lg="4">
            <h2 class="text-left">Open:</h2>
            <v-time-picker
              v-model="start"
              :max="end"
              format="24hr"
            ></v-time-picker>
          </v-col>
          <v-col cols="12" lg="4">
            <h2 class="text-left">Close:</h2>
            <v-time-picker
              v-model="end"
              :min="start"
              format="24hr"
            ></v-time-picker>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="close">Close</v-btn>
        <v-btn color="primary" dark @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "OpeningHoursDialog",
  components: {},
  mixins: [],
  props: {
    value: Boolean,
    dialogForDay: { type: String, default: "monday" },
    openProp: String,
    closedProp: String,
  },
  data() {
    return {
      start: null,
      end: null,
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    dayInTitle: {
      get() {
        let string =
          this.dialogForDay.charAt(0).toUpperCase() +
          this.dialogForDay.slice(1) +
          "s";
        return string;
      },
    },
  },

  watch: {
    show() {
      if (this.show) {
        if (this.openProp && this.openProp !== "00:00") {
          this.start = this.openProp;
        } else {
          this.start = null;
        }
        if (this.closedProp && this.closedProp !== "00:00") {
          this.end = this.closedProp;
        } else {
          this.end = null;
        }
      }
    },
    // openProp(value) {
    //   console.log(`hi1`);
    //   this.start = value;
    // },
    // closedProp(value) {
    //   this.end = value;
    // },
  },

  mounted() {},

  methods: {
    save() {
      this.$emit(
        "set-opening-hours",
        `${this.start}-${this.end}`,
        this.dialogForDay
      );
      this.show = false;
    },
    close() {
      this.show = false;
    },
  },
};
</script>

<style></style>

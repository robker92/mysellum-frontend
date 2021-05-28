<template>
  <v-dialog v-model="show" width="400px" @click:outside="cancel">
    <ShowHelpDialog
      v-model="showShowHelpDialog"
      :title="helpDialogTitle"
      :text="helpDialogMessage"
    />
    <v-card>
      <v-card-title>
        <span>Set Tracking Id</span>
      </v-card-title>
      <v-card-text>
        <v-container fluid class="ma-0 pa-0">
          <v-text-field
            prepend-icon="mdi-map-marker-path"
            v-model="trackingId"
            label="Tracking Id (optional)"
            @keyup.enter.native="submit"
            append-outer-icon="mdi-information"
            @click:append-outer="
              showHelp(
                'You can add a tracking id which will help the customer to track the delivery.',
                'Tracking Id'
              )
            "
          />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
        <v-btn color="blue darken-1" dark @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ShowHelpDialog from "../ShowHelpDialog";

export default {
  name: "",
  components: {
    ShowHelpDialog: ShowHelpDialog
  },
  mixins: [],
  props: {
    value: Boolean
  },
  data() {
    return {
      trackingId: "",
      showShowHelpDialog: false
    };
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
  methods: {
    submit() {
      console.log(this.trackingId);
      let data = {
        trackingId: trackingId,
        step: "inDelivery"
      };
      this.$emit("set-status", data);
      this.show = false;
    },
    cancel() {
      this.trackingId = "";
      this.show = false;
    },
    showHelp(message, title) {
      this.helpDialogTitle = title;
      this.helpDialogMessage = message;
      this.showShowHelpDialog = true;
    }
  }
};
</script>

<style></style>

<template>
  <div>
    <OpeningHoursDialog
      v-model="showOpeningHoursDialog"
      :dialog-for-day="dialogForDay"
      :open-prop="openProp"
      :closed-prop="closedProp"
      @set-opening-hours="setOpeningHours"
    />

    <div class="ma-3">
      <v-alert type="info" text dense class="text-left">
        Opening Hours
      </v-alert>
    </div>

    <v-card class="ma-3">
      <v-container class="inputs-container">
        <!-- MONDAY -->
        <v-row align="center">
          <v-col cols="12" sm="4" md="3" lg="2">
            <v-checkbox
              v-model="openMonday"
              label="Monday"
              @click="openingHoursChanged"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="2">
            <div v-if="openMonday === false" class="red--text text-left">
              Closed
            </div>
            <div v-if="openMonday === true" class="green--text text-left">
              Open from
            </div>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="2">
            <v-text-field
              v-model="openingHoursMonday"
              readonly
              label="Enter Opening Hours"
              :disabled="dayDisabled('monday')"
              dense
              @click="
                dialogForDay = 'monday';
                showOpeningHoursDialog = true;
                openProp = getOpenedTime(openingHoursMonday);
                closedProp = getClosedTime(openingHoursMonday);
              "
            >
            </v-text-field>
          </v-col>
        </v-row>

        <!-- TUESDAY -->
        <v-row align="center">
          <v-col cols="12" sm="4" md="3" lg="2">
            <v-checkbox
              v-model="openTuesday"
              label="Tuesday"
              @click="openingHoursChanged"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="2">
            <div v-if="openTuesday === false" class="red--text text-left">
              Closed
            </div>
            <div v-if="openTuesday === true" class="green--text text-left">
              Open from
            </div>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="2">
            <v-text-field
              v-model="openingHoursTuesday"
              readonly
              label="Enter Opening Hours"
              :disabled="dayDisabled('tuesday')"
              dense
              @click="
                dialogForDay = 'tuesday';
                showOpeningHoursDialog = true;
                openProp = getOpenedTime(openingHoursTuesday);
                closedProp = getClosedTime(openingHoursTuesday);
              "
            >
            </v-text-field>
          </v-col>
        </v-row>

        <!-- WEDNESDAY -->
        <v-row align="center">
          <v-col cols="12" sm="4" md="3" lg="2">
            <v-checkbox
              v-model="openWednesday"
              label="Wednesday"
              @click="openingHoursChanged"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="2">
            <div v-if="openWednesday === false" class="red--text text-left">
              Closed
            </div>
            <div v-if="openWednesday === true" class="green--text text-left">
              Open from
            </div>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="2">
            <v-text-field
              v-model="openingHoursWednesday"
              readonly
              label="Enter Opening Hours"
              :disabled="dayDisabled('wednesday')"
              dense
              @click="
                dialogForDay = 'wednesday';
                showOpeningHoursDialog = true;
                openProp = getOpenedTime(openingHoursWednesday);
                closedProp = getClosedTime(openingHoursWednesday);
              "
            >
            </v-text-field>
          </v-col>
        </v-row>

        <!-- THURSDAY -->
        <v-row align="center">
          <v-col cols="12" sm="4" md="3" lg="2">
            <v-checkbox
              v-model="openThursday"
              label="Thursday"
              @click="openingHoursChanged"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="2">
            <div v-if="openThursday === false" class="red--text text-left">
              Closed
            </div>
            <div v-if="openThursday === true" class="green--text text-left">
              Open from
            </div>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="2">
            <v-text-field
              v-model="openingHoursThursday"
              readonly
              label="Enter Opening Hours"
              :disabled="dayDisabled('thursday')"
              dense
              @click="
                dialogForDay = 'thursday';
                showOpeningHoursDialog = true;
                openProp = getOpenedTime(openingHoursThursday);
                closedProp = getClosedTime(openingHoursThursday);
              "
            >
            </v-text-field>
          </v-col>
        </v-row>

        <!-- FRIDAY -->
        <v-row align="center">
          <v-col cols="12" sm="4" md="3" lg="2">
            <v-checkbox
              v-model="openFriday"
              label="Friday"
              @click="openingHoursChanged"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="2">
            <div v-if="openFriday === false" class="red--text text-left">
              Closed
            </div>
            <div v-if="openFriday === true" class="green--text text-left">
              Open from
            </div>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="2">
            <v-text-field
              v-model="openingHoursFriday"
              readonly
              label="Enter Opening Hours"
              :disabled="dayDisabled('friday')"
              dense
              @click="
                dialogForDay = 'friday';
                showOpeningHoursDialog = true;
                openProp = getOpenedTime(openingHoursFriday);
                closedProp = getClosedTime(openingHoursFriday);
              "
            >
            </v-text-field>
          </v-col>
        </v-row>

        <!-- SATURDAY -->
        <v-row align="center">
          <v-col cols="12" sm="4" md="3" lg="2">
            <v-checkbox
              v-model="openSaturday"
              label="Saturday"
              @click="openingHoursChanged"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="2">
            <div v-if="openSaturday === false" class="red--text text-left">
              Closed
            </div>
            <div v-if="openSaturday === true" class="green--text text-left">
              Open from
            </div>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="2">
            <v-text-field
              v-model="openingHoursSaturday"
              readonly
              label="Enter Opening Hours"
              :disabled="dayDisabled('saturday')"
              dense
              @click="
                dialogForDay = 'saturday';
                showOpeningHoursDialog = true;
                openProp = getOpenedTime(openingHoursSaturday);
                closedProp = getClosedTime(openingHoursSaturday);
              "
            >
            </v-text-field>
          </v-col>
        </v-row>

        <!-- SUNDAY -->
        <v-row align="center">
          <v-col cols="12" sm="4" md="3" lg="2">
            <v-checkbox
              v-model="openSunday"
              label="Sunday"
              @click="openingHoursChanged"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="2">
            <div v-if="openSunday === false" class="red--text text-left">
              Closed
            </div>
            <div v-if="openSunday === true" class="green--text text-left">
              Open from
            </div>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="2">
            <v-text-field
              v-model="openingHoursSunday"
              readonly
              label="Enter Opening Hours"
              :disabled="dayDisabled('sunday')"
              dense
              @click="
                dialogForDay = 'sunday';
                showOpeningHoursDialog = true;
                openProp = getOpenedTime(openingHoursSunday);
                closedProp = getClosedTime(openingHoursSunday);
              "
            >
            </v-text-field>
          </v-col>
        </v-row>

        <v-btn @click="print">Print</v-btn>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
function between(x, min, max) {
  return x >= min && x <= max;
}
const timeRangeFormat = (value) => {
  console.log(value);
  if (!value) {
    return true;
  }
  let bool = true;
  if (!between(parseInt(value[0]), 0, 2)) {
    bool = false;
  }
  if (!between(parseInt(value[1]), 0, 9)) {
    bool = false;
  }
  if (value[2] !== ":") {
    bool = false;
  }
  if (!between(parseInt(value[3]), 0, 5)) {
    bool = false;
  }
  if (!between(parseInt(value[4]), 0, 9)) {
    bool = false;
  }
  if (value[5] !== "-") {
    bool = false;
  }
  if (!between(parseInt(value[6]), 0, 2)) {
    bool = false;
  }
  if (!between(parseInt(value[7]), 0, 9)) {
    bool = false;
  }
  if (value[8] !== ":") {
    bool = false;
  }
  if (!between(parseInt(value[9]), 0, 5)) {
    bool = false;
  }
  if (!between(parseInt(value[10]), 0, 9)) {
    bool = false;
  }
  return bool;
};

import OpeningHoursDialog from "./OpeningHoursDialog.vue";

export default {
  name: "OpeningHoursTab",
  components: {
    OpeningHoursDialog: OpeningHoursDialog,
  },
  mixins: [validationMixin],
  validations: {
    // timeRange: { required, timeRangeFormat },
    openingHoursMonday: {
      required,
      timeRangeFormat,
    },
  },
  props: { openingHours: Object },
  data() {
    return {
      start: null,
      end: null,
      showOpeningHoursDialog: false,
      dialogForDay: "",
      openProp: "",
      closedProp: "",
      // Monday
      openMonday: false,
      openingHoursMonday: "",
      // Tuesday
      openTuesday: false,
      openingHoursTuesday: "",
      // Wednesday
      openWednesday: false,
      openingHoursWednesday: "",
      // Thursday
      openThursday: false,
      openingHoursThursday: "",
      // Friday
      openFriday: false,
      openingHoursFriday: "",
      // Saturday
      openSaturday: false,
      openingHoursSaturday: "",
      // Sunday
      openSunday: false,
      openingHoursSunday: "",
    };
  },

  computed: {
    dayDisabled: function() {
      let vm = this;
      return function(day) {
        let disabled;
        switch (day) {
          case "monday":
            disabled = !vm.openMonday ? true : false;
            break;
          case "tuesday":
            disabled = !vm.openTuesday ? true : false;
            break;
          case "wednesday":
            disabled = !vm.openWednesday ? true : false;
            break;
          case "thursday":
            disabled = !vm.openThursday ? true : false;
            break;
          case "friday":
            disabled = !vm.openFriday ? true : false;
            break;
          case "saturday":
            disabled = !vm.openSaturday ? true : false;
            break;
          case "sunday":
            disabled = !vm.openSunday ? true : false;
            break;

          default:
            break;
        }
        return disabled;
      };
    },
    // this.$v.$reset();
    // timeRangeErrors() {
    //   const errors = [];
    //   if (!this.$v.timeRange.$dirty) return errors;
    //   !this.$v.timeRange.required &&
    //     errors.push("An indication of your opening times is required.");
    //   !this.$v.timeRange.timeRangeFormat &&
    //     errors.push("This format for the time range is not supported.");
    //   return errors;
    // },
  },

  watch: {
    openingHours() {
      this.initializeData();
    },
  },

  mounted() {
    this.initializeData();
  },

  methods: {
    initializeData() {
      console.log(this.$props.openingHours);
      if (this.openingHours) {
        // Monday
        this.openMonday = this.openingHours.monday.opened;
        if (this.openingHours.monday.times.open) {
          this.openingHoursMonday =
            this.openingHours.monday.times.open +
            "-" +
            this.openingHours.monday.times.close;
        }
        // Tuesday
        this.openTuesday = this.openingHours.tuesday.opened;
        if (this.openingHours.tuesday.times.open) {
          this.openingHoursTuesday =
            this.openingHours.tuesday.times.open +
            "-" +
            this.openingHours.tuesday.times.close;
        }
        // Wednesday
        this.openWednesday = this.openingHours.wednesday.opened;
        if (this.openingHours.wednesday.times.open) {
          this.openingHoursWednesday =
            this.openingHours.wednesday.times.open +
            "-" +
            this.openingHours.wednesday.times.close;
        }
        // Thursday
        this.openThursday = this.openingHours.thursday.opened;
        if (this.openingHours.thursday.times.open) {
          this.openingHoursThursday =
            this.openingHours.thursday.times.open +
            "-" +
            this.openingHours.thursday.times.close;
        }
        // Friday
        this.openFriday = this.openingHours.friday.opened;
        if (this.openingHours.friday.times.open) {
          this.openingHoursFriday =
            this.openingHours.friday.times.open +
            "-" +
            this.openingHours.friday.times.close;
        }
        // Saturday
        this.openSaturday = this.openingHours.saturday.opened;
        if (this.openingHours.saturday.times.open) {
          this.openingHoursSaturday =
            this.openingHours.saturday.times.open +
            "-" +
            this.openingHours.saturday.times.close;
        }
        // Sunday
        this.openSunday = this.openingHours.sunday.opened;
        if (this.openingHours.sunday.times.open) {
          this.openingHoursSunday =
            this.openingHours.sunday.times.open +
            "-" +
            this.openingHours.sunday.times.close;
        }
      }
    },

    setOpeningHours(openingHours, day) {
      if (openingHours.includes("null")) {
        return;
      }

      if (day === "monday") {
        this.openingHoursMonday = openingHours;
      }
      if (day === "tuesday") {
        this.openingHoursTuesday = openingHours;
      }
      if (day === "wednesday") {
        this.openingHoursWednesday = openingHours;
      }
      if (day === "thursday") {
        this.openingHoursThursday = openingHours;
      }
      if (day === "friday") {
        this.openingHoursFriday = openingHours;
      }
      if (day === "saturday") {
        this.openingHoursSaturday = openingHours;
      }
      if (day === "sunday") {
        this.openingHoursSunday = openingHours;
      }
      const data = this.getCurrentOpeningHoursData();
      this.$emit("opening-hours-changed", data);
    },

    openingHoursChanged() {
      const data = this.getCurrentOpeningHoursData();
      this.$emit("opening-hours-changed", data);
    },

    getCurrentOpeningHoursData() {
      const data = {
        monday: {
          opened: this.openMonday,
          times: {
            open: this.getOpenedTime(this.openingHoursMonday),
            close: this.getClosedTime(this.openingHoursMonday),
          },
        },
        tuesday: {
          opened: this.openTuesday,
          times: {
            open: this.getOpenedTime(this.openingHoursTuesday),
            close: this.getClosedTime(this.openingHoursTuesday),
          },
        },
        wednesday: {
          opened: this.openWednesday,
          times: {
            open: this.getOpenedTime(this.openingHoursWednesday),
            close: this.getClosedTime(this.openingHoursWednesday),
          },
        },
        thursday: {
          opened: this.openThursday,
          times: {
            open: this.getOpenedTime(this.openingHoursThursday),
            close: this.getClosedTime(this.openingHoursThursday),
          },
        },
        friday: {
          opened: this.openFriday,
          times: {
            open: this.getOpenedTime(this.openingHoursFriday),
            close: this.getClosedTime(this.openingHoursFriday),
          },
        },
        saturday: {
          opened: this.openSaturday,
          times: {
            open: this.getOpenedTime(this.openingHoursSaturday),
            close: this.getClosedTime(this.openingHoursSaturday),
          },
        },
        sunday: {
          opened: this.openSunday,
          times: {
            open: this.getOpenedTime(this.openingHoursSunday),
            close: this.getClosedTime(this.openingHoursSunday),
          },
        },
      };
      return data;
    },

    getOpenedTime(openingHours) {
      if (openingHours === "") {
        return "00:00";
      }
      return openingHours.substr(0, 5);
    },

    getClosedTime(openingHours) {
      if (openingHours === "") {
        return "00:00";
      }
      return openingHours.substr(6, 5);
    },

    print() {
      console.log(this.openingHours);
    },
  },
};
</script>

<style></style>

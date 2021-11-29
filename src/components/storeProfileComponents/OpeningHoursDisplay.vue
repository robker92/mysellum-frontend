<template>
  <v-card max-width="344" flat>
    <!-- <v-card-title>Regular Opening Hours</v-card-title> -->
    <v-card-text class="black--text">
      <v-row>
        <v-col cols="12" sm="4" md="4" lg="4">
          <div class="text-left text-body-1">
            {{ $t("storeProfile.openingHoursDisplay.mondayLabel") }}
          </div>
        </v-col>
        <v-col cols="12" sm="8" md="8" lg="8">
          <div v-if="openingHours.monday.opened" class="text-left text-body-1">
            {{ openingHours.monday.times.open }} -
            {{ openingHours.monday.times.close }}
          </div>
          <div v-else class="text-left text-body-1">
            {{ $t("storeProfile.openingHoursDisplay.closedLabel") }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="4" lg="4">
          <div class="text-left text-body-1">
            {{ $t("storeProfile.openingHoursDisplay.tuesdayLabel") }}
          </div>
        </v-col>
        <v-col cols="12" sm="8" md="8" lg="8">
          <div v-if="openingHours.tuesday.opened" class="text-left text-body-1">
            {{ openingHours.tuesday.times.open }} -
            {{ openingHours.tuesday.times.close }}
          </div>
          <div v-else class="text-left text-body-1">
            {{ $t("storeProfile.openingHoursDisplay.closedLabel") }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="4" lg="4">
          <div class="text-left text-body-1">
            {{ $t("storeProfile.openingHoursDisplay.wednesdayLabel") }}
          </div>
        </v-col>
        <v-col cols="12" sm="8" md="8" lg="8">
          <div
            v-if="openingHours.wednesday.opened"
            class="text-left text-body-1"
          >
            {{ openingHours.wednesday.times.open }} -
            {{ openingHours.wednesday.times.close }}
          </div>
          <div v-else class="text-left text-body-1">
            {{ $t("storeProfile.openingHoursDisplay.closedLabel") }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="4" lg="4">
          <div class="text-left text-body-1">
            {{ $t("storeProfile.openingHoursDisplay.thursdayLabel") }}
          </div>
        </v-col>
        <v-col cols="12" sm="8" md="8" lg="8">
          <div
            v-if="openingHours.thursday.opened"
            class="text-left text-body-1"
          >
            {{ openingHours.thursday.times.open }} -
            {{ openingHours.thursday.times.close }}
          </div>
          <div v-else class="text-left text-body-1">
            {{ $t("storeProfile.openingHoursDisplay.closedLabel") }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="4" lg="4">
          <div class="text-left text-body-1">
            {{ $t("storeProfile.openingHoursDisplay.fridayLabel") }}
          </div>
        </v-col>
        <v-col cols="12" sm="8" md="8" lg="8">
          <div v-if="openingHours.friday.opened" class="text-left text-body-1">
            {{ openingHours.friday.times.open }} -
            {{ openingHours.friday.times.close }}
          </div>
          <div v-else class="text-left text-body-1">
            {{ $t("storeProfile.openingHoursDisplay.closedLabel") }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="4" lg="4">
          <div class="text-left text-body-1">
            {{ $t("storeProfile.openingHoursDisplay.saturdayLabel") }}
          </div>
        </v-col>
        <v-col cols="12" sm="8" md="8" lg="8">
          <div
            v-if="openingHours.saturday.opened"
            class="text-left text-body-1"
          >
            {{ openingHours.saturday.times.open }} -
            {{ openingHours.saturday.times.close }}
          </div>
          <div v-else class="text-left text-body-1">
            {{ $t("storeProfile.openingHoursDisplay.closedLabel") }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="4" lg="4">
          <div class="text-left text-body-1">
            {{ $t("storeProfile.openingHoursDisplay.sundayLabel") }}
          </div>
        </v-col>
        <v-col cols="12" sm="8" md="8" lg="8">
          <div v-if="openingHours.sunday.opened" class="text-left text-body-1">
            {{ openingHours.sunday.times.open }} -
            {{ openingHours.sunday.times.close }}
          </div>
          <div v-else class="text-left text-body-1">
            {{ $t("storeProfile.openingHoursDisplay.closedLabel") }}
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "OpeningHoursDisplay",
  components: {},
  mixins: [],
  props: {
    openingHours: Object,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style></style>

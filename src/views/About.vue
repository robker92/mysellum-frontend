<template>
  <v-container>
    <div class="text-h3">
      Du bist nur drei Schritte von deinem lokalen kulinarischen Erlebnis
      entfernt. Ob frisches Fleisch, frischer Fisch oder doch frische Eier vom
      Bauern?
    </div>
    <v-row align="center" class="mt-5">
      <v-col cols="12" offset-lg="2" lg="4">
        <v-sheet
          rounded
          color="grey"
          class="mx-auto"
          height="350"
          width="350"
        ></v-sheet>
      </v-col>
      <v-col cols="12" lg="4">
        <div class="text-h5 font-weight-bold text-left">1. Stöbere</div>
        <div class="text-body-1 text-justify">
          Beginne, indem du Unterkünfte oder Entdeckungen durchstöberst.
          Verwende Filter, um deine gewünschten Optionen einzugrenzen. Du kannst
          beispielsweise nach gesamten Unterkünften und eigenständigem Check-in
          filtern oder danach, ob Haustiere erlaubt sind. Du hast auch die
          Möglichkeit, deine Favoriten auf einer Wunschliste zu speichern.
        </div>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" offset-lg="2" lg="4">
        <div class="text-h5 font-weight-bold text-left">2. Buche</div>
        <div class="text-body-1 text-justify">
          Du hast gefunden, wonach du suchst? Dann informiere dich über deinen
          Gastgeber, prüfe die Bewertungen anderer Gäste und mache dich mit den
          Stornierungsoptionen vertraut. Anschließend kannst du in nur wenigen
          Klicks buchen.
        </div>
      </v-col>
      <v-col cols="12" lg="4">
        <v-sheet
          rounded
          color="grey"
          class="mx-auto"
          height="350"
          width="350"
        ></v-sheet>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" offset-lg="2" lg="4">
        <v-sheet
          rounded
          color="grey"
          class="mx-auto"
          height="350"
          width="350"
        ></v-sheet>
      </v-col>
      <v-col cols="12" lg="4">
        <div class="text-h5 font-weight-bold text-left">
          3. Mach dich auf die Reise
        </div>
        <div class="text-body-1 text-justify">
          Das war’s schon! Kontaktiere deinen Gastgeber in der App, um Tipps für
          die Umgebung, Antworten auf deine Fragen oder andere Empfehlungen zu
          erhalten. Du kannst dich auch jederzeit an Airbnb wenden, wenn du
          zusätzliche Unterstützung benötigst.
        </div>
      </v-col>
    </v-row>
    <v-divider class="my-4" />
    <!-- <v-row>
      <v-col cols="12" lg="4">
        <v-card flat>


        </v-card>
      </v-col>

    </v-row> -->
    <!-- <GoogleMap v-if="mapData" v-bind:markers="mapData" /> -->
    <Testimonials />
    <v-divider class="my-4" />
    <div class="text-h6">
      Why buy?
    </div>
    <Reasons type="buy" class="mt-3" />
    <v-divider class="my-4" />
    <div class="text-h6">
      Why sell?
    </div>
    <Reasons type="sell" class="mt-3" />
    <v-divider class="my-4" />
  </v-container>
</template>

<script>
//import GoogleMap from "../components/GoogleMap.vue";
import Testimonials from "../components/Testimonials.vue";
import Reasons from "../components/Reasons.vue";
import fakeBackendData from "../fakeBackend/retailerMapInfo.json";

export default {
  name: "AboutView",
  components: {
    Testimonials: Testimonials,
    Reasons: Reasons,
  },
  data() {
    return {
      markers: fakeBackendData,
      mapData: null,
      dataset: null,
    };
  },

  mounted() {
    // this.$vuetify.goTo(0);
  },

  methods: {
    // loadMarkerData() {
    //   var data = [
    //     {
    //       location: { lat: 48.137336, lng: 11.575062 },
    //       title: "Munich Plantage 1",
    //       subtitle: "We are a small family business",
    //       offerings: "Eggs, Milk, Cheese",
    //       img: "",
    //     },
    //     {
    //       location: { lat: 48.763943, lng: 11.424562 },
    //       title: "Ingolstadt",
    //       subtitle: "This is Munich",
    //       offerings: "",
    //       img: "",
    //     },
    //     {
    //       location: { lat: 49.450801, lng: 11.077765 },
    //       title: "Nuremberg",
    //       subtitle: "This is Munich",
    //       offerings: "",
    //       img: "",
    //     },
    //     {
    //       location: { lat: 52.520402, lng: 13.408364 },
    //       title: "Berlin",
    //       subtitle: "This is Munich",
    //       offerings: "",
    //       img: "",
    //     },
    //   ];
    //   return data;
    // },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#aboutViewDiv {
  width: 80%;
  height: 800px;
  position: absolute;
  left: 10%;
}
</style>

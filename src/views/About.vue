<template>
  <div id="aboutViewDiv" class="about">
    <router-link to="/">Home</router-link>
    <h1>This is an about page</h1>
    <GoogleMap v-bind:markers="markers" />
  </div>
</template>

<script>
import GoogleMap from "../components/GoogleMap.vue";
import fakeBackendData from "../fakeBackend/retailerMapInfo.json";

export default {
  name: "AboutView",
  components: {
    GoogleMap
  },
  data() {
    return {
      markers: fakeBackendData
    };
  },
  methods: {
    loadMarkerData() {
      var data = [
        {
          location: { lat: 48.137336, lng: 11.575062 },
          title: "Munich Plantage 1",
          subtitle: "We are a small family business",
          offerings: "Eggs, Milk, Cheese",
          img: ""
        },
        {
          location: { lat: 48.763943, lng: 11.424562 },
          title: "Ingolstadt",
          subtitle: "This is Munich",
          offerings: "",
          img: ""
        },
        {
          location: { lat: 49.450801, lng: 11.077765 },
          title: "Nuremberg",
          subtitle: "This is Munich",
          offerings: "",
          img: ""
        },
        {
          location: { lat: 52.520402, lng: 13.408364 },
          title: "Berlin",
          subtitle: "This is Munich",
          offerings: "",
          img: ""
        }
      ];
      return data;
    }
  }
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

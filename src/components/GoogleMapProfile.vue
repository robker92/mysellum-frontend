<template>
  <div id="mapProfile"></div>
</template>

<script>
//import loadGoogleMapsApi from 'load-google-maps-api'
import { getGoogleMapLoader } from "../helpers";
// eslint-disable-next-line no-unused-vars
import { Loader } from "google-maps";

export default {
  name: "GoogleMapProfile",
  data() {
    return {};
  },
  props: {
    mapData: Object
  },
  async mounted() {
    console.log(this.mapData.location);
    this.startMap();
  },

  methods: {
    startMap: async function() {
      // const loader = new Loader("AIzaSyAbBngkySn9wEK5O9EZ31jUaGKe6jsg56M");
      // const google = await loader.load();

      const googleMapLoaderProfile = await getGoogleMapLoader();

      // eslint-disable-next-line no-unused-vars
      const mapProfile = new googleMapLoaderProfile.maps.Map(
        document.getElementById("mapProfile"),
        {
          center: {
            lat: this.mapData.location.lat,
            lng: this.mapData.location.lng
          },
          zoom: 13,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          rotateControl: false
          //zoomControl: false,
          //gestureHandling: "none"
        }
      );

      new googleMapLoaderProfile.maps.Marker({
        position: this.mapData.location,
        map: mapProfile,
        title: "storeMarker",
        clickable: false
      });
    }
  }
};
</script>

<style>
#mapProfile {
  width: 100%;
  height: 400px;
  margin: auto;
  overflow: visible;
}
</style>

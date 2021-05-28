<template>
  <div id="mapProfile"></div>
</template>

<script>
import { mapOptions, getMarkerIconURL } from "../../helpers";
// eslint-disable-next-line no-unused-vars
//import { Loader } from "google-maps";

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

      //const googleMapLoaderProfile = await getGoogleMapLoader();

      // eslint-disable-next-line no-unused-vars

      //const googleInstance = new google.maps;
      // eslint-disable-next-line no-undef
      const mapProfile = new google.maps.Map(
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
          rotateControl: false,
          options: { styles: mapOptions }
          //zoomControl: false,
          //gestureHandling: "none"
        }
      );

      let iconURL = getMarkerIconURL(this.mapData.mapIcon);
      console.log(iconURL);
      let icon = {
        //url: markerFishIcon, // url
        url: iconURL,
        // eslint-disable-next-line no-undef
        scaledSize: new google.maps.Size(50, 50) // scaled size
        //origin: new this.google2.maps.Point(0, 0), // origin
        //anchor: new this.google2.maps.Point(0, 0) // anchor
      };

      // eslint-disable-next-line no-undef
      new google.maps.Marker({
        position: this.mapData.location,
        map: mapProfile,
        icon: iconURL !== undefined ? icon : null,
        //animation: googleMapLoaderProfile.maps.Animation.DROP,
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

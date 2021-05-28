<template>
  <GoogleMapLoader
    :mapConfig="mapConfig"
    apiKey="AIzaSyAbBngkySn9wEK5O9EZ31jUaGKe6jsg56M"
  >
    <template slot-scope="{ google, map }">
      {{ map }}
      {{ google }}
    </template>
  </GoogleMapLoader>
</template>

<script>
import GoogleMapLoader from "./GoogleMapLoader";
//import { mapSettings } from '@/constants/mapSettings'

export default {
  components: {
    GoogleMapLoader
  },

  computed: {
    mapConfig() {
      return {
        zoom: 4,
        center: { lat: 0, lng: 0 }
      };
    }
  }
};
</script>

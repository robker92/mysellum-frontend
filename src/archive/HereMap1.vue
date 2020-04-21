<template>
  <div class="here-map">
    <div
      ref="map"
      v-bind:style="{ width: this.width, height: this.height }"
    ></div>
  </div>
</template>

<script>
/*global H*/
export default {
  name: 'HereMap',
  data() {
    return {
      map: {},
      platform: {}
    }
  },
  props: {
    appId: String,
    appCode: String,
    lat: String,
    lng: String,
    width: String,
    height: String,
    apikey: String
  },
  created() {
    this.platform = new H.service.Platform({
      apikey: this.apikey
      //headers: { 'Access-Control-Allow-Origin': 'localhost:8080' },
      //useHTTPS: true,
      //useCIT: true
    })
  },
  mounted() {
    this.map = new H.Map(
      this.$refs.map,
      this.platform.createDefaultLayers().normal.map,
      {
        zoom: 10,
        center: { lng: this.lng, lat: this.lat }
      }
    )
  }
}
</script>

<style scoped></style>

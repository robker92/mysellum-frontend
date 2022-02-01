<template>
  <div>
    <div id="map"></div>
    <div id="map2"></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
//import loadGoogleMapsApi from 'load-google-maps-api'
// import { getGoogleMapLoader } from "../../helpers";
import { mapOptions, getMarkerIconURL } from "../../helpers";
// import markerIconFish from "../../assets/markers/fish.png";
// import markerIconBarn from "../../assets/markers/barn.png";
//import { Loader } from "google-maps";

import MapInfoWindow from "./MapInfoWindow.vue";
import Vue from "vue";
import vuetify from "../../plugins/vuetify";
import router from "../../router";

export default {
  name: "GoogleMap",

  props: {
    markers: Array,
    stores: Array,
    // mapBoundries: Object
  },
  data() {
    return {
      map: null,
      google2: null,
      markerArray: [],
      markerObject: {},
      contentStringArray: [],
      activeInfoWindows: [],
    };
  },

  watch: {
    // eslint-disable-next-line no-unused-vars
    stores: function(newVal, oldVal) {
      //this.deleteIdentifiedMarkers(markersToRemove);
      if (newVal && newVal.length > 0) {
        //console.log(newVal);

        //this.deleteMarkers();
        //this.initMarkerArray(newVal);
        //delete markers in another thread
        // var markersToRemove = this.identifyMarkersToRemove(newVal);
        // this.$worker.run(markersToRemove => {
        //   this.deleteIdentifiedMarkers(markersToRemove);
        // });
        // console.log(this.$methods);
        // var that = this;

        // this.$worker
        //   .run(
        //     (newVal, that) => {
        //       that.identifyMarkersToRemove(newVal);
        //     },
        //     [newVal, that]
        //   )
        //   .then(markers => this.deleteIdentifiedMarkers(markers));

        // this.$worker
        //   .run(stores => {
        //     console.log(that);
        //     that.identifyMarkersToRemove(stores);
        //   }, newVal)
        //   .then(markers => {
        //     console.log(that);
        //     that.deleteIdentifiedMarkers(markers);
        //   });
        this.addMarkers(newVal);
      }
      let markersToRemove = this.identifyMarkersToRemove(newVal);
      if (markersToRemove) {
        this.deleteIdentifiedMarkers(markersToRemove);
      }
    },

    // mapBoundries: function(newVal, oldVal) {
    //   console.log(newVal);
    //   if (newVal) {
    //     const sw = new google.maps.LatLng(
    //       parseFloat(newVal.min_lat),
    //       parseFloat(newVal.min_lng)
    //     );
    //     // console.log(sw.toJSON());
    //     const ne = new google.maps.LatLng(
    //       parseFloat(newVal.max_lat),
    //       parseFloat(newVal.max_lng)
    //     );
    //     // var test = parseFloat(newVal.min_lat);
    //     // console.log(typeof test);
    //     // const input = [
    //     //   {
    //     //     lat: parseFloat(newVal.min_lat),
    //     //     lng: parseFloat(newVal.min_lng)
    //     //   },
    //     //   {
    //     //     lat: parseFloat(newVal.max_lat),
    //     //     lng: parseFloat(newVal.max_lng)
    //     //   }
    //     // ];
    //     // console.log([sw, ne]);
    //     const LatLngBounds = new google.maps.LatLngBounds([sw, ne]);
    //     // console.log(LatLngBounds.getNorthEast());
    //     // this.map.setZoom(newVal.zoom);
    //     this.map.fitBounds(LatLngBounds);
    //   }
    // }
  },

  async mounted() {
    // this.google2 = await getGoogleMapLoader();
    await this.initMap();
    // check if the result of the param validation function
    if (this.checkBoundryQueryParams()) {
      // set the map boundries to the url param when check passed
      this.setMapBoundries(this.map);
    } else {
      // if check did not pass (invalid values or no values provided) set the center of the map
      // to the current location
      this.setCurrentLocation(this.map);
    }
    this.addGetBoundsEvent(this.map);
  },

  methods: {
    initMap: async function() {
      //const google = await getGoogleMapLoader();
      // eslint-disable-next-line no-undef
      this.map = new google.maps.Map(document.getElementById("map2"), {
        center: { lat: 51.9481, lng: 10.26517 },
        //zoom: 10,
        zoom: 13,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        rotateControl: false,
        options: { styles: mapOptions },
      });
    },

    addGetBoundsEvent(map) {
      // eslint-disable-next-line no-undef
      google.maps.event.addListener(map, "idle", () => {
        const bounds = map.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        const mapBoundaries = {
          min_lat: sw.toJSON().lat,
          max_lat: ne.toJSON().lat,
          min_lng: sw.toJSON().lng,
          max_lng: ne.toJSON().lng,
          // zoom: map.getZoom()
        };
        // send boundries to Search view
        this.$emit("map-boundaries-changed", mapBoundaries);
        // adjust url params
        this.updateBoundryQueryParams();
      });
    },

    // initMarkerArray(storeArray) {
    //   //############ OLD
    //   // eslint-disable-next-line no-unused-vars
    //   storeArray.forEach((item, index) => {
    //     //var mapData = item.mapData;
    //     var clicked = false;
    //     var tagsString = item.profileData["tags"].join(", ");
    //     var contentString = this.getContentString(
    //       item._id,
    //       item.mapData.img,
    //       item.profileData.title,
    //       item.profileData.subtitle,
    //       tagsString
    //     );
    //     // var infowindow = new this.google2.maps.InfoWindow({
    //     //   content: contentString,
    //     //   maxWidth: 400
    //     // });

    //     // eslint-disable-next-line no-undef
    //     var marker = new google.maps.Marker({
    //       position: item.mapData.location,
    //       //animation: this.google2.maps.Animation.DROP,
    //       icon: markerIconFish,
    //       //map: null,
    //       map: this.map,
    //       title: item.profileData.title,
    //       storeId: item._id
    //     });

    //     //Custom Info Window
    //     var CustomInfoWindow = Vue.extend(MapInfoWindow);
    //     var instance = new CustomInfoWindow({
    //       propsData: {
    //         content: "This displays as info-window content!",
    //         store: storeArray[index],
    //         locale: this.$i18n.locale
    //       },
    //       vuetify,
    //       router
    //     });
    //     instance.$mount();

    //     // eslint-disable-next-line no-undef
    //     var infowindow = new google.maps.InfoWindow({
    //       //content: this.contentStringArray[index],
    //       content: instance.$el,
    //       maxWidth: 400
    //     });

    //     //console.log(this.contentStringArray[i]);
    //     marker.addListener("click", () => {
    //       if (clicked == false) {
    //         infowindow.open(this.map, marker);
    //         clicked = true;
    //         this.activeInfoWindows.push(infowindow);
    //       } else {
    //         infowindow.close();
    //         clicked = false;
    //       }
    //     });
    //     marker.addListener("mouseover", function() {
    //       if (clicked == false) {
    //         infowindow.open(this.map, marker);
    //       }
    //     });
    //     marker.addListener("mouseout", function() {
    //       if (clicked == false) {
    //         infowindow.close();
    //       }
    //     });
    //     //var info = document.getElementById("myinfo");
    //     this.map.addListener("click", evt => {
    //       this.activeInfoWindows.forEach(function(window) {
    //         window.close();
    //       });
    //       clicked = false;
    //       console.log(evt.latLng.toJSON());
    //     });

    //     this.markerArray.push(marker);
    //     this.markerObject[item._id] = marker;
    //     //console.log(this.markerArray[0].storeId);
    //     this.contentStringArray.push(contentString);
    //   });
    // },

    // identifyMarkersToRemoveObject(storeArray) {
    //   let markerObjectKeys = Object.keys(this.markerObject);

    //   //values in store array which are not present in the markerObject -> add values
    //   //vice versa -> delete values

    // },

    addMarker(store) {
      let clicked = false;

      // let iconUrl = this.markerBaseUrl + store.mapData.mapIcon + ".png";
      // console.log(store.mapData.mapIcon);
      // console.log(this.markerBaseUrl + store.mapData.mapIcon + ".png");
      // console.log(markerIconFish);
      const iconURL = getMarkerIconURL(store.mapData.mapIcon);
      const icon = {
        //url: markerIconFish, // url
        url: iconURL,
        // eslint-disable-next-line no-undef
        scaledSize: new google.maps.Size(50, 50), // scaled size
        //origin: new this.google2.maps.Point(0, 0), // origin
        //anchor: new this.google2.maps.Point(0, 0) // anchor
      };

      // eslint-disable-next-line no-undef
      let marker = new google.maps.Marker({
        position: store.mapData.location,
        //animation: this.google2.maps.Animation.DROP,
        icon: iconURL !== undefined ? icon : null,
        //map: null,
        map: this.map,
        title: store.profileData.title,
        storeId: store._id,
      });

      //Custom Info Window
      let CustomInfoWindow = Vue.extend(MapInfoWindow);
      let instance = new CustomInfoWindow({
        propsData: {
          content: "This displays as info-window content!",
          store: store,
          locale: this.$i18n.locale,
        },
        vuetify,
        router,
      });
      instance.$mount();

      // eslint-disable-next-line no-undef
      let infoWindow = new google.maps.InfoWindow({
        content: instance.$el,
        maxWidth: 400,
      });

      const that = this;
      marker.addListener("click", () => {
        if (clicked === false) {
          infoWindow.open(this.map, marker);
          clicked = true;
          this.activeInfoWindows.push(infoWindow);
          // that.$emit("elevate-store", marker.storeId);
        } else {
          infoWindow.close();
          clicked = false;
          // that.$emit("unelevate-store", marker.storeId);
        }
      });
      marker.addListener("mouseover", function() {
        if (clicked === false) {
          infoWindow.open(this.map, marker);
          // that.$emit("elevate-store", marker.storeId);
        }
      });
      marker.addListener("mouseout", function() {
        if (clicked === false) {
          infoWindow.close();
          console.log(marker.storeId);
          // that.$emit("unelevate-store", marker.storeId);
        }
      });

      // eslint-disable-next-line no-unused-vars
      this.map.addListener("click", (evt) => {
        this.activeInfoWindows.forEach(function(window) {
          window.close();
        });
        // that.$emit("unelevate-all-stores");
        clicked = false;
      });

      this.markerArray.push(marker);
      this.markerObject[store._id] = marker;
      //console.log(this.markerArray[0].storeId);
      //this.contentStringArray.push(contentString);
    },

    addMarkers(storeArray) {
      let markerObjectKeys = Object.keys(this.markerObject);
      // eslint-disable-next-line no-unused-vars
      storeArray.forEach((store, index) => {
        //if store is not in marker array, add marker for the store
        if (!markerObjectKeys.includes(store._id)) {
          this.addMarker(store);
        }
      });
    },

    identifyMarkersToRemove(storeArray) {
      let markersToRemove = [];
      let found;
      // eslint-disable-next-line no-unused-vars
      this.markerArray.forEach((item, index) => {
        //check if marker's storeId is in stores
        found = this.findWithAttr(storeArray, "_id", item.storeId);
        // var i = storeArray.indexOf(item.storeId); //index of marker in store array
        if (found === -1) {
          //if not in stores push the marker to the markers to remove array
          markersToRemove.push(item);
        }
      });
      return markersToRemove;
    },

    deleteIdentifiedMarkers(markersToRemove) {
      let found;
      // eslint-disable-next-line no-unused-vars
      markersToRemove.forEach((item, index) => {
        found = this.findWithAttr(this.markerArray, "storeId", item.storeId);
        if (found !== -1) {
          this.markerArray[found].setMap(null);
          this.markerArray.splice(found, 1);
          delete this.markerObject[item.storeId];
        }
      });
    },

    findWithAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    },

    // getMarkerIconURL(icon) {
    //   switch (icon) {
    //     case "fish":
    //       return markerIconFish;
    //     case "cat":
    //       return "cat";
    //     case "barn":
    //       return markerIconBarn;
    //   }
    // },
    //############################################################################################################################## OLD:

    removeMarkers(markersToRemove) {
      var testArray = this.markerArray;
      // eslint-disable-next-line no-unused-vars
      markersToRemove.forEach((item, index) => {
        //remove them from the map
        item.setMap(null);

        var indexMarkerArray = testArray.indexOf(item);
        console.log(indexMarkerArray);
        if (indexMarkerArray !== -1) {
          testArray.splice(indexMarkerArray, 1);
        }
        console.log(testArray);
      });
      //remove them from the markerArray
      // var filteredArray = markersToRemove.filter(id => id !== "seven");
      // console.log(filteredArray);

      // testArray = testArray.filter(el => !markersToRemove.includes(el));
      // console.log(testArray);
    },
    //############################################################################################################################## OLD:
    // getPixelLocation(currentLatLng) {
    //   var scale = Math.pow(2, this.map.getZoom());
    //   // The NorthWest corner of the current viewport corresponds
    //   // to the upper left corner of the map.
    //   // The script translates the coordinates of the map's center point
    //   // to screen coordinates. Then it subtracts the coordinates of the
    //   // coordinates of the map's upper left corner to translate the
    //   // currentLatLng location into pixel values in the <div> element that hosts the map.
    //   var nw = new this.google2.maps.LatLng(
    //     this.map
    //       .getBounds()
    //       .getNorthEast()
    //       .lat(),
    //     this.map
    //       .getBounds()
    //       .getSouthWest()
    //       .lng()
    //   );
    //   // Convert the nw location from geo-coordinates to screen coordinates
    //   var worldCoordinateNW = this.map.getProjection().fromLatLngToPoint(nw);
    //   // Convert the location that was clicked to screen coordinates also
    //   var worldCoordinate = this.map
    //     .getProjection()
    //     .fromLatLngToPoint(currentLatLng);
    //   var currentLocation = new this.google2.maps.Point(
    //     Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
    //     Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
    //   );

    //   console.log(currentLocation);
    //   return currentLocation;
    // },
    setMarkers() {
      // eslint-disable-next-line no-unused-vars
      // markerArray.forEach((item, index) => {
      //   var mapData = item.mapData;
      //   new this.google2.maps.Marker({
      //     position: mapData["location"],
      //     map: this.map,
      //     title: item.profileData["title"]
      //   });
      // });
      //Sets the markers map to our marker
      //var activeInfoWindows = [];

      let clicked = false;
      var infoWindowArray = [];
      //let that = this;
      //var activeInfoWindows = [];
      for (let i = 0; i < this.markerArray.length; i++) {
        let marker = this.markerArray[i];
        marker.setMap(this.map);

        //Test:
        //const Vue = require("vue").default;
        //console.log(this.stores[i]);
        var CustomInfoWindow = Vue.extend(MapInfoWindow);
        var instance = new CustomInfoWindow({
          propsData: {
            content: "This displays as info-window content!",
            store: this.stores[i],
          },
        });
        instance.$mount();

        // eslint-disable-next-line no-undef
        var infowindow = new google.maps.InfoWindow({
          content: this.contentStringArray[i],
          //content: instance.$el,
          //maxWidth: 50
        });
        infoWindowArray.push(infowindow);
        //console.log(this.contentStringArray[i]);
        marker.addListener("click", () => {
          if (clicked == false) {
            infowindow.open(this.map, marker);
            clicked = true;
            this.activeInfoWindows.push(infowindow);
          } else {
            infowindow.close();
            clicked = false;
          }
        });
        marker.addListener("mouseover", function() {
          if (clicked == false) {
            infowindow.open(this.map, marker);
          }
        });
        marker.addListener("mouseout", function() {
          if (clicked == false) {
            infowindow.close();
          }
        });
      }
      this.map.addListener("click", () => {
        this.activeInfoWindows.forEach(function(window) {
          window.close();
        });
        clicked = false;
      });
    },

    clearMarkers() {
      //Resets the markers map to null
      for (let i = 0; i < this.markerArray.length; i++) {
        this.markerArray[i].setMap(null);
      }
    },

    deleteMarkers() {
      this.clearMarkers();
      this.markerArray = [];
    },

    // getContentString(id, img, title, subtitle, tagsString) {
    //   var contentString =
    //     '<div id="infoWindowContent">' +
    //     '<div style="float:left;display: inline-block;">' +
    //     // '<router-link to="/storeprofile/1" tag="button">Profile</router-link>' +
    //     '<a href="#/storeprofile/' +
    //     id +
    //     '"><img src="' +
    //     img +
    //     '" width="40" height="40"></a>' +
    //     "</div>" +
    //     '<div style="float:right; padding-left: 10px; display: inline-block;">' +
    //     '<b><a id="retailerSiteLink" href="#/storeprofile/' +
    //     id +
    //     '">' +
    //     title +
    //     "</a></b>" +
    //     "<br/>" +
    //     "<p>" +
    //     subtitle +
    //     "<br/>" +
    //     tagsString +
    //     "</div>" +
    //     "</div>";
    //   return contentString;
    // },

    // startMap: async function() {
    //   var activeInfoWindows = [];

    //   // const loader = new Loader("AIzaSyAbBngkySn9wEK5O9EZ31jUaGKe6jsg56M");
    //   // const google = await loader.load();

    //   const google = await getGoogleMapLoader();

    //   // eslint-disable-next-line no-unused-vars
    //   const map = new google.maps.Map(document.getElementById("map"), {
    //     center: { lat: 51.9481, lng: 10.26517 },
    //     zoom: 10,
    //     streetViewControl: false,
    //     mapTypeControl: false,
    //     fullscreenControl: false,
    //     rotateControl: false
    //   });
    //   //console.log(map);
    //   // Marker Method: Add Marker for each data field + event-listeners
    //   // eslint-disable-next-line no-unused-vars
    //   this.markers.forEach(function(item, index) {
    //     //console.log("@ googlemap");
    //     //console.log(item);
    //     var mapData = item.mapData;
    //     var clicked = false;
    //     var tagsString = item.profileData["tags"].join(", ");
    //     var contentString =
    //       '<div id="infoWindowContent">' +
    //       '<div style="float:left;display: inline-block;">' +
    //       // '<router-link to="/storeprofile/1" tag="button">Profile</router-link>' +
    //       '<a href="#/storeprofile/' +
    //       item._id +
    //       '"><img src="' +
    //       mapData["img"] +
    //       '" width="40" height="40"></a>' +
    //       "</div>" +
    //       '<div style="float:right; padding-left: 10px; display: inline-block;">' +
    //       '<b><a id="retailerSiteLink" href="#/storeprofile/' +
    //       item._id +
    //       '">' +
    //       item.profileData["title"] +
    //       "</a></b>" +
    //       "<br/>" +
    //       "<p>" +
    //       item.profileData["subtitle"] +
    //       "<br/>" +
    //       tagsString +
    //       "</div>" +
    //       "</div>";

    //     var infowindow = new google.maps.InfoWindow({
    //       content: contentString,
    //       maxWidth: 400
    //     });
    //     var marker = new google.maps.Marker({
    //       position: mapData["location"],
    //       map: map,
    //       title: item.profileData["title"]
    //     });
    //     marker.addListener("click", function() {
    //       if (clicked == false) {
    //         infowindow.open(this.map, marker);
    //         clicked = true;
    //         activeInfoWindows.push(infowindow);
    //       } else {
    //         infowindow.close();
    //         clicked = false;
    //       }
    //     });
    //     marker.addListener("mouseover", function() {
    //       if (clicked == false) {
    //         infowindow.open(map, marker);
    //       }
    //     });
    //     marker.addListener("mouseout", function() {
    //       if (clicked == false) {
    //         infowindow.close();
    //       }
    //     });
    //     map.addListener("click", function() {
    //       activeInfoWindows.forEach(function(window) {
    //         window.close();
    //       });
    //       clicked = false;
    //     });
    //   });
    //   //Set current location
    //   this.setCurrentLocation(map);
    // },

    setCurrentLocation: function(map) {
      //Get HTML5 Geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            var current_pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            // console.log(current_pos);
            map.setCenter(current_pos);
          },
          function() {
            // Rejected by user? -> Test
            //-> Do nothing
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
        );
      } else {
        // Browser doesn't support Geolocation
      }
    },

    // sets the boundries of the map according to the provided url values
    setMapBoundries(map) {
      const { min_lat, max_lat, min_lng, max_lng } = this.getUrlLatLngParams();
      // const sw = new google.maps.LatLng(min_lat, min_lng);
      const sw = {
        lat: min_lat,
        lng: min_lng,
      };
      // const ne = new google.maps.LatLng(max_lat, max_lng);
      const ne = {
        lat: max_lat,
        lng: max_lng,
      };

      const LatLngBounds = new google.maps.LatLngBounds(sw, ne);
      map.fitBounds(LatLngBounds);
    },

    // check if the provided values in the url are legit lat and lng values
    checkBoundryQueryParams() {
      const { min_lat, max_lat, min_lng, max_lng } = this.getUrlLatLngParams();
      if (
        min_lat > -90 &&
        min_lat < 90 &&
        max_lat > -90 &&
        max_lat < 90 &&
        min_lng > -180 &&
        min_lng < 180 &&
        max_lng > -180 &&
        max_lng < 180
      ) {
        return true;
      }
      return false;
    },

    // returns the current url param values as float
    getUrlLatLngParams() {
      const min_lat = parseFloat(this.$route.query.min_lat);
      const max_lat = parseFloat(this.$route.query.max_lat);
      const min_lng = parseFloat(this.$route.query.min_lng);
      const max_lng = parseFloat(this.$route.query.max_lng);
      return { min_lat, max_lat, min_lng, max_lng };
    },

    // is called to update the url query params
    updateBoundryQueryParams() {
      const { min_lat, max_lat, min_lng, max_lng } = this.getUrlLatLngParams();
      this.updateParam({ param: "min_lat", value: min_lat.toString() });
      this.updateParam({ param: "max_lat", value: max_lat.toString() });
      this.updateParam({ param: "min_lng", value: min_lng.toString() });
      this.updateParam({ param: "max_lng", value: max_lng.toString() });
    },

    updateParam(objct) {
      if (objct.value) {
        // Value is not an empty string -> check of param was added before, if yes update it via remove and add
        // if not, just add it
        let paramPayload = {};
        paramPayload[objct.param] = objct.value;
        if (this.$route.query[objct.param]) {
          this.removeQueryParam(objct.param);
          this.addQueryParam(paramPayload);
        } else {
          this.addQueryParam(paramPayload);
        }
      } else {
        // Value is an empty string -> remove param if it was added before
        if (this.$route.query[objct.param]) {
          this.removeQueryParam(objct.param);
        }
      }
    },

    addQueryParam(queryObject) {
      this.$router.replace({
        query: Object.assign({}, this.$route.query, queryObject),
      });
    },

    removeQueryParam(param) {
      let query = Object.assign({}, this.$route.query);
      delete query[param];
      this.$router.replace({ query });
    },
  },
  //var current_position_and_zoom = await this.setCurrentLocation(map)
  //console.log(current_position_and_zoom)
  //center: current_position_and_zoom['current_pos'],
  //zoom: current_position_and_zoom['zoom'],
  // setCurrentLocation2: function() {
  //   //Get HTML5 Geolocation
  //   return new Promise((resolve, reject) => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         function(position) {
  //           var response = {
  //             current_pos: {
  //               lat: position.coords.latitude,
  //               lng: position.coords.longitude
  //             },
  //             zoom: 11
  //           }
  //           console.log(response)
  //           resolve(response)
  //           // infoWindow.setPosition(pos);
  //           // infoWindow.setContent('Location found.');
  //           // infoWindow.open(map);
  //           // map.setCenter(pos);
  //         },
  //         function() {
  //           // Rejected by user? -> Test
  //           reject({ current_pos: { lat: 51.9481, lng: 10.26517 }, zoom: 8 })
  //         },
  //         { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
  //       )
  //     } else {
  //       // Browser doesn't support Geolocation
  //       reject({ current_pos: { lat: 51.9481, lng: 10.26517 }, zoom: 8 })
  //     }
  //   })
  // },
};
</script>

<style>
#map {
  width: 100%;
  height: 0%;
  margin: auto;
  overflow: visible;
}
#map2 {
  width: 100%;
  height: 100%;
  margin: auto;
  overflow: visible;
}

#infoWindowContent {
  /*display: block;
  position: absolute;*/
  /*background-color: blue;
  z-index: 10001;*/
  font-size: x-small;
  display: inline-block;
  height: 60px;
}
#retailerSiteLink {
  color: green;
  font-size: medium;
  text-decoration: none;
}

div.info {
  position: absolute;
  z-index: 999;
  width: 200px;
  height: 100px;
  display: none;
  background-color: #fff;
  border: 3px solid #ebebeb;
  padding: 10px;
}
</style>

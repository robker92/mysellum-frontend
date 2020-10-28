<template>
  <div id="map"></div>
</template>

<script>
//import loadGoogleMapsApi from 'load-google-maps-api'
import { getGoogleMapLoader } from "../helpers";
// eslint-disable-next-line no-unused-vars
import { Loader } from "google-maps";

export default {
  name: "GoogleMap",
  data() {
    return {};
  },
  props: {
    markers: Array
  },
  async mounted() {
    this.startMap();
    // eslint-disable-next-line no-unused-vars
    // var activeInfoWindows = [];

    // //console.log(this.markers)
    // // const loader = new Loader("AIzaSyAbBngkySn9wEK5O9EZ31jUaGKe6jsg56M");
    // // const google = await loader.load();

    // const google = getGoogleMapLoader();
    // console.log(google);
    // // eslint-disable-next-line no-unused-vars
    // const map = new google.maps.Map(document.getElementById("map"), {
    //   center: { lat: 51.9481, lng: 10.26517 },
    //   zoom: 10,
    //   streetViewControl: false,
    //   mapTypeControl: false,
    //   fullscreenControl: false,
    //   rotateControl: false
    // });
    // //console.log(map);
    // // Marker Method: Add Marker for each data field + event-listeners
    // // eslint-disable-next-line no-unused-vars
    // this.markers.forEach(function(item, index) {
    //   //console.log("@ googlemap");
    //   //console.log(item);
    //   var mapData = item.mapData;
    //   var clicked = false;
    //   var tagsString = item.profileData["tags"].join(", ");
    //   var contentString =
    //     '<div id="infoWindowContent">' +
    //     '<div style="float:left;display: inline-block;">' +
    //     // '<router-link to="/storeprofile/1" tag="button">Profile</router-link>' +
    //     '<a href="#/storeprofile/' +
    //     item._id +
    //     '"><img src="' +
    //     mapData["img"] +
    //     '" width="40" height="40"></a>' +
    //     "</div>" +
    //     '<div style="float:right; padding-left: 10px; display: inline-block;">' +
    //     '<b><a id="retailerSiteLink" href="#/storeprofile/' +
    //     item._id +
    //     '">' +
    //     item.profileData["title"] +
    //     "</a></b>" +
    //     "<br/>" +
    //     "<p>" +
    //     item.profileData["subtitle"] +
    //     "<br/>" +
    //     tagsString +
    //     "</div>" +
    //     "</div>";

    //   var infowindow = new google.maps.InfoWindow({
    //     content: contentString,
    //     maxWidth: 400
    //   });
    //   var marker = new google.maps.Marker({
    //     position: mapData["location"],
    //     map: map,
    //     title: item.profileData["title"]
    //   });
    //   marker.addListener("click", function() {
    //     if (clicked == false) {
    //       infowindow.open(map, marker);
    //       clicked = true;
    //       activeInfoWindows.push(infowindow);
    //     } else {
    //       infowindow.close();
    //       clicked = false;
    //     }
    //   });
    //   marker.addListener("mouseover", function() {
    //     if (clicked == false) {
    //       infowindow.open(map, marker);
    //     }
    //   });
    //   marker.addListener("mouseout", function() {
    //     if (clicked == false) {
    //       infowindow.close();
    //     }
    //   });
    //   map.addListener("click", function() {
    //     activeInfoWindows.forEach(function(window) {
    //       window.close();
    //     });
    //     clicked = false;
    //   });
    // });
    // //Set current location
    // this.getCurrentLocation(map);
  },

  methods: {
    startMap: async function() {
      var activeInfoWindows = [];

      // const loader = new Loader("AIzaSyAbBngkySn9wEK5O9EZ31jUaGKe6jsg56M");
      // const google = await loader.load();

      const google = await getGoogleMapLoader();

      // eslint-disable-next-line no-unused-vars
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 51.9481, lng: 10.26517 },
        zoom: 10,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        rotateControl: false
      });
      //console.log(map);
      // Marker Method: Add Marker for each data field + event-listeners
      // eslint-disable-next-line no-unused-vars
      this.markers.forEach(function(item, index) {
        //console.log("@ googlemap");
        //console.log(item);
        var mapData = item.mapData;
        var clicked = false;
        var tagsString = item.profileData["tags"].join(", ");
        var contentString =
          '<div id="infoWindowContent">' +
          '<div style="float:left;display: inline-block;">' +
          // '<router-link to="/storeprofile/1" tag="button">Profile</router-link>' +
          '<a href="#/storeprofile/' +
          item._id +
          '"><img src="' +
          mapData["img"] +
          '" width="40" height="40"></a>' +
          "</div>" +
          '<div style="float:right; padding-left: 10px; display: inline-block;">' +
          '<b><a id="retailerSiteLink" href="#/storeprofile/' +
          item._id +
          '">' +
          item.profileData["title"] +
          "</a></b>" +
          "<br/>" +
          "<p>" +
          item.profileData["subtitle"] +
          "<br/>" +
          tagsString +
          "</div>" +
          "</div>";

        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 400
        });
        var marker = new google.maps.Marker({
          position: mapData["location"],
          map: map,
          title: item.profileData["title"]
        });
        marker.addListener("click", function() {
          if (clicked == false) {
            infowindow.open(map, marker);
            clicked = true;
            activeInfoWindows.push(infowindow);
          } else {
            infowindow.close();
            clicked = false;
          }
        });
        marker.addListener("mouseover", function() {
          if (clicked == false) {
            infowindow.open(map, marker);
          }
        });
        marker.addListener("mouseout", function() {
          if (clicked == false) {
            infowindow.close();
          }
        });
        map.addListener("click", function() {
          activeInfoWindows.forEach(function(window) {
            window.close();
          });
          clicked = false;
        });
      });
      //Set current location
      this.getCurrentLocation(map);
    },
    getCurrentLocation: function(map) {
      //Get HTML5 Geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            var current_pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(current_pos);
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
    }
  }
  //var current_position_and_zoom = await this.getCurrentLocation(map)
  //console.log(current_position_and_zoom)
  //center: current_position_and_zoom['current_pos'],
  //zoom: current_position_and_zoom['zoom'],
  // getCurrentLocation2: function() {
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
</style>

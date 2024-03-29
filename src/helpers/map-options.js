export const mapOptions = [
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  // {
  //     elementType: "labels.text.fill",
  //     stylers: [{
  //         color: "#616161"
  //     }]
  // },
  // {
  //     elementType: "labels.text.stroke",
  //     stylers: [{
  //         color: "#f5f5f5"
  //     }]
  // }
];

//List which is used in edit store select
export const mapIconList = [
  {
    //text: will be displayed to the user; value: mdi icon value
    text: "fish",
    value: "fish",
  },
  {
    text: "barn",
    value: "barn",
  },
  {
    text: "wine bottle",
    value: "bottle-wine",
  },
  {
    text: "mug glass variant",
    value: "glass-mug-variant",
  },
  // {
  //   text: "mug glass",
  //   value: "glass-mug",
  // },
  {
    text: "cow",
    value: "cow",
  },
];

import markerIconFish from "../assets/markers/fish.png";
import markerIconBarn from "../assets/markers/barn.png";
import markerIconWine from "../assets/markers/bottle-wine.png";
import markerIconMug from "../assets/markers/glass-mug-variant.png";
import markerIconCow from "../assets/markers/cow.png";

//URLs for the icons
export function getMarkerIconURL(marker) {
  switch (marker) {
    case "fish":
      return markerIconFish;
    case "barn":
      return markerIconBarn;
    case "bottle-wine":
      return markerIconWine;
    case "glass-mug-variant":
      return markerIconMug;
    // case "glass-mug":
    //   return markerIconMug;
    case "cow":
      return markerIconCow;
  }
}

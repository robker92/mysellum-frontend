<template>
  <v-container>
    <!-- <div class="text-h4 red--text">
      This page could not be found, sorry!
    </div> -->
    <!-- <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"> -->
    <v-parallax src="../assets/header_appbar1.jpg">
      <!-- <v-parallax :src="getRandomSrc()"> -->
      <v-container>
        <div class="text-h1">
          Oops!
        </div>
        <div class="text-h4 mt-3">
          404 - PAGE NOT FOUND
        </div>
        <div class="text-body-1 mt-3">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </div>

        <v-btn
          class="mt-2"
          width="200"
          rounded
          color="purple"
          dark
          :to="{ name: 'Home' }"
        >
          Go To Homepage
        </v-btn>
      </v-container>
    </v-parallax>
  </v-container>
</template>

<script>
export default {
  name: "PageNotFoundView",
  data() {
    return {
      basePath: "../assets/pageNotFound/",
      numberImages: 5,
      // srcArray: ["../assets/header_appbar1.jpg"],
    };
  },
  methods: {
    getRandomSrc() {
      const randomNumber = Math.floor(Math.random() * (this.numberImages + 1));
      console.log(randomNumber);

      // return this.srcArray[randomNumber];
      const srcPath = `${this.basePath}${randomNumber}.jpg`;
      console.log(srcPath);
      return srcPath;
    },
  },
};
</script>

<style></style>

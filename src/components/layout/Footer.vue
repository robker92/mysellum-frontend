<template>
  <v-footer absolute dark height="auto">
    <v-container mx-auto>
      <v-layout wrap>
        <v-flex xs9>
          <v-btn
            v-for="(item, i) in items"
            :key="i"
            :href="item.href"
            class="ml-0 mr-3"
            color="primary"
            square
            target="_blank"
          >
            <v-icon v-text="item.icon" />
          </v-btn>
        </v-flex>
        <v-spacer />
        <v-btn
          fab
          small
          color="primary"
          borderradius="square"
          title="Go to top"
          @click="$vuetify.goTo(0)"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  components: {
    //HelloWorld
  },
  data: () => ({
    items: [
      {
        href: "#!",
        icon: "mdi-twitter"
      },
      {
        href: "#!",
        icon: "mdi-instagram"
      },
      {
        href: "#!",
        icon: "mdi-facebook"
      },
      {
        href: "#!",
        icon: "mdi-google-plus"
      },
      {
        href: "#!",
        icon: "mdi-reddit"
      },
      {
        href: "#!",
        icon: "mdi-discord"
      },
      {
        href: "#!",
        icon: "mdi-pinterest"
      }
    ]
  })
};
</script>

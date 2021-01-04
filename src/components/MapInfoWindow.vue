<template>
  <div style="max-width:200px">
    <!-- {{ content }} -->

    <div v-if="store.profileData.images[0] != undefined">
      <!-- {{ store._id }}<br /> -->

      <!-- <v-btn>Test</v-btn>
      <v-img :src="store.profileData.images[0].src" />  delimiter-icon="mdi-stop"-->
      <v-carousel
        show-arrows-on-hover
        height="133px"
        style="width:200px;"
        hide-delimiter-background
      >
        <v-carousel-item
          v-for="(img, i) in store.profileData.images"
          :key="i"
          :to="{ name: 'StoreProfile', params: { id: store._id } }"
          eager
        >
          <v-img :src="img.src" height="100%" eager>
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-2"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-carousel-item>
      </v-carousel>
      <router-link
        :to="{
          name: 'StoreProfile',
          params: { id: store._id, locale: locale }
        }"
        style="text-decoration: none; color: inherit;"
      >
         <v-row align="center" class="ml-1 mt-2"> 
          <v-rating
            :value="Math.round(store.profileData.avgRating * 10) / 10"
            background-color="amber lighten-3"
            dense
            color="amber"
            small
            :readonly="true"
          />
          <div class="grey--text ml-2">
            {{ Math.round(store.profileData.avgRating * 10) / 10 }}
            ({{
              store.profileData.reviews ? store.profileData.reviews.length : ""
            }})
          </div>
         
       </v-row>

        <div class="text-left text-body-2 mt-2 ml-1">{{ store.profileData.title }}</div>

        <v-chip-group column>
          <v-chip
            outlined
            class="ma-1"
            color="primary"
            x-small
            v-for="(tag, index) in store.profileData.tags"
            :key="index"
            :to="{
              name: 'StoreProfile',
              params: { id: store._id }
            }"
            >{{ tag }}</v-chip
          >
        </v-chip-group>
      </router-link>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "MapInfoWindow",
  props: { content: String, store: Object, locale: String },
  watch: {
    store: function(newVal, oldVal) {
      console.log(oldVal);
      console.log(newVal);
    }
  },
  computed: {}
};
</script>

<style>

/* .v-btn .v-btn__content .v-icon {
  size: 2px !important;
}
.v-icon {
  size: 2px !important;
}

.v-btn--icon.v-size--small .v-icon {
  height: 12px !important;
  font-size: 12px;
  width: 12px !important;
}

.v-btn > .v-btn__content .v-icon {
  color: red;
  height: 12px !important;
  size: 5px !important;
}

element.style {
  font-size: 10px;
} */
/* .v-btn--icon.v-size--small .v-icon,
.v-btn--fab.v-size--small .v-icon {
  height: 50px;
  font-size: 50px;
  width: 50px;
}

.mdi-circle::before {
  content: "\F0765";
} */
</style>

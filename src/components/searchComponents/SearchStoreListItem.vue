<template>
  <div class="container">
    <v-hover v-slot:default="{ hover }">
      <!-- height="550px" -->
      <v-card
        :class="{ 'on-hover': hover }"
        :elevation="hover || elevated ? 20 : 2"
      >
        <v-carousel
          cycle
          :show-arrows-on-hover="store.profileData.images.length > 1"
          :show-arrows="store.profileData.images.length > 1"
          height="200px"
          style="width:400px;"
          :hide-delimiters="store.profileData.images.length < 2"
        >
          <v-carousel-item
            v-for="(img, i) in store.profileData.images"
            :key="i"
            :to="{
              name: 'StoreProfile',
              params: { id: store._id, locale: $i18n.locale }
            }"
            ,
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
            params: { id: store._id, locale: $i18n.locale }
          }"
          style="text-decoration: none; color: inherit;"
        >
          <v-card-title>{{ store.profileData.title }}</v-card-title>

          <v-card-text>
            <!-- <v-icon>mdi-hand-heart</v-icon>
            <v-icon>mdi-truck-delivery</v-icon> -->
            <v-row class="mx-2 mb-2">{{ store.mapData.address.city }} </v-row>
            <v-row align="center" class="mx-1">
              <v-rating
                :value="Math.round(store.profileData.avgRating * 10) / 10"
                background-color="amber lighten-3"
                dense
                color="amber"
                small
                :readonly="true"
              />
              <div class="grey--text ml-4">
                {{ Math.round(store.profileData.avgRating * 10) / 10 }}
                ({{
                  store.profileData.reviews
                    ? store.profileData.reviews.length
                    : ""
                }})
              </div>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div v-if="store">
                  <v-chip-group column>
                    <v-chip
                      small
                      outlined
                      class="ma-1"
                      color="primary"
                      v-for="(tag, index) in store.profileData.tags"
                      :key="index"
                      :to="{
                        name: 'StoreProfile',
                        params: { id: store._id, locale: $i18n.locale }
                      }"
                      >{{ tag }}</v-chip
                    >
                  </v-chip-group>
                </div>
              </v-col>
            </v-row>
            <!-- <v-row align-content="center">
              <v-icon>mdi-truck-delivery</v-icon>
              <v-icon>mdi-hand-heart</v-icon>
            </v-row> -->
            <!-- <v-divider class="mx-1 mb-3"></v-divider>
            <v-row>{{
              getCutDescription(store.profileData.description)
            }}</v-row> -->
          </v-card-text>
        </router-link>

        <v-card-actions>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="cyan accent-4"
                :ripple="false"
                class="btnNoHover"
              >
                <v-icon>mdi-hand-heart</v-icon>
              </v-btn>
            </template>
            <span>Offers self pickup</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                :ripple="false"
                color="cyan accent-4"
                class="btnNoHover"
              >
                <v-icon>mdi-truck-delivery</v-icon>
              </v-btn>
            </template>
            <span>Offers delivery</span>
          </v-tooltip>

          <v-spacer></v-spacer>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                :ripple="false"
                @click="print"
              >
                <v-icon>mdi-heart-outline</v-icon>
              </v-btn>
            </template>
            <span>Add to favorites</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                :ripple="false"
                @click="print"
              >
                <v-icon>mdi-bookmark-outline</v-icon>
              </v-btn>
            </template>
            <span>Bookmark</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                :ripple="false"
                @click="print"
              >
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </template>
            <span>Share</span>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: "SearchStoreListItem",
  props: {
    store: Object,
    elevated: Boolean
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    print() {
      console.log(this.store);
    },
    getCutDescription(description) {
      return description.substr(0, 100) + "\u2026";
    },
    getAvgRating(store) {
      return parseFloat(store.profileData.avgRating);
    }
  }
};
</script>

<style>
.div {
  float: left;
  width: 50%;
}
.btnNoHover:before {
  display: none;
}
.btnNoHover input {
  cursor: pointer;
}
.btnNoHover:hover:before {
  cursor: pointer;
}
.btnNoHover:hover {
  cursor: pointer;
}
.btnNoHover:focus:before {
  cursor: pointer;
}
.btnNoHover:hover:after {
  cursor: pointer;
}

.btnNoHover2:hover {
  transition: box-shadow 0.4s ease-in-out;
  cursor: pointer;
}
.btnNoHover2:hover:after {
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 100px inset;
  transition: box-shadow 0.1s ease-in-out;
  cursor: pointer;
}
</style>

<template>
  <div>
    <v-row v-if="type === 'buy'">
      <v-col
        v-for="(element, index) in whyBuyList"
        :key="index"
        cols="12"
        lg="3"
      >
        <v-hover v-slot="{ hover }">
          <v-card height="270">
            <v-img height="200" :src="element.img" style="opacity: 0.8"></v-img>
            <v-container>
              <div class="font-weight-bold mb-2">
                {{ title(element.id) }}
              </div>
            </v-container>
            <!-- <v-expand-x-transition> -->
            <v-fab-transition>
              <!-- <v-scroll-transition> -->
              <v-card
                v-if="hover"
                class="
                  d-flex
                  transition-fast-in-fast-out
                  v-card--reveal
                  text--body-2
                  white--text
                "
                :style="{
                  height: '100%',
                  background: `${mysellum_main_green_hex} !important`,
                }"
              >
                <v-container>
                  {{ text(element.id) }}
                </v-container>
              </v-card>
              <!-- </v-expand-x-transition> -->
            </v-fab-transition>
            <!-- </v-scale-transition> -->
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <v-row v-if="type === 'sell'">
      <v-col
        v-for="(element, index) in whySellList"
        :key="index"
        cols="12"
        lg="3"
      >
        <v-hover v-slot="{ hover }">
          <v-card height="270">
            <v-img height="200" :src="element.img" style="opacity: 0.8"></v-img>
            <v-container>
              <div class="font-weight-bold mb-2">
                {{ title(element.id) }}
              </div>
            </v-container>
            <v-fab-transition>
              <v-card
                v-if="hover"
                :class="`d-flex transition-fast-in-fast-out v-card--reveal text--body-2 white--text`"
                :style="{
                  height: '100%',
                  background: `${mysellum_main_green_hex} !important`,
                }"
              >
                <v-container>
                  {{ text(element.id) }}
                </v-container>
              </v-card>
            </v-fab-transition>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { MysellumColors } from "../../helpers";

export default {
  name: "",
  components: {},
  mixins: [],
  props: {
    type: String,
  },
  data() {
    return {
      // Colors
      mysellum_main_green_hex: MysellumColors.MYSELLUM_MAIN_GREEN_HEX,

      whyBuyList: [
        {
          icon: "mdi-account",
          iconColor: "primary",
          id: "byWhom",
          img: "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        },
        {
          icon: "mdi-silverware",
          iconColor: "blue accent-3",
          id: "what",
          img: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        },
        {
          icon: "mdi-currency-usd",
          iconColor: "green",
          id: "supportProducers",
          img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        },
        {
          icon: "mdi-molecule-co2",
          iconColor: "grey",
          id: "co2",
          img: "https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        },
        {
          icon: "mdi-star",
          iconColor: "yellow",
          id: "knowSurroundings",
          img: "https://images.unsplash.com/photo-1575686991348-bf3d4a0fe047?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        },
      ],
      whySellList: [
        {
          icon: "mdi-cash-multiple",
          iconColor: "green",
          id: "conditions",
          img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        },
        {
          icon: "mdi-handshake",
          iconColor: "purple",
          id: "introduction",
          img: "https://images.unsplash.com/photo-1624905917131-abae91e590ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        },
        {
          icon: "mdi-star",
          iconColor: "orange",
          id: "platformAdvantage",
          img: "https://images.unsplash.com/photo-1542382189-f2600a163c2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
        },
        {
          icon: "mdi-hammer-wrench",
          iconColor: "black",
          id: "setup",
          img: "https://images.unsplash.com/photo-1500468756762-a401b6f17b46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
        },
      ],
    };
  },
  computed: {
    title() {
      return (id) => {
        switch (id) {
          // reasons to buy
          case "byWhom":
            return this.$t("home.reasonsToBuy.byWhom.title");
          case "what":
            return this.$t("home.reasonsToBuy.what.title");
          case "supportProducers":
            return this.$t("home.reasonsToBuy.supportProducers.title");
          case "co2":
            return this.$t("home.reasonsToBuy.co2.title");
          case "knowSurroundings":
            return this.$t("home.reasonsToBuy.knowSurroundings.title");

          // reasons to sell
          case "conditions":
            return this.$t("home.reasonsToSell.conditions.title");
          case "introduction":
            return this.$t("home.reasonsToSell.introduction.title");
          case "platformAdvantage":
            return this.$t("home.reasonsToSell.platformAdvantage.title");
          case "setup":
            return this.$t("home.reasonsToSell.setup.title");
        }
      };
    },
    text() {
      return (id) => {
        switch (id) {
          // reasons to buy
          case "byWhom":
            return this.$t("home.reasonsToBuy.byWhom.text");
          case "what":
            return this.$t("home.reasonsToBuy.what.text");
          case "supportProducers":
            return this.$t("home.reasonsToBuy.supportProducers.text");
          case "co2":
            return this.$t("home.reasonsToBuy.co2.text");
          case "knowSurroundings":
            return this.$t("home.reasonsToBuy.knowSurroundings.text");

          // reasons to sell
          case "conditions":
            return this.$t("home.reasonsToSell.conditions.text");
          case "introduction":
            return this.$t("home.reasonsToSell.introduction.text");
          case "platformAdvantage":
            return this.$t("home.reasonsToSell.platformAdvantage.text");
          case "setup":
            return this.$t("home.reasonsToSell.setup.text");
        }
      };
    },
  },
  watch: {},
  methods: {},
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  top: 0;
  justify-content: center;
  opacity: 1;
  position: absolute;
  width: 100%;
}
</style>

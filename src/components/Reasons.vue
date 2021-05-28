<template>
  <div>
    <v-row v-if="type === 'buy'">
      <v-col
        cols="12"
        lg="3"
        v-for="(element, index) in this.whyBuyList"
        :key="index"
      >
        <v-card>
          <v-container>
            <v-icon large :color="element.iconColor">
              {{ element.icon }}
            </v-icon>
            <div class="font-weight-bold mb-4">
              {{ element.title }}
            </div>
            <div class="text-left">
              {{ element.text }}
            </div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="type === 'sell'">
      <v-col
        cols="12"
        lg="3"
        v-for="(element, index) in this.whySellList"
        :key="index"
      >
        <v-card>
          <v-container>
            <v-icon large :color="element.iconColor">
              {{ element.icon }}
            </v-icon>
            <div class="font-weight-bold mb-4 ">
              {{ element.title }}
            </div>
            <div class="text-left">
              {{ element.text }}
            </div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  mixins: [],
  props: {
    type: String
  },
  data() {
    return {
      whyBuyTitle: "Warum du bei uns kaufen solltest",
      whyBuyList: [
        {
          icon: "mdi-account",
          iconColor: "primary",
          title: "Weiß bei wem du kaufst",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ipsa quasi quae itaque soluta sapiente."
        },
        {
          icon: "mdi-silverware",
          iconColor: "blue accent-3",
          title: "Weiß genau was du kaufst",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ipsa quasi quae itaque soluta sapiente."
        },
        {
          icon: "mdi-currency-usd",
          iconColor: "green",
          title: "Kaufe direkt beim Produzenten -> mehr Verdienst für ihn",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ipsa quasi quae itaque soluta sapiente."
        },
        {
          icon: "mdi-molecule-co2",
          iconColor: "grey",
          title: "Vermeide globale Transportwege",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ipsa quasi quae itaque soluta sapiente."
        }
      ],
      whySellTitle: "Warum du bei uns verkaufen solltest",
      whySellList: [
        {
          icon: "mdi-cash-multiple",
          iconColor: "green",
          title:
            "Handel vermeiden -> Mehr Marge (außer Service Pauschale) -> Faire Konditionen",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ipsa quasi quae itaque soluta sapiente."
        },
        {
          icon: "mdi-handshake",
          iconColor: "purple",
          title: "Durch Vorstellung beim Kunden punkten -> direktes Marketing",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ipsa quasi quae itaque soluta sapiente."
        },
        {
          icon: "mdi-star",
          iconColor: "orange",
          title: "Plattform Vorteil -> Mehr Bekanntheit als alleine",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ipsa quasi quae itaque soluta sapiente."
        },
        {
          icon: "mdi-hammer-wrench",
          iconColor: "black",
          title: "Einfaches Setup -> direkt loslegen & Verkaufen",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ipsa quasi quae itaque soluta sapiente."
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {}
};
</script>

<style></style>

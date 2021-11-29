<template>
  <v-container>
    <v-row v-if="type === 'buy'">
      <v-col
        v-for="(element, index) in whyBuyList"
        :key="index"
        cols="12"
        lg="3"
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
        v-for="(element, index) in this.whySellList"
        :key="index"
        cols="12"
        lg="3"
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
  </v-container>
</template>

<script>
export default {
  name: "",
  components: {},
  mixins: [],
  props: {
    type: String,
  },
  data() {
    return {
      whyBuyTitle: "Warum du bei uns kaufen solltest",
      whyBuyList: [
        {
          icon: "mdi-account",
          iconColor: "primary",
          title: "Erfahre bei wem du kaufst",
          text:
            "Auf Mysellum stellen sich die Produzenten dir vor, wodurch du dir sicher sein kannst, wessen Produkte du kaufst und dein Geld ankommt.",
        },
        {
          icon: "mdi-silverware",
          iconColor: "blue accent-3",
          title: "Erfahre genau was du kaufst",
          text:
            "Die Produzenten liefern dir detaillierte Hinweise über ihre Produkte hinsichtlich Inhaltsstoffen, Herstellung, Tierhaltung etc.",
        },
        {
          icon: "mdi-currency-usd",
          iconColor: "green",
          title: "Unterstütze die Produzenten",
          text:
            "Für ihre Produkte erhalten die Produzenten gerade einmal X % der Verkaufssumme in den Supermärkten. Durch den Direktverkauf über uns erhält er jedoch eine deutlich höhere Summe. Dadurch werden auch die Produzenten mit nicht-industriellen Herstellungsmethoden belohnt und unterstützt.",
        },
        {
          icon: "mdi-molecule-co2",
          iconColor: "grey",
          title: "Vermeide globale Transportwege",
          text:
            "Durch den lokalen Einkauf und den damit verbunden kurzen Transportwegen, wird der Co2 Fußabdruck niedrig gehalten und ein positiver Nebeneffekt für die Umwelt erzielt.",
        },
        {
          icon: "mdi-star",
          iconColor: "yellow",
          title: "Deine Umgebung",
          text:
            "Gute Weine, frischer Fisch, nachhaltige Steaks, leckerer Käse - entdecke die kulinarische Vielfalt deiner Umgebung!",
        },
      ],
      whySellTitle: "Warum du bei uns verkaufen solltest",
      whySellList: [
        {
          icon: "mdi-cash-multiple",
          iconColor: "green",
          title: "Exzellente Konditionen",
          text:
            "Bei uns erhalten du und deine Produktion die fairen Bedingungen, die ihr schon immer verdient habt. Abgesehen von einer kleinen Umkostenpauschale erhaltet ihr über uns den vollen Verkaufspreis!",
        },
        {
          icon: "mdi-handshake",
          iconColor: "purple",
          title: "Vorstellung Beim Kunden",
          text:
            "Ihr könnt Euch über Mysellum direkt bei Euren Kunden vorstellen und mit Eurer Nachhaltigkeit und Persönlichkeit werben. ",
        },
        {
          icon: "mdi-star",
          iconColor: "orange",
          title: "Plattform Vorteil -> Mehr Bekanntheit als alleine",
          text:
            "Durch unsere Plattform werden viel mehr Menschen auf Euch aufmerksam verglichen mit einem separaten Online-Shop. Wenn ihr uns unterstützt, unterstützt ihr also gleichzeitig euch selbst!",
        },
        {
          icon: "mdi-hammer-wrench",
          iconColor: "black",
          title: "Einfaches Setup -> direkt loslegen & Verkaufen",
          text:
            "Die Eröffnung eines Stores bei uns ist sehr intuitiv gestaltet, sodass Ihr Euch schnell zurechtfinden solltet. Bei Fragen steht Euch unser Support jederzeit zur Verfügung.",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style></style>

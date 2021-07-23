<template>
  <v-container fluid>
    <!-- height="80" -->
    <SearchArea />

    <div class="text-h4 mb-6">
      Willkommen bei <strong>Mysellum</strong> - deiner Online Markthalle
    </div>
    <v-container>
      <div class="mb-6 ">
        Dies ist eine unfertige Vorabversion, die kostenlos gehostet ist.
        Dadurch kann es sein, dass das erste Laden der Seite, wenn sie eine Zeit
        lang nicht geladen wurde, einen kurzen Moment dauert, danach läuft sie
        allerdings flüssig. (Das gilt ebenfalls für den Server, d.h. es kann
        sein, dass die erste Server-Anfrage etwas dauert, aber sobald er wieder
        erreichbar ist funktioniert alles flüssig).Ebenfalls bitte folgende
        Übersicht beachten
      </div>
    </v-container>

    <v-row>
      <v-spacer />
      <v-col cols="12" xs="4" sm="4" md="4" lg="4" xl="4">
        <div class="text-left">Folgendes ist nahezu fertig:</div>
        <ul class="text-left">
          <li>Registrierung mit E-Mail Verifikation</li>
          <li>An- und abmeldung</li>
          <li>Passwortzurücksetzung</li>
          <li>
            Erstellung eines Ladens (noch ohne Paypal Onboarding)
          </li>
          <li>Erstellung von Produkten & Update des Lagerbestands</li>
          <li>Lieferkosten und -information</li>
          <li>Angabe der Öffnungszeiten</li>
          <li>Hinzufügen von Produkten zum Shopping Cart</li>
          <li>Speicherung des Shopping Carts & Wiederherstellung bei Login</li>
          <li>
            E-Mail Benachrichtigung, sobald ein Produkt wieder verfügbar ist
          </li>
          <li>
            Bewertung: Hinzufügung (eine pro Kunde & Laden), Löschung, Anpassung
          </li>
          <li>
            Suche mit Schlagworten (& Lieferung: Filter, Abholung: Auswahl des
            Kartenausschnitts und Suche in diesem)
          </li>
          <li>Anpassung der Sprache, allerdings noch nicht für alle Texte</li>
        </ul>
      </v-col>
      <v-col cols="12" xs="4" sm="4" md="4" lg="4" xl="4">
        <div class="text-left">Folgendes ist noch nicht fertig:</div>
        <ul class="text-left">
          <li>
            Grundsätzlich: Design und Gestaltung der Website
          </li>
          <li>
            Suchlogik: Aufhebung der aktuellen Aufteilung in Lieferungs- und
            Abholungssuche
          </li>
          <li>Lieferungssuche: Sortierung</li>
          <li>Suche nach spezifischen Produkten</li>
          <li>Identitätsüberprüfung bei Ladeneigentümern</li>
          <li>Prüfung rechtlicher Themen</li>
          <li>Erneutes Senden der Verifikationsemail zur Registrierung</li>
        </ul>
      </v-col>
      <v-spacer />
    </v-row>

    <v-row dense class="mt-3">
      <v-spacer />
      <v-col cols="12" xs="12" sm="12" md="6" lg="5" xl="4">
        <v-hover v-slot:default="{ hover }">
          <v-card :class="{ 'on-hover': hover }" :elevation="hover ? 16 : 2">
            <v-carousel
              cycle
              show-arrows-on-hover
              hide-delimiters
              hide-delimiter-background
              :height="imgHeight"
            >
              <v-carousel-item
                :to="{
                  name: 'SearchDelivery',
                  params: { locale: $i18n.locale },
                }"
                eager
              >
                <v-img
                  src="../assets/home_searchDelivery1.jpg"
                  :height="imgHeight"
                  eager
                >
                </v-img>
              </v-carousel-item>
              <v-carousel-item
                :to="{
                  name: 'SearchDelivery',
                  params: { locale: $i18n.locale },
                }"
                eager
              >
                <v-img
                  src="../assets/home_searchDelivery2.jpg"
                  :height="imgHeight"
                  eager
                >
                </v-img>
              </v-carousel-item>
              <v-carousel-item
                :to="{
                  name: 'SearchDelivery',
                  params: { locale: $i18n.locale },
                }"
                eager
              >
                <v-img
                  src="../assets/home_searchDelivery3.jpg"
                  :height="imgHeight"
                  eager
                >
                </v-img>
              </v-carousel-item>
            </v-carousel>

            <router-link
              :to="{
                name: 'SearchDelivery',
                params: { locale: $i18n.locale },
              }"
              style="text-decoration: none; color: inherit"
            >
              <v-card-title>Delivery</v-card-title>
            </router-link>
          </v-card>
        </v-hover>
      </v-col>

      <!-- style="width:700px;" -->
      <v-col cols="12" xs="12" sm="12" md="6" lg="5" xl="4">
        <v-hover v-slot:default="{ hover }">
          <v-card :class="{ 'on-hover': hover }" :elevation="hover ? 16 : 2">
            <v-carousel
              cycle
              show-arrows-on-hover
              hide-delimiters
              hide-delimiter-background:height="imgHeight"
            >
              <v-carousel-item :to="{ name: 'SearchPickup' }" eager>
                <v-img
                  src="../assets/home_searchPickup1.jpg"
                  :height="imgHeight"
                  eager
                >
                </v-img>
              </v-carousel-item>
              <v-carousel-item :to="{ name: 'SearchPickup' }" eager>
                <v-img
                  src="../assets/home_searchPickup2.jpg"
                  :height="imgHeight"
                  eager
                >
                </v-img>
              </v-carousel-item>
              <v-carousel-item :to="{ name: 'SearchPickup' }" eager>
                <v-img
                  src="../assets/home_searchPickup3.jpg"
                  :height="imgHeight"
                  eager
                >
                </v-img>
              </v-carousel-item>
            </v-carousel>

            <router-link
              :to="{ name: 'SearchPickup' }"
              style="text-decoration: none; color: inherit"
            >
              <v-card-title>Pick-up</v-card-title>
            </router-link>
          </v-card>
        </v-hover>
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import SearchArea from "../components/homeComponents/SearchArea";

export default {
  name: "HomeView",
  components: {
    SearchArea: SearchArea,
  },
  data() {
    return {
      imgHeight: "500px",
      searchTerm: "",
      selectedDistributionItem: "",
      distributionItems: ["delivery", "pickup"],
    };
  },
  methods: {
    search() {
      console.log(this.searchTerm);
      console.log(this.selectedDistributionItem);
      if (this.selectedDistributionItem === "delivery") {
        this.$router.push({
          name: "SearchDelivery",
          query: { searchTerm: this.searchTerm },
        });
      } else if (this.selectedDistributionItem === "pickup") {
        this.$router.push({
          name: "SearchPickup",
          query: { searchTerm: this.searchTerm },
        });
      }
    },
    print() {
      console.log(this.$i18n.locale);
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>

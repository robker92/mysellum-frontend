<template>
  <v-container>
    <div class="text-h3 mb-2">
      Impressum
    </div>
    <div class="text-subtitle-1 mb-4">
      mysellum.de ist ein Angebot der Mysellum GmbH
    </div>
    <div class="text-body-1 font-weight-bold">
      Mysellum GmbH
    </div>
    <div class="text-body-1 ">
      Vollmannstraße 8
    </div>
    <div class="text-body-1 mb-4">
      81927 München
    </div>
    <div class="text-body-1"><b>Geschäftsführer:</b> Robert Kerscher</div>
    <div class="text-body-1">
      <b>Umsatzsteuer-Identifikationsnummer:</b> xxxxxxxx
    </div>
    <div class="text-body-1 mb-4"><b>Handelsregisternummer:</b> xxxxxxxx</div>
    <div class="text-body-1 font-weight-bold">
      Kontakt:
    </div>
    <div class="text-body-1 ">
      support@mysellum.com
    </div>
    <router-link :to="{ name: 'CustomerContact' }" custom>
      <div class="text-body-1 ">
        Contact Form
      </div>
    </router-link>
  </v-container>
</template>

<script>
export default {
  name: "ImpressumView",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  async mounted() {
    console.log(window.location);
  },
  methods: {},
};
</script>

<style></style>

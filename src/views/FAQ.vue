<template>
  <v-container>
    <div class="text-h4 mb-4">FAQ</div>
    <v-expansion-panels>
      <v-expansion-panel v-for="(item, i) in faqList" :key="i">
        <v-expansion-panel-header>
          {{ item.question }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="text-left">
          {{ item.answer }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
  name: "FaqView",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      faqList: [
        {
          question: "Test Question 0",
          answer:
            "This is an test answer. This is an test answer. This is an test answer. This is an test answer. This is an test answer. This is an test answer. This is an test answer.",
        },
        { question: "Test Question 1", answer: "This is an test answer." },
        { question: "Test Question 2", answer: "This is an test answer." },
        { question: "Test Question 3", answer: "This is an test answer." },
        { question: "Test Question 4", answer: "This is an test answer." },
        { question: "Test Question 5", answer: "This is an test answer." },
        { question: "Test Question 6", answer: "This is an test answer." },
        { question: "Test Question 7", answer: "This is an test answer." },
        { question: "Test Question 8", answer: "This is an test answer." },
      ],
    };
  },
  computed: {},
  watch: {},
  mounted() {
    // this.$vuetify.goTo(0);
  },
  methods: {},
};
</script>

<style></style>

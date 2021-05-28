<template>
  <div>
    <!-- Main Row -->
    <v-row>
      <!-- Each Element -->
      <v-col
        cols="12"
        lg="3"
        v-for="(element, index) in this.testimonialList"
        :key="index"
      >
        <v-card>
          <v-container>
            <v-row>
              <v-col cols="12" lg="2">
                <v-icon large>mdi-format-quote-open </v-icon>
              </v-col>
              <v-col cols="12" lg="10">
                <div class="text-left">
                  {{ element.text }}
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-row class="mt-3">
          <v-col cols="12" lg="3">
            <v-sheet height="60" width="60" color="grey darken-1" rounded />
          </v-col>
          <v-col cols="12" lg="9">
            <div class="text-left">
              {{ element.name }}
            </div>
            <div class="text-left ">
              {{ element.jobTitle }}
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      testimonialList: [
        {
          name: "Ross Tremathack",
          jobTitle: "CEO LeBusinesses",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores numquam itaque ut recusandae delectus minima, magnam nostrum reiciendis provident similique quasi alias, eveniet modi eius eaque rerum placeat labore optio."
        },
        {
          name: "Karyn Barszczewski",
          jobTitle: "Founder & CEO Company",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ipsa quasi quae itaque soluta sapiente."
        },
        {
          name: "Kate Upton",
          jobTitle: "Product Manager @company",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ipsa quasi quae itaque soluta sapiente. Maiores numquam itaque ut recusandae. magnam nostrum reiciendis provident."
        },
        {
          name: "Jake Le Fig",
          jobTitle: "CEO Company",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ipsa quasi quae."
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

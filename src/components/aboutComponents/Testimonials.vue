<template>
  <v-container>
    <!-- Main Row -->
    <v-row>
      <!-- Each Element -->
      <v-col
        v-for="(element, index) in testimonialList"
        :key="index"
        cols="12"
        lg="3"
      >
        <v-card flat>
          <div>
            <v-row>
              <v-col cols="12" lg="2">
                <v-icon color="orange" large>mdi-format-quote-open </v-icon>
              </v-col>
              <v-col cols="12" lg="10">
                <div class="text-left">
                  {{ element.text }}
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card>
        <v-row class="mt-1">
          <v-col cols="12" lg="3">
            <v-avatar>
              <v-img :src="element.imgSrc" />
            </v-avatar>
          </v-col>
          <v-col cols="12" lg="9">
            <div class="text-left text-body-1">
              {{ element.name }}
            </div>
            <div class="text-left text-body-2">
              {{ element.jobTitle }}
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
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
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores numquam itaque ut recusandae delectus minima, magnam nostrum reiciendis provident similique quasi alias, eveniet modi eius eaque rerum placeat labore optio.",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/testimonials-person1.PNG",
        },
        {
          name: "Karyn Barszczewski",
          jobTitle: "Founder & CEO Company",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ipsa quasi quae itaque soluta sapiente.",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/testimonials-person4.PNG",
        },
        {
          name: "Kate Sutton",
          jobTitle: "Product Manager @company",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ipsa quasi quae itaque soluta sapiente. Maiores numquam itaque ut recusandae. magnam nostrum reiciendis provident.",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/testimonials-person3.PNG",
        },
        {
          name: "Jake Le Fig",
          jobTitle: "CEO Company",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ipsa quasi quae.",
          imgSrc:
            "https://prjctstorageaccount.blob.core.windows.net/mysellum-own-images/testimonials-person2.PNG",
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

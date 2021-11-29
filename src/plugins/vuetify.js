import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.lightGreen.darken4,
        secondary: colors.indigo,
        // All keys will generate theme styles,
        // Here we add a custom `tertiary` color
        tertiary: colors.pink.base,
        editStore: colors.amber.darken4,
      },
    },
  },
});

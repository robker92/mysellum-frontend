<template>
  <v-app>
    <Header />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

export default {
  name: 'App',

  components: {
    //HelloWorld
    Header,
    Footer
  },

  data: () => ({
    //
  })
}
</script>

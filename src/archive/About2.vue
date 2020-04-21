<template>
  <div class="about">
    <router-link to="/">Home</router-link>
    <h1>This is an about page</h1>
    <HereMap
      lat="54.00366"
      lng="-2.547855"
      width="100%"
      height="835px"
      apikey="0HfnHYdy1mnciyJS1WF0"
    />
  </div>
</template>

<script>
import HereMap from '../components/HereMap.vue'

export default {
  name: 'app',
  components: {
    HereMap
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<template>
  <div id="app">
    <header-component></header-component>
    <main>
      <router-view location={location} history={history} />
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'Home',
  components: {
    'header-component': Header,
    'footer-component': Footer,
  },
};
</script>

<style lang="scss">
  @import "./scss/_basics.scss";
</style>

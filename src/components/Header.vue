<template>
  <header class="b-header">
    <nav aria-label="Hauptnavigation">
      <ul class="nav">
          <li>
              <router-link to="/" title="Home">Home</router-link>
          </li>
          <li>
              <router-link to="/menu" title="Speisekarte">Speisekarte</router-link>
          </li>
          <li>
              <router-link to="/imprint" title="Impressum">Impressum</router-link>
          </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped lang="scss">
  .b-header {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 2;
      height: 53px;
      border-bottom: 1px solid rgba(255, 255, 255, .25);
      background: rgba(255, 255, 255, .1);

      .nav {
          @include breakpoint(medium) {
              justify-content: flex-end;
          }

          display: flex;
          padding: 0;
          list-style: none;

          a {
              padding: 5px 20px;
              text-decoration: none;
          }
      }
  }
</style>

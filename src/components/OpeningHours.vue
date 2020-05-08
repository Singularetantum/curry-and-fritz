<template>
  <div :class="{ 'is-closed': isClosed }" class="b-opening-hours">
    <div v-if="isClosed" class="closed">
      <p>
        <span>Hinweis:</span> Sie besuchen uns außerhalb unserer <a href="/#opening-hours" title="Öffnungszeiten">Öffnungszeiten</a>.
      </p>
    </div>
    <div v-else class="open">
      <p>
        Wir haben heute bis <span class="open-till">22:00</span> Uhr für Sie geöffnet und nehmen unter
        <a class="telephone" title="+493027498441" href="tel:+493027498441">030 - 27 49 84 41</a>
        Bestellungen entgegen.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpeningHours',
  data() {
    return {
      isClosed: false,
      checkTimer: undefined,
      interval: 10000,
    };
  },
  mounted() {
    this.checkTime();
  },
  methods: {
    checkTime() {
      if (this.checkTimer) {
        clearTimeout(this.checkTimer);
      }

      const date = new Date();
      const day = date.getDay();
      const hours = date.getHours();
      this.isClosed = (day === 1 || hours < 11 || hours > 22);

      this.checkTimer = setTimeout(this.checkTime, this.interval);
    },
  },
};
</script>

<style scoped lang="scss">
  .b-opening-hours {
    &.is-closed {
      border: 1px dashed #fff;
      padding: 10px;
    }

    .closed {
      span {
        font-weight: 900;
        text-transform: uppercase;
      }
    }

    .telephone {
      margin: 0 5px;
      font-weight: 900;
      text-decoration: none;
    }
  }
</style>

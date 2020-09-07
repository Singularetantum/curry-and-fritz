<template>
  <div class="b-menu">
    <nav class="category-nav" aria-label="Navigationsmenü">
      <ul class="list">
        <li v-for="category in menu" :key="category.id">
          <a :href="`#${category.id}`">{{ category.title }}</a>
        </li>
      </ul>
    </nav>

    <div class="categories">
      <h1><span>Speisekarte</span></h1>

      <div class="delivery-info">
        <p>
          Wir liefern innerhalb von 5km ab einem Mindestbestellwert von 14,90 €.<br>
          Bei Abholung gelten unsere günstigeren Preise vor <a href="/#address" title="Adresse">Ort</a>.
        </p>
        <opening-hours></opening-hours>
      </div>

      <div id="menu" ref="menu">
        <div v-for="category in menu"
          :key="category.id"
          :class="{ 'is-open': category.isOpen }"
          class="category b-collapsible"
          :id="category.id">
          <button :id="`${category.id}-toggle`" class="accordion-toggle" :aria-expanded="category.isOpen ? 'true' : 'false'" :aria-controls="`${category.id}-list`" v-on:click="toggleOpen(category)">
            <h2 class="title" v-html="category.titleHtml"></h2>
          </button>
          <p class="category-desc" v-html="category.descriptionHtml"></p>
          <ul :id="`${category.id}-list`" :aria-labelledby="`${category.id}-toggle`" class="list body" role="region">
            <li v-for="item in category.items" :key="item.id" itemscope="" itemtype="http://schema.org/Product">
              <span class="offers" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">
                <span class="price" itemprop="price">{{ item.price }} €</span>
              </span>
              <div class="actions">
                <button class="add" v-on:click="addToCart(item)">in den Warenkorb</button>
              </div>
              <div class="details">
                <b itemprop="name" v-html="item.titleHtml"></b>
                <br>
                <p class="item-desc" itemprop="description" v-html="item.descriptionHtml"></p>
                <button class="allergens"
                  title="Weitere Produktinformationen"
                  v-on:click="openAllergens($event, item)"
                  :data-name="item.title"
                  :data-allergens="item.allergens"
                  :data-additives="item.additives">
                  Weitere Produktinformationen
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <modal v-if="allergens.isOpen" @close="allergens.isOpen = false" :title="allergens.currItem.title" :focusAfterClosed="allergens.focusAfterClosed">
        <div v-if="allergens.currItem.allergens.length" class="">
        <h3>{{ allergens.allergens.title }}</h3>
        <ul class="list body">
          <li v-for="allergen in allergens.allergens.items.filter((item => allergens.currItem.allergens.includes(item.id)))" :key="allergen.id">
            {{ allergen.title }}
          </li>
        </ul>
      </div>
      <div v-if="allergens.currItem.additives.length" class="">
        <h3>{{ allergens.additives.title }}</h3>
        <ul class="list body">
          <li v-for="additive in allergens.additives.items.filter((item => allergens.currItem.additives.includes(item.id)))" :key="additive.id">
            {{ additive.title }}
          </li>
        </ul>
      </div>
    </modal>
  </div>
</template>

<script>
import OpeningHours from '../components/OpeningHours.vue';
import Menu from '../assets/data/menu.json';
import Allergens from '../assets/data/allergens.json';
import Modal from '../components/Modal.vue';

export default {
  name: 'Menu',
  components: {
    'opening-hours': OpeningHours,
    modal: Modal,
  },
  data() {
    return {
      search: '',
      menu: Menu,
      allergens: Allergens,
    };
  },
  computed: {
    filteredItems() {
      return this.menu.filter(item => item.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    }
  },
  mounted() {
    const triggers = Array.prototype.slice.call(this.$refs.menu.querySelectorAll('.accordion-toggle'));

    this.$refs.menu.addEventListener('keydown', event => {
      const target = event?.target;
      const key = event?.which?.toString();
      const ctrlModifier = (event.ctrlKey && key.match(/33|34/));

      if (target.classList.contains('accordion-toggle')) {
        if (key.match(/38|40/) || ctrlModifier) {
          const index = triggers.indexOf(target);
          const direction = (key.match(/34|40/)) ? 1 : -1;
          const length = triggers?.length;
          const newIndex = (index + length + direction) % length;

          triggers[newIndex].focus();

          event.preventDefault();
        } else if (key.match(/35|36/)) {
          switch (key) {
            case '36':
              triggers[0].focus();
              break;
            case '35':
              triggers[triggers.length - 1].focus();
              break;
            default:
          }
          event.preventDefault();
        }
      }
    });
  },
  methods: {
    openAllergens(event, item) {
      this.allergens.focusAfterClosed = event.target;
      this.allergens.currItem = item;
      this.allergens.isOpen = true;
    },
    toggleOpen(item) {
      const itemBodyEl = document.getElementById(`${item.id}-list`);
      item.isOpen = !item.isOpen;
      itemBodyEl.style.display = item.isOpen ? 'block' : 'none';
      itemBodyEl.style.height = item.isOpen ? `${itemBodyEl.scrollHeight}px` : '0';
    },
    addToCart(item) {
      this.$store.commit('cart/addProductToCart', item);
    },
  },
};
</script>

<style scoped lang="scss">
  .b-menu {
    @include collapsible;
    @include breakpoint(medium) {
      padding: 0 20px 0 330px;
    }

    @include breakpoint(xxlarge) {
      max-width: 1200px;
      padding: 0 20px;
    }

    margin-top: 60px;
    padding: 0 20px;

    .category-nav {
      @include breakpoint(medium) {
        overflow: auto;
        position: fixed;
        top: 40px;
        bottom: 0;
        left: 40px;
        display: block;
      }

      display: none;

      .list {
        margin: 40px 0;
        padding: 0;
        list-style: none;
        font-size: 1.17em;
        font-weight: 300;
        text-transform: uppercase;

        a {
          display: block;
          padding: 5px;
          text-decoration: none;
        }
      }
    }

    .delivery-info {
      margin-bottom: 40px;
    }

    .category {
      border-top: 1px solid #333;
      padding: 20px 0 0 0;

      .accordion-toggle {
        display: block;
        width: 100%;
        text-align: unset;

        &:focus,
        &:hover {
          .title {
            text-decoration: underline;
          }
        }
      }

      .title {
        font-size: 1.17em;
        margin: 0;
      }

      .list {
        border-top: 1px solid #333;
        padding: 0 0 0 20px;
        list-style: none;

        > li {
          display: flex;
          padding: 10px 0;
          flex-flow: column-reverse;

          &:not(:last-of-type) {
            border-bottom: 1px solid #333;
          }
        }

        .offers {
          align-self: flex-end;
        }
      }
    }

    .category-desc,
    .item-desc {
      color: #999;
    }

    .item-desc {
      margin-bottom: 10px;
    }

    .allergens {
      font-size: 14px;
      cursor: pointer;

      &:focus,
      &:hover {
        text-decoration: underline;

        &:before {
          transform: translateX(5px);
        }
      }

      &:before {
        content: 'ᐳ';
        display: inline-block;
        margin-right: 5px;
        transition: transform .3s;
      }
    }

    .add {
      display: none;
    }
  }
</style>

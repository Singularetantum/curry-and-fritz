<template>
  <div class="b-menu">

    <div class="category-nav">
      <ul class="list">
        <li v-for="category in menu" :key="category.id">
          <a :href="`#${category.id}`">{{ category.title }}</a>
        </li>
      </ul>
    </div>

    <div class="categories">
      <div class="delivery-info">
        <h2><span>Curry</span> and <span>Fritz</span></h2>
        <p>
          Wir liefern innerhalb von 5km ab einem Mindestbestellwert von 14,90 €.<br>
          Bei Abholung gelten unsere günstigeren Preise vor <a href="/#address" title="Adresse">Ort</a>.
        </p>
        <opening-hours></opening-hours>
      </div>
      <div v-for="category in menu"
        :key="category.id"
        :class="{ 'is-open': category.isOpen }"
        class="category b-collapsible"
        :id="category.id">
        <h3 class="title" v-on:click="toggleOpen(category)" v-html="category.titleHtml"></h3>
        <p class="category-desc" v-html="category.descriptionHtml"></p>
        <ul :id="`${category.id}-list`" class="list body">
          <li v-for="item in category.items" :key="item.id" itemscope="" itemtype="http://schema.org/Product">
      			<span class="offers" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">
      				<span class="price" itemprop="price">{{ item.price }} €</span>
      			</span>
            <div class="details">
              <b itemprop="name" v-html="item.titleHtml"></b>
              <br>
              <p class="item-desc" itemprop="description" v-html="item.descriptionHtml"></p>
              <div class="allergens"
                title="Weitere Produktinformationen"
                v-on:click="openAllergens(item)"
                :data-name="item.title"
                :data-allergens="item.allergens"
                :data-additives="item.additives">
                Weitere Produktinformationen
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="allergens.isOpen" class="allergens-popup">
      <span class="close" v-on:click="allergens.isOpen = false">schließen</span>
      <h3 class="title">{{ allergens.currItem.title }}</h3>
      <div class="scroll-wrapper">
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
      </div>
    </div>
  </div>
</template>

<script>
import OpeningHours from '../components/OpeningHours.vue';
import Menu from '../assets/data/menu.json';
import Allergens from '../assets/data/allergens.json';

export default {
  name: 'Menu',
  components: {
    'opening-hours': OpeningHours,
  },
  data() {
    return {
      menu: Menu,
      allergens: Allergens,
    };
  },
  methods: {
    openAllergens(item) {
      this.allergens.currItem = item;
      this.allergens.isOpen = true;
    },
    toggleOpen(item) {
      const itemBodyEl = document.getElementById(`${item.id}-list`);
      item.isOpen = !item.isOpen;
      itemBodyEl.style.height = item.isOpen ? `${itemBodyEl.scrollHeight}px` : '0';
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

    .allergens-popup {
      @include breakpoint(medium) {
        top: 50%;
        left: 50%;
        max-height: 80%;
        width: 50%;
        padding: 20px;
        transform: translate(-50%, -50%);
        background: rgba(80, 80, 80, 0.9);
        border: 1px solid #fff;
      }

      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 2;
      height: 100%;
      width: 100%;
      padding: 10px;
      background: rgba(80, 80, 80, 1);
      color: #fff;

      > .title {
        font-weight: 900;
      }

      .close {
        @include breakpoint(medium) {
          top: 20px;
          right: 20px;
        }

        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;

        &:hover {
          @include breakpoint(medium) {
            transform: scale(1.1);
          }
        }
      }

      .scroll-wrapper {
        overflow-x: hidden;
        overflow-y: auto;
        height: calc(100% - 60px);
        border-top: 2px solid #999;

        h3 {
          @include breakpoint(medium) {
            font-size: unset;
          }

          font-size: 16px;
        }
      }
    }

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
      .title {
        margin: 0;
      }

      .list {
        border-top: 1px solid #333;
        padding: 0 0 0 20px;
        list-style: none;

        > li {
          display: flex;
          border-bottom: 1px solid #333;
          padding: 10px 0;
          flex-flow: column-reverse;
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

      &:hover {
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
  }
</style>

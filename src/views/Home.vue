<template>
  <div class="b-home">
    <section class="teaser">
      <div class="logo-wrapper">
        <span class="logo"></span>
      </div>
      <div class="delivery">
        <h2><span>Imbiss</span> und <span>Lieferservice</span> Berlin</h2>
        <h3 class="subtitle">Täglich frische Currywurst, Pommes und Burger</h3>
        <a class="telephone" title="+493027498441" href="tel:+493027498441">030 - 27 49 84 41</a>
      </div>
    </section>

    <div class="sections">
      <section class="section">
        <div>
          <h2>
            Herzlich<br>
            <span>Willkommen</span>
          </h2>
          <p>Einfach vorbeikommen und die echte Berliner Currywurst erleben. Herzhafte Burger,
            frische Pommes, Bouletten und Chicken Nuggets gibt's natürlich auch. Dazu einen kühlen
            Drink im hippen Lokal oder auf den Sonnenplätzen im Aussenbereich. Mittags, abends oder
            zwischendurch genießen. Curry and Fritz - was sonst!</p>
        </div>
      </section>

      <section class="section">
        <div class="description">
          <h2>
            Original Berliner<br>
            <span>Currywurst</span>
          </h2>
          <p>Der Inhaber von Curry and Fritz, seit vielen Jahren bekennender Currywurstfan und Experte,
            hat sich seinen Traum erfüllt. Mit den besten Zutaten einer ausgewählten Berliner Fleischerei und
            selbsthergestellter Currysaucen zaubert er wahre Geschmackserlebnisse.</p>
          <p>Echte Berliner Currywurst mit feiner Currysauce nach Geheimrezept muss man probieren.</p>
        </div>
      </section>

      <section class="section">
        <div>
          <h2>
            Hausgemachte<br>
            <span>Burger</span>
          </h2>
          <p>Herzhafte Burger mit feinem Angus-Beef oder vegetarische Burger sind heissbegehrt.</p>
        </div>
      </section>

      <section class="section">
        <div>
          <h2>
            Alkoholfreie<br>
            <span>Getränke</span>
          </h2>
          <p>Eine große Auswahl kühler Drinks für heiße Sommertage gibt es auch zu den beliebten Menüs.</p>
        </div>
      </section>

      <section>
        <h2><span>Curry</span> and <span>Fritz</span></h2>
        <p>Die besten Zutaten aus Berliner Fleischereien und die selbstgemachte Currysauce sind ein Erlebnis.</p>
      </section>

      <section class="section">
        <iframe
          class="map"
          frameborder="0"
          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJi2M8MlxSqEcR-yk-Ws7sFgM&key=AIzaSyAwSp3CHZXIYsZV37mqGF5obACnRFL0tFA"
          allowfullscreen>
        </iframe>

        <div class="address">
          <div id="address">
            <h2><span>Adresse</span></h2>
            <p>Hermann-Hesse-Straße 12<br>
              13156 Berlin<br>
              Telefon: <a title="+493027498441" href="tel:+493027498441">030 / 27 49 84 41</a>
            </p>
            <br>
          </div>

          <div id="opening-hours">
            <h2><span>Öffnungszeiten</span></h2>
            <h4>Dienstag bis Sonntag</h4>
            <p>11:00 - 22:00</p>
            <h4>Montag</h4>
            <p>Geschlossen</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped lang="scss">
  .b-home {
    overflow: hidden;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100px;
      background-image: linear-gradient(to bottom, transparent 0%, #000 100%);
    }

    .teaser {
      overflow: hidden;
      width: 100%;
      height: 100vh;
      background-image: url('/img/sections/image-6.jpg');
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .delivery {
      @include breakpoint(medium) {
        top: 50%;
        left: 80px;
        font-size: 2em;
        text-align: left;
      }

      position: absolute;
      top: 60%;
      right: 10px;
      left: 10px;
      font-size: 1.5em;
      line-height: 1em;
      text-align: center;
      text-transform: uppercase;
      text-shadow: 0 0 30px #000;
      transform: translateY(-50%);

      > h2 {
        margin: 0 0 10px;
      }

      .subtitle {
        opacity: .7;
        margin: 0;
        font-size: 28px;
      }

      .telephone {
        @include breakpoint(large) {
          font-size: 75px;
        }

        @include breakpoint(medium) {
          font-size: 60px;
        }

        display: block;
        margin: 40px 0 0;
        font-size: 30px;
        font-weight: 900;
        line-height: 1em;
        text-decoration: none;
      }
    }

    .logo-wrapper {
      @include breakpoint(large) {
        right: 80px;
        transform: rotateZ(10deg);
      }

      @media screen and (min-height: 600px) {
        top: 80px;
        right: 50%;
        transform: translateX(50%) rotateZ(10deg);
      }

      position: absolute;
      top: 80px;
      right: 10px;
      transform: rotateZ(10deg);

      .logo {
        @include breakpoint(medium) {
          width: 12em;
          height: 12em;
        }

        @media screen and (min-height: 600px) {
          width: 12em;
          height: 12em;
        }

        display: inline-block;
        width: 6em;
        height: 6em;
        background: url('/img/logo.png');
        background-size: contain;
        background-repeat: no-repeat;
      }
    }

    .section {
      .description {
        @include breakpoint(medium) {
          width: 50%;
        }

        width: 100%;
      }

      .image {
        @include breakpoint(medium) {
          width: 50%;
        }

        opacity: .6;
        width: 100%;
        max-height: 100vh;
        box-shadow: inset 0 0 30px 30px rgba(0, 0, 0, 1);
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .map {
        width: 100%;
        height: 450px;
        margin-right: 20px;
        border: 0;
      }

      .address {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        a {
          text-decoration: none;
        }
      }
    }
  }
</style>

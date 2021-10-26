<template>
  <div>
    <b-navbar
      :transparent="true"
      :centered="true"
      class="bg-dark navbar is-fixed-top app-navbar"
    >
      <template #brand>
        <b-navbar-item :to="{ path: '/' }" tag="router-link">
          <img
            :src="require('@/assets/img/ficat-logo-white2.png')"
            alt="Logo FICAT"
            class="logo-white"
          />
        </b-navbar-item>
      </template>

      <template #start>
        <b-navbar-item
          v-for="(path, key) in paths"
          :key="key"
          :to="key"
          tag="nuxt-link"
          class="text-white"
        >
          {{ path.toUpperCase() }}
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item class="text-white" tag="nuxt-link" to="/login"
          >LOG IN</b-navbar-item
        >
        <b-navbar-item tag="div">
          <b-navbar-item
            @click="setLang('pt')"
            :class="{ selectedClass: isSelected, 'text-white': true }"
          >
            PT
          </b-navbar-item>
          <div class="vl"></div>
          <b-navbar-item
            @click="setLang('en')"
            :class="{ selectedClass: !isSelected, 'text-white': true }"
          >
            EN
          </b-navbar-item>
        </b-navbar-item>
      </template>
    </b-navbar>

    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      mobileDevice: false,
      isSelected: true,
      selectedLanguage: 'pt'
    }
  },
  computed: {
    ...mapState({
      lang: state => state.lang.lang
    }),

    paths() {
      return {
        about: this.$tr('layout.about'),
        talk: this.$tr('layout.talkToUs'),
        tutorial: this.$tr('layout.tutorial')
      }
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'has-navbar-fixed-top'
      }
    }
  },

  mounted() {
    // Add init FB SDK function
    const initSdk = document.createElement('script')
    initSdk.innerHTML = `window.fbAsyncInit = function() {
      FB.init({
        appId: '197652141644385',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v6.0'
      })
    }`

    // Add FB SDK sources
    const el = document.createElement('script')
    el.async = true
    el.defer = true
    el.src = 'https://connect.facebook.net/en_US/sdk.js'

    // Init fb messenger customer chat SDK
    const chatSrc = document.createElement('script')
    chatSrc.innerHTML = `(function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      const js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')`

    document.body.insertBefore(chatSrc, document.body.firstChild)
    document.body.insertBefore(el, document.body.firstChild)
    document.body.insertBefore(initSdk, document.body.firstChild)
  },

  methods: {
    setLang(langKey) {
      this.$store.dispatch('lang/change', langKey)
      if (this.selectedLanguage !== langKey) {
        this.isSelected = !this.isSelected
        this.selectedLanguage = langKey
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/_all';

// Set your colors

$ficat-red: #a54b4b;
$ficat: #444352;
$ficat-invert: findColorInvert($ficat);

// Lists and maps
$custom-colors: null !default;
$custom-shades: null !default;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: mergeColorMaps(
  (
    'ficat': (
      $ficat,
      $ficat-invert
    )
  ),
  $custom-colors
);

// Links
$link: $ficat-red;
// $link-invert: $primary-invert;
// $link-focus-border: $primary;

// Import Bulma and Buefy styles
@import '~bulma';
@import '~buefy/src/scss/buefy';
</style>

<style scoped>
/* .test {
  color: white;
} */

.container {
  margin-top: 20px;
}

@font-face {
  font-family: 'Atlantic Cruise';
  src: url('~assets/fonts/Atlantic_Cruise-Medium.ttf') format('truetype');
}

.logo-white {
  width: 3.4em;
}

.text-white {
  color: white;
  font-family: 'Atlantic Cruise', sans-serif;
  font-size: 1.5rem;
}

a.nuxt-link-exact-active {
  color: #a54b4b;
}

a.nuxt-link-active {
  color: #a54b4b;
}

.selectedClass {
  text-decoration: underline;
}

.app-navbar {
  background-color: #444352;
  border-bottom: 2px solid #a54b4b;
}

.vl {
  border-left: 2px solid rgb(247, 217, 217);
  height: 1em;
}

@media screen and (max-width: 1024px) {
  .vl {
    border-left: 0;
    height: 2px;
    border-bottom: 1px solid lightgrey;
  }
}
</style>

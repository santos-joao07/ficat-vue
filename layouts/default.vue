<template>
  <div>
    <b-navbar class="bg-dark app-navbar" transparent="true" centered="true">
      <template slot="brand">
        <b-navbar-item :to="{ path: '/' }" tag="router-link">
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>

      <template slot="start">
        <b-navbar-item
          v-for="(path, key) in paths"
          :key="key"
          :aria-roledescription="path"
          :aria-label="path"
        >
          <b-navbar-item :to="key" tag="router-link" class="text-white">
            {{ path.toUpperCase() }}
          </b-navbar-item>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item class="text-white" tag="nuxt-link" to="/login"
          >LOG IN</b-navbar-item
        >
        <b-navbar-item tag="div">
          <b-navbar-item
            @click="setLang('pt')"
            :class="{ selectedClass: !isSelected, 'text-white': true }"
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
      <div
        class="fb-customerchat"
        attribution="setup_tool"
        page_id="103822584563032"
        theme_color="#0d2167"
      ></div>
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
        tutotrial: this.$tr('layout.tutorial')
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

<style scoped>
/* .test {
  color: white;
} */

@font-face {
  font-family: 'Atlantic Cruise';
  src: url('~assets/fonts/Atlantic_Cruise-Medium.ttf') format('truetype');
}

.text-white {
  color: white;
  font-family: 'Atlantic Cruise', sans-serif;
  font-size: 1.5rem;
}

.bg-dark {
  background-color: #444352;
}

.selectedClass {
  text-decoration: underline;
}

.app-navbar {
  border-bottom: 2px solid #a54b4b;
}

.vl {
  border-left: 2px solid lightgrey;
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

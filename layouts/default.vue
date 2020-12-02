<template>
  <div>
    <b-navbar class="has-background-light app-navbar">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
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
          <b-navbar-item tag="router-link" :to="key" class="has-text-primary">
            {{ path }}
          </b-navbar-item>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <b-navbar-item>
            <a @click="setLang('pt')" :class="{ selectedClass: isSelected }">
              pt
            </a>
          </b-navbar-item>
          <div class="vl"></div>
          <b-navbar-item>
            <a @click="setLang('en')" :class="{ selectedClass: !isSelected }">
              en
            </a>
          </b-navbar-item>
        </b-navbar-item>
      </template>
    </b-navbar>

    <div class="">
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
      isSelected: true
    }
  },
  computed: {
    ...mapState({
      lang: state => state.lang.lang
    }),

    paths() {
      return {
        about: this.$tr('layout.about'),
        talk: this.$tr('layout.talkToUs')
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
      this.isSelected = !this.isSelected
    }
  }
}
</script>

<style scoped>
/* .test {
  color: white;
} */

.selectedClass {
  text-decoration: underline;
}

.app-navbar {
  border-bottom: 2px solid #7957d5;
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

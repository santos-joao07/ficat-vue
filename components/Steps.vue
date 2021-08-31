<template>
  <section>
    <b-steps
      v-model="activeStep"
      :animated="isAnimated"
      :rounded="isRounded"
      :has-navigation="hasNavigation"
      :label-position="labelPosition"
      :mobile-mode="mobileMode"
    >
      <b-step-item icon="account">
        <AuthorshipForm ref="section-0" />
      </b-step-item>

      <b-step-item icon="book-multiple">
        <WorkForm ref="section-1" />
      </b-step-item>

      <b-step-item icon="account-multiple">
        <OrientationForm ref="section-2" />
        <div class="cotutela-switch">
          <p class="cotutela-switch-label">Interinstitucional</p>
          <b-switch v-model="showCotutela"> </b-switch>
        </div>
      </b-step-item>

      <b-step-item v-if="showCotutela" icon="account-key">
        <CotutorshipForm ref="section-3" />
      </b-step-item>

      <b-step-item icon="tag-multiple">
        <KeywordForm :ref="sectionIndex.keyword" />
      </b-step-item>

      <b-step-item icon="check">
        <SendCatalogDataForm :ref="sectionIndex.send" />
      </b-step-item>

      <template
        slot="navigation"
        v-if="customNavigation"
        slot-scope="{ previous, next }"
      >
        <div class="test">
          <b-button
            :disabled="previous.disabled"
            @click.prevent="previous.action"
            class="app-button"
            icon-left="chevron-left"
          >
            Anterior
          </b-button>
          <b-button
            :disabled="next.disabled"
            @click.prevent="validate(next.action)"
            class="app-button"
            icon-right="chevron-right"
          >
            Próximo
            <!-- <b-icon class="app-icon" icon="chevron-right" size="is-medium">
            </b-icon> -->
          </b-button>
        </div>
      </template>
    </b-steps>
  </section>
</template>

<script>
import AuthorshipForm from '~/components/AuthorshipForm'
import WorkForm from '~/components/WorkForm'
import OrientationForm from '~/components/OrientationForm'
import KeywordForm from '~/components/KeywordForm'
import SendCatalogDataForm from '~/components/SendCatalogDataForm'
import CotutorshipForm from '~/components/CotutorshipForm'
export default {
  name: 'Steps',
  components: {
    AuthorshipForm,
    WorkForm,
    OrientationForm,
    KeywordForm,
    SendCatalogDataForm,
    CotutorshipForm
  },
  data() {
    return {
      activeStep: 0,

      showSocial: false,
      isAnimated: true,
      isRounded: true,
      isStepsClickable: false,

      hasNavigation: true,
      customNavigation: true,
      isProfileSuccess: false,

      labelPosition: 'bottom',
      mobileMode: 'minimalist',
      position: null,
      size: null,

      showCotutela: false,
      leftLabel: true,

      sectionIndex: {
        keyword: 'section-3',
        send: 'section-4'
      }
    }
  },

  watch: {
    showCotutela(val) {
      if (val === false) {
        this.$refs['section-3'].reset()

        this.sectionIndex.keyword = 'section-3'
        this.sectionIndex.send = 'section-4'
      } else if (val === true) {
        this.sectionIndex.keyword = 'section-4'
        this.sectionIndex.send = 'section-5'
      }
    }
  },

  methods: {
    validate(nextAction) {
      const formSectionRef = 'section-' + this.activeStep
      if (this.$refs[formSectionRef].checkNext() === true) {
        nextAction()
      }
    }
  }
}
</script>

<style scoped>
.test {
  text-align: center;
}

.app-button {
  background-color: #595867;
  color: white;
}

.button-content {
  justify-content: space-between;
}

.app-icon {
  vertical-align: middle;
  color: white;
}

.cotutela-switch-label {
  display: inline-block;
  vertical-align: text-bottom;
  margin-right: 5px;
}

.cotutela-switch {
  text-align: right;
  margin-right: 6px;
}
</style>

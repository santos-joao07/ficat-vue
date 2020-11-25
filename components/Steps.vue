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
      </b-step-item>

      <b-step-item icon="tag-multiple">
        <KeywordForm ref="section-3" />
      </b-step-item>

      <b-step-item icon="check">
        <SendCatalogDataForm ref="section-4" />
      </b-step-item>

      <template
        v-if="customNavigation"
        slot="navigation"
        slot-scope="{ previous, next }"
      >
        <div class="test">
          <b-button
            type="is-primary"
            icon-left="arrow-left-bold-outline"
            :disabled="previous.disabled"
            @click.prevent="previous.action"
          >
            Anterior
          </b-button>
          <b-button
            type="is-primary"
            icon-right="arrow-right-bold-outline"
            :disabled="next.disabled"
            @click.prevent="validate(next.action)"
          >
            Próximo
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
export default {
  name: 'Steps',
  components: {
    AuthorshipForm,
    WorkForm,
    OrientationForm,
    KeywordForm,
    SendCatalogDataForm
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
      size: null
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

<style coped>
.test {
  text-align: center;
}
</style>

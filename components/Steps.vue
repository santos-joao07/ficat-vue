<template>
  <section>
    <b-steps
      v-model="activeStep"
      :animated="isAnimated"
      :rounded="isRounded"
      :has-navigation="hasNavigation"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      :label-position="labelPosition"
      :mobile-mode="mobileMode"
    >
      <b-step-item icon="account">
        <AuthorshipForm />
      </b-step-item>

      <b-step-item step="2">
        <WorkForm />
      </b-step-item>

      <b-step-item step="3">
        <OrientationForm />
      </b-step-item>

      <b-step-item step="4">
        <KeywordForm />
      </b-step-item>

      <b-step-item step="5">
        <SendCatalogDataForm />
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
            @click.prevent="next.action"
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

      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      labelPosition: 'bottom',
      mobileMode: 'minimalist',
      position: null,
      size: null
    }
  }
}
</script>

<style coped>
.test {
  text-align: center;
}
</style>

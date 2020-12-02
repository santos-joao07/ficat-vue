<template>
  <section class="section vcenter">
    <div class="columns is-centered">
      <div class="column is-10">
        <!-- <Slider>
          <AuthorshipForm />
          <WorkForm />
          <OrientationForm />
          <KeywordForm />
          <SendCatalogDataForm />
        </Slider> -->
        <Steps />
      </div>
    </div>
  </section>
</template>

<script>
import { persist } from '~/front/persistence'
// import AuthorshipForm from '~/components/AuthorshipForm'
// import WorkForm from '~/components/WorkForm'
// import OrientationForm from '~/components/OrientationForm'
// import KeywordForm from '~/components/KeywordForm'
// import SendCatalogDataForm from '~/components/SendCatalogDataForm'
import Steps from '~/components/Steps'

export default {
  name: 'Index',
  components: {
    // AuthorshipForm,
    // WorkForm,
    // OrientationForm,
    // KeywordForm,
    // SendCatalogDataForm,
    Steps
  },

  created() {
    persist('form', {})
  }
}
</script>

<style scoped>
.vcenter {
  display: flex;
  height: 90vh;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* background: #ffecd1; */
}

.columns {
  margin: auto;
  flex: 1 0 auto;
  width: 100%;
}

.bodyClass,
.htmlClass {
  overflow-y: hidden;
}
</style>

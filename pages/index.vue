<template>
  <section class="section vcenter">
    <div class="columns is-centered">
      <div class="column is-10">
        <Steps />
      </div>
    </div>
  </section>
</template>

<script>
import { persist } from '~/front/persistence'
import Steps from '~/components/Steps'

export default {
  name: 'Index',
  components: {
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

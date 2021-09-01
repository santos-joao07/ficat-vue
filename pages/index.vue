<template>
  <div>
    <b-image
      :src="require('@/assets/img/ficat-logo-nobg.png')"
      class="app-logo"
    ></b-image>
    <Steps class="steps" />
  </div>
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
.bodyClass,
.htmlClass {
  overflow-y: hidden;
}

.app-logo {
  width: 16%;
  margin: 5em auto 2em auto;
}

.steps {
  width: 80%;
  margin: 0 auto;
}
</style>

<!-- muda cor do placeholder no escopo global -->
<style>
.input::placeholder {
  color: black;
  opacity: 0.3;
}

a.dropdown-item {
  text-align: left;
}

@media screen and (max-width: 900px) {
  .section {
    padding: 0;
  }
}
</style>

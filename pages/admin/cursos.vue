<template>
  <section>
    <div>
      <cursos-header @addCourseClicked="test"></cursos-header>
      <!-- <cursos-searchbar class="cursos-searchbar"></cursos-searchbar> -->
      <!-- <b-modal
        v-model="isComponentModalActive"
        :destroy-on-hide="false"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-label="Example Modal"
        aria-modal
      >
        <template #default>
          <cursos-add></cursos-add>
        </template>
      </b-modal> -->
      <b-modal v-model="isComponentModalActive">
        <cursos-add></cursos-add>
      </b-modal>
      <cursos-table class="cursos-table"></cursos-table>
    </div>
  </section>
</template>
<script>
import CursosHeader from '../../components/admin/CursosHeader'
// import CursosSearchbar from '../../components/admin/CursosSearchbar.vue'
import CursosTable from '../../components/admin/CursosTable'
import CursosAdd from '../../components/admin/CursosAdd'

export default {
  layout: 'adminLayout',
  components: {
    'cursos-header': CursosHeader,
    // 'cursos-searchbar': CursosSearchbar,
    'cursos-table': CursosTable,
    'cursos-add': CursosAdd
  },

  data() {
    return {
      isComponentModalActive: false
    }
  },

  methods: {
    test() {
      this.isComponentModalActive = true
    }
  }
}
</script>

CursosAdd<style scoped>
.cursos-searchbar {
  margin: 2%;
}

.cursos-table {
  margin: 5%;
}
</style>

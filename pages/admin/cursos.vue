<template>
  <section>
    <div>
      <cursos-header @addCourseClicked="test"></cursos-header>
      <b-modal v-model="isComponentModalActive">
        <template #default="props">
          <cursos-add @close="props.close"></cursos-add>
        </template>
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

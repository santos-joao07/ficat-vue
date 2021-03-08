<template>
  <section>
    <div>
      <cursos-header @addCourseClicked="test"></cursos-header>
      <b-modal v-model="isComponentModalActive">
        <template #default="props">
          <cursos-add @close="props.close"></cursos-add>
        </template>
      </b-modal>
      <b-modal v-model="isEditModalActive">
        <template #default="props">
          <cursos-update @close="props.close"></cursos-update>
        </template>
      </b-modal>
      <cursos-table
        @editClicked="showEditModal"
        class="cursos-table"
      ></cursos-table>
    </div>
  </section>
</template>
<script>
import CursosHeader from '../../components/admin/CursosHeader'
// import CursosSearchbar from '../../components/admin/CursosSearchbar.vue'
import CursosTable from '../../components/admin/CursosTable'
import CursosAdd from '../../components/admin/CursosAdd'
import cursosUpdate from '../../components/admin/cursosUpdate'

export default {
  layout: 'adminLayout',
  components: {
    'cursos-header': CursosHeader,
    // 'cursos-searchbar': CursosSearchbar,
    'cursos-table': CursosTable,
    'cursos-add': CursosAdd,
    'cursos-update': cursosUpdate
  },

  data() {
    return {
      isComponentModalActive: false,
      isEditModalActive: false
    }
  },

  methods: {
    test() {
      this.isComponentModalActive = true
    },
    showEditModal() {
      this.isEditModalActive = true
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

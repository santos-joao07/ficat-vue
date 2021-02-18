<template>
  <section>
    <div>
      <cursos-header></cursos-header>
      <!-- <cursos-searchbar class="cursos-searchbar"></cursos-searchbar> -->
      <cursos-table class="cursos-table"></cursos-table>
    </div>
    <div>
      <h1>Cursos</h1>
    </div>
  </section>
</template>
<script>
import CursosHeader from '../../components/admin/CursosHeader'
// import CursosSearchbar from '../../components/admin/CursosSearchbar.vue'
import CursosTable from '../../components/admin/CursosTable.vue'

export default {
  layout: 'adminLayout',
  components: {
    'cursos-header': CursosHeader,
    // 'cursos-searchbar': CursosSearchbar,
    'cursos-table': CursosTable
  }
}
</script>
<style scoped>
.cursos-searchbar {
  margin: 2%;
}

.cursos-table {
  margin: 5%;
}
</style>

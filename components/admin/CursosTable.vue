<template>
  <section>
    <div class="columns">
      <div class="column">
        <b-field label="Pesquisa por nome">
          <b-input v-model="filterText" placeholder="Search..."></b-input>
        </b-field>
      </div>
    </div>
    <div class="column">
      <b-tabs v-model="activeTab" type="is-boxed">
        <template v-for="courseType in courseTypes">
          <b-tab-item :key="courseType" :label="courseType">
            <b-table
              :data="filter"
              :paginated="isPaginated"
              :per-page="perPage"
              :current-page.sync="currentPage"
              :pagination-simple="isPaginationSimple"
              :pagination-position="paginationPosition"
              :default-sort-direction="defaultSortDirection"
              :pagination-rounded="isPaginationRounded"
              :sort-icon="sortIcon"
              :sort-icon-size="sortIconSize"
              :columns="columns"
              default-sort="user.first_name"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
            >
            </b-table>
          </b-tab-item>
        </template>
      </b-tabs>
    </div>
  </section>
</template>
<script>
export default {
  filters: {
    filterName(value) {
      // if (value.includes(this.search)) {
      //   return value
      // }
      return value
    }
  },
  data() {
    return {
      activeTab: 'Graduação',
      courseTypes: ['Graduação', 'Especialização', 'Mestrado', 'Doutorado'],
      filterText: '',
      courseData: [],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true,
          sortable: true
        },
        {
          field: 'name',
          label: 'Nome do curso'
        },
        {
          field: 'program',
          label: 'Programa'
        },
        {
          field: 'unityId',
          label: 'Unidade Academica'
        }
      ],
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 5
    }
  },
  computed: {
    filter() {
      const nameRe = new RegExp(this.filterText, 'i')
      const data = []
      for (const i in this.courseData) {
        if (this.courseData[i].name.match(nameRe)) {
          data.push(this.courseData[i])
        }
      }
      return data
    }
  },
  created() {
    this.getCourseData()
  },
  methods: {
    getCourseData() {
      this.$axios
        .get('/api/courses')
        .then(response => {
          this.courseData = response.data
          console.log('Data fetched!')
        })
        .catch(error => (this.courseData = error.data))
    }
  }
}
</script>
<style scoped></style>

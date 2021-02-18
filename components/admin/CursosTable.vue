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
      filterText: '',
      courseData: [],
      data: [
        {
          id: 1,
          first_name: 'Jesse',
          last_name: 'Simmons',
          date: '2016-10-15 13:43:27',
          gender: 'Male'
        },
        {
          id: 2,
          first_name: 'John',
          last_name: 'Jacobs',
          date: '2016-12-15 06:00:53',
          gender: 'Male'
        },
        {
          id: 3,
          first_name: 'Tina',
          last_name: 'Gilbert',
          date: '2016-04-26 06:26:28',
          gender: 'Female'
        },
        {
          id: 4,
          first_name: 'Clarence',
          last_name: 'Flores',
          date: '2016-04-10 10:28:46',
          gender: 'Male'
        },
        {
          id: 5,
          first_name: 'Anne',
          last_name: 'Lee',
          date: '2016-12-06 14:38:38',
          gender: 'Female'
        }
      ],
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

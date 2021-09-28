<template>
  <section>
    <div class="columns">
      <div class="column">
        <b-field label="Pesquisa por nome ou cdd">
          <b-input v-model="filterText" placeholder="Pesquisar..."></b-input>
        </b-field>
      </div>
    </div>
    <div class="column">
      <b-table
        @page-change="onPageChange"
        :data="filter"
        :per-page="perPage"
        :pagination-simple="isPaginationSimple"
        :pagination-position="paginationPosition"
        :default-sort-direction="defaultSortDirection"
        :pagination-rounded="isPaginationRounded"
        :sort-icon="sortIcon"
        :sort-icon-size="sortIconSize"
        :total="total"
        :loading="loading"
        backend-pagination
        paginated
        default-sort="user.first_name"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <!-- <b-table-column
                v-slot="props"
                field="id"
                label="ID"
                width="40"
                numeric
              >
                {{ props.row.id }}
              </b-table-column> -->

        <b-table-column v-slot="props" field="code" label="CDD">
          {{ props.row.code }}
        </b-table-column>

        <b-table-column v-slot="props" field="description" label="Descrição">
          {{ props.row.description }}
        </b-table-column>

        <b-table-column v-slot="props" field="edit">
          <a @click="editKnowledgeArea(props.row.id)">
            <b-icon icon="pencil" size="is-small" type="is-primary"> </b-icon>
          </a>
        </b-table-column>

        <b-table-column v-slot="props" field="delete">
          <a @click="deleteKnowledgeArea(props.row.id)">
            <b-icon icon="delete" size="is-small" type="is-danger"> </b-icon>
          </a>
        </b-table-column>
      </b-table>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    editClicked: { type: Function, required: true },
    getKnowledgeAreaId: { type: Function, required: true }
  },
  data() {
    return {
      activeTab: 0,
      filterText: '',
      knowledgeAreasData: [],
      isPaginationSimple: true,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      total: 20,
      page: 1,
      perPage: 10,
      loading: false
    }
  },
  computed: {
    filter() {
      const nameRe = new RegExp(this.filterText, 'i')
      const data = []
      for (const i in this.knowledgeAreasData) {
        if (
          this.knowledgeAreasData[i].description.match(nameRe) ||
          this.knowledgeAreasData[i].code.match(nameRe)
        ) {
          data.push(this.knowledgeAreasData[i])
        }
      }
      return data
    }
  },
  created() {
    this.getKnowledgeAreasData()
    this.getKnowledgeAreaDataCount()
  },
  mounted() {
    this.$root.$on('knowledge_area_added', () => {
      this.getKnowledgeAreasData()
      console.log('data fetched')
    })
    this.$root.$on('knowledge_area_edited', () => {
      this.getKnowledgeAreasData()
      console.log('data fetched')
    })
  },
  methods: {
    onPageChange(page) {
      this.page = page
      this.getKnowledgeAreasData()
    },
    getKnowledgeAreaDataCount() {
      this.$axios
        .get('/api/knowledgeAreas')
        .then(response => {
          this.total = response.data.length
          console.log('total: ' + this.total)
        })
        .catch(error => console.log(error))
    },
    getKnowledgeAreasData() {
      console.log('fetching page: ' + this.page)
      this.loading = true
      this.$axios
        .get('/api/knowledgeAreas', {
          params: {
            page: this.page,
            size: 10 // get next page
          }
        })
        .then(response => {
          this.knowledgeAreasData = response.data
          this.loading = false
        })
        .catch(error => {
          this.knowledgeAreasData = error.data
          this.loading = false
        })
    },
    editKnowledgeArea(id) {
      this.$props.getKnowledgeAreaId(id)
      this.$emit('editClicked')
    },
    deleteKnowledgeArea(id) {
      this.$axios
        .delete(`/api/knowledgeAreas/${id}`)
        .then(() => {
          console.log('Knowledge area deleted!')

          this.$buefy.snackbar.open('Área do conhecimento removida!')

          this.getKnowledgeAreasData()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped></style>

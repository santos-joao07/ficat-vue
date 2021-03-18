<template>
  <section>
    <div>
      <knowledge-areas-header
        @addKnowledgeAreaClicked="showAddModal"
      ></knowledge-areas-header>
      <b-modal v-model="isComponentModalActive">
        <template #default="props">
          <knowledge-areas-add @close="props.close"></knowledge-areas-add>
        </template>
      </b-modal>
      <knowledge-areas-table class="app-table"></knowledge-areas-table>
    </div>
  </section>
</template>

<script>
import KnowledgeAreasHeader from '../../components/admin/knowledge_areas/KnowledgeAreasHeader'
import KnowledgeAreasTable from '../../components/admin/knowledge_areas/KnowledgeAreasTable'
import KnowledgeAreasAdd from '../../components/admin/knowledge_areas/KnowledgeAreasAdd'

export default {
  layout: 'adminLayout',
  components: {
    'knowledge-areas-header': KnowledgeAreasHeader,
    'knowledge-areas-table': KnowledgeAreasTable,
    'knowledge-areas-add': KnowledgeAreasAdd
  },
  data() {
    return {
      isComponentModalActive: false
      // isEditModalActive: false,
      // courseEditedId: 1
    }
  },

  methods: {
    showAddModal() {
      this.isComponentModalActive = true
    }
  }
}
</script>

<style scoped>
.app-table {
  margin: 5%;
}
</style>

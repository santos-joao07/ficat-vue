<template>
  <b-modal
    @close="closeModal"
    @after-enter="test"
    v-model="isKaModalActive"
    has-modal-card
  >
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Selecione a área de conhecimento</p>
      </header>
      <section class="modal-card-body">
        <b-collapse
          v-for="(collapse, index) of collapses"
          :key="index"
          :open="isOpen == index"
          @open="isOpen = index"
          class="card"
          animation="slide"
        >
          <template #trigger="props">
            <div class="card-header" role="button">
              <p class="card-header-title">
                {{ collapse.title }}
              </p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
              </a>
            </div>
          </template>
          <div class="card-content">
            <div class="content">
              {{ collapse.text }}
            </div>
          </div>
        </b-collapse>
      </section>
    </div>
  </b-modal>
</template>
<script>
export default {
  props: {
    isKaModalActive: Boolean
  },
  data() {
    return {
      // filterText: '',
      kaData: [],
      kaCategoriesData: [],
      isOpen: 0,
      collapses: [
        {
          title: 'Generalidades',
          text: 'Text 1'
        },
        {
          title: 'Conhecimento',
          text: 'Text 2'
        },
        {
          title: 'O livro',
          text: 'Text 3'
        }
      ]
    }
  },
  methods: {
    test() {
      console.log(42)
      this.getKnowledgeAreasData()
    },
    closeModal() {
      this.$emit('catClosed')
    },
    getKnowledgeAreasData() {
      this.$axios
        .get('/api/knowledgeAreas')
        .then(response => {
          this.kaData = response.data
          this.getKaCategoriesData()
        })
        .catch(error => {
          this.kaData = error.data
        })
    },
    getKaCategoriesData() {
      for (const i in this.knowledgeAreasData) {
        if (this.kaData[i].code.includes('.')) {
          this.kaCategoriesData.push(this.kaData[i])
        }
      }
      console.log(this.kaCategoriesData.length)
    }
  }
}
</script>
<style scoped></style>

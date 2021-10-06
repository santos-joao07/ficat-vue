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
      <section ref="modalContent" class="modal-card-body">
        <!-- <toggle-list></toggle-list> -->
        <b-collapse
          v-for="(category, index) of collapses"
          :key="index"
          :open="isOpen == index"
          @open="isOpen = index"
          class="card"
          animation="slide"
        >
          <template #trigger="props">
            <div class="card-header" role="button">
              <p class="card-header-title">
                {{ category.description.trim() }}
              </p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
              </a>
            </div>
          </template>
          <div class="card-content">
            <div class="content">
              {{ category.description }}
            </div>
          </div>
        </b-collapse>
      </section>
    </div>
  </b-modal>
</template>
<script>
// import ToggleList from './ToggleList.vue'
import { knaCatArray } from '../server/util/knaCategories'

export default {
  // components: { ToggleList },
  props: {
    isKaModalActive: Boolean
  },
  data() {
    return {
      // filterText: '',
      loadingComponent: null,
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
  created() {
    this.collapses = knaCatArray()
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
      for (const i in this.kaData) {
        if (!this.kaData[i].code.includes('.')) {
          // console.log(this.kaData[i].description)
          this.kaCategoriesData.push(this.kaData[i])
        }
      }
      // console.log(this.kaCategoriesData.length)
    }
  }
}
</script>
<style scoped></style>

<template>
  <b-modal @close="closeModal" v-model="isKaModalActive" has-modal-card>
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
          @open="getCategoriesItems(index)"
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
            <div ref="content" class="content">
              <div v-for="item in kaData" :key="item.id">
                <a href="#">
                  {{ item.description }}
                </a>
              </div>
              <b-loading :is-full-page="false" v-model="isLoading"></b-loading>
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
      isOpen: 0,
      collapses: [],
      isLoading: false
    }
  },
  created() {
    this.collapses = knaCatArray()
  },
  methods: {
    open() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.$refs.content.$el
      })
      setTimeout(() => loadingComponent.close(), 1 * 1000)
    },
    test() {
      // console.log(42)
      // this.getKnowledgeAreasData()
    },
    getCategoriesItems(index) {
      this.isOpen = index
      this.open()
      const cat = this.collapses[index].code
      console.log('cat : ' + cat)
      this.getKnowledgeAreasData(cat)
    },
    closeModal() {
      this.$emit('catClosed')
    },
    async getKnowledgeAreasData(category) {
      await this.$axios
        .get('/api/knowledgeAreas', {
          params: {
            categoryCode: category
          }
        })
        .then(response => {
          this.kaData = response.data
          console.log(this.kaData)
        })
        .catch(error => {
          this.kaData = error.data
        })
    }
  }
}
</script>
<style scoped></style>

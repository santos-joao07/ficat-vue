<template>
  <b-modal @close="closeModal" v-model="isKaModalActive" has-modal-card>
    <div class="modal-card" style="width: 100%; height: 90vh">
      <header class="modal-card-head">
        <p class="subtitle is-4">
          SELECIONE A <span class="title-bold">ÁREA DE CONHECIMENTO</span>
        </p>
      </header>
      <section
        ref="modalContent"
        v-if="mode === 'menu'"
        class="modal-card-body"
      >
        <h1 class="category-title">CATEGORIAS</h1>
        <hr class="category-divider" />
        <div class="category-list">
          <a
            @click="getCategoryList(category)"
            v-for="category of categories"
            :key="categories.indexOf(category)"
            class="list-item"
            link
          >
            <b-icon icon="plus" size="is-small"></b-icon>
            {{ category.description }}
          </a>
        </div>
      </section>
      <section
        ref="modalContent"
        v-if="mode === 'list'"
        class="modal-card-body"
      >
        <div class="list-header">
          <a @click="goToMenu"
            ><b-icon icon="arrow-left" size="is-small"></b-icon> VOLTAR</a
          >
          <hr class="list-header-divider" />
          <p class="list-category">
            CATEGORIA:
            <span style="font-weight: 500">{{ getSelectedCategory }}</span>
          </p>
        </div>

        <!-- <a
            @click="getCategoryCode(category)"
            v-for="item of categoryData"
            :key="item.id"
            class="list-item"
            link
          >
            <b-icon icon="minus" size="is-small"></b-icon>
            {{ item.description }}
          </a> -->
        <div ref="knaList">
          <a
            @click="selectedKna(item)"
            v-for="item in categoryData"
            :key="item.code"
            class="list-item"
            link
          >
            <b-icon icon="minus" size="is-small"></b-icon>
            {{ item.description }}
          </a>
        </div>
        <b-pagination
          @change="handlePageChange"
          :total="total"
          :per-page="10"
          v-model="currentPage"
        >
        </b-pagination>
      </section>
    </div>
  </b-modal>
</template>
<script>
import { knaCatArray } from '../server/util/knaCategories'

export default {
  // components: { ToggleList },
  props: {
    isKaModalActive: Boolean,
    selectedKna: {
      type: Function,
      default() {
        return { errMessage: 'Not working' }
      }
    }
  },
  data() {
    return {
      // filterText: '',
      loadingComponent: null,
      categoryData: [],
      isOpen: -1,
      categories: [],
      selectedCategory: {},
      isLoading: false,
      mode: 'menu',
      currentPage: 1,
      total: 0
    }
  },
  computed: {
    getSelectedCategory() {
      return this.selectedCategory.description
    }
  },
  created() {
    this.categories = knaCatArray()
  },
  methods: {
    handlePageChange() {
      this.getKnowledgeAreasData(this.selectedCategory.code)
    },
    goToMenu() {
      this.mode = 'menu'
      this.categoryData = []
      this.currentPage = 1
    },
    getCategoryList(category) {
      this.selectedCategory = category
      this.mode = 'list'

      this.getCategoryDataCount(category.code)
      this.open()
      this.getKnowledgeAreasData(category.code)
    },
    open() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.$refs.modalContent.$el
      })
      setTimeout(() => loadingComponent.close(), 0.8 * 1000)
    },
    closeModal() {
      this.$emit('catClosed')
    },
    getCategoryDataCount(category) {
      this.$axios
        .get('/api/knowledgeAreas', {
          params: {
            categoryCode: category
          }
        })
        .then(response => {
          this.total = response.data.length
        })
    },
    getKnowledgeAreasData(category) {
      this.$axios
        .get('/api/knowledgeAreas', {
          params: {
            categoryCode: category,
            page: this.currentPage,
            size: 10
          }
        })
        .then(response => {
          this.categoryData = response.data
          console.log('no of items in this page: ' + this.categoryData.length)
        })
        .catch(error => {
          this.categoryData = error.data
        })
    }
  }
}
</script>
<style scoped>
.modal-card-title {
  margin: 5px 0;
  font-size: 1rem;
  font-weight: 300;
}

.title-bold {
  font-weight: 600;
}

.card-content {
  width: 100%;
}

.category-title {
  font-size: 1rem;
  font-weight: 500;
  /* letter-spacing: 0.05em; */
}

/* .knowledge-areas-list {
} */

.list-item {
  display: block;
  margin: 0.6rem 0;
}
.category:hover {
  text-decoration: underline;
}

.category-divider {
  margin: 0.6rem 0 1.2rem;
}

.list-header-divider {
  margin: 0.6rem 0 0.8rem;
}

.list-category {
  margin-bottom: 1rem;
}
</style>

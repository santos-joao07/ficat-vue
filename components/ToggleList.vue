<template>
  <div>
    <ul>
      <li class="category-container">
        <b-collapse
          :open="false"
          @open="changeIcon"
          @close="changeIcon"
          aria-id="contentIdForA11y1"
          animation="slide"
        >
          <template #trigger>
            <div class="category">
              <p>Category 1</p>
              <b-icon :icon="icon"></b-icon>
            </div>
          </template>
          <ul>
            <li>Option 1</li>
          </ul>
        </b-collapse>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categories: [
        {
          cdd: '000',
          title: 'first cat'
        },
        {
          cdd: '001',
          title: 'second cat'
        },
        {
          cdd: '002',
          title: 'third cat'
        }
      ],
      options: [
        {
          cdd: '000.1',
          title: 'ok1'
        },
        {
          cdd: '001.1',
          title: 'ok2'
        },
        {
          cdd: '002.01',
          title: 'ok3'
        }
      ],
      icon: 'plus'
    }
  },
  methods: {
    changeIcon() {
      if (this.icon === 'plus') {
        this.icon = 'minus'
      } else {
        this.icon = 'plus'
      }
    }
  }
}
</script>
<style scoped>
.category-container {
  width: 100%;
}

.category {
  display: flex;
  justify-content: space-between;
}
</style>

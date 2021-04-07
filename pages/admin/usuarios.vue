<template>
  <div>
    <users-header @addUserClicked="showAddModal"></users-header>
    <b-modal v-model="isAddModalActive">
      <template #default="props">
        <users-add @close="props.close"></users-add>
      </template>
    </b-modal>
    <users-table class="app-table"></users-table>
  </div>
</template>
<script>
import UsersHeader from '../../components/admin/users/UsersHeader'
import UsersTable from '../../components/admin/users/UsersTable'
import UsersAdd from '../../components/admin/users/UsersAdd'

export default {
  layout: 'adminLayout',
  components: {
    'users-header': UsersHeader,
    'users-table': UsersTable,
    'users-add': UsersAdd
  },
  data() {
    return {
      isAddModalActive: false,
      isEditModalActive: false,
      userEditedId: 1
    }
  },
  methods: {
    showAddModal() {
      this.isAddModalActive = true
    }
  }
}
</script>
<style scoped>
.app-table {
  margin: 5%;
}
</style>

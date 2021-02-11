<template>
  <b-navbar
    :shadow="true"
    class="

    app-navbar"
  >
    <template #brand>
      <b-navbar-item class="app-navbar-brand">
        <h1 class="cursos-title">Cursos</h1>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            Adicionar novo
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {}
</script>
<style scoped>
.app-navbar {
  padding: 2%;
  box-shadow: 0px 2px 0px 0px #cdcdcd;
}
.app-navbar-brand {
  margin-left: 20%;
}

.app-navbar-brand-icon {
  margin-right: 2px;
}

.cursos-title {
  font-size: 1.5em;
}
</style>

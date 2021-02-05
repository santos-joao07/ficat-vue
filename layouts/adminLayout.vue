<template>
  <section>
    <b-sidebar type="is-light" position="fixed" :fullheight="true" open>
      <div class="p-1">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
        <b-menu>
          <b-menu-list label="Menu">
            <b-menu-item icon="home" label="Inicio"></b-menu-item>
            <b-menu-item icon="bookmark">
              <template #label="props">
                Produtos
                <b-icon
                  class="is-pulled-right"
                  :icon="props.expanded ? 'menu-down' : 'menu-up'"
                ></b-icon>
              </template>

              <b-menu-item
                icon="label"
                label="Cursos"
                tag="router-link"
                to="/admin/cursos"
              ></b-menu-item>
              <b-menu-item icon="label" label="Áreas de conhecimento">
              </b-menu-item>
              <b-menu-item
                icon="label"
                label="Unidades academicas"
              ></b-menu-item>
            </b-menu-item>
            <b-menu-item icon="account" label="Minha conta"> </b-menu-item>
          </b-menu-list>

          <b-menu-list label="Actions">
            <b-menu-item icon="logout" label="Logout"></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style>
.teste {
  height: 100%;
}
.p-1 {
  padding: 1em;
}
</style>

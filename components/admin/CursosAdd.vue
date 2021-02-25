<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Adicionar curso</p>
        <button @click="$emit('close')" type="button" class="delete" />
      </header>
      <section class="modal-card-body">
        <b-field label="Nome do curso">
          <b-input
            placeholder="Ex.: Programa de pó-graduação em direito"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Unidade academica">
          <b-input placeholder="Ex.: ICJ" required> </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button @click="$emit('close')" label="Close" />
        <b-button label="Login" type="is-primary" />
      </footer>
    </div>
  </form>
</template>
<script>
export default {}
</script>
<style scoped></style>

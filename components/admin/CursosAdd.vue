<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Adicionar curso</p>
        <button @click="$emit('close')" type="button" class="delete" />
      </header>
      <section class="modal-card-body">
        <b-field label="Nome do curso">
          <b-input :value="email" placeholder="Your email" required> </b-input>
        </b-field>

        <b-field label="Unidade academica">
          <b-input
            :value="password"
            password-reveal
            placeholder="Your password"
            required
          >
          </b-input>
        </b-field>

        <b-checkbox>Remember me</b-checkbox>
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

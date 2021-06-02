<template>
  <div class="app-navbar">
    <div class="welcome-message">Bem vindo(a)!</div>
    <div class="log-out"><a href="#">Log out</a></div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.app-navbar {
  display: flex;
  justify-content: space-between;
  padding: 1% 2%;
}

.welcome-message {
  font-size: 1.5rem;
}

.log-out {
  text-decoration: none;
}
</style>

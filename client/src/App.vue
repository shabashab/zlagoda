<script lang="ts" setup>
import ConfirmPopup from 'primevue/confirmpopup'
</script>

<template>
  <ConfirmPopup />
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="scss">
body {
  font-family: 'Poppins', sans-serif;
}

h1 {
  @apply text-3xl font-bold text-darker;
}
</style>
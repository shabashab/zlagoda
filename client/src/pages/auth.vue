<script lang="ts" setup>

</script>

<template>
  <div class="w-full h-screen grid grid-rows-[1fr_auto] grid-cols-1 place-items-center from-dark to-darker bg-gradient-to-br">
    <RouterView />
    <RouterLink
      class="font-semibold text-lighter text-3xl hover:underline mb-4 opacity-80"
      to="/contacts"
    >
      Contacts
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>

</style>

<route lang="json">
  {
    "meta": {
      "public": true,
      "middleware": ["no-authenticated"]
    }
  }
</route>
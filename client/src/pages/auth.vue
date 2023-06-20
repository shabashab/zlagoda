<script lang="ts" setup>

</script>

<template>
  <div class="w-full h-screen grid place-items-center ">
    <RouterView />
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
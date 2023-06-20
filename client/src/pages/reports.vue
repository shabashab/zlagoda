<script setup lang="ts">
onMounted(() => {
  setTimeout(() => {
    window.print();
  }, 300)
})
</script>
<template>
  <RouterView />
  <div class="text-center text-xs fixed bottom-4 w-full">
    {{ new Date().toISOString() }}
  </div>
</template>
<style type="text/css" media="print" scoped>
@page {
    size: 42cm 29.7cm;   /* auto is the initial value */
    margin: 0;  /* this affects the margin in the printer settings */
}
</style>
<route lang="json">
  {
      "meta": {
          "role": "manager"
      }
  }
  </route>
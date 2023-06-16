<script setup lang="ts">
</script>
<template>
  <div class="grid grid-cols-[1fr,5fr] gap-10">
    <div
      class="bg-red-500 h-[100vh]"
    />
    <div class="bg-green-500 h-[100vh]">
      <RouterView />
    </div>
  </div>
</template>
<route lang="json">
{
    "meta": {
        "public": true
    }
}
</route>
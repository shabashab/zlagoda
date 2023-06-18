<script setup lang="ts">
</script>
<template>
  <div class="grid grid-cols-[1fr,5fr] gap-10 py-5 h-screen">
    <CabinetCashierNavbar />
    <div>
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
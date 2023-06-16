<script setup lang="ts">
import CabinetCashireNavbar from '../componets/cabinet-cashire-navbar.vue';

</script>
<template>
  <div class="grid grid-cols-[1fr,5fr] gap-10 py-5 h-screen">
    <CabinetCashireNavbar />
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
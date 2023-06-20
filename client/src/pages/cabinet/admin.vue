<script setup lang="ts">
</script>
<template>
  <div class="container">
    <CabinetAdminNavbar />
    <RouterView />
  </div>
</template>
<route lang="json">
  {
      "meta": {
          "role": "manager"
      }
  }
  </route>
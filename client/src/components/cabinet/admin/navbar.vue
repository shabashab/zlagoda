<script setup lang="ts">
import Menubar from 'primevue/menubar';

const items = ref([
  {
    label: 'Employees',
    icon: 'pi pi-users',
    to: '/cabinet/admin/employees'
  }
])
</script>
<template>
  <Menubar
    :model="items"
    style="margin-top: 10px;"
  />
</template>
<script setup lang="ts">
import Menubar from 'primevue/menubar';

const items = ref([
  {
    label: 'Employees',
    icon: 'pi pi-users',
    to: '/cabinet/admin/employees'
  },
  {
    label: 'Customers',
    icon: 'pi pi-id-card',
    to: '/cabinet/admin/customers'
  }
])
</script>
<template>
  <Menubar
    :model="items"
    style="margin-top: 10px;"
  />
</template>
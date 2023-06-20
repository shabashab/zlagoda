<script setup lang="ts">
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';

const authStore = useAuthStore();

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
  },
  {
    label: 'Categories',
    icon: 'pi pi-book',
    to: '/cabinet/admin/categories'
  },
  {
    label: 'Checks',
    icon: 'pi pi-money-bill',
    to: '/cabinet/admin/checks'
  },
  {
    label: 'Products',
    icon: 'pi pi-store',
    to: '/cabinet/admin/products'
  },
  {
    label: 'Reports',
    icon: 'pi pi-reply',
    to: '/cabinet/admin/reports'
  }
])
</script>
<template>
  <Menubar
    :model="items"
    style="margin-top: 10px;"
  >
    <template #end>
      <Button
        label="Logout"
        severity="danger"
        @click="authStore.signOut()"
      />
    </template>
  </Menubar>
</template>
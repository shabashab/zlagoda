<script setup lang="ts">
import Button from 'primevue/button';
import { NavButton } from '../models/nav-button.model';

const authStore = useAuthStore();

const router = useRouter();

const buttons = ref<NavButton[]>([
  {
    to: '/cabinet/cashier',
    label: 'Home',
    icon: 'pi pi-home'
  },
  {
    to: '/cabinet/cashier/history',
    label: 'History',
    icon: 'pi pi-history'
  },
  {
    to: '/cabinet/cashier/customers',
    label: 'Customers',
    icon: 'pi pi-id-card'
  },
  {
    to: '/cabinet/cashier/products',
    label: 'Products',
    icon: 'pi pi-shopping-bag'
  },
  {
    to: '/cabinet/personal',
    label: 'Personal cabinet',
    icon: 'pi pi-user',
  },
])
</script>
<template>
  <div class="h-full w-full border border-black/50 rounded-2xl flex flex-col gap-10 px-4 py-8">
    <Button
      v-for="button in buttons"
      :key="button.to"
      style="width: 100%;"
      :severity="button.severity ? button.severity : 'info'"
      :label="button.label"
      :icon="button.icon"
      @click="router.push(button.to)"
    />
    <Button
      severity="danger"
      label="Log out"
      @click="authStore.signOut()"
    />
  </div>
</template>
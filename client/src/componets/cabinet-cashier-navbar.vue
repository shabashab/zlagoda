<script setup lang="ts">
import { NavButton } from '../models/nav-button.model';

import Button from 'primevue/button';

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
    to: '/cabinet/personal',
    label: 'Personal cabinet',
    icon: 'pi pi-user',
  },
  {
    to: 'test',
    label: 'Log out',
    severity: 'danger'
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
  </div>
</template>
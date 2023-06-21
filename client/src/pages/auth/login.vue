<script lang="ts" setup>
import Button from 'primevue/button';
import { router } from '../../router';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const authStore = useAuthStore();

const login = ref('');
const password = ref('');
const role = ref<'cashier' | 'manager'>('cashier');

const signIn = async () => {
  try {
    await authStore.signIn({ login: login.value, password: password.value, as: role.value });
    router.push('/cabinet');
    toast.add({ severity: 'success', summary: 'Log in', life: 3000 })
  } catch(error) {
    toast.add({ severity: 'error', summary: error.status === 401 ? 'Incorrect login or password': error.status === 403 ? 'Incorrect role' : error as string, life: 3000 })
  }
}

</script>

<template>
  <div class="w-full lg:w-1/2 xl:w-1/3 flex flex-col gap-5 border border-black/30 rounded-3xl p-20">
    <h1 class="text-3xl font-bold text-center mb-10">
      Zlagoda Login
    </h1>
    <TextPropInput
      v-model:value="login"
      label="Enter login"
    />
    <TextPropInput
      v-model:value="password"
      label="Enter password"
    />
    <RoleDropdown
      v-model:role="role"
      label="Select role"
    />
    <div class="flex justify-center mt-10">
      <Button
        label="Log in"
        @click="signIn"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
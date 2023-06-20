<script setup lang="ts">
import Button from 'primevue/button';
import CabinetCustomerPropInput from './cabinet-customer-prop-input.vue';
import { useToast } from 'primevue/usetoast';

import { CustomerCard } from '../models/customer-card.model';
import { customers } from '../api/customers';

const props = defineProps<{
  customer: CustomerCard;
  newCustomer: boolean;
}>();

const emits = defineEmits(['update:customer', 'close']);

const customerCard = computed({
  get() {
    return props.customer;
  },
  set(value) {
    emits('update:customer', value);
  }
});

const toast = useToast();

const { fetch: editCustomer, error: editCustomerError } = customers.useEditCustomer();

const { fetch: createCustomer, error: createCustomerError } = customers.useCreateCustomer();


const onEditFormSubmit = async () => {
  await editCustomer(customerCard.value).catch((editCustomerError) => {
    toast.add({ severity: 'error', summary: 'Errror', detail: editCustomerError, life: 3000 })
    return;
  });
  toast.add({ severity: 'success', summary: 'Edited', life: 3000 });
  emits('close');
}

const onNewCustomerFormSubmit = async () => {
  await createCustomer(customerCard.value).catch((createCustomerError) => {
    toast.add({ severity: 'error', summary: 'Errror', detail: createCustomerError, life: 3000 })
  });
  toast.add({ severity: 'success', summary: 'Created', life: 3000 });
  emits('close');
}

</script>
<template>
  <div @keyup.enter="onEditFormSubmit()">
    <div class="text-2xl">
      {{ customerCard.name }} {{ customerCard.surname }}
    </div>
    <div class="grid grid-cols-2 gap-y-5 gap-x-8 mt-10">
      <div 
        v-for="key in Object.keys(customerCard)"
        :key="key"
      >
        <CabinetCustomerPropInput
          v-model:prop="customerCard[key as keyof typeof customerCard]"
          :prop-key="key"
        />
      </div>
    </div>
    <div class="w-full mt-10 flex justify-center">
      <Button
        v-if="!props.newCustomer"
        label="Submit"
        :autofocus="true"
        @click="onEditFormSubmit"
      />
      <Button
        v-else
        label="Submit"
        severity="success"
        icon="pi pi-plus"
        :autofocus="true"
        @click="onNewCustomerFormSubmit"
      />
    </div>
  </div>
</template>
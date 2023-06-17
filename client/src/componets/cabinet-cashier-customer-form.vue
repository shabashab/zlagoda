<script setup lang="ts">
import Button from 'primevue/button';
import CabinetCustomerPropInput from './cabinet-customer-prop-input.vue';

import { CustomerCard } from '../models/customer-card.model';

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

const sendCustomerEditRequestToBackend = async () => {
  return
}

const sendNewCustomerRequestToBackend = async () => {
  return
}

const onEditFormSubmit = async () => {
  await sendCustomerEditRequestToBackend();
  emits('close');
}

const onNewCustomerFormSubmit = async () => {
  await sendCustomerEditRequestToBackend();
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
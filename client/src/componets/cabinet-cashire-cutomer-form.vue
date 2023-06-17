<script setup lang="ts">
import Button from 'primevue/button';
import CabinetCustomerPropInput from './cabinet-customer-prop-input.vue';

import { CustomerCard } from '../models/customer-card.model';

const props = defineProps<{
  customer: CustomerCard;
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

const onFormSubmit = () => {
  emits('close');
}

</script>
<template>
  <div @keyup.enter="onFormSubmit()">
    <div class="text-2xl">
      {{ customerCard.name }} {{ customerCard.surname }}
    </div>
    <div class="grid grid-cols-2 gap-y-5 gap-x-8">
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
        label="Submit"
        :autofocus="true"
        @click="onFormSubmit"
      />
    </div>
  </div>
</template>
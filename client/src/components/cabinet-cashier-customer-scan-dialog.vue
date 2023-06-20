<script setup lang="ts">
import { customers } from '../api/customers';
import { CustomerCard } from '../models/customer-card.model';
import UpcInput from './upc-input.vue';

const props = defineProps<{
  customerCard: CustomerCard | undefined;
}>();

const emits = defineEmits(['update:customerCard', 'close'])
const customer = computed({
  get() {
    return props.customerCard;
  },
  set(value) {
    emits('update:customerCard', value);
  }
})

const customerUpc = ref<string>('');


const { fetch: fetchCustomerCard } = customers.useCustomer();

const submitCustomerUpc = async () => {
  customer.value = await fetchCustomerCard(customerUpc.value);
  emits('close');
}
</script>
<template>
  <UpcInput
    v-model:upc="customerUpc"
    :disabled="customer"
    @submit="submitCustomerUpc()"
  />
</template>
<script setup lang="ts">
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

const fetchCustomerCard = async () : Promise<CustomerCard> => {
  return {
    cardNumber: customerUpc.value,
    name: 'Danylo',
    surname: 'Khomichenko',
    phoneNumber: '0976373938',
    persent: 2
  }
}

const submitCustomerUpc = async () => {
  customer.value = await fetchCustomerCard();
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
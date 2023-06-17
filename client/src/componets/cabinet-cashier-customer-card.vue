<script setup lang="ts">
import { CustomerCard } from '../models/customer-card.model';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import CabinetCashierCustomerForm from './cabinet-cashier-customer-form.vue';

const props = defineProps<{
  customer: CustomerCard;
}>();

const emits = defineEmits(['update:customer']);

const customerCard = computed({
  get() {
    return props.customer;
  },
  set(value) {
    emits('update:customer', value)
  }
});

const isEditCustomerCardDiaglogVisible = ref<boolean>(false);
</script>
<template>
  <div class="flex flex-start gap-8 items-center font-bold">
    <span>
      <i class="pi pi-user" />
      {{ customerCard.name }} {{ customerCard.surname }}
    </span>
    <span>
      <i class="pi pi-percentage" />
      {{ customerCard.persent }}
    </span>
    <Button
      icon="pi pi-pencil"
      severity="secondary"
      rounded
      text
      @click="isEditCustomerCardDiaglogVisible = true"
    />
    <Dialog
      v-model:visible="isEditCustomerCardDiaglogVisible"
      modal
      header="Edit customer"
    >
      <CabinetCashierCustomerForm
        v-model:customer="customerCard"
        :new-customer="false"
        @close="isEditCustomerCardDiaglogVisible = false"
      />
    </Dialog>
  </div>
</template>
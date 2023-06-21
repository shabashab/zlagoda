<script setup lang="ts">
import { Check } from '../models/check.model';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';

import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { Product } from '../models/product.model';


const confirm = useConfirm();
const toast = useToast();

const props = defineProps<{
  check: Check
}>();

const emits = defineEmits(['update:check']);

const checkValue = computed({
  get() {
    return props.check;
  },
  set(value) {
    emits('update:check', value);
  }
});

const deleteItem = (event: any, product: Product) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure you want to delete?',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      toast.add({ severity: 'info', summary: 'Deleted', detail: 'You have accepted', life: 3000 });
      checkValue.value.items = checkValue.value.items.filter((item) => {
        return item.product.upc !== product.upc;
      })
    }
  }); 
}

</script>
<template>
  <div class="h-[100%] overflow-y-scroll">
    <DataTable
      v-if="checkValue.items[0]"
      :value="checkValue.items"
      :scrollable="false"
    >
      <Column
        header="UPC"
        field="product.upc"
      />
      <Column
        header="Name"
        field="product.name"
      >
        <template #body="{data}">
          {{ data.product.name }} {{ data.product.manufacture }} {{ data.product.characteristics }} 
        </template>
      </Column>
      <Column
        header="Price"
        field="product.price"
      >
        <template #body="{ data }">
          {{ data.product.isPromo ? data.product.promoPrice : data.product.price }}
        </template>
      </Column>
      <Column>
        <template #body="{ data }">
          <i
            v-if="data.product.isPromo"
            class="pi pi-circle-fill text-red-500 "
          />
        </template>
      </Column>
      <Column header="number">
        <template #body="slotProps">
          <InputNumber
            v-model="slotProps.data.number"
            show-buttons
            button-layout="horizontal"
            :step="1"
            decrement-button-class="p-button-danger"
            increment-button-class="p-button-success"
            increment-button-icon="pi pi-plus"
            decrement-button-icon="pi pi-minus"
            prefix="№"
            :min="1"
            :max="slotProps.data.product.number"
          />
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            severity="danger"
            @click="deleteItem($event, slotProps.data.product)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<style>
.p-inputtext {
    width: 70px !important;
}
</style>
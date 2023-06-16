<script setup lang="ts">
import Button from 'primevue/button';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import CabinetCashireCheckTable from '../../../componets/cabinet-cashire-check-table.vue';
import UpcInput from '../../../componets/upc-input.vue';
import { Check } from '../../../models/check.model';
import { Product } from '../../../models/product.model';


const confirm = useConfirm();
const toast = useToast();

const upc = ref<string>('');

const product = ref<Product>();

const check = ref<Check>({
  items: []
});

const fetchProduct = async (productUpc: string) : Promise<Product> => {
  return {
    upc: productUpc,
    name: 'Test',
    manufacture: 'TestManufacture'
  }
} 

const addProductToCheck = (product: Product) => {
  const findedItemRef = check.value.items.find(item => {
    return item.product.upc === product.upc
  });
  if (findedItemRef) {
    findedItemRef.number++;
  } else {
    check.value?.items.push({
      product: product,
      number: 1,
    });
  }
}

const onUpcSubmit = async () => {
  product.value = await fetchProduct(upc.value);
  upc.value = '';
  addProductToCheck(product.value);
}

const sendCheckOutToBackEnd = async () => {
  return
}

const setDefaultValues = () => {
  check.value.items = [];
  upc.value = '';
}

const checkOut = async () => {
  await sendCheckOutToBackEnd;
  setDefaultValues();
}

const confirmCloseCheck = (event: any) => {

  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure you want to close check?',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      toast.add({ severity: 'info', summary: 'Closed', detail: 'Check was closed!', life: 3000 });
      setDefaultValues();
    }
  });

  
}

</script>

<template>
  <div class="flex flex-col gap-10">
    <div class="flex justify-between">
      <UpcInput
        v-model:upc="upc"
        @submit="onUpcSubmit"
      />
      <div class="flex justify-end gap-10">
        <Button
          label="Check out"
          icon="pi pi-check"
          severity="success"
          @click="checkOut()"
        />
        <Button
          label="Close check"
          severity="danger"
          icon="pi pi-times"
          @click="confirmCloseCheck($event)"
        />
      </div>
    </div>
    <CabinetCashireCheckTable v-model:check="check" />
  </div>
</template>
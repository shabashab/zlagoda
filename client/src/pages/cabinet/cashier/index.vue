<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import CabinetCashireCheckTable from '../../../componets/cabinet-cashier-check-table.vue';
import UpcInput from '../../../componets/upc-input.vue';
import { Check } from '../../../models/check.model';
import { Product } from '../../../models/product.model';
import CabinetCashireCustomerScanDialog from '../../../componets/cabinet-cashier-customer-scan-dialog.vue';
import CabinetCashireCustomerCard from '../../../componets/cabinet-cashier-customer-card.vue';

const confirm = useConfirm();
const toast = useToast();

const upc = ref<string>('');

const product = ref<Product>();

const check = ref<Check>({
  items: [],
  printDate: new Date(),
  sumTotatal: 0,
  VAT: 0
});

const fetchProduct = async (productUpc: string): Promise<Product> => {
  return {
    upc: productUpc,
    name: 'Test',
    manufacture: 'TestManufacture',
    price: (Math.random() * 100).toFixed(2) as unknown as number,
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

const sum = computed(() => {
  const sum = ref<number>(0);
  for (let item of check.value.items) {
    if (item.product.promoPrice) {
      sum.value += item.product.promoPrice * item.number;
    } else {
      sum.value += item.product.price * item.number;
    }

  }
  return sum.value.toFixed(2) as unknown as number;
})

const customerDiscountPersent = computed(() => {
  if (check.value.customerCard) {
    return check.value.customerCard.persent
  } else {
    return 0;
  }
})

const totalToPay = computed(() => {
  return (sum.value - sum.value * (customerDiscountPersent.value / 100)).toFixed(2) as unknown as number;
})

const vat = computed(() => {
  return (totalToPay.value * 0.2).toFixed(2) as unknown as number;
})

const showScanCustomerDialog = ref<boolean>(false);
</script>

<template>
  <div class="flex flex-col gap-10 h-[95vh]">
    <div class="flex justify-between">
      <UpcInput
        v-model:upc="upc"
        @submit="onUpcSubmit"
      />
      <CabinetCashireCustomerCard
        v-if="check.customerCard"
        v-model:customer="check.customerCard"
      />
      <div class="flex justify-end gap-10">
        <Dialog
          v-model:visible="showScanCustomerDialog"
          header="Scan customer card"
          modal
          style="width: 15vw;"
        >
          <CabinetCashireCustomerScanDialog
            v-model:customer-card="check.customerCard" 
            @close="showScanCustomerDialog = false"
          />
        </Dialog>
        <Button
          v-if="!check.customerCard"
          label="card"
          icon="pi pi-user"
          severity="warning"
          @click="showScanCustomerDialog = true"
        />
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
    <div class="flex justify-between">
      <div class="text-6xl font-extrabold text-green-700">
        {{ totalToPay }} UAH
      </div>
      <div class="flex flex-col">
        <span>
          Total sum: {{ sum }} UAH
        </span>
        <span>
          Customer discount: {{ customerDiscountPersent }} %
        </span>
        <span>
          Total to pay: {{ totalToPay }}
        </span>
        <span>
          Vat(20%): {{ vat }} UAH
        </span>
      </div>
    </div>
  </div>
</template>
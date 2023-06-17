<script setup lang="ts">
import { Check } from '../models/check.model';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import CabinetCheckTableItem from './cabinet-check-table-item.vue';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';


const props = defineProps<{
  cashireId: string,
  datesRange: Date[],
}>();

const checks = ref<Check[]>([]);

const isItemsDialogVisible = ref<boolean>(false);

const checkToDisplayInDialog = ref<Check>(checks.value[0]);

const openCheckDialog = (check: Check) => {
  isItemsDialogVisible.value = true;
  checkToDisplayInDialog.value = check;
}

const isUserDialogVisible = ref<boolean>(false);

const fetchChecks = async (cashireId: string) => {
  for (let i = 0; i < 100; i++) {
    checks.value.push({
      id: '0213898192938',
      items: [
        {
          product: {
            upc: '4779038123734',
            name: 'Напій газ.',
            price: 100,
            manufacture: 'Scotty west',
            characteristics: 'Імбир малина'
          },
          number: 2
        },
        {
          product: {
            upc: '5449064244221',
            name: 'Соус гамбургер',
            price: 200,
            manufacture: 'Develey',
            characteristics: '410г'            
          },
          number: 3
        }
      ],
      printDate: new Date(),
      sumTotatal: 800,
      VAT: 160,
    })
  }
}

watch(() => props.datesRange, () => {
  fetchChecks(props.cashireId);
}, {
  immediate: true
});
</script>
<template>
  <DataTable
    :value="checks"
    paginator
    :rows="6"
  >
    <template #header>
      <h2 class="text-xl text-black">
        Checks
      </h2>
    </template>
    <Column
      sortable
      header="ID"
      field="id"
    />
    <Column
      header="Print date"
      field="printData"
      sortable
    >
      <template #body="slotProps">
        <Calendar
          v-model="slotProps.data.printDate"
          style="width: 120px;"
          date-format="dd/mm/yy"
          disabled
        />
      </template>
    </Column>
    <Column
      header="Products"
      field="sumTotal"
      sortable
    >
      <template #body="slotProps">
        <div class="grid grid-cols-2">
          <div>
            <Button
              label="Products"
              icon="pi pi-bars"
              rounded
              text
              @click="openCheckDialog(slotProps.data)"
            />
          </div>
          <div class="flex flex-col text-end">
            <div class="text-2xl font-extrabold">
              SUM: {{ slotProps.data.sumTotatal }}
            </div>
            <div class="text-xs">
              VAT(20%): {{ slotProps.data.VAT }}
            </div>
          </div>
        </div>
      </template>
    </Column>
  </DataTable>
  <Dialog
    v-model:visible="isItemsDialogVisible"
    header="Products"
    style="min-width: 30vw;"
    modal
  >
    <div class="flex flex-col gap-2">
      <CabinetCheckTableItem
        v-for="(item, key) in checkToDisplayInDialog.items"
        :key="key"
        :item="item"
      />
      <div class="flex justify-end mt-5">
        <div class="flex flex-col text-end">
          <div class="text-2xl font-extrabold">
            SUM: {{ checkToDisplayInDialog.sumTotatal }}
          </div>
          <div class="text-xs">
            VAT(20%): {{ checkToDisplayInDialog.VAT }}
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import { FilterMatchMode } from 'primevue/api';
import { Check } from '../../../models/check.model';

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const props = withDefaults(defineProps<{
  cashireId: string,
  datesRange: Date[],
  isAdmin: boolean,
}>(), {
  isAdmin: false
});

const checks = ref<Check[]>([]);

const isItemsDialogVisible = ref<boolean>(false);

const checkToDisplayInDialog = ref<Check>(checks.value[0]);

const openCheckDialog = (check: Check) => {
  checkToDisplayInDialog.value = check;
  isItemsDialogVisible.value = true;
}

const isUserDialogVisible = ref<boolean>(false);

const fetchChecks = async (cashireId: string) => {
  for (let i = 0; i < 100; i++) {
    checks.value.push({
      id: (Math.random() * 128312327).toFixed(0),
      items: [
        {
          product: {
            upc: '4779038123734',
            name: 'Напій газ.',
            price: 100,
            manufacture: 'Scotty west',
            characteristics: 'Імбир малина',
            isPromo: false
          },
          number: 2
        },
        {
          product: {
            upc: '5449064244221',
            name: 'Соус гамбургер',
            price: 200,
            manufacture: 'Develey',
            characteristics: '410г',
            isPromo: false
          },
          number: 3
        }
      ],
      printDate: new Date(),
      sumTotatal: 800,
      VAT: 160,
      cashier: {
        id: '1231',
        name: 'Taras',
        surname: 'Artemovich',
        city: 'Govno',
        street: 'Mocha st.',
        zipCode: '1231',
        role: 'cashier',
        dateOfBirth: new Date(1,2,2003),
        dateOfStart: new Date(1,2,2022),
        salary: 300,
        phoneNumber: '0976373938'
      }
    })
  }
}

watch(() => props.datesRange, () => {
  fetchChecks(props.cashireId);
}, {
  immediate: true
});

const idSearchInput = ref<string>('');

const fetchCheck = async () : Promise<Check> => {
  return {
    id: (Math.random() * 128312327).toFixed(0),
    items: [
      {
        product: {
          upc: '4779038123734',
          name: 'Напій газ.',
          price: 100,
          manufacture: 'Scotty west',
          characteristics: 'Імбир малина2',
          isPromo: false
        },
        number: 2
      },
      {
        product: {
          upc: '5449064244221',
          name: 'Соус гамбургер2',
          price: 200,
          manufacture: 'Develey',
          characteristics: '410г',
          isPromo: false
        },
        number: 3
      }
    ],
    printDate: new Date(),
    sumTotatal: 802,
    VAT: 160,
    cashier: {
      id: '1231',
      name: 'Taras',
      surname: 'Artemovich',
      city: 'Govno',
      street: 'Mocha st.',
      zipCode: '1231',
      role: 'cashier',
      dateOfBirth: new Date(1,2,2003),
      dateOfStart: new Date(1,2,2022),
      salary: 300,
      phoneNumber: '0976373938'
    }
  }
}

const searchCheckById = async () => {
  console.log(1);
  checkToDisplayInDialog.value = await fetchCheck();
  isItemsDialogVisible.value = true;
}
</script>
<template>
  <DataTable
    v-model:filters="filters"
    :value="checks"
    paginator
    :rows="isAdmin ? 5 : 6"
    data-key="id"
    filter-display="row"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <h2 class="text-xl text-black">
          Checks
        </h2>
        <div class="flex gap-5">
          <InputText
            v-model="idSearchInput"
            style="width: 250px !important;"
            placeholder="Search check by id"
            :maxlength="10"
          />
          <Button
            severity="success"
            icon="pi pi-search"
            :disabled="idSearchInput.length !== 10"
            @click="searchCheckById()"
          />
        </div>
      </div>
    </template>
    <template #empty>
      <h2 class="text-2xl text-blue-900 w-full text-center">
        No checks found!
      </h2>
    </template>
    <Column
      style="width: 350px;"
      sortable
      header="ID"
      field="id"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          style="width: 200px !important;"
          :placeholder="`Filter by id { ${filterModel.matchMode} }`"
          @input="filterCallback"
        />
      </template>
    </Column>
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
      field="sumTotal"
      header="Sum total"
      sortable
    >
      <template #body="slotProps">
        <div class="flex flex-col text-end">
          <div class="text-2xl font-extrabold">
            SUM: {{ slotProps.data.sumTotatal }}
          </div>
          <div class="text-xs">
            VAT(20%): {{ slotProps.data.VAT }}
          </div>
        </div>
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <Button
          label="All info"
          icon="pi pi-bars"
          rounded
          text
          @click="openCheckDialog(slotProps.data)"
        />
      </template>
    </Column>
    <Column v-if="props.isAdmin">
      <template #body="{ data }">
        <TableButtons
          :data="data"
          item-to-edit="" 
          :delete-url="``"
          :is-edit="false"
          token-name="id"
          @record-deleted="fetchCheck"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog
    v-if="isItemsDialogVisible"
    v-model:visible="isItemsDialogVisible"
    :header="'Check: №' + checkToDisplayInDialog.id"
    style="min-width: 30vw;"
    modal
  >
    <div>
      <Calendar
        v-model="checkToDisplayInDialog.printDate"
        style="width: 120px; margin-bottom: 10px;"
        date-format="dd/mm/yy"
        disabled
      />
    </div>
    <div>
      Cashier: {{ checkToDisplayInDialog.cashier.id }}
    </div>
    <div v-if="checkToDisplayInDialog.customerCard">
      Customer: {{ checkToDisplayInDialog.customerCard.cardNumber }}
    </div>
    <div class="flex flex-col gap-2 mt-5">
      <CabinetCheckTableItem
        v-for="(item, key) in checkToDisplayInDialog.items"
        :key="key"
        :item="item"
      />
      <div class="flex justify-end mt-10">
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
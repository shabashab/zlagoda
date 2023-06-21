<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import { FilterMatchMode } from 'primevue/api';
import { Check } from '../../../models/check.model';
import { checks } from '../../../api/checks';

const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const props = withDefaults(defineProps<{
  cashireId: string,
  datesRange: Date[],
  isAdmin: boolean,
  isReport: boolean
}>(), {
  isAdmin: false,
  isReport: false,
  cashireId: '',
  datesRange: () => {
    return [new Date(0,0,1900), new Date()]
  }
});

const isItemsDialogVisible = ref<boolean>(false);

const checkToDisplayInDialog = ref<Check>();

const openCheckDialog = async (check: Check) => {
  checkToDisplayInDialog.value = await fetchCheck({
    checkId: check.id ?? ''
  });
  isItemsDialogVisible.value = true;
}

const { fetch: fetchChecks, result: checksValue } = checks.useChecks();

const { fetch: fetchCheck } = checks.useCheck();

watch(() => [props.datesRange, props.cashireId], () => {
  fetchChecks({ selectedDates: props.datesRange, cachierId: props.cashireId });
}, {
});

const idSearchInput = ref<string>('');

const searchCheckById = async () => {
  checkToDisplayInDialog.value = await fetchCheck({
    checkId: idSearchInput.value
  });
  isItemsDialogVisible.value = true;
}

const getSum = () => {
  if (checksValue.value) {
    const sum = checksValue.value.reduce((sum, el) => {
      return sum + el.totalSum
    }, 0)

    return sum
  }
}
</script>
<template>
  <DataTable
    v-model:filters="filters"
    :value="checksValue"
    :paginator="!props.isReport"
    :rows="isAdmin ? 5 : 6"
    data-key="id"
    filter-display="row"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <h2 class="text-xl text-black">
          Checks
        </h2>
        <div>
          Sum: {{ getSum() }}
        </div>
        <div
          v-if="!props.isReport"
          class="flex gap-5"
        >
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
      field="totalSum"
      header="Sum total"
      sortable
    >
      <template #body="slotProps">
        <div class="flex flex-col text-end">
          <div class="text-2xl font-extrabold">
            SUM: {{ slotProps.data.totalSum }}
          </div>
          <div class="text-xs">
            VAT(20%): {{ slotProps.data.vat }}
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
          @record-deleted="fetchChecks({cachierId: props.cashireId, selectedDates: props.datesRange})"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog
    v-if="isItemsDialogVisible && checkToDisplayInDialog"
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
      Cashier: {{ checkToDisplayInDialog.cashier.employeeId }}
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
            SUM: {{ checkToDisplayInDialog.totalSum }}
          </div>
          <div class="text-xs">
            VAT(20%): {{ checkToDisplayInDialog.vat }}
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';


import { router } from '../../../router';

const printReport = () => {
  window.open(selectedReport.value?.link, '_blank');
}

const selectedReport = ref<{
  label: string,
  link: string
}>();

const reportsOptions = ref<{
  label: string,
  link: string
}[]>([
  {
    label: 'Employees',
    link: '/reports/employees'
  },
  {
    label: 'Customers',
    link: '/reports/customers'
  },
  {
    label: 'Categories',
    link: '/reports/categories',
  },
  {
    label: 'Products',
    link: '/reports/products'
  },
  {
    label: 'Checks',
    link: '/reports/checks'
  }
]);

</script>
<template>
  <div class="flex mt-10 justify-between items-center">
    <Dropdown
      v-model:model-value="selectedReport"
      :options="reportsOptions"
      placeholder="Select report"
      option-label="label"
    />
    <Button
      :disabled="!selectedReport"
      @click="printReport"
    >
      Print
    </Button>
  </div>
  <div class="mt-10">
    <CabinetAdminEmployeesTable
      v-if="selectedReport?.label === 'Employees'"
      :is-report="true"
    />
    <CabinetCustomersTable
      v-else-if="selectedReport?.label === 'Customers'"
      :is-report="true"
    />
    <CabinetAdminCategoriesTable 
      v-else-if="selectedReport?.label === 'Categories'"
      :is-report="true"
    />
    <CabinetProductsTable
      v-else-if="selectedReport?.label === 'Products'"
      :is-report="true"
      :selected-category="undefined"
    />
    <CabinetChecksTable
      v-else-if="selectedReport?.label === 'Checks'"
      :is-report="true"
    />
  </div>
</template>
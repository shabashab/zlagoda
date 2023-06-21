<script setup lang="ts">
import { Employee } from '../../../models/employee.model';

const datesRange = ref<Date[]>([]);
const cashier = ref<Employee>();
</script>
<template>
  <div class="my-5 flex justify-start gap-20 items-center">
    <DateRangePicker v-model:dates-range="datesRange" />
    <CabinetCashierPicker v-model:cashier="cashier" />
  </div>
  <CabinetAdminChecksTable
    :cashier-id="cashier?.employeeId"
    :dates-range="datesRange"
  />
</template>
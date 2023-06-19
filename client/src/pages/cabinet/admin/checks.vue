<script setup lang="ts">
const datesRange = ref<Date[]>([]);
const cashierId = ref<string>('');
</script>
<template>
  <div class="my-5 flex justify-start gap-20 items-center">
    <DateRangePicker v-model:dates-range="datesRange" />
    <CabinetCashierPicker v-model:cashier-id="cashierId" />
  </div>
  <CabinetAdminChecksTable
    :cashier-id="cashierId"
    :dates-range="datesRange"
  />
</template>
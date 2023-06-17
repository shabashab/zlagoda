<script setup lang="ts">
import CabinetChecksTable from '../../../componets/cabinet-checks-table.vue';
import DateRangePicker from '../../../componets/date-range-picker.vue';

const cashireId = '91273091723';

const datesRange = ref<Date[]>([]);

</script>
<template>
  <div class="flex flex-col gap-5 max-h-[90vh]">
    <h1 class="w-full pb-2 border-b border-black/30">
      History
    </h1>
    <DateRangePicker
      v-model:dates-range="datesRange"
    /> 
    <CabinetChecksTable
      :cashire-id="cashireId"
      :dates-range="datesRange"
    />
  </div>
</template>
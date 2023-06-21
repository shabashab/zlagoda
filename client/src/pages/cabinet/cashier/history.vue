<script setup lang="ts">
const authStore = useAuthStore();

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
      :cashire-id="authStore.currentUser?.employeeId"
      :dates-range="datesRange"
    />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  datesRange: Date[],
  cashierId: string,
}>();
</script>
<template>
  <CabinetChecksTable
    :cashire-id="props.cashierId"
    :dates-range="props.datesRange"
    :is-admin="true"
  />
</template>
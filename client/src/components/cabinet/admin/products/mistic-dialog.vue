<script setup lang="ts">
import Button from 'primevue/button';


const upc = ref<string>('');

const datesRange = ref<Date[]>([]);

const { fetch, result } = products.useStats();

const submit = async () => {
  try {
    await fetch({ upc: upc.value, selectedDates: datesRange.value });
  } catch(error) {
    console.log(error);
  }
}
</script>
<template>
  <div class="flex flex-col gap-5">
    <UpcInput v-model:upc="upc" />
    <DateRangePicker v-model:dates-range="datesRange" />
    <div class="mt-10 flex justify-center">
      <Button
        label="Stats"
        @click="submit()"
      />
    </div>
  </div>
  {{ result }}
</template>
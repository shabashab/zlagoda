<script setup lang="ts">
import Button from 'primevue/button';


const upc = ref<string>('');

const datesRange = ref<Date[]>([]);

const { fetch, result } = products.useStats();

const submit = async () => {
  try {
    result.value = undefined;
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
  <div v-if="result" class="grid grid-cols-2 text-xl mt-10 border border-black/30 p-10 rounded-xl">
    <div>
      Name: {{ result?.product.name }}
    </div>
    <div>
      Number: {{ result.number }}
    </div>
  </div>
</template>
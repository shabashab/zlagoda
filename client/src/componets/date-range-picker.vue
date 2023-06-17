<script setup lang="ts">
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import { DatePreset } from '../models/date-preset.model';

const props = defineProps<{
  datesRange: Date[]
}>();

const emits = defineEmits(['update:datesRange']);

const datesRangeValue = computed({
  get() {
    return props.datesRange;
  },
  set(value) {
    emits('update:datesRange', value);
  }
})

const getYesterday = (): Date => {
  const today = new Date;
  today.setDate(today.getDate() - 1);

  return today;
}

const presetedOptions = ref<DatePreset[]>([
  {
    label: 'Today',
    datesRange: [new Date, new Date],
  },
  {
    label: 'Yesterday',
    datesRange: [getYesterday() , getYesterday()]
  },
  {
    label: 'All time',
    datesRange: [new Date(0,0,1900), new Date]
  }
])

const pickedPresetedDate = ref<DatePreset>(
  presetedOptions.value[0]
);

watch(pickedPresetedDate, (newValue) => {
  datesRangeValue.value = newValue.datesRange;
}, {
  immediate: true,
})
</script>
<template>
  <div class="flex justify-start gap-10 items-center`">
    <div class="flex items-center">
      <Dropdown
        v-model="pickedPresetedDate"
        :options="presetedOptions"
        option-label="label"
      />
    </div>
    <div class="flex flex-col">
      <label for="calendar">Pick date range</label>
      <Calendar
        id="calendar"
        v-model="datesRangeValue"
        selection-mode="range"
        show-icon
        style="width: 300px;"
        date-format="dd/mm/yy"
      />
    </div>
  </div>
</template>
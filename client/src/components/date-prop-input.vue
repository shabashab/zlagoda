<script setup lang="ts">
import Calendar from 'primevue/calendar';


const props = withDefaults(defineProps<{
  label: string
  value: Date | undefined
  error: boolean
}>(), {
  error: false 
});

const emits = defineEmits(['update:value']);

const propValue = computed({
  get() {
    return props.value;
  },
  set(value) {
    emits('update:value', value)
  }
}) 
</script>
<template>
  <div>
    <label for="input">{{ props.label }}</label>
    <Calendar
      id="input"
      v-model="propValue"
      date-format="dd/mm/yy"
      :class="{'p-invalid': props.error}"
      style="width: 100%;"
    />
  </div>
</template>
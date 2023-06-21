<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';

const props = withDefaults(defineProps<{
  label: string
  value: number | undefined
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
    <InputNumber
      id="input"
      v-model="propValue"
      :min="0"
      style="width: 100%;"
    />
  </div>
</template>
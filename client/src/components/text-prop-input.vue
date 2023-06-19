<script setup lang="ts">
import InputText from 'primevue/inputtext';


const props = defineProps<{
  label: string
  value: string | undefined
}>();

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
    <InputText
      id="input"
      v-model="propValue"
      style="width: 100%;"
    />
  </div>
</template>
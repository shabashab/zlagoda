<script setup lang="ts">
import InputText from 'primevue/inputtext';


const props = withDefaults(defineProps<{
  label: string
  value: string | undefined
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
    <InputText
      id="input"
      v-model="propValue"
      :class="{'p-invalid': props.error}"
      style="width: 100%;"
    />
  </div>
</template>
<script setup lang="ts">
import InputText from 'primevue/inputtext';

const props = defineProps<{
  upc: string
}>();

const emits = defineEmits(['update:upc', 'submit'])

const upcValue = computed({
  get() {
    return props.upc;
  },
  set(value) {
    const upcPattern = /^[0-9]+$/
    if ((upcPattern.test(value as string) && value.length <= 13) || value.length === 0) {
      emits('update:upc', value);
      if (value.length === 13) {
        emits('submit')
      }
    }
  }
})

const onInputBlur = (e: Event) => {
  (e.target as HTMLInputElement).focus()
}
</script>

<template>
  <InputText
    v-model="upcValue"
    autofocus
    @blur="onInputBlur"
  />
</template>
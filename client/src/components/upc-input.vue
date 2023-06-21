<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { Icon } from '@iconify/vue';

const props = withDefaults(defineProps<{
  upc: string,
  maxLength: number
}>(), {
  maxLength: 13,
});

const emits = defineEmits(['update:upc', 'submit'])

const upcValue = computed({
  get() {
    return props.upc;
  },
  set(value) {
    const upcPattern = /^[0-9]+$/
    if ((upcPattern.test(value as string) && value.length <= 13) || value.length === 0) {
      emits('update:upc', value);
      // if (value.length === 13) {
      //   emits('submit')
      // }
    }
  }
})

// const onInputBlur = (e: Event) => {
//   (e.target as HTMLInputElement).focus()
// }
</script>

<template>
  <span class="p-input-icon-right">
    <Icon
      icon="ant-design:scan-outlined"
      class="font-extrabold"
    />
    <!-- <i class="pi pi-spin pi-spinner" /> -->
    <InputText
      v-model="upcValue"
      icon="pi pi-user"
      autofocus
      style="width: 165px !important"
      @keyup.enter="emits('submit')"
    />
  </span>
</template>
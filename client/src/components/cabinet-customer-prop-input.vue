<script setup lang="ts">
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';

const props = defineProps<{
  prop: string | number | undefined;
  propKey: string
}>();

const emit = defineEmits(['update:prop']);

const customerProp = computed<string | number>({
  get() {
    return props.prop ?? ''
  },
  set(value) {
    emit('update:prop', value); 
  }
})

</script>
<template>
  <label :for="propKey">{{ propKey }}</label>
  <InputText
    v-if="(typeof customerProp === 'string')"
    :id="propKey"
    v-model="customerProp"
    style="width: 100% !important;"
  />
  <InputNumber
    v-else-if="(typeof customerProp === 'number')"
    :id="propKey"
    v-model="customerProp"
    :min="0"
    :max="100"
    style="width: 100% !important;"
  />
</template>
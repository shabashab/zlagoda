<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
const props = defineProps<{
  role: string;
  label: string
}>();

const emits = defineEmits(['update:role']);

const roleValue = computed({
  get() {
    return props.role;
  },
  set(value) {
    emits('update:role', value);
  }
})

const roles = [
  'manager',
  'cashier'
]

</script>
<template>
  <div>
    <label for="dropdown">{{ props.label }}</label>
    <Dropdown
      id="dropdown"
      v-model:model-value="roleValue"
      :options="roles"
      style="width: 100%;"
    />
  </div>
</template>
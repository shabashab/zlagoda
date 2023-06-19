<script setup lang="ts">
import { FormItem } from '../models/form-item.model';
import RoleDropdown from './role-dropdown.vue';

const props = defineProps<{
  item: any,
  data: FormItem[]
}>();

const emits = defineEmits(['update:item']);

const itemValue = computed({
  get() {
    return props.item
  },
  set(value) {
    emits('update:item', value);
  }
})
</script>
<template>
  <div class="grid grid-cols-2 gap-5">
    <div
      v-for="itemKey in props.data"
      :key="itemKey.key"
    >
      <TextPropInput
        v-if="itemKey.type === 'string'"
        v-model:value="itemValue[itemKey.key]"
        :label="itemKey.label"
      />
      <NumberPropInput
        v-else-if="itemKey.type === 'number'"
        v-model:value="itemValue[itemKey.key]"
        :label="itemKey.label"
      />
      <DatePropInput
        v-else-if="itemKey.type === 'Date'"
        v-model:value="itemValue[itemKey.key]"
        :label="itemKey.label"
      />
      <RoleDropdown
        v-else-if="itemKey.type === 'role'"
        v-model:role="itemValue[itemKey.key]"
        :label="itemKey.label"
      />
    </div>
  </div>
</template>
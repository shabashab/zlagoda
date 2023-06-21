<script setup lang="ts">
import { FormItem } from '../models/form-item.model';
import RoleDropdown from './role-dropdown.vue';

const props = withDefaults(defineProps<{
  item: any,
  data: FormItem[]
}>(),{
});

const emits = defineEmits(['update:item', 'update:isError']);

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
        :error="itemKey.error"
      />
      <NumberPropInput
        v-else-if="itemKey.type === 'number'"
        v-model:value="itemValue[itemKey.key]"
        :label="itemKey.label"
        :error="itemKey.error"
      />
      <DatePropInput
        v-else-if="itemKey.type === 'Date'"
        :key="itemValue[itemKey.key]"
        v-model:value="itemValue[itemKey.key]"
        :label="itemKey.label"
        :error="itemKey.error"
      />
      <RoleDropdown
        v-else-if="itemKey.type === 'role'"
        v-model:role="itemValue[itemKey.key]"
        :label="itemKey.label"
      />
    </div>
    <slot />
  </div>
</template>
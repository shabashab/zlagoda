<script setup lang="ts">
import { Category } from '../../../../models/category.model';
import { FormItem } from '../../../../models/form-item.model';

const props = defineProps<{
  category: Category
}>();

const emits = defineEmits(['update:category']);

const categoryValue = computed({
  get() {
    return props.category
  },
  set(value) {
    emits('update:category', value);
  }
});

const data = ref<FormItem[]>([
  {
    key: 'categoryNumber',
    label: 'Number',
    type: 'number'
  },
  {
    label: 'Name',
    key: 'name',
    type: 'string'
  }
])

</script>
<template>
  <GenericForm
    :data="data"
    :item="categoryValue"
  />
</template>
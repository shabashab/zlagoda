<script setup lang="ts">
import { categories } from '../api/categories';
import { Category } from '../models/category.model';

import Dropdown from 'primevue/dropdown';

const props = defineProps<{
  category: Category | undefined
}>();

const { result: categoriesValue } = categories.useCategories().fetchImmediate();

const emits = defineEmits(['update:category']);

const categoryValue = computed({
  get() {
    console.log(2);
    return props.category;
  },
  set(value) {
    emits('update:category', value);
  }
});

</script>
<template>
  <Dropdown
    v-model="categoryValue"
    :options="categoriesValue"
    option-label="name"
    placeholder="Select category"
    style="width: 200px"
    show-clear 
  />
</template>
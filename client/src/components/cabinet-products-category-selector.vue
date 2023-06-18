<script setup lang="ts">
import { Category } from '../models/category.model';

import Dropdown from 'primevue/dropdown';

const props = defineProps<{
  category: Category | undefined
}>();

const categories = ref<Category[]>([]);

const fetchAllCategories = async () => {
  categories.value = [
    {
      categoryNumber: 12312,
      name: 'Test'
    },
    {
      categoryNumber: 12312,
      name: 'Test2'
    },
    {
      categoryNumber: 12312,
      name: 'Test3'
    },
  ]
}

const emits = defineEmits(['update:category']);

const categoryValue = computed({
  get() {
    return props.category;
  },
  set(value) {
    emits('update:category', value);
  }
});

onMounted(async () => {
  await fetchAllCategories();
})
</script>
<template>
  <Dropdown
    v-model="categoryValue"
    :options="categories"
    option-label="name"
    placeholder="Select category"
    style="width: 200px"
    show-clear 
  />
</template>
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
      id: 12312,
      name: 'Test'
    }
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
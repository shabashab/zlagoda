<script setup lang="ts">
import { Category } from '../../../models/category.model';
import { ProductInStore } from '../../../models/product-in-store.model';

const selectedCategory = ref<Category>();

</script>

<template>
  <div class="flex flex-col gap-5">
    <CabinetProductsCategorySelector v-model:category="selectedCategory" />
    <CabinetProductsTable :selected-category="selectedCategory" />
  </div>
</template>
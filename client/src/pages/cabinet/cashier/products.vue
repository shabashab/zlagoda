<script setup lang="ts">
import { Category } from '../../../models/category.model';
const selectedCategory = ref<Category>();

</script>

<template>
  <div>
    <CabinetProductsCategorySelector v-model:category="selectedCategory" />
    <!-- <CabinetCashierProductsTable /> -->
  </div>
</template>
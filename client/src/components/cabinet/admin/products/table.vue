<script setup lang="ts">
import { Category } from '../../../../models/category.model';

const selectedCategory = ref<Category>();

</script>
<template>
  <div class="my-5">
    <CabinetProductsCategorySelector :category="selectedCategory" />
  </div>
  <CabinetProductsTable
    :is-admin="true"
    :selected-category="selectedCategory"
  />
</template>
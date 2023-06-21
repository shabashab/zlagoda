<script setup lang="ts">
import { Category } from '../../../models/category.model';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


const selectedCategory = ref<Category>();

const { fetch: fetchLovers, result: lovers } = customers.useLovers();

watch(selectedCategory, () => {
  fetchLovers(selectedCategory.value?.id as unknown as string);
})
</script>
<template>
  <div class="flex flex-col gap-5 mt-10">
    <CabinetProductsCategorySelector v-model:category="selectedCategory" />
    <DataTable
      v-if="lovers"
      :value="lovers"
    >
      <Column
        header="Card"
        field="cardNumber"
      />
      <Column
        header="Name"
        field="name"
      />
      <Column
        header="Surname"
        field="surname"
      />
      <Column
        header="Phone"
        field="phoneNumber"
      />
      <Column header="Category">
        <template #body>
          {{ selectedCategory!.name }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
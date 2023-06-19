<script setup lang="ts">
import { Product } from '../models/product.model';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import { FilterMatchMode } from 'primevue/api';
import { ProductInStore } from '../models/product-in-store.model';

const filters = ref({
  'product.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'product.isPromo': { value: null, matchMode: FilterMatchMode.EQUALS },
});

const props = defineProps<{
  products: ProductInStore[]
}>();

</script>
<template>
  <DataTable
    v-model:filters="filters"
    :value="products"
    paginator
    filter-display="row"
    :rows="10"
  >
    <template #header>
      <h1>Products</h1>
    </template>
    <Column
      sortable
      header="UPC"
      field="product.upc"
    />
    <Column
      sortable
      header="Name"
      field="product.name"
      style="width: 320px;"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          style="width: 200px !important;"
          :placeholder="`Filter by id { ${filterModel.matchMode} }`"
          @input="filterCallback"
        />
      </template>
    </Column>
    <Column
      sortable
      header="Price"
      field="product.price"
    />
    <Column
      header="Promo price"
      field="product.promoPrice"
    />
    <Column
      sortable
      header="Is Promo?"
      field="product.isPromo"
    >
      <template #filter="{ filterModel, filterCallback }">
        <TriStateCheckbox
          v-model="filterModel.value"
          @change="filterCallback()"
        />
      </template>
      <template #body="{ data }">
        <i
          v-if="data.product.isPromo"
          class="pi pi-check-circle text-green-500"
        />
        <i
          v-else
          class="pi pi-minus-circle text-red-500"
        />
      </template>
    </Column>
    <Column
      sortable
      header="Number in store"
      field="number"
    />
    <Column
      sortable
      header="Manufacture"
      field="product.manufacture"
    />
    <Column
      header="Characteristics"
      field="product.characteristics"
    />
  </DataTable>
</template>
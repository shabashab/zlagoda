<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { Product } from '../../../../models/product.model';


const products = ref<Product[]>([]);

const fetchProducts = async () => {
  for (let i = 0; i < 10; i++) {
    products.value.push({
      name: 'Test',
      price: 100,
      isPromo: false,
      upc: '1231231',
      characteristics: '330г',
      manufacture: 'Govno',      
    })
  }
}
</script>
<template>
  <DataTable>
  </DataTable>
</template>
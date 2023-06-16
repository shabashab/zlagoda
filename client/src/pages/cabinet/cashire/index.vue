<script setup lang="ts">
import UpcInput from '../../../componets/upc-input.vue';
import { Check } from '../../../models/check.model';
import { Product } from '../../../models/product.model';

const upc = ref<string>('33');

const product = ref<Product>();

const check = ref<Check>({
  items: []
});

const fetchProduct = async (productUpc: string) : Promise<Product> => {
  return {
    upc: productUpc,
    name: 'Test',
    manufacture: 'TestManufacture'
  }
} 

const addProductToCheck = (product: Product) => {
  check.value?.items.push({
    product: product,
    number: 1,
  });
}

const onUpcSubmit = async () => {
  product.value = await fetchProduct(upc.value);
  upc.value = '';
  addProductToCheck(product.value);
}
</script>

<template>
  <UpcInput
    v-model:upc="upc"
    @submit="onUpcSubmit"
  />
  {{ check }}
</template>
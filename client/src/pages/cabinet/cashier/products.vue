<script setup lang="ts">
import { Category } from '../../../models/category.model';
import { ProductInStore } from '../../../models/product-in-store.model';
const selectedCategory = ref<Category>();

const products = ref<ProductInStore[]>([]);

const fetchProducts = async () => {
  for (let i = 0; i < 100; i++) {
    const price = (Math.random() * 1000).toFixed(2) as unknown as number
    const promoPrice = (Math.random().toFixed(0) as unknown as number) % 2 === 0 ? (price * Math.random()).toFixed(2) as unknown as number : undefined 
    products.value.push(
      {
        product: {
          name: `test${i}`,
          price: price,
          upc: (Math.random() * 100000000000000).toFixed(0),
          characteristics: 'hui',
          manufacture: 'test',
          promoPrice: promoPrice,
          isPromo: promoPrice ? true : false 
        },
        number: (Math.random() * 100).toFixed(0) as unknown as number
      });
  }  
}

onMounted(async () => {
  await fetchProducts();
});

watch(selectedCategory, () => {
  // change products for some category
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <CabinetProductsCategorySelector v-model:category="selectedCategory" />
    <CabinetCashierProductsTable :products="products" />
  </div>
</template>
<script setup lang="ts">
import { Product } from '../models/product.model';

const props = defineProps<{
  item: {
    product: Product,
    number: number,
  }
}>();
</script>
<template>
  <div class="flex justify-between items-end border-b border-dashed border-black/30">
    <div class="flex flex-col">
      <div>
        UPC: {{ props.item.product.upc }}
      </div>
      <div>
        {{ item.product.name }} {{ item.product.manufacture }}
      </div>
      <div>
        {{ item.number }} шт. x {{ props.item.soldPrice }} = 
      </div>
    </div>
    <div>
      {{ props.item.soldPrice * item.number }}
    </div>
  </div>
</template>
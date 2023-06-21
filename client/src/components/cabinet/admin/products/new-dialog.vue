<script setup lang="ts">
import { ProductInStore } from '../../../../models/product-in-store.model';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { Product } from '../../../../models/product.model';
import { products } from '../../../../api/products';


const emits = defineEmits(['submit']);

const toast = useToast();

const product = ref<Product>({
  name: '',
  price: 0,
  upc: '',
  characteristics: '',
  isPromo: false,
  number: 0,
  categoryId: 0,
});


const { fetch: createProduct } = products.useCreateProduct()

const onFormSubmit = async () => {
  try {
    await createProduct(product.value);
    toast.add({ severity: 'success', summary: 'Created', detail: 'Record created', life: 3000 })
    emits('submit')
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
  }

}
</script>
<template>
  <CabinetAdminProductsForm :product="product" />
  <div class="flex justify-center mt-10">
    <Button
      label="Submit"
      severity="success"
      @click="onFormSubmit()"
    />
  </div>
</template>
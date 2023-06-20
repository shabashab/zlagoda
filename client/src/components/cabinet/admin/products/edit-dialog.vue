<script setup lang="ts">
import { ProductInStore } from '../../../../models/product-in-store.model';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { Product } from '../../../../models/product.model';
import { products } from '../../../../api/products';


const emits = defineEmits(['submit']);

const toast = useToast();

const props = defineProps<{
  product: Product
}>();

const { fetch: editProduct } = products.useEditProduct();

const onFormSubmit = async () => {
  try{
    await editProduct(props.product);
    toast.add({ severity: 'warn', summary: 'Edited', detail: 'Record edited', life: 3000 })
    emits('submit')
  }catch(error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
  }

}

</script>
<template>
  <CabinetAdminProductsForm
    :product="props.product"
  />
  <div class="flex justify-center mt-10">
    <Button
      label="Submit"
      severity="warning"
      @click="onFormSubmit()"
    />
  </div>
</template>
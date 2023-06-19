<script setup lang="ts">
import { ProductInStore } from '../../../../models/product-in-store.model';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';


const emits = defineEmits(['submit']);

const toast = useToast();

const product = ref<ProductInStore>({
  product: {
    name: '' ,
    price: 0,
    upc: '',
    characteristics: 'hui',
    manufacture: 'test',
    promoPrice: 0,
    isPromo: false 
  },
  number: 0
});

const sendEditProductRequest = async () => {
  return
}

const onFormSubmit = async () => {
  await sendEditProductRequest();
  toast.add({ severity: 'warn', summary: 'Edited', detail: 'Record edited', life: 3000 })
  emits('submit')
}

</script>
<template>
  <CabinetAdminProductsForm
    :product="product"
  />
  <div class="flex justify-center mt-10">
    <Button
      label="Submit"
      severity="warning"
      @click="onFormSubmit()"
    />
  </div>
</template>
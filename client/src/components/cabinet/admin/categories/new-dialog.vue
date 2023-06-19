<script setup lang="ts">
import { Category } from '../../../../models/category.model';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const category = ref<Category>({
  name: '',
  categoryNumber: 0,
});

const emits = defineEmits(['submit']);

const sendNewCategoryRequest = async () => {
  return
}

const onFormSubmit = async () => {
  await sendNewCategoryRequest();
  toast.add({ severity: 'success', summary: 'New', detail: 'Record created', life: 3000 })
  emits('submit');
  
}

</script>
<template>
  <CabinetAdminCategoriesForm :category="category" />
  <div class="mt-10 flex justify-center">
    <Button
      severity="success"
      label="Submit"
      @click="onFormSubmit()"
    />
  </div>
</template>
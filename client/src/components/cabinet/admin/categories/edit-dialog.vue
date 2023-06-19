<script setup lang="ts">
import { Category } from '../../../../models/category.model';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const props = defineProps<{
  category: Category
}>();

const emits = defineEmits(['submit']);

const categoryValue = computed(() => {
  return props.category;
});

const sendEditCategoryRequest = async () => {
  return
}

const onFormSubmit = async () => {
  await sendEditCategoryRequest();
  toast.add({ severity: 'warn', summary: 'Edit', detail: 'Record edited', life: 3000 });
  emits('submit');
}

</script>
<template>
  <CabinetAdminCategoriesForm :category="categoryValue" />
  <div class="w-full flex justify-center mt-10">
    <Button
      severity="warning"
      label="Submit" 
      @click="onFormSubmit()"
    />
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const confirm = useConfirm();

const confirmDelete = (event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure you want to delete?',
    accept: () => {
      itemToEditValue.value = props.data;
      emits('delete');
    }
  })
}


const props = withDefaults(defineProps<{
  data: any;
  itemToEdit: any;
  isEdit: boolean;
  isDelete: boolean;
}>(), {
  isEdit: true,
  isDelete: true,
});

const emits = defineEmits(['update:itemToEdit', 'openEditDialog', 'delete']);

const itemToEditValue = computed({
  get() {
    return props.itemToEdit;
  },
  set(value) {
    emits('update:itemToEdit', value);
  }
});

const openEditDialog = (item: any) => {
  itemToEditValue.value = item;
  emits('openEditDialog');
}


</script>
<template>
  <div class="flex justify-center gap-10">
    <Button
      v-if="props.isEdit"
      icon="pi pi-pencil"
      severity="warning"
      @click="openEditDialog(props.data)"
    />
    <Button
      v-if="props.isDelete"
      icon="pi pi-trash"
      severity="danger"
      @click="confirmDelete($event)"
    />
  </div>
</template>
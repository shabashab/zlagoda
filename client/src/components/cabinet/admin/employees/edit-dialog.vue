<script setup lang="ts">
import { FullEmployee } from '../../../../models/employee.model';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const props = defineProps<{
  employee: FullEmployee
}>();

const employeeToEdit = computed(() => {
  return props.employee;
}) 

const emits = defineEmits(['submit']);

const { fetch, error, } = employees.useEditEmployees();

const isError = ref(false);

const submitEdit = async () => {
  await fetch(employeeToEdit.value);
  toast.add({ severity: 'warn', summary: 'Edited', detail: 'Record edited', life: 3000 })
  emits('submit')
}

</script>
<template>
  <CabinetAdminEmployeesForm
    v-model:employee="employeeToEdit"
    v-model="isError"
  />
  <div class="flex justify-center mt-10">
    <Button
      severity="warning"
      label="Submit"
      :disabled="isError"
      @click="submitEdit()"
    />
  </div>
</template>
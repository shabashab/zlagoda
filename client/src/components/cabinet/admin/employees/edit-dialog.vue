<script setup lang="ts">
import { Employee } from '../../../../models/employee.model';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const props = defineProps<{
  employee: Employee
}>();

const employeeToEdit = computed(() => {
  return { ...props.employee };
}) 

const emits = defineEmits(['submit']);

const sendEditEmployyRequestToBackEnd = async () => {
  return;
}

const submitEdit = async () => {
  await sendEditEmployyRequestToBackEnd();
  toast.add({ severity: 'warn', summary: 'Edited', detail: 'Record edited', life: 3000 })
  emits('submit')
}

</script>
<template>
  <CabinetAdminEmployeesForm
    v-model:employee="employeeToEdit"
  />
  <div class="flex justify-center mt-10">
    <Button
      severity="warning"
      label="Submit"
      @click="submitEdit()"
    />
  </div>
</template>
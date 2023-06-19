<script setup lang="ts">
import { Employee } from '../../../../models/employee.model';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const employee = ref<Employee>({
  id: '',
  name: '',
  surname: '',
  role: 'cashier',
  city: '',
  dateOfBirth: new Date(),
  dateOfStart: new Date(),
  phoneNumber: '',
  salary: 0,
  street: '',
  zipCode: '',
  patronymic: '',
});

const emits = defineEmits(['submit']);

const sendNewEmployeeRequest = async () => {
  return
}

const onFormSubmit = async () => {
  await sendNewEmployeeRequest();
  toast.add({ severity: 'success', summary: 'New', detail: 'Record created', life: 3000 })
  emits('submit');
}
</script>
<template>
  <CabinetAdminEmployeesForm v-model:employee="employee" />
  <div class="flex justify-center mt-10">
    <Button
      label="Submit"
      severity="success"
      @click="onFormSubmit"
    />
  </div>
</template>
<script setup lang="ts">
import { Employee } from '../../../../models/employee.model';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const employee = ref<Employee>({
  employeeId: '',
  name: '',
  surname: '',
  role: 'cashier',
  city: '',
  birthDate: new Date(),
  startDate: new Date(),
  phoneNumber: '',
  salary: 0,
  street: '',
  zipCode: '',
  patronymic: '',
});

const emits = defineEmits(['submit']);

const { fetch: createEmployee, error } = employees.useCreateEmployee()

const onFormSubmit = async () => {
  try{
    await createEmployee(employee.value);
    toast.add({ severity: 'success', summary: 'New', detail: 'Record created', life: 3000 })
    emits('submit');
  }catch(error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
  }

}
</script>
<template>
  {{ error }}
  <TextPropInput
    v-model:value="employee.employeeId"
    class="mb-5"
    label="Id: "
  />
  <CabinetAdminEmployeesForm v-model:employee="employee" />
  <div class="flex justify-center mt-10">
    <Button
      label="Submit"
      severity="success"
      @click="onFormSubmit"
    />
  </div>
</template>
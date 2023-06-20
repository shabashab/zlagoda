<script setup lang="ts">
import { Employee } from '../../../../models/employee.model';
import { FormItem } from '../../../../models/form-item.model';

const props = defineProps<{
  employee: Employee;
}>();

const emits = defineEmits(['update:employee']);

const employeeValue = computed({
  get() {
    return props.employee;
  },
  set(value) {
    emits('update:employee', value);
  }
})

const employeeFormData = ref<FormItem[]>([
  {
    label: 'Name',
    key: 'name',
    type: 'string'
  },
  {
    label: 'Surname',
    key: 'surname',
    type: 'string'
  },
  {
    label: 'Patronymic',
    key: 'patronymic',
    type: 'string'
  },
  {
    label: 'Role',
    key: 'role',
    type: 'role'
  },
  {
    label: 'City',
    key: 'city',
    type: 'string'
  },
  {
    label: 'Street',
    key: 'street',
    type: 'string'
  },
  {
    label: 'Zip code',
    key: 'zipCode',
    type: 'string'
  },
  {
    label: 'Salary',
    key: 'salary',
    type: 'number'
  },
  {
    label: 'Phone number',
    key: 'phoneNumber',
    type: 'string'
  },
  {
    label: 'Date of birth',
    key: 'birthDate',
    type: 'Date'
  },
  {
    label: 'Date of start',
    key: 'startDate',
    type: 'Date'
  },
])
</script>
<template>
  <GenericForm
    v-model:item="employeeValue"
    :data="employeeFormData"
  />
</template>
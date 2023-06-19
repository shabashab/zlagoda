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
    key: 'dateOfBirth',
    type: 'Date'
  },
  {
    label: 'Date of start',
    key: 'dateOfStart',
    type: 'Date'
  },
])
</script>
<template>
  <GenericForm
    v-model:item="employeeValue"
    :data="employeeFormData"
  />
  <!-- <div class="grid grid-cols-2 gap-5">
    <TextPropInput
      v-model:value="employeeValue.name"
      label="Name"
    />
    <TextPropInput
      v-model:value="employeeValue.surname"
      label="Surname"
    />
    <TextPropInput
      v-model:value="employeeValue.patronymic"
      label="Patronymic"
    />
    <RoleDropdown
      v-model:role="employeeValue.role"
      label="Role"
    />
    <TextPropInput
      v-model:value="employeeValue.role"
      label="Role"
    />
    <TextPropInput
      v-model:value="employeeValue.city"
      label="City"
    />
    <TextPropInput
      v-model:value="employeeValue.street"
      label="Street"
    />
    <TextPropInput
      v-model:value="employeeValue.zipCode"
      label="Zip code"
    />
    <NumberPropInput
      v-model:value="employeeValue.salary"
      label="Salary"
    />
    <TextPropInput
      v-model:value="employeeValue.phoneNumber"
      label="Phone number"
    />
    <DatePropInput
      v-model:value="employeeValue.dateOfBirth"
      label="Date of birth"
    />
    <DatePropInput
      v-model:value="employeeValue.dateOfStart"
      label="Date of start"
    />
  </div> -->
</template>
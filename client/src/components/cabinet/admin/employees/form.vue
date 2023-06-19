<script setup lang="ts">
import { Employee } from '../../../../models/employee.model';

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
</script>
<template>
  <div class="grid grid-cols-2 gap-5">
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
  </div>
</template>
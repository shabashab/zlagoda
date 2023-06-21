<script setup lang="ts">
import { Employee } from '../../../../models/employee.model';
import { FormItem } from '../../../../models/form-item.model';

const props = withDefaults(defineProps<{
  employee: Employee;
  isError: boolean
}>(), {
  isError: false
});


const emits = defineEmits(['update:employee', 'update:isError']);

const isErrorValue = computed({
  get() {
    return props.isError
  }, 
  set(value) {
    emits('update:employee', value)
  }
})

const employeeValue = computed({
  get() {
    return props.employee;
  },
  set(value) {
    emits('update:employee', value);
  }
})

const employeeFormData = ref<FormItem[]>([]);

watch(() => props.employee, () => {
  employeeFormData.value = [
    {
      label: 'Name',
      key: 'name',
      type: 'string',
      error: employeeValue.value.name === '',
    },
    {
      label: 'Surname',
      key: 'surname',
      type: 'string',
      error: employeeValue.value.surname === '',
    },
    {
      label: 'Patronymic',
      key: 'patronymic',
      type: 'string',
    },
    {
      label: 'Role',
      key: 'role',
      type: 'role'
    },
    {
      label: 'City',
      key: 'city',
      type: 'string',
      error: employeeValue.value.surname === '',
    },
    {
      label: 'Street',
      key: 'street',
      type: 'string',
      error: employeeValue.value.street === '',

    },
    {
      label: 'Zip code',
      key: 'zipCode',
      type: 'string',
      error: employeeValue.value.zipCode === '',
    },
    {
      label: 'Salary',
      key: 'salary',
      type: 'number'
    },
    {
      label: 'Phone number',
      key: 'phoneNumber',
      type: 'string',
      error: employeeValue.value.phoneNumber === '',
    },
    {
      label: 'Date of birth',
      key: 'birthDate',
      type: 'Date',
      error: (new Date().getFullYear() - employeeValue.value.birthDate.getFullYear()) < 18
    },
    {
      label: 'Date of start',
      key: 'startDate',
      type: 'Date',
      error: employeeValue.value.startDate <= employeeValue.value.birthDate
    }
  ];
}, {
  deep: true,
  immediate: true
})


</script>
<template>
  <GenericForm
    v-model:item="employeeValue"
    :data="employeeFormData"
  />
</template>
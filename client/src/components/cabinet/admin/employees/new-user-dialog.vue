<script setup lang="ts">
import { FullEmployee } from '../../../../models/employee.model';
import { FormItem } from '../../../../models/form-item.model';
import { User } from '../../../../models/user.model';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';


const toast = useToast();

const props = defineProps<{
  employee: FullEmployee
}>();

const emits = defineEmits(['submit']);

const user = ref<User>({
  employeeId: props.employee.employeeId,
  login: '',
  password: ''
});

const data = ref<FormItem[]>([
  {
    label: 'login',
    key: 'login',
    type: 'string'
  },
  {
    label: 'password',
    key: 'password',
    type: 'string'
  }
]);

const { fetch: createNewUser } = employees.useNewUser();

const onFormSubmit = async () => {
  await createNewUser(user.value);
  toast.add({ severity: 'success', summary: 'New', detail: 'User created', life: 3000 })
  emits('submit');
}

</script>
<template>
  <GenericForm
    :data="data"
    :item="user"
  />
  <div class="flex justify-center mt-10">
    <Button
      label="submit"
      severity="success"
      @click="onFormSubmit()"
    />
  </div>
</template>
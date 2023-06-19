<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Calendar from 'primevue/calendar';
import { Employee } from '../../../../models/employee.model';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const employees = ref<Employee[]>();

const fetchEmployees = async () => {
  employees.value = [{
    id: 'i1289s8ad',
    name: 'Artem',
    surname: 'Tarasenko',
    role: 'cashier',
    dateOfBirth: new Date(2004, 8, 20),
    dateOfStart: new Date(2022, 5, 13),
    city: 'Brovari',
    street: 'Govna',
    salary: 300,
    zipCode: '02059',
    phoneNumber: '0976373938',
    imgUrl: 'https://edukoht.com.ua/assets/tarasenko_artem.482eb11d.webp'
  }]
}

onMounted(async () => {
  await fetchEmployees();
});

const isEditDialogVisible = ref(false);

const isNewDialogVisible = ref(false);

const employeeToEdit = ref<Employee>();

const openEditDialog = (employee: Employee) => {
  employeeToEdit.value = employee;
  isEditDialogVisible.value = true;
}

</script>
<template>
  <DataTable :value="employees">
    <template #header>
      <div class="flex justify-between">
        <h1 class="text-xl">
          Employees
        </h1>
        <div>
          <Button
            icon="pi pi-plus"
            severity="success"
            @click="isNewDialogVisible = true"
          />
          <Dialog
            v-model:visible="isNewDialogVisible"
            modal
            header="New employee"
            style="width: 50vw;"
          >
            <CabinetAdminEmployeesNewDialog @submit="isNewDialogVisible = false; fetchEmployees()" />
          </Dialog>
        </div>
      </div>
    </template>
    <Column
      header="Id"
      field="id"
    />
    <Column
      header="Name"
      field="name"
    />
    <Column
      header="Surname"
      field="surname"
    />
    <Column
      header="Patronimic"
      field="patronimic"
    />
    <Column
      header="Role"
      field="role"
    />
    <Column
      header="Phone"
      field="phoneNumber"
    />
    <Column header="Adress">
      <template #body="{ data }">
        {{ data.city }}, {{ data.street }} <br>
        {{ data.zipCode }}
      </template>
    </Column>
    <Column
      header="Salary"
      field="salary"
    />
    <Column
      header="Date of birth"
      field="dateOfBirth"
    >
      <template #body="{ data }">
        <Calendar
          v-model:model-value="data.dateOfBirth"
          disabled
          style="width: 120px;"
        />
      </template>
    </Column>
    <Column
      header="Date of start"
      field="dateOfStart"
    >
      <template #body="{ data }">
        <Calendar
          v-model:model-value="data.dateOfStart"
          disabled
          style="width: 120px;"
        />
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <CabinetAdminTableButtons
          v-model:item-to-edit="employeeToEdit"
          :data="data"
          delete-url="hz"
          token-name="id"
          @open-edit-dialog="openEditDialog(data)"
          @record-deleted="fetchEmployees()"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog
    v-if="employeeToEdit"
    v-model:visible="isEditDialogVisible"
    modal
    header="Edit employee"
    style="width: 50vw;"
  >
    <CabinetAdminEmployeesEditDialog
      :employee="employeeToEdit"
      @submit="isEditDialogVisible = false; fetchEmployees()"
    />
  </Dialog>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Calendar from 'primevue/calendar';
import { Employee, FullEmployee } from '../../../../models/employee.model';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';


const toast = useToast()

const { fetch: fetchEmployees, result: fullEmployees, loading } = employees.useEmployees().fetchImmediate();

const { fetch: deleteEmployee, error: deleteEmployeeError } = employees.useDeleteEmployee();

const isEditDialogVisible = ref(false);

const isNewDialogVisible = ref(false);

const employeeToEdit = ref<FullEmployee>();

const onDeleteEmployee = async (data: FullEmployee) => {
  try {
    await deleteEmployee(data);
    toast.add({ severity: 'success', summary: 'Deleted', detail: 'record deleted', life: 3000 });
  } catch (deleteEmployeeError) {
    
    toast.add({ severity: 'error', summary: 'Error', detail: deleteEmployeeError, life: 3000 });
  }
}

const openEditDialog = (employee: FullEmployee) => {
  employeeToEdit.value = employee;
  isEditDialogVisible.value = true;
}

const filters = ref({
  role: ''
})

</script>
<template>
  <DataTable
    :value="fullEmployees"
    paginator
    :loading="loading"
    :rows="8"
  >
    <template #header>
      <div class="flex justify-between items-center">
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
      field="employeeId"
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
      header="Patronymic"
      field="patronymic"
    />
    <Column
      field="role"
      header="Role"
    >
      <template #filter>
        <RoleDropdown
          v-model:role="filters.role"
          label=""
        />
      </template>
    </Column>
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
      field="birthDate"
    >
      <template #body="{ data }">
        <Calendar
          v-model:model-value="data.birthDate"
          disabled
          style="width: 120px;"
          date-format="dd/mm/yy"
        />
      </template>
    </Column>
    <Column
      header="Date of start"
      field="startDate"
    >
      <template #body="{ data }">
        <Calendar
          v-model:model-value="data.startDate"
          disabled
          style="width: 120px;"
          date-format="dd/mm/yy"
        />
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <TableButtons
          v-model:item-to-edit="employeeToEdit"
          :data="data"
          @open-edit-dialog="openEditDialog(data)"
          @delete="onDeleteEmployee(data)"
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
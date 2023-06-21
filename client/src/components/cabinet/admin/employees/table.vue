<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Calendar from 'primevue/calendar';
import { Employee, FullEmployee } from '../../../../models/employee.model';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode } from 'primevue/api';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';


const props = withDefaults(defineProps<{
  isReport: boolean
}>(), {
  isReport: false
})

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
  surname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  role: { value: null, matchMode: FilterMatchMode.EQUALS }
})

const isUserDialogVisible = ref(false);

const openUserDialog = (employee: FullEmployee) => {
  employeeToEdit.value = employee;
  isUserDialogVisible.value = true;
}

</script>
<template>
  <DataTable
    v-model:filters="filters"
    :value="fullEmployees"
    :paginator="!props.isReport"
    :loading="loading"
    :rows="8"
    filter-display="row"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <h1 class="text-xl">
          Employees
        </h1>
        <div v-if="!props.isReport">
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
      sortable
    />
    <Column
      header="Name"
      field="name"
      sortable
    />
    <Column
      header="Surname"
      field="surname"
      sortable
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          style="width: 220px !important;"
          @input="filterCallback"
        />
      </template>
    </Column>
    <Column
      header="Patronymic"
      field="patronymic"
      sortable
    />
    <Column
      field="role"
      header="Role"
      sortable
    >
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown
          v-model="filterModel.value"
          :options="['cashier', 'manager']"
          show-clear
          @change="filterCallback()"
        />
      </template>
    </Column>
    <Column
      header="Phone"
      field="phoneNumber"
      sortable
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
      sortable
    />
    <Column
      header="Date of birth"
      field="birthDate"
      sortable
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
      sortable
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
    <Column v-if="!props.isReport">
      <template #body="{ data }">
        <i
          v-if="data.user"
          class="pi pi-check-circle text-green-500"
        />
        <div
          v-else
          class="flex justify-start gap-5 items-center"
        >
          <i
            class="pi pi-minus-circle text-red-500"
          />
          <Button
            icon="pi pi-plus"
            text
            rounded
            @click="openUserDialog(data)"
          />
        </div>
      </template>
    </Column>
    <Column v-if="!props.isReport">
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
  <Dialog
    v-if="employeeToEdit"
    v-model:visible="isUserDialogVisible"
    modal
    :header="`Add user to employee ${employeeToEdit.surname} ${employeeToEdit.name}`"
    style="width: 30vw"
  >
    <CabinetAdminEmployeesNewUserDialog
      :employee="employeeToEdit"
      @submit="isUserDialogVisible = false; fetchEmployees()"
    />
  </Dialog>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { CustomerCard } from '../../../models/customer-card.model';
import { customers } from '../../../api/customers';

const props = withDefaults(defineProps<{
  isAdmin: boolean
}>(), {
  isAdmin: false
})


const filters = ref({
  cardNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  surname: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
});

const { fetch: fetchCustomers, result: customersValue, loading } = customers.useCustomers().fetchImmediate();

const customerToEdit = ref<CustomerCard>();
const isCustomerEditDialogVisible = ref<boolean>(false);


const isNewCustomer = ref<boolean>(false);

const openEditCustomerDialog = (customer: CustomerCard) => {
  isNewCustomer.value = false;
  customerToEdit.value = customer;
  isCustomerEditDialogVisible.value = true;
}

const openNewCustomerDialog = () => {
  customerToEdit.value = {
    cardNumber: '',
    name: '',
    surname: '',
    patronymic: '',
    phoneNumber: '',
    city: '',
    street: '',
    zipCode: '',
    percent: 0,
  };
  isNewCustomer.value = true;
  isCustomerEditDialogVisible.value = true;
}

</script>
<template>
  <DataTable
    v-model:filters="filters"
    filter-display="row"
    :value="customersValue"
    :loading="loading"
    paginator
    :rows="7"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl text-black">
          Customers
        </h1>
        <div>
          <Button
            icon="pi pi-plus"
            severity="success"
            @click="openNewCustomerDialog()"
          />
        </div>
      </div>
    </template>
    <Column
      header="Card number"
      field="cardNumber"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          style="width: 220px !important;"
          :placeholder="`Filter by card № { ${filterModel.matchMode} }`"
          :maxlength="13"
          @input="filterCallback"
        />
      </template>
    </Column>
    <Column
      header="Surname"
      field="surname"
      sortable
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          style="width: 250px !important;"
          :placeholder="`Filter by surname { ${filterModel.matchMode} }`"
          @input="filterCallback"
        />
      </template>
    </Column>
    <Column
      header="Name"
      field="name"
    />
    <Column
      header="Patronimic"
      field="patronimic"
    />
    <Column
      header="Phone number"
      field="phoneNumber"
    />
    <Column header="Adress">
      <template #body="slotProps">
        {{ slotProps.data.city ?? '' }}, {{ slotProps.data.street ?? '' }},<br>
        {{ slotProps.data.zipCode ?? '' }}
      </template>
    </Column>
    <Column
      header="Persent"
      field="persent"
    >
      <template #body="{ data }">
        <div class="text-2xl">
          {{ data.persent }}
          <i class="pi pi-percentage" />
        </div>
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <TableButtons
          :data="data"
          :item-to-edit="customerToEdit"
          :is-delete="props.isAdmin"
          @open-edit-dialog="openEditCustomerDialog(data)"
          @delete="123"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog
    v-if="customerToEdit"
    v-model:visible="isCustomerEditDialogVisible"
    style="min-width: 30vw;"
    modal
    :header="isNewCustomer ? 'New customer' :`Edit customer UPC: ${customerToEdit.cardNumber}`"
  >
    <CabinetCashierCustomerForm
      v-model:customer="customerToEdit"
      :new-customer="isNewCustomer"
      @close="isCustomerEditDialogVisible = false; fetchCustomers()"
    />
  </Dialog>
</template>
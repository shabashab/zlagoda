<script setup lang="ts">
import { CustomerCard } from '../models/customer-card.model';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

import CabinetCashierCustomerForm from './cabinet-cashier-customer-form.vue';

const customers = ref<CustomerCard[]>([]);

const filters = ref({
  cardNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  surname: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
});

const fetchCustomers = async () => {
  for (let i = 0; i < 100; i++) {

    customers.value.push({
      cardNumber: (Math.random() * 1000000).toFixed(0),
      name: 'Danylo',
      surname: 'Khomichenko',
      patronimic: 'Why not????',
      phoneNumber: '0976373938',
      city: 'Govno',
      street: 'SAjd',
      zipCode: '122',
      persent: 2
    })
  }
}

const customerToEdit = ref<CustomerCard>();
const isCustomerEditDialogVisible = ref<boolean>(false);

const newCustomer = ref<CustomerCard>({
  cardNumber: '',
  name: '',
  surname: '',
  patronimic: '',
  phoneNumber: '',
  city: '',
  street: '',
  zipCode: '',
  persent: 0,
})

const isNewCustomer = ref<boolean>(false);

const openEditCustomerDialog = (customer: CustomerCard) => {
  isNewCustomer.value = false;
  customerToEdit.value = customer;
  isCustomerEditDialogVisible.value = true;
}

const openNewCustomerDialog = () => {
  customerToEdit.value = newCustomer.value;
  isNewCustomer.value = true;
  isCustomerEditDialogVisible.value = true;
}

onMounted(async () => {
  await fetchCustomers();
})
</script>
<template>
  <DataTable
    v-model:filters="filters"
    filter-display="row"
    :value="customers"
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
        <Button
          severity="warning"
          icon="pi pi-pencil"
          @click="openEditCustomerDialog(data)"
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
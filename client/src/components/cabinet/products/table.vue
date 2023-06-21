<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import { FilterMatchMode } from 'primevue/api';
import { ProductInStore } from '../../../models/product-in-store.model';
import { Category } from '../../../models/category.model';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { Product } from '../../../models/product.model';
import { products } from '../../../api/products';


const filters = ref({
  'upc': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'isPromo': { value: null, matchMode: FilterMatchMode.EQUALS },
});

const props = withDefaults(defineProps<{
  selectedCategory: Category | undefined
  isAdmin: boolean
  isReport: boolean
}>(), {
  isAdmin: false,
  isReport: true
});


const { fetch: fetchProducts, result: productsValue } = products.useProducts();

watch(() => props.selectedCategory, async () => {
  await fetchProducts({
    categoryId: props.selectedCategory?.id as unknown as string
  });
}, {
  deep: true,
  immediate: true,
});

const isEditProductDialogOpen = ref(false);

const isNewProductDialogOpen = ref(false);

const productToEdit = ref<Product>();

const openEditDialog = (product: Product) => {
  productToEdit.value = product;
  isEditProductDialogOpen.value = true;
}


const isMisticDialogVisible = ref(false);

</script>
<template>
  <DataTable
    v-model:filters="filters"
    :value="productsValue"
    :paginator="!props.isReport"
    filter-display="menu"
    :rows="isAdmin ? 6 : 10"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <h1>Products</h1>
        <div v-if="props.isAdmin">
          <Button
            icon="pi pi-plus"
            severity="success"
            @click="isNewProductDialogOpen = true"
          />
          <Button
            style="margin-left: 30px;"
            icon="pi pi-star"
            @click="isMisticDialogVisible = true"
          />
          <Dialog
            v-model:visible="isNewProductDialogOpen"
            header="New product"
            modal
          >
            <CabinetAdminProductsNewDialog @submit="isNewProductDialogOpen = false; fetchProducts({categoryId: props.selectedCategory?.id as unknown as string})" />
          </Dialog>
          <Dialog
            v-model:visible="isMisticDialogVisible"
            modal
            header="Stats"
          >
            <CabinetAdminProductsMisticDialog />
          </Dialog>
        </div>
      </div>
    </template>
    <Column
      sortable
      header="UPC"
      field="upc"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          style="width: 200px !important;"
          :placeholder="`Filter by upc`"
          @input="filterCallback"
        />
      </template>
    </Column>
    <Column
      sortable
      header="Name"
      field="name"
      style="width: 320px;"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          style="width: 200px !important;"
          :placeholder="`Filter by name`"
          @input="filterCallback"
        />
      </template>
    </Column>
    <Column
      sortable
      header="Price"
      field="price"
    />
    <Column
      header="Promo price"
      field="promoPrice"
    />
    <Column
      sortable
      header="Is Promo?"
      field="isPromo"
    >
      <template #filter="{ filterModel, filterCallback }">
        <TriStateCheckbox
          v-model="filterModel.value"
          @change="filterCallback()"
        />
      </template>
      <template #body="{ data }">
        <i
          v-if="data.isPromo"
          class="pi pi-check-circle text-green-500"
        />
        <i
          v-else
          class="pi pi-minus-circle text-red-500"
        />
      </template>
    </Column>
    <Column
      sortable
      header="Number in store"
      field="number"
    />
    <Column
      sortable
      header="Category id"
      field="categoryId"
    />
    <Column
      header="Characteristics"
      field="characteristics"
    />
    <Column v-if="isAdmin">
      <template #body="{ data }">
        <TableButtons
          :data="data"
          delete-url=""
          :item-to-edit="productToEdit"
          @open-edit-dialog="openEditDialog(data)"
          @record-deleted="fetchProducts({categoryId: props.selectedCategory?.id as unknown as string})"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog
    v-model:visible="isEditProductDialogOpen"
    header="Edit product"
    style="width: 50vw;"
    modal
  >
    <CabinetAdminProductsEditDialog
      v-if="productToEdit"
      :product="productToEdit"
      @submit="isEditProductDialogOpen = false; fetchProducts({categoryId: props.selectedCategory?.id as unknown as string})"
    />
  </Dialog>
</template>
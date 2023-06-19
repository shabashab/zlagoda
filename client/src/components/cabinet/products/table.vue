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


const filters = ref({
  'product.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'product.isPromo': { value: null, matchMode: FilterMatchMode.EQUALS },
});

const props = withDefaults(defineProps<{
  selectedCategory: Category | undefined
  isAdmin: boolean
}>(), {
  isAdmin: false
});

const products = ref<ProductInStore[]>([]);

const fetchProducts = async () => {
  for (let i = 0; i < 100; i++) {
    const price = (Math.random() * 1000).toFixed(2) as unknown as number
    const promoPrice = (Math.random().toFixed(0) as unknown as number) % 2 === 0 ? (price * Math.random()).toFixed(2) as unknown as number : undefined 
    products.value.push(
      {
        product: {
          name: `test${i}`,
          price: price,
          upc: (Math.random() * 100000000000000).toFixed(0),
          characteristics: 'hui',
          manufacture: 'test',
          promoPrice: promoPrice,
          isPromo: promoPrice ? true : false 
        },
        number: (Math.random() * 100).toFixed(0) as unknown as number
      });
  }  
}

watch(() => props.selectedCategory, async () => {
  await fetchProducts();
}, {
  deep: true,
  immediate: true,
});

const isEditProductDialogOpen = ref(false);

const isNewProductDialogOpen = ref(false);

const productToEdit = ref<ProductInStore>();

const openEditDialog = (product: ProductInStore) => {
  productToEdit.value = product;
  isEditProductDialogOpen.value = true;
}

</script>
<template>
  <DataTable
    v-model:filters="filters"
    :value="products"
    paginator
    filter-display="row"
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
          <Dialog
            v-model:visible="isNewProductDialogOpen"
            header="New product"
            modal
          >
            <CabinetAdminProductsNewDialog @submit="isNewProductDialogOpen = false; fetchProducts()" />
          </Dialog>
        </div>
      </div>
    </template>
    <Column
      sortable
      header="UPC"
      field="product.upc"
    />
    <Column
      sortable
      header="Name"
      field="product.name"
      style="width: 320px;"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          style="width: 200px !important;"
          :placeholder="`Filter by id { ${filterModel.matchMode} }`"
          @input="filterCallback"
        />
      </template>
    </Column>
    <Column
      sortable
      header="Price"
      field="product.price"
    />
    <Column
      header="Promo price"
      field="product.promoPrice"
    />
    <Column
      sortable
      header="Is Promo?"
      field="product.isPromo"
    >
      <template #filter="{ filterModel, filterCallback }">
        <TriStateCheckbox
          v-model="filterModel.value"
          @change="filterCallback()"
        />
      </template>
      <template #body="{ data }">
        <i
          v-if="data.product.isPromo"
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
      header="Manufacture"
      field="product.manufacture"
    />
    <Column
      header="Characteristics"
      field="product.characteristics"
    />
    <Column v-if="isAdmin">
      <template #body="{ data }">
        <TableButtons
          :data="data"
          delete-url=""
          :item-to-edit="productToEdit"
          token-name="product.upc"
          @open-edit-dialog="openEditDialog(data)"
          @record-deleted="fetchProducts()"
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
      @submit="isEditProductDialogOpen = false; fetchProducts()"
    />
  </Dialog>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { Category } from '../../../../models/category.model';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';


const categories = ref<Category[]>([]);

const fetchCategories = async () => {
  for (let i = 0; i < 10; i++){
    categories.value.push({
      categoryNumber: 12,
      name: 'Govno',
    })
  }
}

onMounted(async () => {
  await fetchCategories();
})

const isNewCategoryDialogVisible = ref(false);

const categoryToEdit = ref<Category>();

const isEditCategoryDiaglogVisible = ref(false);

</script>
<template>
  <DataTable
    :value="categories"
    paginator
    :rows="7"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <h1 class="text-xl">
          Categories
        </h1>
        <div>
          <Button
            severity="success"
            icon="pi pi-plus"
            @click="isNewCategoryDialogVisible = true"
          />
          <Dialog
            v-model:visible="isNewCategoryDialogVisible"
            modal
            header="New category"
          >
            <CabinetAdminCategoriesNewDialog @submit="isNewCategoryDialogVisible = false; fetchCategories()" />
          </Dialog>
        </div>
      </div>
    </template>
    <Column
      sortable
      header="Number"
      field="categoryNumber"
    />
    <Column
      sortable
      header="Name"
      field="name"
    />
    <Column>
      <template #body="{ data }">
        <TableButtons
          v-model:item-to-edit="categoryToEdit"
          :data="data"
          delete-url=""
          token-name="categoryNumber"
          @open-edit-dialog="isEditCategoryDiaglogVisible = true"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog
    v-if="categoryToEdit"
    v-model:visible="isEditCategoryDiaglogVisible"
    header="Edit category"
    modal
  >
    <CabinetAdminCategoriesEditDialog
      :category="categoryToEdit"
      @submit="isEditCategoryDiaglogVisible = false; fetchCategories()"
    />
  </Dialog>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { Category } from '../../../../models/category.model';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { categories } from '../../../../api/categories';

const { fetch: fetchCategories, result: categoriesValue, loading } = categories.useCategories().fetchImmediate();

const isNewCategoryDialogVisible = ref(false);

const categoryToEdit = ref<Category>();

const isEditCategoryDiaglogVisible = ref(false);


const props = withDefaults(defineProps<{
  isReport: boolean
}>(), {
  isReport: false
})
</script>
<template>
  <DataTable
    :value="categoriesValue"
    :loading="loading"
    :paginator="!props.isReport"
    :rows="7"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <h1 class="text-xl">
          Categories
        </h1>
        <div v-if="!props.isReport">
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
      field="id"
    />
    <Column
      sortable
      header="Name"
      field="name"
    />
    <Column v-if="!props.isReport">
      <template #body="{ data }">
        <TableButtons
          v-model:item-to-edit="categoryToEdit"
          :data="data"
          @open-edit-dialog="isEditCategoryDiaglogVisible = true"
          @delete="12"
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
<script setup lang="ts">
import { Category } from '../../../models/category.model';
import InputNumber from 'primevue/inputnumber';
import Slider from 'primevue/slider';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';


const selectedCategory = ref<Category>();
const range = ref<number[]>([]);

const { fetch: fetchProducts, result: productsValue } = products.useMinMax();

const onClick = async () => {
  await fetchProducts({
    category: selectedCategory.value!,
    range: range.value
  });
}

</script>
<template>
  <div class="flex flex-col gap-10 mt-10">
    <CabinetProductsCategorySelector v-model:category="selectedCategory" />
    <div class="w-56">
      <div class="flex justify-start gap-5">
        <div>
          <label for="min">
            Min:
          </label>
          <InputNumber
            id="min"
            v-model="range[0]"
            placeholder="min"
            input-style="width: 50%"
          />
        </div>
        <div>
          <label for="max">
            Max:
          </label>
          <InputNumber
            id="max"
            v-model="range[1]"
            placeholder="max"
            input-style="width: 50%"
          />
        </div>
      </div>
      <div class="mt-3">
        <Slider
          v-model="range"
          range
          :max="10000"
        />
      </div>
    </div>
    <Button
      icon="pi pi-star"
      @click="onClick()"
    />
    <DataTable :value="productsValue">
      <Column
        header="Name"
        field="name"
      />
      <Column
        header="Price"
        field="price"
      />
    </DataTable>
  </div>
</template>
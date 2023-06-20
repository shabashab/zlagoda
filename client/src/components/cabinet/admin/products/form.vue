<script setup lang="ts">
import { Category } from '../../../../models/category.model';
import { FormItem } from '../../../../models/form-item.model';
import { ProductInStore } from '../../../../models/product-in-store.model';
import { Product } from '../../../../models/product.model';
import UpcInput from '../../../upc-input.vue';
import Checkbox from 'primevue/checkbox';


const props = defineProps<{
  product: Product;
}>();

const emits = defineEmits(['update:product']);

const productValue = computed({
  get() {
    return props.product
  },
  set(value) {
    emits('update:product', value)
  }
})

const data = ref<FormItem[]>([
  {
    label: 'Upc',
    key: 'upc',
    type: 'string',
  },
  {
    label: 'Name',
    key: 'name',
    type: 'string'
  },
  {
    label: 'Characteristics',
    key: 'characteristics',
    type: 'string',
  },
  {
    label: 'Price',
    key: 'price',
    type: 'number',
  }
]);

const selectedCategory = ref<Category>();

watch(() => selectedCategory.value, () => {
  productValue.value.categoryId = selectedCategory.value!.id;
}, {})

</script>
<template>
  <GenericForm
    :data="data"
    :item="props.product"
  >
    <NumberPropInput
      v-model:value="productValue.number"
      label="Number in store"
    />
    <div class="flex items-center">
      <div class="flex flex-col">
        <label for="isPromo">
          Is promo?
        </label>
        <Checkbox
          id="isPromo"
          v-model="productValue.isPromo"
          :binary="true"
        />
      </div>
    </div>
    <CabinetProductsCategorySelector
      v-model:category="selectedCategory"
      :show-clear="false"
    />
  </GenericForm>
</template>
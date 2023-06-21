<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { Employee } from '../../models/employee.model';


const props = defineProps<{
  cashier: Employee | undefined
}>();

const emits = defineEmits(['update:cashier']);

const cashierIdValue = computed({
  get() {
    return props.cashier
  },
  set(value) {
    emits('update:cashier', value); 
  }
});

const { fetch: fetchCshiers, result: cashiersValue } = employees.useEmployees().fetchImmediate();

</script>
<template>
  <div class="w-30 h-full">
    <label for="dropDown">Select cashier id:</label>
    <Dropdown
      id="dropDown"
      v-model:model-value="cashierIdValue"
      style="width: 100%; height: 50px;"
      :options="cashiersValue?.filter((el) => {return el.role === 'cashier'})"
      option-label="surname"
      filter
      show-clear
    >
      <template #option="slotProps">
        <div class="flex justify-start gap-5">
          <div>
            {{ slotProps.option.surname }} {{ slotProps.option.name }} {{ slotProps.option.patronymic }}
          </div>
          <div class="text-black/30">
            (id: {{ slotProps.option.employeeId }} )
          </div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>
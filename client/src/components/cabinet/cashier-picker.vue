<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { Employee } from '../../models/employee.model';


const props = defineProps<{
  cashierId: string
}>();

const emits = defineEmits(['update:cashierId']);

const cashierIdValue = computed({
  get() {
    return props.cashierId
  },
  set(value) {
    emits('update:cashierId', value); 
  }
});

const cashiers = ref<Employee[]>([]);

const fetchCashiers = async () => {
  for (let i = 0; i < 10; i++) {
    cashiers.value.push({
      id: '1231',
      name: 'Taras',
      surname: 'Artemovich',
      city: 'Govno',
      street: 'Mocha st.',
      zipCode: '1231',
      role: 'cashier',
      dateOfBirth: new Date(1,2,2003),
      dateOfStart: new Date(1,2,2022),
      salary: 300,
      phoneNumber: '0976373938',
      patronymic: 'G',

    })
  }
}

onMounted(async () => {
  await fetchCashiers();
})
</script>
<template>
  <div class="w-30 h-full">
    <label for="dropDown">Select cashier id:</label>
    <Dropdown
      id="dropDown"
      v-model:model-value="cashierIdValue"
      style="width: 100%; height: 50px;"
      :options="cashiers"
      option-value="id"
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
            (id: {{ slotProps.option.id }} )
          </div>
        </div>
      </template>
      <template #value="slotProps">
        <div class="flex justify-start gap-5">
          {{ slotProps.value }}
        </div>
      </template>
    </Dropdown>
  </div>
</template>
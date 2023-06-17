<script setup lang="ts">
import { Employee } from '../../models/employee.model';

const fetchPersonalData = async () : Promise<Employee> => {
  return {
    id: 'i1289s8ad',
    name: 'Artem',
    surname: 'Tarasenko',
    role: 'cashier',
    dateOfBirth: new Date(2004,9,20),
    dateOfStart: new Date(2022,5,13),
    city: 'Brovari',
    street: 'Govna',
    salary: 300,
    zipCode: '02059',
    phoneNumber: '0976373938',
    imgUrl: 'https://edukoht.com.ua/assets/tarasenko_artem.482eb11d.webp'
  }
}

const personalData = ref<Employee>();

onMounted(async () => {
  personalData.value = await fetchPersonalData();
})
</script>
<template>
  <div
    v-if="personalData"
    class="grid grid-cols-[1fr,2fr] gap-24"
  >
    <div>
      <img
        class="mt-20"
        :src="personalData?.imgUrl"
        :alt="personalData?.surname"
      >
    </div>
    <div>
      <div class="text-6xl font-extrabold border-b border-black/30 pb-2">
        {{ personalData?.surname }} {{ personalData?.name }} {{ personalData?.patronymic }}
      </div>
      <div class="mt-10 flex flex-col text-xl">
        <div
          v-for="key in Object.keys(personalData)"
          :key="(key as string)"
        >
          <div
            v-if="key !== 'name' && key !== 'surname' && key !== 'patronymic' && key !== 'imgUrl'"
            class="mt-10"
          >
            <div v-if="key ==='dateOfBirth' || key === 'dateOfStart'">
              {{ key }}: {{ personalData[key].getDate().toString() }}-{{ personalData[key].getMonth().toString() }}-{{ personalData[key].getFullYear().toString() }}
            </div>
            <div v-else>
              {{ key }}: {{ personalData[key as keyof typeof personalData] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
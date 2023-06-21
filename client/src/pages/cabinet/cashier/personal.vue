<script setup lang="ts">
import Calendar from 'primevue/calendar';
import { Employee } from '../../../models/employee.model';
import { omit } from 'lodash';


const authStore = useAuthStore();

const personalData = ref<any>(omit(authStore.currentUser, ['user']));
</script>
<template>
  <div
    v-if="personalData"
  >
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
            <div v-if="key ==='birthDate' || key === 'startDate'">
              {{ key }}: 
              <Calendar
                v-model="personalData[key]"
                disabled
                text
                style="width: 140px;"
                date-format="dd/mm/yy"
              />
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
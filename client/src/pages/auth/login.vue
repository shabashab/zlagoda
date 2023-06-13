<script lang="ts" setup>
import Button from 'primevue/button'

const router = useRouter()
</script>

<template>
  <Card class="w-full lg:w-1/2 xl:w-1/3">
    <h1 class="text-3xl font-bold text-center mb-10">
      Log in
    </h1>
    <AuthLoginForm />
    <Button
      class="w-full justify-center !mt-5"
      outlined
      @click="router.push('/auth/register')"
    >
      Register instead
    </Button>
  </Card>
</template>

<style lang="scss" scoped>

</style>
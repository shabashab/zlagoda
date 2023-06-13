<script lang="ts" setup>
</script>

<template>
  <div class="w-full flex flex-col items-center from-dark to-darker bg-gradient-to-br pt-32 pb-32 px-4 lg:px-0">
    <img
      src="/logo.svg"
      alt="Logo"
      class="w-[350px]"
    >

    <h1 class="text-lighter text-center text-5xl mt-16">
      Private Investment Operations Project
    </h1>

    <h2 class="text-lighter text-center text-3xl mt-16">
      Invest and <b class="font-bold text-accent">Prosper</b>
    </h2>

    <div class="container flex flex-col items-stretch lg:grid grid-cols-2 gap-20">
      <span class="w-full lg:w-[600px] text-center opacity-80 text-lighter mt-3 lg:mt-10 justify-self-end">
        Seize the golden opportunity to become an investor in the thriving fintech industry. It's not just about making profits, it's about becoming a part of an exciting, fast-growing movement. Be one of the trailblazers to ride this wave of innovation.
      </span>

      <span class="w-full lg:w-[600px] text-center opacity-80 text-lighter mt-3 lg:mt-10 justify-self-start">
        Join us and embrace the future of finance. Don't just observe - be a part of this revolution. Embark on the rewarding journey of fintech investment today.
      </span>
    </div>


    <div class="container flex flex-col items-stretch lg:grid grid-cols-2 grid-rows-1 lg:items-start gap-20 pt-24">
      <Card class="justify-self-end lg:w-3/4 w-full">
        <h2 class="text-3xl font-bold text-center mb-10">
          Register
        </h2>
        <AuthSignupForm class="w-full" />
      </Card>
      <Card class="justify-self-start lg:w-3/4 w-full">
        <h2 class="text-3xl font-bold text-center mb-10">
          Login
        </h2>
        <AuthLoginForm class="w-full" />
      </Card>
    </div>

    <RouterLink
      class="font-semibold text-lighter text-3xl hover:underline mt-32 opacity-80"
      to="/contacts"
    >
      Contacts
    </RouterLink>
    <RouterLink
      class="font-semibold text-lighter underline"
      to="/policies"
    >
      Policies
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>

</style>

<route lang="json">
  {
    "meta": {
      "public": true,
      "middleware": ["no-authenticated"]
    }
  }
</route>

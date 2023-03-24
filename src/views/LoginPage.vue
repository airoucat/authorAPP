<script setup lang="ts">
  import { useRoute, useRouter} from "vue-router"

  const route = useRoute();
  const router = useRouter();

  const handleGoToHome = () => {
    console.log(route)
    console.log(router)
    router.push('/edit')
  }
</script>

<template>
  this login page
  <button @click="handleGoToHome()">前往主页</button>
</template>
<template>
  <RouterView />
</template>
<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import TheSidebar from "./components/TheSidebar.vue";
</script>

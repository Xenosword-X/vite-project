<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import LanguageSwitch from '@/components/LanguageSwitch.vue';
</script>

<template>
  <div class="container p-5">    
    <h1 class="d-md-flex justify-content-center justify-content-md-between">
      <img src="@/assets/img/logo_lg.png" class="img-fluid" alt="logo" />
      <div class="d-flex justify-content-center mt-2"><LanguageSwitch /></div>
    </h1>
    <div class="row justify-content-center">
      <div class="col-5 d-none d-md-block">
        <img src="@/assets/img/img2.png" class="img-fluid" alt="img" />
      </div>
      <div class="col-12 col-md-5">
        <router-view />
      </div>
    </div>
  </div>
</template>

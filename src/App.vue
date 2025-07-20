<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container p-5">
    <h1 class="text-center text-md-start">
      <img src="./assets/logo_lg.png" class="img-fluid" alt="logo" />
    </h1>
    <div class="row justify-content-center">
      <div class="col-5 d-none d-md-block">
        <img src="./assets/img2.png" class="img-fluid" alt="img" />
      </div>
      <div class="col-12 col-md-5">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './assets/all.scss';
</style>

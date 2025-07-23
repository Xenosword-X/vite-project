<script setup></script>

<template>
  <div class="container p-5">
    <h1 class="text-center text-md-start">
      <img src="@/assets/img/logo_lg.png" class="img-fluid" alt="logo" />
    </h1>
    <div class="row justify-content-center">
      <div class="col-5 d-none d-md-block">
        <img src="@/assets/img/img.png" class="img-fluid" alt="img" />
      </div>
      <div class="col-12 col-md-5">
        <router-view />
      </div>
    </div>
  </div>
</template>

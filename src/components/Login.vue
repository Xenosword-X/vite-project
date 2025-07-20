<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h3 class="text-secondary fw-bold mb-3 text-center text-md-start">最實用的線上代辦事項服務</h3>
  <form action="">
    <div class="col-12 mb-3">
      <label for="mail01" class="form-label">Email</label>
      <input
        type="email"
        id="mail01"
        class="form-control mail01"
        placeholder="請輸入Email"
        required
      />
    </div>
    <div class="col-12 mb-4">
      <label for="pwd01" class="form-label">密碼</label>
      <input
        type="password"
        id="pwd01"
        class="form-control pwd01"
        placeholder="請輸入密碼"
        required
      />
    </div>
    <div class="text-center">
      <button type="submit" class="btn btn-secondary h5" id="login01" style="width: 128px">
        登入
      </button>
    </div>
    <div class="text-center"><a href="#" class="btn" id="register01">註冊帳號</a></div>
  </form>
</template>

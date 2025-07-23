<template>
    <h3 class="text-secondary fw-bold mb-3 text-center text-md-start">最實用的線上代辦事項服務</h3>
    <form @submit.prevent="handleLogin">
        <div class="col-12 mb-3">
            <label for="mail01" class="form-label">Email</label>
            <input type="email" id="mail01" class="form-control mail01" placeholder="請輸入Email" required v-model="email">
        </div>
        <div class="col-12 mb-4">
            <label for="pwd01" class="form-label">密碼</label>
            <input type="password" id="pwd01" class="form-control pwd01" placeholder="請輸入密碼" required v-model="password">
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-secondary h5" id="login01" style="width: 128px;">登入</button>
        </div>
        <div class="text-center">
            <router-link to="/register" class="btn" id="register01">註冊帳號</router-link>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore.js'
import { showToast } from '@/methods/Toast'
// 輸入欄位綁定
const email = ref('')
const password = ref('')
// 使用 Pinia 的 userStore
const userStore = useUserStore()
// Vue Router 用於登入成功後導頁
const router = useRouter()
// 處理登入流程
const handleLogin = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    showToast('error', 'Email 和密碼不得為空')
  }
  userStore.login(email.value, password.value)
    .then(success => {
      if (success) {
        router.push('/todo') // ✅ 成功才導向
      } else {
        showToast('error', '請確認帳號密碼是否正確')
      }
    })
}
</script>
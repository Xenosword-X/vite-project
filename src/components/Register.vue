<template>
    <h3 class="text-secondary fw-bold mb-3 text-center text-md-start">註冊帳號</h3>
    <form @submit.prevent="handleRegister">
        <div class="col-12 mb-3">
            <label for="mail02" class="form-label">Email</label>
            <input type="email" id="mail02" class="form-control mail02" placeholder="請輸入Email" required v-model="email">
        </div>
        <div class="col-12 mb-3">
            <label for="nickname" class="form-label">您的暱稱</label>
            <input type="text" id="nickname" class="form-control nickname" placeholder="請輸入您的暱稱" required v-model="nickname">
        </div>
        <div class="col-12 mb-3">
            <label for="pwd02" class="form-label">密碼</label>
            <input type="password" id="pwd02" class="form-control pwd02" placeholder="請輸入密碼" required v-model="pwd">
        </div>
        <div class="col-12 mb-4">
            <label for="R-pwd" class="form-label">再次輸入密碼</label>
            <input type="password" id="R-pwd" class="form-control R-pwd" placeholder="請再次輸入密碼" required v-model="confirmPwd">
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-secondary h5" style="width: 128px;" id="register02">註冊帳號</button>
        </div>
        <div class="text-center">
            <router-link to="/login" class="btn" id="login02">登入</router-link>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { showToast } from '@/methods/Toast'
// 輸入欄位綁定
const email = ref('')
const nickname = ref('')
const pwd = ref('')
const confirmPwd = ref('')
// Router 控制跳轉
const router = useRouter()
// 註冊處理
const handleRegister = () => {
  if (!email.value || !nickname.value || !pwd.value || !confirmPwd.value) {
    showToast('error', '註冊失敗，所有欄位必須填寫')
  }
  if (pwd.value !== confirmPwd.value) {
    showToast('error', '註冊失敗，密碼與確認密碼不一致')
  }
  axios.post(`${import.meta.env.VITE_API}/users`, {
    user: {
      email: email.value,
      nickname: nickname.value,
      password: pwd.value
    }
  })
    .then(res => {
      showToast('sucess', '註冊成功，請登入帳號密碼')
      router.push('/login')
    })
    .catch(err => {
      showToast('error', '註冊失敗，請稍後再試')
      console.log(err)
    })
}
</script>

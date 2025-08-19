<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h3 class="text-secondary fw-bold mb-3 text-center text-md-start">
    {{ t('register.title') }}
  </h3>
  <form @submit.prevent="handleRegister">
    <div class="col-12 mb-3">
      <label for="mail02" class="form-label">{{ t('register.email') }}</label>
      <input type="email" id="mail02" class="form-control mail02" :placeholder="t('register.emailPlaceholder')" required v-model="email">
    </div>
    <div class="col-12 mb-3">
      <label for="nickname" class="form-label">{{ t('register.nickname') }}</label>
      <input type="text" id="nickname" class="form-control nickname" :placeholder="t('register.nicknamePlaceholder')" required v-model="nickname">
    </div>
    <div class="col-12 mb-3">
      <label for="pwd02" class="form-label">{{ t('register.password') }}</label>
      <input type="password" id="pwd02" class="form-control pwd02" :placeholder="t('register.passwordPlaceholder')" required v-model="pwd">
    </div>
    <div class="col-12 mb-4">
      <label for="R-pwd" class="form-label">{{ t('register.confirmPassword') }}</label>
      <input type="password" id="R-pwd" class="form-control R-pwd" :placeholder="t('register.confirmPasswordPlaceholder')" required v-model="confirmPwd">
    </div>
    <div class="text-center">
      <button type="submit" class="btn btn-secondary h5" style="width: 128px;" id="register02">
        {{ t('register.registerBtn') }}
      </button>
    </div>
    <div class="text-center">
      <router-link to="/login" class="btn" id="login02">{{ t('register.toLogin') }}</router-link>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { showToast } from '@/methods/Toast'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// 輸入欄位綁定
const email = ref('')
const nickname = ref('')
const pwd = ref('')
const confirmPwd = ref('')
// Router 控制跳轉
const router = useRouter()
// 註冊處理
const handleRegister = async () => {
  if (!email.value || !nickname.value || !pwd.value || !confirmPwd.value) {
    showToast('error', t('toast.registerEmpty'))
    return
  }
  if (pwd.value !== confirmPwd.value) {
    showToast('error', t('toast.passwordNotMatch'))
    return
  }
  try {
    await axios.post(`${import.meta.env.VITE_API}/users`, {
      user: {
        email: email.value,
        nickname: nickname.value,
        password: pwd.value
      }
    })
    showToast('success', t('toast.registerSuccess'))
    router.push('/login')
  } catch (err) {
    showToast('error', t('toast.registerFail'))
    console.error(err)
  }
}
</script>

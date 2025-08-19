<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h3 class="text-secondary fw-bold mb-3 text-center text-md-start">{{ t('login.slogan') }}</h3>
  <form @submit.prevent="handleLogin">
    <div class="col-12 mb-3">
      <label for="mail01" class="form-label">{{ t('login.email') }}</label>
      <input type="email" id="mail01" class="form-control mail01" :placeholder="t('login.passwordPlaceholder')" required v-model="email">
    </div>
    <div class="col-12 mb-4">
      <label for="pwd01" class="form-label">{{ t('login.password') }}</label>
      <input type="password" id="pwd01" class="form-control pwd01" :placeholder="t('login.passwordPlaceholder')" required v-model="password">
    </div>
    <div class="text-center">
      <button type="submit" class="btn btn-secondary h5" id="login01" style="width: 128px;">
        {{ t('login.loginBtn') }}
      </button>
    </div>
    <div class="text-center">
      <router-link to="/register" class="btn" id="register01">
        {{ t('login.registerBtn') }}
      </router-link>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore.js'
import { showToast } from '@/methods/Toast'
import { useI18n } from 'vue-i18n'
// 輸入欄位綁定
const email = ref('')
const password = ref('')
// 使用 Pinia 的 userStore
const userStore = useUserStore()
// Vue Router 用於登入成功後導頁
const router = useRouter()
const { t } = useI18n()
// 處理登入流程
const handleLogin = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    showToast('error', t('toast.emptyFields'))
    return
  }
  try {
    const res = await userStore.login(email.value, password.value)
    if (res) {
      showToast('success',t('toast.loginSuccess'))
      router.push('/todo')
    } else {
      showToast('error', t('toast.loginFail'))
    }
  } catch (err) {
    showToast('error', t('toast.loginFail'))
    console.error(err)
  }
}
</script>
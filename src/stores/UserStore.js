import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { showToast } from '@/methods/Toast'

export const useUserStore = defineStore('userStore', () => {
  const token = ref('')
  const nickname = ref('')
  const isLogin = ref(false)
  const login = (email, password) => {
    return axios.post(`${import.meta.env.VITE_API}/users/sign_in`, {
      user: { email, password }
    })
      .then(res => {
        showToast('success', '登入成功')
        token.value = res.headers.authorization
        nickname.value = res.data.nickname
        isLogin.value = true
        localStorage.setItem('token', token.value)
        localStorage.setItem('nickname', nickname.value)
        axios.defaults.headers.common.Authorization = token.value
        return true
      })
      .catch(() => {
        return false
      })
  }
  const logout = () => {
    token.value = ''
    nickname.value = ''
    isLogin.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('nickname')
    delete axios.defaults.headers.common.Authorization
  }
  const checkLogin = () => {
    const savedToken = localStorage.getItem('token')
    const savedNickname = localStorage.getItem('nickname')
    if (savedToken && savedNickname) {
      token.value = savedToken
      nickname.value = savedNickname
      isLogin.value = true
      axios.defaults.headers.common.Authorization = savedToken
    }
  }
  return {
    token,
    nickname,
    isLogin,
    login,
    logout,
    checkLogin
  }
})
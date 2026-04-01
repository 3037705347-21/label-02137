import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户状态
  const name = ref('')
  const id = ref('')
  const token = ref('')

  // 计算属性：是否已登录
  const isLoggedIn = computed(() => !!token.value && !!name.value)

  // 登录操作
  function login(userData) {
    name.value = userData.name
    id.value = userData.id
    token.value = userData.token
    console.log(`[操作日志] 用户登录成功 - 姓名: ${userData.name}, 学号: ${userData.id}`)
  }

  // 登出操作
  function logout() {
    console.log(`[操作日志] 用户登出 - 姓名: ${name.value}, 学号: ${id.value}`)
    name.value = ''
    id.value = ''
    token.value = ''
  }

  // 重置状态
  function $reset() {
    name.value = ''
    id.value = ''
    token.value = ''
  }

  return {
    name,
    id,
    token,
    isLoggedIn,
    login,
    logout,
    $reset
  }
}, {
  persist: {
    key: 'bookmanage-user',
    storage: localStorage
  }
})

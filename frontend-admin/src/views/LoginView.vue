<template>
  <div class="login-page">
    <!-- 左侧品牌区域 -->
    <div class="login-brand">
      <div class="brand-content">
        <div class="brand-logo">
          <el-icon><Reading /></el-icon>
          <span class="brand-title">图书管理系统</span>
        </div>
        <p class="brand-desc">专业图书信息数据管理平台</p>

        <div class="brand-stats">
          <div class="stat-item">
            <span class="stat-value">25+</span>
            <span class="stat-label">图书数据</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">7</span>
            <span class="stat-label">图书分类</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">6</span>
            <span class="stat-label">出版社</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧登录表单 -->
    <div class="login-form-section">
      <div class="login-form-wrapper">
        <div class="login-card">
          <h2 class="login-title">欢迎回来</h2>
          <p class="login-subtitle">请登录您的账号</p>

          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            @keyup.enter="handleLogin"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名"
                size="large"
                :prefix-icon="User"
                clearable
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                size="large"
                :prefix-icon="Lock"
                show-password
                clearable
              />
            </el-form-item>


            <el-form-item>
              <el-button
                type="primary"
                size="large"
                class="login-btn"
                :loading="loading"
                @click="handleLogin"
              >
                {{ loading ? '登录中...' : '立即登录' }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="login-footer">
        <p>© 2024 图书管理系统 | 平雨萌 2023140023637</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, Reading } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { userApi } from '@/api/user'

const router = useRouter()
const userStore = useUserStore()

const loginFormRef = ref(null)
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  if (!loginFormRef.value) return

  await loginFormRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true
    try {
      const res = await userApi.login({
        username: loginForm.username,
        password: loginForm.password
      })

      if (res.code === 200) {
        userStore.login({
          name: res.data.name,
          id: res.data.id,
          token: res.data.token
        })

        ElMessage.success(`欢迎回来，${res.data.name}！`)
        router.push('/main')
      } else {
        ElMessage.error(res.message || '登录失败')
      }
    } catch (error) {
      ElMessage.error('登录失败，请稍后重试')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  background: #fff;
}

/* 左侧品牌区域 */
.login-brand {
  width: 55%;
  background: linear-gradient(135deg, #e0f0ff 0%, #b3d9ff 50%, #7ec8e3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}

.brand-content {
  text-align: center;
}

.brand-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.brand-logo .el-icon {
  font-size: 36px;
  color: #1890ff;
}

.brand-title {
  font-size: 32px;
  font-weight: 600;
  color: #1890ff;
}

.brand-desc {
  font-size: 16px;
  color: #595959;
  margin: 0 0 60px 0;
}

.brand-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: 600;
  color: #1890ff;
}

.stat-label {
  font-size: 14px;
  color: #8c8c8c;
}

/* 右侧表单区域 */
.login-form-section {
  width: 45%;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.login-form-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.login-card {
  width: 100%;
  max-width: 320px;
}

.login-title {
  font-size: 28px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 8px 0;
}

.login-subtitle {
  font-size: 14px;
  color: #8c8c8c;
  margin: 0 0 40px 0;
}

.login-form :deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 0 0 1px #d9d9d9 inset;
  padding: 4px 12px;
  transition: all 0.2s ease;
}

.login-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #1890ff inset;
}

.login-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #1890ff inset;
}

.login-form :deep(.el-input__inner) {
  height: 40px;
}

.login-form :deep(.el-form-item) {
  margin-bottom: 24px;
}

.hint-text {
  font-size: 13px;
  color: #1890ff;
}

.login-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  background: #1890ff;
  border: none;
  transition: all 0.2s ease;
}

.login-btn:hover:not(:disabled) {
  background: #40a9ff;
}

.login-btn:active:not(:disabled) {
  background: #096dd9;
}

.login-footer {
  padding: 24px;
  text-align: right;
}

.login-footer p {
  font-size: 12px;
  color: #bfbfbf;
  margin: 0;
}

/* 响应式 */
@media (max-width: 900px) {
  .login-brand {
    display: none;
  }
  .login-form-section {
    width: 100%;
  }
}
</style>

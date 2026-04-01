<template>
  <div class="main-layout">
    <!-- 顶部导航栏 -->
    <header class="main-header">
      <div class="header-left">
        <el-icon class="logo-icon"><Reading /></el-icon>
        <span class="system-title">图书管理系统</span>
      </div>
      <div class="header-right">
        <div class="user-info">
          <el-avatar :size="32" class="user-avatar">
            <el-icon><User /></el-icon>
          </el-avatar>
          <span class="welcome-text">欢迎{{ userStore.name }}，ID：{{ userStore.id }}</span>
        </div>
        <el-divider direction="vertical" />
        <el-button
          type="danger"
          plain
          :icon="SwitchButton"
          @click="handleLogout"
          class="logout-btn"
        >
          登出
        </el-button>
      </div>
    </header>

    <div class="main-body">
      <!-- 侧边栏菜单 -->
      <aside class="main-aside">
        <el-menu
          :default-active="activeMenu"
          class="side-menu"
          router
        >
          <el-menu-item index="/main">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/main/books">
            <el-icon><Document /></el-icon>
            <span>图书列表</span>
          </el-menu-item>
        </el-menu>
      </aside>

      <!-- 主内容区 -->
      <main class="main-content">
        <div class="content-wrapper">
          <router-view v-slot="{ Component }">
            <transition name="fade-slide" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Reading, User, SwitchButton, HomeFilled, Document } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { userApi } from '@/api/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const activeMenu = computed(() => {
  const path = route.path
  // 添加和编辑图书时，激活图书列表菜单
  if (path.includes('/books/edit') || path.includes('/books/add')) {
    return '/main/books'
  }
  return path
})

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要退出登录吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    await userApi.logout()
    userStore.logout()

    ElMessage.success('已安全退出')
    router.push('/')
  } catch (error) {
    if (error !== 'cancel') {
      console.error('登出失败:', error)
    }
  }
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-base);
}

/* 顶部导航栏 */
.main-header {
  height: 56px;
  background: var(--bg-white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing-lg);
  border-bottom: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.logo-icon {
  font-size: 24px;
  color: var(--primary-color);
}

.system-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.user-avatar {
  background: var(--primary-light);
  color: var(--primary-color);
}

.welcome-text {
  font-size: var(--font-size-base);
  color: var(--text-regular);
}

.header-right :deep(.el-divider) {
  height: 20px;
  margin: 0;
}

.logout-btn {
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.logout-btn:hover {
  transform: translateY(-1px);
}

/* 主体区域 */
.main-body {
  display: flex;
  margin-top: 56px;
  min-height: calc(100vh - 56px);
}

/* 侧边栏 */
.main-aside {
  width: 200px;
  background: var(--bg-white);
  border-right: 1px solid var(--border-light);
  position: fixed;
  left: 0;
  top: 56px;
  bottom: 0;
  overflow-y: auto;
}

.side-menu {
  border-right: none;
  height: 100%;
  padding: var(--spacing-sm);
}

.side-menu :deep(.el-menu-item) {
  height: 44px;
  line-height: 44px;
  margin-bottom: var(--spacing-xs);
  border-radius: var(--radius-md);
  color: var(--text-regular);
  transition: all var(--transition-fast);
}

.side-menu :deep(.el-menu-item:hover) {
  background-color: var(--bg-light);
  color: var(--primary-color);
}

.side-menu :deep(.el-menu-item.is-active) {
  background-color: var(--primary-light);
  color: var(--primary-color);
  font-weight: 500;
}

.side-menu :deep(.el-menu-item .el-icon) {
  font-size: 18px;
  margin-right: var(--spacing-sm);
}

/* 主内容区 */
.main-content {
  flex: 1;
  margin-left: 200px;
  padding: var(--spacing-lg);
  background: var(--bg-base);
  min-height: calc(100vh - 56px);
}

.content-wrapper {
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  min-height: calc(100vh - 56px - 48px);
}

/* 页面切换动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all var(--transition-normal);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>

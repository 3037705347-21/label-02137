<template>
  <div class="welcome-page">
    <!-- 欢迎卡片 -->
    <div class="welcome-card">
      <div class="welcome-icon">
        <el-icon><Reading /></el-icon>
      </div>
      <h1 class="welcome-title">欢迎使用图书管理系统</h1>
      <p class="welcome-subtitle">Welcome to Book Management System</p>
    </div>

    <!-- 用户信息卡片 -->
    <div class="user-card">
      <div class="user-avatar">
        <el-icon><User /></el-icon>
      </div>
      <div class="user-details">
        <h2 class="user-name">{{ userStore.name }}</h2>
        <p class="user-id">学号：{{ userStore.id }}</p>
      </div>
    </div>

    <!-- 快捷操作 -->
    <div class="section">
      <h3 class="section-title">快捷操作</h3>
      <div class="action-grid">
        <div class="action-card" @click="router.push('/main/books')">
          <div class="action-icon action-icon--blue">
            <el-icon><Document /></el-icon>
          </div>
          <div class="action-info">
            <span class="action-name">图书列表</span>
            <span class="action-desc">查看所有图书信息</span>
          </div>
          <el-icon class="action-arrow"><ArrowRight /></el-icon>
        </div>
        <div class="action-card" @click="router.push('/main/books/add')">
          <div class="action-icon action-icon--green">
            <el-icon><Plus /></el-icon>
          </div>
          <div class="action-info">
            <span class="action-name">添加图书</span>
            <span class="action-desc">录入新的图书信息</span>
          </div>
          <el-icon class="action-arrow"><ArrowRight /></el-icon>
        </div>
      </div>
    </div>

    <!-- 系统信息 -->
    <div class="section">
      <h3 class="section-title">系统信息</h3>
      <div class="info-card">
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">系统版本</span>
            <span class="info-value">v1.0.0</span>
          </div>
          <div class="info-item">
            <span class="info-label">技术栈</span>
            <span class="info-value">Vue3 + Element Plus</span>
          </div>
          <div class="info-item">
            <span class="info-label">开发者</span>
            <span class="info-value">平雨萌</span>
          </div>
          <div class="info-item">
            <span class="info-label">学号</span>
            <span class="info-value">2023140023637</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Reading, User, Document, Plus, ArrowRight } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
</script>

<style scoped>
.welcome-page {
  max-width: 800px;
  margin: 0 auto;
}

/* 欢迎卡片 */
.welcome-card {
  text-align: center;
  padding: var(--spacing-xl) 0;
  border-bottom: 1px solid var(--border-light);
  margin-bottom: var(--spacing-lg);
}

.welcome-icon {
  margin-bottom: var(--spacing-md);
}

.welcome-icon .el-icon {
  font-size: 64px;
  color: var(--primary-color);
}

.welcome-title {
  font-size: var(--font-size-h2);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-sm) 0;
}

.welcome-subtitle {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  margin: 0;
}

/* 用户信息卡片 */
.user-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.user-avatar {
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar .el-icon {
  font-size: 28px;
  color: #fff;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: #fff;
  margin: 0 0 var(--spacing-xs) 0;
}

.user-id {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

/* 区块标题 */
.section {
  margin-bottom: var(--spacing-xl);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-md) 0;
  padding-left: var(--spacing-sm);
  border-left: 3px solid var(--primary-color);
}

/* 快捷操作卡片 */
.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.action-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background: var(--bg-white);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-card:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.action-card:hover .action-arrow {
  transform: translateX(4px);
  color: var(--primary-color);
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-icon .el-icon {
  font-size: 24px;
  color: #fff;
}

.action-icon--blue {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
}

.action-icon--green {
  background: linear-gradient(135deg, #52c41a 0%, #389e0d 100%);
}

.action-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.action-name {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--text-primary);
}

.action-desc {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.action-arrow {
  font-size: 16px;
  color: var(--text-placeholder);
  transition: all var(--transition-fast);
}

/* 系统信息卡片 */
.info-card {
  background: var(--bg-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  border: 1px solid var(--border-light);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-white);
  border-radius: var(--radius-md);
}

.info-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.info-value {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
}

@media (max-width: 600px) {
  .action-grid,
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>

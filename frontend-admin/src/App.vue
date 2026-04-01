<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script setup>
// App.vue 作为根组件，包含路由视图
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  background: #f0f2f5;
  min-height: 100vh;
  color: #333;
  line-height: 1.5;
}

.app-container {
  min-height: 100vh;
}

/* 全局统一样式变量 */
:root {
  /* 主色调 - 专业蓝色系 */
  --primary-color: #1890ff;
  --primary-hover: #40a9ff;
  --primary-active: #096dd9;
  --primary-light: #e6f7ff;

  /* 功能色 */
  --success-color: #52c41a;
  --warning-color: #faad14;
  --danger-color: #ff4d4f;
  --info-color: #1890ff;

  /* 文字色 - 明确层级 */
  --text-primary: #262626;      /* 主要文字 */
  --text-regular: #595959;      /* 常规文字 */
  --text-secondary: #8c8c8c;    /* 次要文字 */
  --text-placeholder: #bfbfbf;  /* 占位文字 */

  /* 背景色 */
  --bg-base: #f0f2f5;           /* 页面背景 */
  --bg-light: #fafafa;          /* 浅色背景 */
  --bg-white: #ffffff;          /* 白色背景 */

  /* 边框色 */
  --border-color: #d9d9d9;
  --border-light: #f0f0f0;

  /* 阴影 */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  --shadow-md: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 6px 16px -8px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03);

  /* 间距 - 8px 基准 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;

  /* 字体大小 */
  --font-size-xs: 12px;
  --font-size-sm: 13px;
  --font-size-base: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 20px;
  --font-size-xxl: 24px;
  --font-size-h1: 32px;
  --font-size-h2: 24px;
  --font-size-h3: 20px;

  /* 过渡动画 */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.25s ease;
  --transition-slow: 0.35s ease;
}

/* 字体层级 */
h1 { font-size: var(--font-size-h1); font-weight: 600; line-height: 1.3; color: var(--text-primary); }
h2 { font-size: var(--font-size-h2); font-weight: 600; line-height: 1.35; color: var(--text-primary); }
h3 { font-size: var(--font-size-h3); font-weight: 500; line-height: 1.4; color: var(--text-primary); }
p { font-size: var(--font-size-base); line-height: 1.6; color: var(--text-regular); }
small { font-size: var(--font-size-xs); color: var(--text-secondary); }

/* 链接样式 */
a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color var(--transition-fast);
}
a:hover {
  color: var(--primary-hover);
}

/* 按钮基础过渡 */
button, .el-button {
  transition: all var(--transition-fast);
}
</style>

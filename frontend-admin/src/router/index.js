import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false, title: '登录' }
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/MainView.vue'),
    meta: { requiresAuth: true, title: '首页' },
    children: [
      {
        path: '',
        name: 'Welcome',
        component: () => import('@/views/WelcomeView.vue'),
        meta: { requiresAuth: true, title: '欢迎' }
      },
      {
        path: 'books',
        name: 'BookList',
        component: () => import('@/views/BookList.vue'),
        meta: { requiresAuth: true, title: '图书列表' }
      },
      {
        path: 'books/add',
        name: 'BookAdd',
        component: () => import('@/views/BookAdd.vue'),
        meta: { requiresAuth: true, title: '添加图书' }
      },
      {
        path: 'books/edit/:id',
        name: 'BookEdit',
        component: () => import('@/views/BookEdit.vue'),
        meta: { requiresAuth: true, title: '编辑图书' }
      },
      {
        path: 'books/detail/:id',
        name: 'BookDetail',
        component: () => import('@/views/BookDetail.vue'),
        meta: { requiresAuth: true, title: '图书详情' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫 - 检查登录状态
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 图书管理系统` : '图书管理系统'

  // 需要登录但未登录
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'Login' })
  }
  // 已登录访问登录页，跳转到主页
  else if (to.name === 'Login' && userStore.isLoggedIn) {
    next({ name: 'Main' })
  }
  else {
    next()
  }
})

export default router

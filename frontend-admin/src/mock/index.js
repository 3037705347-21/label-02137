import Mock from 'mockjs'
import './user'
import './book'

// 设置模拟延迟
Mock.setup({
  timeout: '200-500'
})

console.log('[Mock] Mock.js 服务已启动')

import Mock from 'mockjs'

// 模拟登录接口
Mock.mock(/\/api\/user\/login/, 'post', (options) => {
  const { username, password } = JSON.parse(options.body)

  console.log(`[Mock] 登录请求 - 用户名: ${username}`)

  // 只有 admin/123456 允许登录
  if (username === 'admin' && password === '123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        name: '平雨萌',
        id: '2023140023637',
        token: Mock.Random.guid()
      }
    }
  } else {
    return {
      code: 401,
      message: '用户名或密码错误',
      data: null
    }
  }
})

// 模拟登出接口
Mock.mock(/\/api\/user\/logout/, 'post', () => {
  console.log('[Mock] 用户登出')
  return {
    code: 200,
    message: '登出成功',
    data: null
  }
})

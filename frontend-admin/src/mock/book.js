import Mock from 'mockjs'

// 存储键名
const STORAGE_KEY = 'bookmanage_books'

// 从 localStorage 获取图书数据
function getBooks() {
  const data = localStorage.getItem(STORAGE_KEY)
  if (data) {
    return JSON.parse(data)
  }
  // 初始化默认数据
  const defaultBooks = Mock.mock({
    'list|25': [{
      'id|+1': 1,
      'title': '@ctitle(5, 15)',
      'author': '@cname',
      'publisher': '@pick(["人民出版社", "清华大学出版社", "机械工业出版社", "电子工业出版社", "北京大学出版社", "高等教育出版社"])',
      'price|20-150.2': 1,
      'isbn': /978-7-\d{4}-\d{4}-\d/,
      'publishDate': '@date("yyyy-MM-dd")',
      'category': '@pick(["计算机", "文学", "历史", "科学", "艺术", "经济", "教育"])',
      'stock|10-500': 1,
      'description': '@cparagraph(1, 3)'
    }]
  }).list
  saveBooks(defaultBooks)
  return defaultBooks
}

// 保存图书数据到 localStorage
function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}

// 获取下一个 ID
function getNextId(books) {
  if (books.length === 0) return 1
  return Math.max(...books.map(b => b.id)) + 1
}

// 获取图书列表（支持分页和搜索）
Mock.mock(/\/api\/books(\?.*)?$/, 'get', (options) => {
  const url = new URL(options.url, 'http://localhost')
  const page = parseInt(url.searchParams.get('page')) || 1
  const pageSize = parseInt(url.searchParams.get('pageSize')) || 10
  const title = url.searchParams.get('title') || ''
  const author = url.searchParams.get('author') || ''

  console.log(`[Mock] 查询图书列表 - 页码: ${page}, 每页: ${pageSize}, 书名: ${title}, 作者: ${author}`)

  const bookList = getBooks()

  // 过滤数据
  let filteredList = bookList.filter(book => {
    const matchTitle = !title || book.title.includes(title)
    const matchAuthor = !author || book.author.includes(author)
    return matchTitle && matchAuthor
  })

  // 分页
  const total = filteredList.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = filteredList.slice(start, end)

  return {
    code: 200,
    message: '查询成功',
    data: {
      list,
      total,
      page,
      pageSize
    }
  }
})

// 获取单本图书
Mock.mock(/\/api\/books\/\d+$/, 'get', (options) => {
  const id = parseInt(options.url.match(/\/api\/books\/(\d+)/)[1])
  const bookList = getBooks()
  const book = bookList.find(b => b.id === id)

  console.log(`[Mock] 查询图书详情 - ID: ${id}`)

  if (book) {
    return {
      code: 200,
      message: '查询成功',
      data: book
    }
  } else {
    return {
      code: 404,
      message: '图书不存在',
      data: null
    }
  }
})

// 添加图书
Mock.mock(/\/api\/books$/, 'post', (options) => {
  const bookData = JSON.parse(options.body)
  const bookList = getBooks()
  const newId = getNextId(bookList)

  const newBook = {
    id: newId,
    ...bookData,
    publishDate: bookData.publishDate || Mock.Random.date('yyyy-MM-dd')
  }

  bookList.unshift(newBook)
  saveBooks(bookList)

  console.log(`[Mock] 添加图书成功 - ID: ${newId}, 书名: ${bookData.title}`)

  return {
    code: 200,
    message: '添加成功',
    data: newBook
  }
})

// 更新图书
Mock.mock(/\/api\/books\/\d+$/, 'put', (options) => {
  const id = parseInt(options.url.match(/\/api\/books\/(\d+)/)[1])
  const bookData = JSON.parse(options.body)
  const bookList = getBooks()
  const index = bookList.findIndex(b => b.id === id)

  console.log(`[Mock] 更新图书 - ID: ${id}`)

  if (index !== -1) {
    bookList[index] = { ...bookList[index], ...bookData }
    saveBooks(bookList)
    return {
      code: 200,
      message: '更新成功',
      data: bookList[index]
    }
  } else {
    return {
      code: 404,
      message: '图书不存在',
      data: null
    }
  }
})

// 删除图书
Mock.mock(/\/api\/books\/\d+$/, 'delete', (options) => {
  const id = parseInt(options.url.match(/\/api\/books\/(\d+)/)[1])
  const bookList = getBooks()
  const index = bookList.findIndex(b => b.id === id)
  const book = bookList[index]

  console.log(`[Mock] 删除图书 - ID: ${id}`)

  if (index !== -1) {
    bookList.splice(index, 1)
    saveBooks(bookList)
    return {
      code: 200,
      message: '删除成功',
      data: { id, title: book?.title }
    }
  } else {
    return {
      code: 404,
      message: '图书不存在',
      data: null
    }
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { bookApi } from '@/api/book'
import { ElMessage } from 'element-plus'

export const useBookStore = defineStore('book', () => {
  // 图书列表
  const books = ref([])
  // 当前页码
  const currentPage = ref(1)
  // 每页数量
  const pageSize = ref(10)
  // 总数
  const total = ref(0)
  // 加载状态
  const loading = ref(false)
  // 搜索条件
  const searchParams = ref({
    title: '',
    author: ''
  })

  // 获取图书列表
  async function fetchBooks(params = {}) {
    loading.value = true
    try {
      const queryParams = {
        page: currentPage.value,
        pageSize: pageSize.value,
        title: searchParams.value.title,
        author: searchParams.value.author,
        ...params
      }
      const res = await bookApi.getList(queryParams)
      if (res.code === 200) {
        books.value = res.data.list
        total.value = res.data.total
        console.log(`[操作日志] 查询图书列表成功 - 共 ${res.data.total} 条记录`)
      }
    } catch (error) {
      console.error('[操作日志] 查询图书列表失败:', error)
      ElMessage.error('获取图书列表失败')
    } finally {
      loading.value = false
    }
  }

  // 添加图书
  async function addBook(bookData) {
    loading.value = true
    try {
      const res = await bookApi.add(bookData)
      if (res.code === 200) {
        console.log(`[操作日志] 添加图书成功 - 书名: ${bookData.title}, 作者: ${bookData.author}`)
        ElMessage.success('添加图书成功')
        await fetchBooks()
        return true
      }
      return false
    } catch (error) {
      console.error('[操作日志] 添加图书失败:', error)
      ElMessage.error('添加图书失败')
      return false
    } finally {
      loading.value = false
    }
  }

  // 更新图书
  async function updateBook(bookData) {
    loading.value = true
    try {
      const res = await bookApi.update(bookData)
      if (res.code === 200) {
        console.log(`[操作日志] 更新图书成功 - ID: ${bookData.id}, 书名: ${bookData.title}`)
        ElMessage.success('更新图书成功')
        await fetchBooks()
        return true
      }
      return false
    } catch (error) {
      console.error('[操作日志] 更新图书失败:', error)
      ElMessage.error('更新图书失败')
      return false
    } finally {
      loading.value = false
    }
  }

  // 删除图书
  async function deleteBook(id, title) {
    loading.value = true
    try {
      const res = await bookApi.delete(id)
      if (res.code === 200) {
        console.log(`[操作日志] 删除图书成功 - ID: ${id}, 书名: ${title}`)
        ElMessage.success('删除图书成功')
        // 如果当前页没有数据了，回到上一页
        if (books.value.length === 1 && currentPage.value > 1) {
          currentPage.value--
        }
        await fetchBooks()
        return true
      }
      return false
    } catch (error) {
      console.error('[操作日志] 删除图书失败:', error)
      ElMessage.error('删除图书失败')
      return false
    } finally {
      loading.value = false
    }
  }

  // 获取单本图书
  async function getBookById(id) {
    try {
      const res = await bookApi.getById(id)
      if (res.code === 200) {
        console.log(`[操作日志] 查询图书详情成功 - ID: ${id}`)
        return res.data
      }
      return null
    } catch (error) {
      console.error('[操作日志] 查询图书详情失败:', error)
      ElMessage.error('获取图书详情失败')
      return null
    }
  }

  // 设置搜索条件
  function setSearchParams(params) {
    searchParams.value = { ...searchParams.value, ...params }
    currentPage.value = 1
  }

  // 重置搜索条件
  function resetSearch() {
    searchParams.value = { title: '', author: '' }
    currentPage.value = 1
  }

  // 设置分页
  function setPage(page) {
    currentPage.value = page
  }

  function setPageSize(size) {
    pageSize.value = size
    currentPage.value = 1
  }

  return {
    books,
    currentPage,
    pageSize,
    total,
    loading,
    searchParams,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
    setSearchParams,
    resetSearch,
    setPage,
    setPageSize
  }
})

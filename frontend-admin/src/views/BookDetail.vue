<template>
  <div class="book-detail-page">
    <div class="page-header">
      <div class="page-title">
        <el-icon><Document /></el-icon>
        <h2>图书详情</h2>
      </div>
      <el-button :icon="Back" @click="router.push('/main/books')">
        返回列表
      </el-button>
    </div>

    <div v-if="pageLoading" class="loading-section">
      <el-skeleton :rows="10" animated />
    </div>

    <div v-else class="detail-section">
      <div class="detail-card">
        <div class="detail-header">
          <div class="book-basic">
            <h1 class="book-title">{{ book.title }}</h1>
            <p class="book-author">{{ book.author }}</p>
            <el-tag :type="getCategoryType(book.category)" size="large" effect="light">
              {{ book.category }}
            </el-tag>
          </div>
        </div>

        <el-divider />

        <div class="detail-content">
          <div class="detail-row">
            <div class="detail-item">
              <span class="detail-label">图书ID</span>
              <span class="detail-value">{{ book.id }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">ISBN</span>
              <span class="detail-value">{{ book.isbn }}</span>
            </div>
          </div>

          <div class="detail-row">
            <div class="detail-item">
              <span class="detail-label">出版社</span>
              <span class="detail-value">{{ book.publisher }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">出版日期</span>
              <span class="detail-value">{{ book.publishDate }}</span>
            </div>
          </div>

          <div class="detail-row">
            <div class="detail-item">
              <span class="detail-label">价格</span>
              <span class="detail-value price">¥{{ book.price.toFixed(2) }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">库存</span>
              <el-tag :type="book.stock < 50 ? 'danger' : 'success'" size="small" effect="plain">
                {{ book.stock }} 本
              </el-tag>
            </div>
          </div>

          <el-divider />

          <div class="detail-item full-width">
            <span class="detail-label">图书简介</span>
            <div class="detail-description">
              {{ book.description || '暂无简介' }}
            </div>
          </div>
        </div>

        <div class="detail-actions">
          <el-button type="primary" :icon="Edit" @click="handleEdit">
            编辑图书
          </el-button>
          <el-button :icon="Delete" type="danger" @click="handleDelete">
            删除图书
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Document, Back, Edit, Delete } from '@element-plus/icons-vue'
import { useBookStore } from '@/stores/book'

const router = useRouter()
const route = useRoute()
const bookStore = useBookStore()

const pageLoading = ref(true)
const book = ref({
  id: '',
  title: '',
  author: '',
  publisher: '',
  category: '',
  price: 0,
  stock: 0,
  isbn: '',
  publishDate: '',
  description: ''
})

const getCategoryType = (category) => {
  const types = {
    '计算机': 'primary',
    '文学': 'success',
    '历史': 'warning',
    '科学': 'info',
    '艺术': 'danger',
    '经济': '',
    '教育': 'primary'
  }
  return types[category] || ''
}

const loadBookData = async () => {
  const bookId = parseInt(route.params.id)
  if (!bookId) {
    ElMessage.error('图书ID无效')
    router.push('/main/books')
    return
  }

  pageLoading.value = true
  try {
    const bookData = await bookStore.getBookById(bookId)
    if (bookData) {
      book.value = bookData
    } else {
      ElMessage.error('图书不存在')
      router.push('/main/books')
    }
  } catch (error) {
    ElMessage.error('加载图书数据失败')
    router.push('/main/books')
  } finally {
    pageLoading.value = false
  }
}

const handleEdit = () => {
  router.push(`/main/books/edit/${book.value.id}`)
}

const handleDelete = async () => {
  try {
    await ElMessageBox.confirm(
      `确定要删除图书《${book.value.title}》吗？此操作不可恢复！`,
      '删除确认',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      }
    )
    const success = await bookStore.deleteBook(book.value.id, book.value.title)
    if (success) {
      router.push('/main/books')
    }
  } catch (error) {
  }
}

onMounted(() => {
  loadBookData()
})
</script>

<style scoped>
.book-detail-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-light);
}

.page-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.page-title .el-icon {
  font-size: 24px;
  color: var(--primary-color);
}

.page-title h2 {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.loading-section {
  padding: var(--spacing-xl);
}

.detail-card {
  max-width: 900px;
  margin: 0 auto;
  background: var(--bg-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  border: 1px solid var(--border-light);
}

.detail-header {
  display: flex;
  align-items: flex-start;
}

.book-basic {
  width: 100%;
}

.book-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-sm) 0;
}

.book-author {
  font-size: var(--font-size-base);
  color: var(--text-regular);
  margin: 0 0 var(--spacing-md) 0;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.detail-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

.detail-value {
  font-size: var(--font-size-base);
  color: var(--text-primary);
  font-weight: 500;
}

.detail-value.price {
  color: var(--danger-color);
  font-size: var(--font-size-lg);
  font-weight: 700;
}

.detail-description {
  padding: var(--spacing-md);
  background: white;
  border-radius: var(--radius-md);
  color: var(--text-regular);
  line-height: 1.8;
  border: 1px solid var(--border-light);
}

.detail-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-light);
}

.detail-actions .el-button {
  min-width: 120px;
}
</style>

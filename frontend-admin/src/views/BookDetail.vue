<template>
  <div class="book-detail-page">
    <div class="page-header">
      <div class="page-title">
        <el-icon><View /></el-icon>
        <h2>图书详情</h2>
      </div>
      <div class="page-actions">
        <el-button type="danger" :icon="Delete" @click="handleDelete">
          删除
        </el-button>
        <el-button :icon="Edit" @click="handleEdit">
          编辑
        </el-button>
        <el-button :icon="Back" @click="router.push('/main/books')">
          返回列表
        </el-button>
      </div>
    </div>

    <div v-if="pageLoading" class="loading-section">
      <el-skeleton :rows="10" animated />
    </div>

    <div v-else class="detail-section">
      <el-card class="detail-card">
        <template #header>
          <div class="card-header">
            <el-icon><Document /></el-icon>
            <span>基本信息</span>
          </div>
        </template>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="图书ID">
            {{ book.id }}
          </el-descriptions-item>
          <el-descriptions-item label="书名">
            <span class="book-title">{{ book.title }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="作者">
            {{ book.author }}
          </el-descriptions-item>
          <el-descriptions-item label="出版社">
            {{ book.publisher }}
          </el-descriptions-item>
          <el-descriptions-item label="分类">
            <el-tag :type="getCategoryType(book.category)" effect="light">
              {{ book.category }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="出版日期">
            {{ book.publishDate }}
          </el-descriptions-item>
          <el-descriptions-item label="价格">
            <span class="price-text">¥{{ book.price.toFixed(2) }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="库存">
            <el-tag :type="book.stock < 50 ? 'danger' : 'success'" effect="plain">
              {{ book.stock }} 本
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="ISBN">
            {{ book.isbn }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card class="detail-card">
        <template #header>
          <div class="card-header">
            <el-icon><Document /></el-icon>
            <span>图书简介</span>
          </div>
        </template>
        <div class="description-content">
          {{ book.description || '暂无简介' }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { View, Back, Edit, Delete, Document } from '@element-plus/icons-vue'
import { useBookStore } from '@/stores/book'

const router = useRouter()
const route = useRoute()
const bookStore = useBookStore()

const pageLoading = ref(true)

const book = reactive({
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
      Object.assign(book, bookData)
    } else {
      ElMessage.error('图书不存在')
      router.push('/main/books')
    }
  } catch (error) {
    ElMessage.error('加载图书详情失败')
    router.push('/main/books')
  } finally {
    pageLoading.value = false
  }
}

const handleEdit = () => {
  router.push(`/main/books/edit/${book.id}`)
}

const handleDelete = async () => {
  try {
    await ElMessageBox.confirm(
      `确定要删除图书《${book.title}》吗？此操作不可恢复！`,
      '删除确认',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      }
    )
    await bookStore.deleteBook(book.id, book.title)
    router.push('/main/books')
  } catch (error) {
    // 用户取消
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

.page-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.loading-section {
  padding: var(--spacing-xl);
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.detail-card {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: 600;
  color: var(--text-primary);
}

.card-header .el-icon {
  color: var(--primary-color);
}

.book-title {
  font-weight: 600;
  color: var(--text-primary);
}

.price-text {
  color: var(--danger-color);
  font-weight: 600;
  font-size: 16px;
}

.description-content {
  color: var(--text-regular);
  line-height: 1.8;
  padding: var(--spacing-md) 0;
  min-height: 100px;
}
</style>

<template>
  <div class="book-detail-page">
    <div class="page-header">
      <div class="page-title">
        <el-icon><Document /></el-icon>
        <h2>图书详情</h2>
      </div>
      <div class="header-actions">
        <el-button :icon="Delete" type="danger" plain @click="handleDelete">
          删除图书
        </el-button>
        <el-button :icon="Edit" type="primary" plain @click="handleEdit">
          编辑图书
        </el-button>
        <el-button :icon="Back" @click="router.push('/main/books')">
          返回列表
        </el-button>
      </div>
    </div>

    <div v-if="pageLoading" class="loading-section">
      <el-skeleton :rows="15" animated />
    </div>

    <div v-else-if="bookInfo" class="detail-content">
      <div class="detail-card">
        <h3 class="card-title">基本信息</h3>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="图书ID">
            {{ bookInfo.id }}
          </el-descriptions-item>
          <el-descriptions-item label="书名">
            <span class="book-title-text">{{ bookInfo.title }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="作者">
            {{ bookInfo.author }}
          </el-descriptions-item>
          <el-descriptions-item label="出版社">
            {{ bookInfo.publisher }}
          </el-descriptions-item>
          <el-descriptions-item label="分类">
            <el-tag :type="getCategoryType(bookInfo.category)" effect="light">
              {{ bookInfo.category }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="出版日期">
            {{ bookInfo.publishDate }}
          </el-descriptions-item>
          <el-descriptions-item label="ISBN">
            {{ bookInfo.isbn }}
          </el-descriptions-item>
          <el-descriptions-item label="价格">
            <span class="price-text">¥{{ bookInfo.price.toFixed(2) }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="库存数量" :span="2">
            <el-tag :type="bookInfo.stock < 50 ? 'danger' : 'success'" effect="plain">
              {{ bookInfo.stock }} 本
            </el-tag>
            <span v-if="bookInfo.stock < 50" class="stock-warning">（库存不足，建议补货）</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="detail-card">
        <h3 class="card-title">图书简介</h3>
        <div class="description-content">
          <p v-if="bookInfo.description">{{ bookInfo.description }}</p>
          <el-empty v-else description="暂无简介" :image-size="80" />
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
const bookInfo = ref(null)

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
    const book = await bookStore.getBookById(bookId)
    if (book) {
      bookInfo.value = book
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
  router.push(`/main/books/edit/${bookInfo.value.id}`)
}

const handleDelete = async () => {
  try {
    await ElMessageBox.confirm(
      `确定要删除图书《${bookInfo.value.title}》吗？此操作不可恢复！`,
      '删除确认',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      }
    )
    const success = await bookStore.deleteBook(bookInfo.value.id, bookInfo.value.title)
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
  gap: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-title .el-icon {
  font-size: 24px;
  color: #409eff;
}

.page-title h2 {
  font-size: 20px;
  font-weight: 600;
  color: #262626;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.loading-section {
  padding: 32px;
}

.detail-card {
  background: #fafafa;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid #f0f0f0;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.book-title-text {
  font-weight: 600;
  color: #262626;
}

.price-text {
  color: #f56c6c;
  font-weight: 600;
  font-size: 16px;
}

.stock-warning {
  color: #f56c6c;
  font-size: 12px;
  margin-left: 8px;
}

.description-content {
  min-height: 80px;
  line-height: 1.8;
  color: #595959;
}

.description-content p {
  margin: 0;
  text-indent: 2em;
}

:deep(.el-descriptions__label) {
  background: #fff !important;
  font-weight: 600;
  width: 100px;
}

:deep(.el-descriptions__body .el-descriptions__table .el-descriptions__cell) {
  padding: 12px 16px;
}
</style>

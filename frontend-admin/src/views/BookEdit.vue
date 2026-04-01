<template>
  <div class="book-edit-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="page-title">
        <el-icon><Edit /></el-icon>
        <h2>编辑图书</h2>
      </div>
      <el-button :icon="Back" @click="router.push('/main/books')">
        返回列表
      </el-button>
    </div>

    <!-- 加载状态 -->
    <div v-if="pageLoading" class="loading-section">
      <el-skeleton :rows="10" animated />
    </div>

    <!-- 表单区域 -->
    <div v-else class="form-section">
      <el-form
        ref="formRef"
        :model="bookForm"
        :rules="formRules"
        label-width="100px"
        class="book-form"
        @submit.prevent="handleSubmit"
      >
        <div class="form-group">
          <h3 class="form-group-title">基本信息</h3>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="12">
              <el-form-item label="图书ID">
                <el-input v-model="bookForm.id" disabled>
                  <template #prefix>
                    <el-icon><Document /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :xs="24" :sm="12">
              <el-form-item label="书名" prop="title">
                <el-input
                  v-model="bookForm.title"
                  placeholder="请输入书名"
                  maxlength="50"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="作者" prop="author">
                <el-input
                  v-model="bookForm.author"
                  placeholder="请输入作者"
                  maxlength="30"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :xs="24" :sm="12">
              <el-form-item label="出版社" prop="publisher">
                <el-select v-model="bookForm.publisher" placeholder="请选择出版社" style="width: 100%">
                  <el-option label="人民出版社" value="人民出版社" />
                  <el-option label="清华大学出版社" value="清华大学出版社" />
                  <el-option label="机械工业出版社" value="机械工业出版社" />
                  <el-option label="电子工业出版社" value="电子工业出版社" />
                  <el-option label="北京大学出版社" value="北京大学出版社" />
                  <el-option label="高等教育出版社" value="高等教育出版社" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="分类" prop="category">
                <el-select v-model="bookForm.category" placeholder="请选择分类" style="width: 100%">
                  <el-option label="计算机" value="计算机" />
                  <el-option label="文学" value="文学" />
                  <el-option label="历史" value="历史" />
                  <el-option label="科学" value="科学" />
                  <el-option label="艺术" value="艺术" />
                  <el-option label="经济" value="经济" />
                  <el-option label="教育" value="教育" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-group">
          <h3 class="form-group-title">详细信息</h3>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="12">
              <el-form-item label="价格" prop="price">
                <el-input-number
                  v-model="bookForm.price"
                  :min="0"
                  :max="9999"
                  :precision="2"
                  :step="1"
                  placeholder="请输入价格"
                  style="width: 100%"
                  controls-position="right"
                />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="库存" prop="stock">
                <el-input-number
                  v-model="bookForm.stock"
                  :min="0"
                  :max="99999"
                  :step="1"
                  placeholder="请输入库存"
                  style="width: 100%"
                  controls-position="right"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :xs="24" :sm="12">
              <el-form-item label="ISBN" prop="isbn">
                <el-input
                  v-model="bookForm.isbn"
                  placeholder="如：978-7-1234-5678-9"
                  maxlength="20"
                />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="出版日期" prop="publishDate">
                <el-date-picker
                  v-model="bookForm.publishDate"
                  type="date"
                  placeholder="请选择出版日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="简介" prop="description">
                <el-input
                  v-model="bookForm.description"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入图书简介（选填）"
                  maxlength="500"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-actions">
          <el-button
            type="primary"
            size="large"
            :icon="Check"
            :loading="loading"
            @click="handleSubmit"
          >
            {{ loading ? '保存中...' : '保存修改' }}
          </el-button>
          <el-button size="large" :icon="RefreshLeft" @click="handleReset">
            重置修改
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Edit, Back, Check, RefreshLeft, Document } from '@element-plus/icons-vue'
import { useBookStore } from '@/stores/book'

const router = useRouter()
const route = useRoute()
const bookStore = useBookStore()

const formRef = ref(null)
const loading = ref(false)
const pageLoading = ref(true)

let originalData = null

const bookForm = reactive({
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

const formRules = {
  title: [
    { required: true, message: '请输入书名', trigger: 'blur' },
    { min: 1, max: 50, message: '书名长度在 1 到 50 个字符', trigger: 'blur' }
  ],
  author: [
    { required: true, message: '请输入作者', trigger: 'blur' },
    { min: 1, max: 30, message: '作者名长度在 1 到 30 个字符', trigger: 'blur' }
  ],
  publisher: [
    { required: true, message: '请选择出版社', trigger: 'change' }
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
  price: [
    { required: true, message: '请输入价格', trigger: 'blur' },
    { type: 'number', min: 0, message: '价格不能为负数', trigger: 'blur' }
  ],
  stock: [
    { required: true, message: '请输入库存', trigger: 'blur' },
    { type: 'number', min: 0, message: '库存不能为负数', trigger: 'blur' }
  ],
  isbn: [
    { required: true, message: '请输入ISBN', trigger: 'blur' },
    { pattern: /^\d{3}-\d{1}-\d{4}-\d{4}-\d$/, message: 'ISBN格式不正确，如：978-7-1234-5678-9', trigger: 'blur' }
  ],
  publishDate: [
    { required: true, message: '请选择出版日期', trigger: 'change' }
  ]
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
      Object.assign(bookForm, book)
      originalData = { ...book }
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

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) return

    try {
      await ElMessageBox.confirm(
        '确定要保存对这本图书的修改吗？',
        '修改确认',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )

      loading.value = true
      const success = await bookStore.updateBook({ ...bookForm })

      if (success) {
        router.push('/main/books')
      }
    } catch (error) {
      // 用户取消
    } finally {
      loading.value = false
    }
  })
}

const handleReset = () => {
  if (originalData) {
    Object.assign(bookForm, originalData)
  }
}

onMounted(() => {
  loadBookData()
})
</script>

<style scoped>
.book-edit-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* 页面标题 */
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
  color: var(--warning-color);
}

.page-title h2 {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

/* 加载状态 */
.loading-section {
  padding: var(--spacing-xl);
}

/* 表单区域 */
.form-section {
  max-width: 900px;
  margin: 0 auto;
}

.form-group {
  background: var(--bg-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  border: 1px solid var(--border-light);
}

.form-group-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-md) 0;
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-light);
}

.book-form :deep(.el-form-item__label) {
  font-weight: 500;
  color: var(--text-regular);
}

.book-form :deep(.el-form-item__error) {
  white-space: nowrap;
  overflow: visible;
}

.book-form :deep(.el-input__wrapper),
.book-form :deep(.el-textarea__inner),
.book-form :deep(.el-select .el-input__wrapper) {
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.book-form :deep(.el-input__wrapper:hover),
.book-form :deep(.el-select .el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px var(--primary-color) inset;
}

.book-form :deep(.el-input-number) {
  width: 100%;
}

/* 表单操作按钮 */
.form-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-light);
}

.form-actions .el-button {
  min-width: 140px;
  transition: all var(--transition-fast);
}

.form-actions .el-button:hover {
  transform: translateY(-1px);
}
</style>

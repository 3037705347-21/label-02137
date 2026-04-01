<template>
  <div class="book-list-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="page-title">
        <el-icon><Document /></el-icon>
        <h2>图书列表</h2>
      </div>
      <el-button type="primary" :icon="Plus" @click="router.push('/main/books/add')">
        添加图书
      </el-button>
    </div>

    <!-- 搜索区域 -->
    <div class="search-section">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="书名">
          <el-input
            v-model="searchForm.title"
            placeholder="请输入书名关键词"
            clearable
            :prefix-icon="Search"
            @keyup.enter="handleSearch"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="作者">
          <el-input
            v-model="searchForm.author"
            placeholder="请输入作者姓名"
            clearable
            :prefix-icon="User"
            @keyup.enter="handleSearch"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch" :loading="bookStore.loading">
            搜索
          </el-button>
          <el-button :icon="Refresh" @click="handleReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格区域 -->
    <div class="table-section">
      <el-table
        :data="bookStore.books"
        v-loading="bookStore.loading"
        stripe
        style="width: 100%"
        :header-cell-style="{ background: '#fafafa', color: '#262626', fontWeight: '600' }"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="id" label="ID" width="70" align="center" />
        <el-table-column prop="title" label="书名" min-width="150" show-overflow-tooltip>
          <template #default="{ row }">
            <span class="book-title">{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="100" align="center" />
        <el-table-column prop="publisher" label="出版社" width="140" show-overflow-tooltip />
        <el-table-column prop="category" label="分类" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="getCategoryType(row.category)" size="small" effect="light">
              {{ row.category }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" width="90" align="center">
          <template #default="{ row }">
            <span class="price-text">¥{{ row.price.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.stock < 50 ? 'danger' : 'success'" size="small" effect="plain">
              {{ row.stock }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="publishDate" label="出版日期" width="110" align="center" />
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template #default="{ row }">
            <el-tooltip content="查看" placement="top">
              <el-button
                type="info"
                size="small"
                :icon="View"
                @click="handleView(row)"
                circle
                plain
              />
            </el-tooltip>
            <el-tooltip content="编辑" placement="top">
              <el-button
                type="primary"
                size="small"
                :icon="Edit"
                @click="handleEdit(row)"
                circle
                plain
              />
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                type="danger"
                size="small"
                :icon="Delete"
                @click="handleDelete(row)"
                circle
                plain
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页区域 -->
    <div class="pagination-section">
      <div class="pagination-info">
        共 <span class="total-count">{{ bookStore.total }}</span> 条记录
      </div>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        :total="bookStore.total"
        layout="sizes, prev, pager, next, jumper"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { Document, Plus, Search, Refresh, Edit, Delete, User, View } from '@element-plus/icons-vue'
import { useBookStore } from '@/stores/book'

const router = useRouter()
const bookStore = useBookStore()

const searchForm = ref({
  title: '',
  author: ''
})

const currentPage = ref(1)
const pageSize = ref(10)

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

const tableRowClassName = ({ rowIndex }) => {
  return rowIndex % 2 === 0 ? '' : 'stripe-row'
}

const handleSearch = () => {
  bookStore.setSearchParams({
    title: searchForm.value.title,
    author: searchForm.value.author
  })
  currentPage.value = 1
  bookStore.fetchBooks()
}

const handleReset = () => {
  searchForm.value = { title: '', author: '' }
  bookStore.resetSearch()
  currentPage.value = 1
  bookStore.fetchBooks()
}

const handleView = (row) => {
  router.push(`/main/books/detail/${row.id}`)
}

const handleEdit = (row) => {
  router.push(`/main/books/edit/${row.id}`)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除图书《${row.title}》吗？此操作不可恢复！`,
      '删除确认',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      }
    )
    await bookStore.deleteBook(row.id, row.title)
  } catch (error) {
    // 用户取消
  }
}

const handleSizeChange = (size) => {
  bookStore.setPageSize(size)
  bookStore.fetchBooks()
}

const handleCurrentChange = (page) => {
  bookStore.setPage(page)
  bookStore.fetchBooks()
}

onMounted(() => {
  bookStore.fetchBooks()
})

watch(() => bookStore.currentPage, (val) => {
  currentPage.value = val
})

watch(() => bookStore.pageSize, (val) => {
  pageSize.value = val
})
</script>

<style scoped>
.book-list-page {
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
  color: var(--primary-color);
}

.page-title h2 {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

/* 搜索区域 */
.search-section {
  background: var(--bg-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  border: 1px solid var(--border-light);
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.search-form :deep(.el-form-item) {
  margin-bottom: 0;
}

.search-form :deep(.el-form-item__label) {
  color: var(--text-regular);
  font-weight: 500;
}

/* 表格区域 */
.table-section {
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.table-section :deep(.el-table) {
  --el-table-border-color: var(--border-light);
}

.table-section :deep(.el-table th.el-table__cell) {
  padding: 14px 0;
  font-size: var(--font-size-sm);
}

.table-section :deep(.el-table td.el-table__cell) {
  padding: 12px 0;
}

.book-title {
  color: var(--text-primary);
  font-weight: 500;
}

.price-text {
  color: var(--danger-color);
  font-weight: 600;
}

.table-section :deep(.el-button.is-circle) {
  transition: all var(--transition-fast);
}

.table-section :deep(.el-button.is-circle:hover) {
  transform: scale(1.1);
}

/* 分页区域 */
.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
}

.pagination-info {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.total-count {
  color: var(--primary-color);
  font-weight: 600;
}

.pagination-section :deep(.el-pagination) {
  flex-wrap: wrap;
  justify-content: flex-end;
}
</style>

import request from './request'

export const bookApi = {
  // 获取图书列表
  getList(params) {
    return request.get('/books', { params })
  },

  // 获取单本图书
  getById(id) {
    return request.get(`/books/${id}`)
  },

  // 添加图书
  add(data) {
    return request.post('/books', data)
  },

  // 更新图书
  update(data) {
    return request.put(`/books/${data.id}`, data)
  },

  // 删除图书
  delete(id) {
    return request.delete(`/books/${id}`)
  }
}

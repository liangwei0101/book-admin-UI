import request from '@/utils/request'

export function getAllBookInfo() {
  return request({
    url: '/book',
    method: 'get'
  })
}

export function getBookById(id) {
  return request({
    url: '/book',
    method: 'get',
    params: { id }
  })
}

export function addBook(book) {
  return request({
    url: '/book/add',
    method: 'post',
    params: book
  })
}


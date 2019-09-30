import request from '@/utils/request'
export function login(params) {
  return request({
    url: '/login',
    method: 'post',
      params
  })
}

export function getInfo() {
  return request({
    url: '/user/getUser',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getPage(params) {
    return request({
        url: '/user/list',
        method: "get",
        params
    })
}

export function batchDelete(data) {
    return request({
        url: '/user',
        method: 'DELETE',
        data
    })
}

export function save(data){
    return request({
        url: '/user',
        method : "POST",
        data
    })
}

export function update(data){
    return request({
        url : '/user',
        method : "PUT",
        data
    })
}

export function getAllRoles(){
    return request({
        url : "/role",
        method : "GET"
    })
}

export function getUserById(id){
    return request({
        url : "/user/"+id,
        method : "GET"
    })
}

export function batchReset(data){
    return request({
        url : "/user/reset",
        method : "PUT",
        data
    })
}

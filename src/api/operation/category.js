import request from '@/utils/request'

export function getPage(params) {
    return request({
        url: '/admin/operation/category/list',
        method: 'get',
        params: params
    })
}

export function getinfo(id) {
    return request({
        url: '/admin/operation/category/info/'+id,
        method: 'get'
    })
}

export function save(query) {
    return request({
        url: '/admin/operation/category/save',
        method: 'Post',
        data: query
    })
}

export function update(query) {
    return request({
        url: '/admin/operation/category/update',
        method: 'PUT',
        data: query
    })
}

export function batchDelete(query) {
    return request({
        url: '/admin/operation/category/delete',
        method: 'DELETE',
        data: query
    })
}

export function select(type) {
    return request({
        url: '/admin/operation/category/select/'+type,
        method: 'get',
    })
}

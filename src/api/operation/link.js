import request from '@/utils/request'

export function getPage(params) {
    return request({
        url: '/admin/operation/link/list',
        method: 'get',
        params
    })
}

export function getinfo(id) {
    return request({
        url: '/admin/operation/link/info/'+id,
        method: 'get'
    })
}

export function save(query) {
    return request({
        url: '/admin/operation/link/save',
        method: 'Post',
        data: query
    })
}

export function update(query) {
    return request({
        url: '/admin/operation/link/update',
        method: 'PUT',
        data: query
    })
}

export function batchDelete(data) {
    return request({
        url: '/admin/operation/link/delete',
        method: 'DELETE',
        data
    })
}

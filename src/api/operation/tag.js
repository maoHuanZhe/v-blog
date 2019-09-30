import request from '@/utils/request'

export function getPage(params) {
    return request({
        url: '/admin/operation/tag/list',
        method: 'get',
        params: params
    })
}

export function getinfo(id) {
    return request({
        url: '/admin/operation/tag/info/'+id,
        method: 'get'
    })
}

export function save(query) {
    return request({
        url: '/admin/operation/tag/save',
        method: 'Post',
        data: query
    })
}

export function update(query) {
    return request({
        url: '/admin/operation/tag/update',
        method: 'PUT',
        data: query
    })
}

export function batchDelete(query) {
    return request({
        url: '/admin/operation/tag/delete',
        method: 'DELETE',
        data: query
    })
}

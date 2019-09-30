import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// 创建一个axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: 'http://localhost:8080/blog', // url = base url + request url
  withCredentials: true, // 跨域请求时发送Cookie
  timeout: 5000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做一些事情

    if (store.getters.token) {
        // 让每个请求都带有令牌
      // ['X-Token'] 是自定义标题键
      //请根据实际情况进行修改
      // config.headers['sid'] = getToken()
      //   config.headers.cookie.push('sid',getToken());
    }
    return config
  },
  error => {
    // 请求出错时做一些事情
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果要获取http信息（例如标题或状态）
   * 请返回  response => response
  */

  /**
   * 通过自定义代码确定请求状态
   * 这只是一个例子
   * 您还可以通过HTTP状态代码来判断状态
   */
  response => {
    const res = response.data

    // 如果自定义代码不是200，则将其判断为错误
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 500: 系统内部错误; 404: 路径不存在; 403: 没有权限;
      // if (res.code === 500 || res.code === 404 || res.code === 403) {
      //   // to re-login
      //   MessageBox.confirm('您已注销，可以取消以保留在该页面上，或者再次登录', '确认登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '关闭',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

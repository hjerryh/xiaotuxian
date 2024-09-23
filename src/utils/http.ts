/**
 *  添加拦截器
 *  拦截request 请求
 * 拦截uploadFile 上传文件
 *
 * TODO：
 * 1. 非http 开头需拼接地址
 * 2. 请求超时
 * 3. 添加小程序端请求标识
 * 4. 添加token 请求头标识
 */

import { useMemberStore } from "@/stores"

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加请求拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 非http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 超时
    options.timeout = 10000
    // 添加小程序端请求标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 添加token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header = {
        ...options.header,
        authorization: `${token}`,
      }
    }
    console.log('options', options)
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 请求函数
 * 1. 返回promise 对象
 * 2. 请求成功
 *  2.1 提取核心数据 res.data
 *  2.2 添加类型，支持泛型
 * 3. 请求失败
 *  3.1 网络错误 -> 提示用户换网络
 *  3.2 401 错误 -> 清理用户信息，跳转登录页
 *  3.3 其他错误 -> 根据后端错误信息轻提示
 */
interface Data<T> {
  code: string
  msg: string
  result: T
}
export const http = <T>(option: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...option,
      // 请求成功
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 401 错误 -> 清理用户信息，跳转登录页
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({
            url: '/pages/login/login',
          })
          reject(res)
        } else {
          // 其他错误
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({
          icon: 'none',
          title: '网络错误， 请换个网络试试',
        })
        reject(err)
      },
    })
  })
}

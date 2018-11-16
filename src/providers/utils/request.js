import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/providers/store'
import { getToken } from '@/providers/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // Add the X-Token (session id) to the request for private routes
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,
  /**
   * The following comment indicates that the request status is indicated by a
   * custom code in the response.
   * When the code returns the following, it indicates that there is a
   * problem with the permissions, log out and return to the login page.
   * If you want to use xmlhttprequest to identify the status code, the
   * logic can be written in the following error
   *
   * The following codes are examples, please modify them in combination
   * with self-generated requirements, if you don't need them, you can delete them.
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'OK logout', {
  //         confirmButtonText: 'Login again',
  //         cancelButtonText: 'Cancel',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // To reload the vue-router to avoid bugs
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

// import router from '@/router'
import axios from 'axios'
// import Qs from 'qs'
import { Observable } from 'rxjs'
import { LoadingService } from "@/utils/loading.service";
import { netParamConfig } from '@/interfaces/net.config'
// import { Message, MessageBox, Notification, Loading } from 'element-ui'

const getType = ['GET', 'DELETE'] // 使用GET请求类型
export default class NetService {
  private axiosInstance:any

  constructor () {
    this.axiosInstance = axios.create({ timeout: 3000 })
  }

  /**
   * 过滤空数据
   * @param data
   */
  private filterEmptyData (data:any) {
    Object.entries(data)
      .filter(([key, value]) => {
        // 过滤空字符串
        if (value === undefined || value === '') return true
        // 过滤空数组
        if (value instanceof Array && (value.length === 0 || value.every(x => x === ''))) return true
      })
      .forEach(([key, value]) => {
        delete data[key]
      })
    return data
  }

  /**
   * 发送网络请求信息
   * @param param0
   */
  public send (options: netParamConfig): Observable<any> {
    let data = Object.assign({}, options.data) // 拷贝需要发送的数据
    let postData:any // 定义请求体中的参数
    let getData:any // 定义拼接url后面的参数
    let url:string = options.url // 定义请求地址
    let method = options.method || 'GET' // 初始化请求方式
    // 判断参数类型
    getType.indexOf(method) > -1 ? (getData = this.filterEmptyData(data)) : (postData = data)

    //初始化loading（loading当参数传入）
    let loadingPromise = new Promise((resolve, reject) => {
      if (options.loading) {
        let loading = LoadingService.show();
        resolve(loading)
      } else {
        resolve()
      }
    })

    // 发送通讯结果
    let emitResult = (fn) => {
      return function (loading) {
        if (loading) loading.remove()
        if (fn && typeof fn === 'function') fn.call(this)
      }
    }
    // 创建待观察对象
    var observable = Observable.create((observer:any) => {
      this.axiosInstance.request({
        method,
        url,
        data: postData,
        params: getData
        // paramsSerializer: (params:any) =>
        //   Qs.stringify(params)
      }).then(({ data }:any) => {
        if(data.status) {
          loadingPromise.then(emitResult(() => {
            observer.next(data)
          }))
        }else{
          loadingPromise.then(emitResult(() => {
            observer.error()
          }))
        }
      }).catch(this.catchHandle(options, observer))
    })

    return observable
  }
  // 异常处理后续添加
  private catchHandle (options:any, observer:any) {
    return (ex) => {
      observer.error(ex)
    }
  }
}

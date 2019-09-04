import NetService from '@/utils/net.service'
import { requestType } from '@/interfaces/enum.config'
import { netParamConfig } from '@/interfaces/net.config'
import { Observable } from 'rxjs'

const netServer = new NetService()
export default {
  login: function (model):Observable<any> {
    const option:netParamConfig = {
      url: '/default/login',
      method: requestType.Post,
      loading: true,
      data: {
        username:model.username,
        password:model.password
      }
    }
    return netServer.send(option)
  },
  register: function (model):Observable<any> {
    const option:netParamConfig = {
      url: '/default/register',
      method: requestType.Post,
      loading: true,
      data: {
        username:model.username,
        password:model.password
      }
    }
    return netServer.send(option)
  }
}

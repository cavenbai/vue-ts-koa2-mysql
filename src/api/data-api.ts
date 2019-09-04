import NetService from '@/utils/net.service'
import { requestType } from '@/interfaces/enum.config'
import { netParamConfig } from '@/interfaces/net.config'
import { Observable } from 'rxjs'

const netServer = new NetService()
export default {
  getConfiguration: function ():Observable<any> {
    const option:netParamConfig = {
      url: '/default/1',
      method: requestType.Get,
      loading: true
    }
    return netServer.send(option)
  }
}

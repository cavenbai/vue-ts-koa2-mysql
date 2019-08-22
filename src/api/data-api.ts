import NetService from '@/utils/net.service'
import { requestType } from '@/interfaces/enum.config'

const netServer = new NetService()
export default {
  getConfiguration: function () {
    const option:object = {
      url: '/default/1',
      method: requestType.Get
    }
    return netServer.send(option)
  }
}

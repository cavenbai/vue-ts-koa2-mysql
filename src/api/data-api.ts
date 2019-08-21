import NetService from '@/utils/net.service'
import { requestType } from '@/interfaces/enum.config'

const netServer = new NetService()
export default  {

  getConfiguration:function () {
    const option:object = {
      url : '/api/v1/config',
      method : requestType.Get
    }
    return netServer.send(option);
  },

  searchDevices:function () {
    const option:object = {
      url : '/api/v1/devices/_search',
      method : requestType.Post
    }
    return netServer.send(option);
  },

  getDevices:function () {
    const option:object = {
      url : '/api/v1/devices',
      method : requestType.Get
    }
    return netServer.send(option);
  },

  getVideoConfig:function () {
    const option:object = {
      url : '/info',
      method : requestType.Get,
      data: {
        t: new Date().getTime()
      }
    }
    return netServer.send(option);
  },

  getStatus:function () {
    const option:object = {
      url : '/api/v1/status',
      method : requestType.Get,
    }
    return netServer.send(option);
  },

  setPicturePreview:function (uuid:string, on:boolean) {
    const option:object = {
      url : `/api/v1/preview/${uuid}`,
      method : requestType.Put,
      data: {
        type: "picture",
        action: on === true ? "on" : "off"
      }
    }
    return netServer.send(option);
  },

  getDevice:function (uuid:string) {
    const option:object = {
      url : `/api/v1/devices/${uuid}`,
      method : requestType.Get,
    }
    return netServer.send(option);
  },

  setUsernameAndPassword:function (uuid, user, pwd) {
    const option:object = {
      url : `/api/v1/devices/${uuid}`,
      method : requestType.Patch,
      data: {
        username: user,
        password: pwd
      }
    }
    return netServer.send(option);
  },

  setVideoPreview:function (uuid:string, on:boolean) {
    const option:object = {
      url : `/api/v1/preview/${uuid}`,
      method : requestType.Put,
      data: {
        type: "video",
        action: on === true ? "on" : "off"
      }
    }
    return netServer.send(option);
  },

  modifyDevice:function (uuid:string,  param:object) {
    const option:object = {
      url : `/api/v1/devices/${uuid}`,
      method : requestType.Patch,
      data: {
        param:param
      }
    }
    return netServer.send(option);
  },

  activeDevice:function (uuid) {
    const option:object = {
      url : '/api/v1/devices',
      method : requestType.Post,
      data: {
        uuid:uuid,
      }
    }
    return netServer.send(option);
  },

  setVideoRecord:function (uuid:string, on:boolean) {
    const option:object = {
      url : `/api/v1/videos/${uuid}`,
      method : requestType.Put,
      data: {
        action: on === true ? "on" : "off"
      }
    }
    return netServer.send(option);
  },

  switchDeviceVoice:function (uuid:string, state:string) {
    const option:object = {
      url : `/api/v1/devices/offlineaudio${uuid}`,
      method : requestType.Post,
      data: {
        offlineaudio: state + ''
      }
    }
    return netServer.send(option);
  },
}

<template>
  <div>
    <el-row class="toolbar">
      <el-col :span="24">
        <div style="text-align: left;margin-bottom:20px">
          <span class="camera-label">摄像头列表</span>
          <span class="camera-count">激活数: {{activedCount}}</span>
          <span class="camera-count">在线数: {{onlineCount}}</span>
          <span class="camera-count">录制数: {{recordingCount}}</span>
        </div>
      </el-col>
      <el-col :span="24" v-for="device in devices" :key="device.mac">
        <Device :device="device" :config="config"/>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Prop, Watch, Component, Vue } from 'vue-property-decorator'
import Device from './Device.vue'

@Component({ components: { Device } })
export default class Home extends Vue {
  @Prop({ type: Array }) private devices!:Array<any> | null
  @Prop({ type: Object, default: () => {} }) private config!:object
  get activedCount () {
    return this.devices ? this.devices.length : 0
  }
  get onlineCount () {
    if (!this.devices) return 0
    let count = 0
    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i].state !== 0) {
        count++
      }
    }
    return count
  }
  get recordingCount () {
    if (!this.devices) return 0
    let count = 0
    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i].state === 1) {
        count++
      }
    }
    return count
  }
}
</script>
<style lang="less" scoped>
.camera-label {
  display: inline;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #8c8d8d;
  text-align: left;
  margin-right: 15px;
}
.camera-count {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #0e0e0e;
  text-align: left;
  margin-right: 15px;
}
</style>

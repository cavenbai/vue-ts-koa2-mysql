<template>
  <el-container
    v-loading.fullscreen.lock="loading"
    element-loading-text="正在连接服务"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-header>
      <img class="logo-img" :src="require('@/assets/images/logo.png')"/>
      <span style="font-size:20px;vertical-align:middle;">安防采集工具 v{{status.version}}</span>
    </el-header>
    <el-main>
      <el-row class="nvr-content">
        <ToolBar :config="config" :devices="devices" :status="status" :video-config="videoConfig"/>
        <div class="split-line"></div>
        <DeviceContent :config="config" :devices="devices" />
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ToolBar from '@/components/ToolBar.vue'
import DeviceContent from '@/components/DeviceContent.vue'
import DataAPi from '@/api/data-api'

@Component({
  components: {
    ToolBar,
    DeviceContent,
  }
})
export default class Home extends Vue {
  private config:object = { tag_options: [], scene_json: [] }
  private videoConfig:Array<any>= []
  private devices:Array<any> = []
  private status:object = {}
  private loading:boolean = false

  private mounted () {
    this.updateDevices()
    setTimeout(() => { this.updateDevices() }, 3000)
    // 更新配置信息
    this.updateConfiguration()
    // 更新NVR设备信息
    this.updateNVRStatus()
    setInterval(() => { this.updateNVRStatus() }, 5000)
    this.$on('change-device', () => {
      this.updateDevices()
    })
  }
  private beforeDestroy () {
    this.$off()
  }
  private updateDevices () {
    DataAPi.getDevices().subscribe(data => {
      this.devices = data
      this.loading = false
    })

    DataAPi.getVideoConfig().subscribe(data => {
      if (this.$common.isArray(data)) {
        this.videoConfig = data
      }
    })
  }
  private updateConfiguration () {
    DataAPi.getConfiguration().subscribe(data => {
      this.config = data
    })
  }
  private updateNVRStatus () {
    DataAPi.getStatus().subscribe(data => {
      this.status = data
    })
  }
}
</script>
<style lang="less" scoped>
  .el-container {
    margin-bottom: 40px;
    .el-header {
      background-color: #464646;
      color: #ffffff;
      text-align: left;
      line-height: 60px;
      height: 83px;
      .logo-img {
        vertical-align: middle;
        margin: 0 20px 0 20px;
      }
    }
    .el-main {
      background-color: #f0f2f5;
      color: #333;
      text-align: center;
    }
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .split-line {
    margin: 20px 0;
    border: 1px solid #eee;
  }

  .nvr-content {
    padding: 40px 40px 40px;
    background-color: #ffffff;
  }
</style>

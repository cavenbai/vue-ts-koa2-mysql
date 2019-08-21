<template>
  <div class="default">
    <!-- 摄像头登录信息输入对话框 -->
    <el-dialog title="请输入摄像头登录信息" :visible.sync="dialogLoginFormVisible" append-to-body width="500px">
      <el-form :model="loginForm" label-width="80px" size="mini">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLoginFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="setCameraLoginInfo" size="mini">确 定</el-button>
      </div>
    </el-dialog>

    <!-- Main -->
    <el-row>
      <el-col :span="isNew?12:24">
        <el-table ref="devices" :data="devices" tooltip-effect="dark" @selection-change="handleSelectionChange" empty-text="没找到设备">
          <el-table-column v-if="isNew" type="selection" width="30" :selectable="isLogined"></el-table-column>
          <el-table-column align="center" prop="camera_name" label="摄像头名称" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="ip_addr" label="IP" width="150"></el-table-column>
          <el-table-column v-if="isNew" align="center" width="80">
            <template slot-scope="scope">
              <el-button @click="showPictureView(scope.row)" size="small">预览</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col v-if="isNew" :span="12">
        <h4>{{selectedDevice.camera_name}}</h4>
        <div @dblclick="openVideoPreview" class="previewimg">
          <img :src="realPicturePreviewURL" width="320px">
        </div>
        <p>{{selectedDevice.ip_addr}}</p>
      </el-col>
    </el-row>
    <el-row v-if="isNew">
      <el-button v-if="isNew" type="text" @click="activeDevices">激活选中摄像头<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import DataAPi from '@/api/data-api'
import { Prop, Emit, Watch, Component, Vue } from 'vue-property-decorator'

@Component
export default class DevicesTable extends Vue {
  @Prop({ default: false }) private isNew!:boolean
  @Prop({ default: () => [] }) private devices!:Array<any>
  @Emit('active-devices-event')
  private emitActive (list) {}
  private realPicturePreviewURL = require('../assets/images/offline.png')
  private selectedDevice:object = {
    uuid: '',
    mac_addr: '',
    ip_addr: '',
    camera_name: '未选择',
    custom_tags: []
  }
  private curDeviceIdx:number = 0
  private previewTimer = null
  private waitActivingDevices:any[] = []
  private dialogLoginFormVisible:boolean = false
  private loginForm:object = {
    username: 'admin',
    password: 'megvii123'
  }
  private playPicturePreview (uuid) {
    if (this.previewTimer !== null) return
    this.previewTimer = setInterval(() => {
      let ts = new Date().getTime()
      this.realPicturePreviewURL = `/api/v1/picture-preview/${uuid}.jpg?${ts}`
    }, 300)
  }
  private showPictureView (device) {
    clearInterval(this.previewTimer)
    this.previewTimer = null
    this.selectedDevice = device
    DataAPi.getDevice(device.uuid).subscribe(() => {
      this.startPicturePreview()
    }, error => {
      if (error.response.data.errors && error.response.data.errors.indexOf('401') !== -1) {
        this.dialogLoginFormVisible = true
      }
    })
  }
  private handleSelectionChange (val) {
    this.waitActivingDevices = val
  }
  private setCameraLoginInfo () {
    DataAPi.setUsernameAndPassword(this.selectedDevice.uuid, this.loginForm.username, this.loginForm.password)
      .subscribe(() => {
        this.dialogLoginFormVisible = false
        // 尝试登陆
        DataAPi
          .getDevice(this.selectedDevice.uuid)
          .subscribe(data => {
            // 登录成功，或无需登录，开启预览
            this.startPicturePreview()
            let index = -1
            for (let i = 0; i < this.devices.length; i++) {
              if (this.devices[i].uuid === this.selectedDevice.uuid) {
                this.devices[i] = data
              }
            }
          }, error => {
            // 需要登录
            if (error.response.data && error.response.data.errors && error.response.data.errors.indexOf('401') !== -1) {
              this.dialogLoginFormVisible = true
            }
          })
      })
  }
  private startPicturePreview () {
    if (this.selectedDevice.uuid === '') return
    let uuid = this.selectedDevice.uuid
    this.playPicturePreview(uuid)
    DataAPi.setPicturePreview(uuid, true).subscribe(() => {}, () => {
      clearInterval(this.previewTimer)
      this.previewTimer = null
    })
  }
  private openVideoPreview () {
    DataAPi.setVideoPreview(this.selectedDevice.uuid, true).subscribe(() => {})
  }
  private isLogined (row, index) {
    return !this.devices[index].need_login
  }
  private activeDevices () {
    if (this.waitActivingDevices.length === 0) {
      this.$message({
        message: '请先选择要激活的摄像头',
        type: 'warning'
      })
    } else {
      clearInterval(this.previewTimer)
      this.previewTimer = null
      DataAPi.setVideoPreview(this.selectedDevice.uuid, false)
      this.emitActive(this.waitActivingDevices)
    }
  }
}
</script>
<style lang="less" scoped>
  .previewimg {
    margin: 10px;
    height: 100%;
    width: 100%;
  }
</style>

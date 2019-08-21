<template>
  <div>
     <!--搜索摄像头对话框-->
    <el-dialog title="搜索摄像头" width="80%" :visible.sync="dialogSearchDevice" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-row class="toolbar">
        <el-col :span="12">
          <span>新发现摄像头</span>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <span>{{searchStatus}}</span>
          <el-button class="btn" :disabled="researchBtnDisabled" @click="showSearchDevice">重新搜索</el-button>
        </el-col>
      </el-row>
      <div class="split-line"></div>
      <devices-table :isNew="newContent" :devices="newDevices" @active-devices-event="activeNewDevices"></devices-table>
      <div class="split-line"></div>
      <DevicesTable :isNew='isNewContent' v-bind:devices="devices"/>
    </el-dialog>
    <!-- 激活摄像头对话框 -->
    <el-dialog title="激活摄像头" :visible.sync="dialogActiveDevice" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form size="mini" ref="form" :rules="rules" :model="curNewDevice" :label-width="formLabelWidth">
        <el-form-item label="摄像头名称" prop="camera_name">
          <el-input class="deviceinput" v-model="curNewDevice.camera_name"></el-input>
        </el-form-item>
        <el-form-item label="采集点位置" prop="location">
          <el-input class="deviceinput" v-model="curNewDevice.location"></el-input>
        </el-form-item>
        <el-form-item label="摄像头位置" prop="position">
          <el-input class="deviceinput" v-model="curNewDevice.position"></el-input>
        </el-form-item>
        <!-- <el-form-item label="场景" prop="scene">
          <el-input class="deviceinput" v-model="curNewDevice.scene"></el-input>
        </el-form-item> -->
        <el-form-item label="场景" :label-width="formLabelWidth">
          <el-select size="mini" class="deviceinput" v-model="curNewDevice.scene" multiple placeholder="请选择">
            <el-option v-for="item in config.scene_json" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-select size="mini" class="deviceinput" v-model="curNewDevice.custom_tags" multiple :multiple-limit="5" placeholder="请选择">
            <el-option v-for="item in config.tag_options" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="摄像头高度" prop="useheight">
          <el-input class="deviceinput" placeholder="请输入高度（单位：CM）" v-model="curNewDevice.useheight"></el-input>
        </el-form-item>
      </el-form>
      <div class="split-line"></div>
      <el-row>
        <el-col :span="12">
          <el-card>
            <el-form label-position="left" inline class="device-info" size="mini">
              <DeviceAttr name="摄像头名字" v-bind:value="curNewDevice.camera_name"/>
              <DeviceAttr name="MAC地址" :value="curNewDevice.mac_addr"/>
              <DeviceAttr name="视频地址" :value="curNewDevice.video_url"/>
              <DeviceAttr name="序列号" :value="curNewDevice.sn"/>
              <DeviceAttr name="厂商" :value="curNewDevice.manufacturer"/>
              <DeviceAttr name="采集点位置" v-bind:value="curNewDevice.location"/>
              <DeviceAttr name="摄像头位置" v-bind:value="curNewDevice.position"/>
              <DeviceAttr name="场景" v-bind:value="curNewDevice.scene"/>
              <DeviceAttr name="标签" v-bind:value="curNewDevice.custom_tags"/>
              <DeviceAttr name="摄像头高度(CM)" v-bind:value="curNewDevice.useheight"/>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="12">
          <div @dblclick="openVideoPreview()" class="previewimg">
            <img :id="'active-preview-'+curNewDevice.uuid" width="90%">
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="prevDevice" :disabled="isFirst===true">上一个</el-button>
        <span style="margin: 0 20px 0 20px">({{curDeviceIdx+1}}/{{waitActivingDevices.length}})</span>
        <el-button type="primary" @click="nextDevice('form')" :disabled="hasName===false">{{nextDeviceTitle}}</el-button>
      </div>
    </el-dialog>

    <!-- Main -->
    <el-row class="toolbar" type="flex" justify="space-between">
      <el-col :span="8">
        <div>
          <el-button class="btn" icon="el-icon-search" @click="showSearchDevice">搜索摄像头</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <el-button class="btn" :disabled="enabledFlag" @click="startAll">全部开始录制</el-button>
          <el-button class="btn" @click="stopAll">全部停止录制</el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-upload class="upload-demo" action="/api/v1/infofileupload" :show-file-list="showUploadFile" :on-success="handleUploadSuccess">
              <el-button >点击上传</el-button>
          </el-upload>
          <a class="el-button el-button-download" href="/api/v1/infodownload" download="cinfo.json">下载配置</a>
        </div>
      </el-col>
      <el-col :span="2">
        <el-popover placement="bottom" width="500" trigger="hover">
          <el-form label-width="90px">
            <el-form-item label="磁盘占用率" v-show='!status.disk || status.disk.filewrite'>
              <el-progress v-if="status.disk != undefined" class="status" :text-inside="true" :stroke-width="20" :percentage="diskUsage"></el-progress>
              <span v-else>没找到硬盘</span>
            </el-form-item>
            <el-form-item v-show='status.disk && !status.disk.filewrite'>
              <span>磁盘断开连接,请进行检查!</span>
            </el-form-item>
          </el-form>
          <el-button plain :icon="diskStatus" circle slot="reference"></el-button>
        </el-popover>
        <template v-if="status && status.disk && status.disk.errors">
         <el-popover class="error-tips" placement="bottom" width="300" trigger="hover">
            <div v-for="o in status.disk.errors" :key="o" class="text item">{{ o }}</div>
            <el-button plain icon="el-icon-bell" circle slot="reference"></el-button>
        </el-popover>
        </template>
      </el-col>
    </el-row>
    <audio id="voice" :src="require('@/assets/audio/ch_3.mp3')" loop="loop">Your browser does not support the audio element.</audio>
  </div>
</template>

<script lang="ts">
import DataAPi from '@/api/data-api'
import { Prop, Watch, Component, Vue } from 'vue-property-decorator'
import DevicesTable from '@/components/DevicesTable.vue'
import DeviceAttr from './DeviceAttr.vue'

@Component({
  components: {
    DevicesTable,
    DeviceAttr
  }
})
export default class ToolBar extends Vue {
  @Prop() devices!:Array<any>
  @Prop() status!:object
  @Prop() config!:object
  @Prop() videoConfig!:Array<any>
  @Watch('curDeviceIdx')
  private onChangeCurDeviceIdx () {
    if (
      this.waitActivingDevices &&
      this.waitActivingDevices.length > 0 &&
      this.curDeviceIdx < this.waitActivingDevices.length
    ) {
      this.curNewDevice = this.waitActivingDevices[this.curDeviceIdx]
      if (!this.curNewDevice.scene) {
        this.curNewDevice = Object.assign({}, this.curNewDevice, { 'scene': [] })
      }
      if (this.videoConfig) {
        const tmpDevice = this.videoConfig.find(item => item.uuid === this.curNewDevice.uuid)
        if (tmpDevice) {
          tmpDevice.scene = tmpDevice.scene || []
          this.curNewDevice = Object.assign({}, this.curNewDevice, tmpDevice)
        }
      }
      this.playPicturePreview(this.curNewDevice.uuid)
      this.curDeviceIdx === 0 ? (this.isFirst = true) : (this.isFirst = false)
      if (this.curDeviceIdx === this.waitActivingDevices.length - 1) {
        this.nextDeviceTitle = '完成'
      } else {
        this.nextDeviceTitle = '下一个'
      }
    }
  }
  @Watch('cameraName')
  private onChangeCameraName (val) {
    val.length === 0 ? (this.hasName = false) : (this.hasName = true)
  }
  @Watch('dialogActiveDevice')
  private onChangeDialogActiveDevice (val) {
    if (!val) {
      clearInterval(this.previewTimer)
      this.previewTimer = null
      DataAPi.setVideoPreview(this.curNewDevice.uuid, false)
    }
  }
  @Watch(`${status.disk}`)
  private onChangeStatusDisk (newValue) {
    if (newValue && !newValue.filewrite) {
      document.getElementById('voice').play()
    } else {
      document.getElementById('voice').pause()
    }
  }
  private rules:object = {
    camera_name: [{ required: true, message: '摄像头名称不能为空', trigger: 'blur' }],
    location: [{ required: true, message: '不能为空', trigger: 'blur' }],
    position: [{ required: true, message: '不能为空', trigger: 'blur' }]
    // scene: [{ required: true, message: "不能为空", trigger: "blur" }]
  }
  private enabledFlag:boolean = false
  private formLabelWidth:string = '100px'
  private showUploadFile:boolean = false // 是否显示上传文件名
  private dialogSearchDevice:boolean = false
  private searchStatus:string = ''
  private researchBtnDisabled:boolean = false
  private newDevices:any[] = []
  private dialogActiveDevice:boolean = false
  private waitActivingDevices:any[] = []
  private curNewDevice:object = {
    camera_name: '',
    location: '',
    position: '',
    scene: [],
    custom_tags: [],
    useheight: ''
  }
  private curDeviceIdx = null
  private previewTimer = null
  private isFirst = true
  private hasName:boolean = false
  private nextDeviceTitle:string = '下一个'
  private newContent:boolean = true
  private isNewContent:boolean = false
  get cameraName () {
    return this.curNewDevice.camera_name
  }
  get diskUsage () {
    if (this.status.disk !== undefined && this.status.disk.all_size > 0) {
      return Math.round(100 - (this.status.disk.free_size * 100) / this.status.disk.all_size)
    }
    return 0
  }
  get diskStatus () {
    return this.status.disk && !this.status.disk.filewrite ? 'el-icon-info el-warningtip' : 'el-icon-info'
  }
  private handleUploadSuccess (res) {
    if (res) this.$message('文件已上传成功！')
  }
  private showSearchDevice () {
    this.dialogSearchDevice = true
    this.searchStatus = '搜索中...'
    this.researchBtnDisabled = true
    this.newDevices = []
    DataAPi.searchDevices().subscribe(data => {
      this.searchStatus = ''
      this.researchBtnDisabled = false
      this.newDevices = data
    })
  }
  private activeNewDevices (newDevices) {
    this.waitActivingDevices = newDevices
    if (newDevices.length > 0) {
      if (this.curDeviceIdx === 0) {
        if (this.videoConfig && this.curNewDevice) {
          const tmpDevice = this.videoConfig.find(item => item.uuid === this.curNewDevice.uuid)
          if (tmpDevice) {
            tmpDevice.scene = tmpDevice.scene || []
            this.curNewDevice = Object.assign({}, this.curNewDevice, tmpDevice)
          }
        }
      }
      this.curDeviceIdx = 0
    }
    this.dialogActiveDevice = true
    this.dialogSearchDevice = false
  }
  private prevDevice () {
    if (this.curDeviceIdx > 0) {
      clearInterval(this.previewTimer)
      this.previewTimer = null
      DataAPi.setVideoPreview(this.curNewDevice.uuid, false)
      this.curDeviceIdx--
    }
  }
  private nextDevice (formName) {
    this.$refs[formName].validate(valid => {
      if (valid) {
        if (this.waitActivingDevices && this.waitActivingDevices.length > 0) {
          DataAPi.modifyDevice(this.curNewDevice.uuid, this.curNewDevice).subscribe(data => {
            // self.curNewDevice = data;
            DataAPi.activeDevice(this.curNewDevice.uuid).subscribe(data => {
              clearInterval(this.previewTimer)
              DataAPi.setVideoPreview(this.curNewDevice.uuid, false)
              if (this.curDeviceIdx === this.waitActivingDevices.length - 1) {
                this.dialogActiveDevice = false
                this.$emit('change-device')
              }
              this.curDeviceIdx++
            })
          })
        }
      }
    })
  }
  private openVideoPreview () {
    DataAPi.setVideoPreview(this.curNewDevice.uuid, true).subscribe(() => {})
  }
  private playPicturePreview (uuid) {
    if (this.previewTimer !== null) return
    this.previewTimer = setInterval(() => {
      let ts = new Date().getTime()
      let dom = document.getElementById('active-preview-' + uuid) as HTMLElement
      dom.src = `/api/v1/picture-preview/${uuid}.jpg?${ts}`
    }, 300)
  }
  // ToDO 这块有问题
  private startAll () {
    let requests = []
    if (this.devices) {
      for (let i = 0; i < this.devices.length; i++) {
        requests.push(DataAPi.setVideoRecord(this.devices[i].uuid, true))
      }
      // this.$axios.all(requests).then(() => {
      //   console.log("All cameras are start recording");
      //   this.$EventBus.$emit("change-device");
      // });
    }
    this.enabledFlag = true
    setTimeout(() => { this.enabledFlag = false }, 3000)
  }
  private stopAll () {
    let requests = []
    for (let i = 0; i < this.devices.length; i++) {
      requests.push(DataAPi.setVideoRecord(this.devices[i].uuid, false))
    }
    // this.$axios.all(requests).then(() => {
    //   console.log("All cameras had stop recording");
    //   this.$EventBus.$emit("change-device");
    // });
  }
}
</script>

<style scoped>
.toolbar {
  text-align: left;
}
.btn {
  margin-left: 20px;
}
.el-form-item {
  text-align: left;
}
.deviceinput {
  width: 85%;
  padding-right: 5%;
}
.default {
  margin: 0 20px 20px;
}
.device-info {
  width: 400px;
  padding-bottom: 0;
  text-align: left;
}
.dialog-footer {
  text-align: center;
}
.status {
  margin-top: 10px;
}
.upload-demo{
  display: inline-block;
}
.el-button-download {
  color: #606266;
  text-decoration: none;
  margin-left: 10px;
}
.el-button >>> .el-warningtip {
  color: red !important;
}
.error-tips {
  margin-left:1em;
}
</style>

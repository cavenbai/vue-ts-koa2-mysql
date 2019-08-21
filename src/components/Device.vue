<template>
  <div class="default">
    <!-- 设备管理对话框 -->
    <el-dialog title="管理摄像头" :visible.sync="dialogDeviceForm" width="60%">
      <el-form ref="form" :model="local" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="摄像头名称" prop="camera_name">
          <el-input class="deviceinput" v-model="local.camera_name"></el-input>
        </el-form-item>
        <el-form-item label="采集点位置" prop="location">
          <el-input class="deviceinput" v-model="local.location"></el-input>
        </el-form-item>
        <el-form-item label="摄像头位置" prop="position">
          <el-input class="deviceinput" v-model="local.position"></el-input>
        </el-form-item>
        <el-form-item label="场景" :label-width="formLabelWidth">
          <el-select size="mini" class="deviceinput" v-model="local.scene" multiple placeholder="请选择">
            <el-option v-for="item in config.scene_json" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-select size="mini" class="deviceinput" v-model="local.custom_tags" multiple :multiple-limit="5" placeholder="请选择">
            <el-option v-for="item in config.tag_options" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="摄像头高度" prop="useheight">
          <el-input class="deviceinput" v-model="local.useheight"></el-input>
        </el-form-item>
        <el-form-item v-if="device.state===0" label="当前状态">
          <span class="default" style="color: red;">已掉线</span>
        </el-form-item>
        <el-form-item v-if="device.state===1" label="当前状态">
          <span class="default" style="color: green;">使用中</span>
          <el-button @click.prevent="stopRecord()" type="text">停用</el-button>
        </el-form-item>
        <el-form-item v-if="device.state===2" label="当前状态">
          <span class="default" style="color: #409EFF;">未启动</span>
          <el-button @click.prevent="startRecord()" type="text">启用</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveDeviceInfo('form')">保存</el-button>
        <el-button @click="dialogDeviceForm = false">放弃</el-button>
      </div>
    </el-dialog>

    <!-- Main -->
    <el-card :class="stateClass">
      <el-row>
        <!-- 设备信息 -->
        <el-col :span="14">
          <el-form label-position="left" inline class="device-info" size="mini">
            <div>
              <DeviceAttr class="device-info-name" name="摄像头名字" :value="device.camera_name"/>
              <span class="device-voice" v-if="device.state == 0 && device.offlineaudio == 0" @click="switchVoice(device.uuid, 1)">
                <img class="device-voice-img" src="../assets/images/voice_off.png">
              </span>
              <span class="device-voice" v-if="device.state == 0 && device.offlineaudio == 1" @click="switchVoice(device.uuid, 0)">
                <img class="device-voice-img" src="../assets/images/voice_on.png">
              </span>
            </div>
            <DeviceAttr name="MAC地址" :value="device.mac_addr"/>
            <DeviceAttr name="视频地址" :value="device.video_url"/>
            <DeviceAttr name="序列号" :value="device.sn"/>
            <DeviceAttr name="厂商" :value="device.manufacturer"/>
            <DeviceAttr name="采集点位置" :value="device.location"/>
            <DeviceAttr name="摄像头位置" :value="device.position"/>
            <DeviceAttr name="场景" :value="device.scene"/>
            <DeviceAttr name="标签" :value="device.custom_tags"/>
            <DeviceAttr name="摄像头高度" :value="device.useheight"/>
            <div class="attr-block">
              <el-button class="attr-block" type="text" size="mini" @click="showMoreInfo">更多...</el-button>
            </div>
          </el-form>
        </el-col>

        <!-- 预览和设备管理 -->
        <el-col :span="10">
          <!-- 管理按钮 -->
          <el-row>
            <el-button @click="showDeviceConfigDialog" size="small">管理</el-button>
            <el-button class="attr-name" @click="triggerPicturePreview" size="small">{{previewActionTitle}}</el-button>
            <span class="attr-name">{{deviceState}}</span>
            <!-- <span class="attr-name">{{deviceRecordTime}}</span> -->
            <el-time-picker class="timer" v-if="device.state === 1" v-model="deviceRecordTime" readonly disabled :editable="false" :clearable="false"></el-time-picker>
          </el-row>
          <!-- 预览图 -->
          <el-row>
            <div v-if="isPicturePreview" @dblclick="openVideoPreview()" style="margin-top: 20px;">
              <img class="preview" :alt="device.camera_name" :id="'top-preview-'+device.uuid">
            </div>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Prop, Watch, Component, Vue } from 'vue-property-decorator'
import DeviceAttr from './DeviceAttr.vue'
import DataAPi from '@/api/data-api'

@Component({
  components: { DeviceAttr }
})
export default class Device extends Vue {
  @Prop({ default: () => {} }) private device!:object
  @Prop() config!:object
  @Watch('device', { immediate: true })
  private onChangeDevice (val:any, old:any) {
    // 同步页面预览状态
    if ((old && !old.is_pictrue_preview) && (val && val.is_pictrue_preview)) { this.startPicturePreview() }
    if ((val && !val.is_pictrue_preview)) { this.stopPicturePreview() }
  }
  private rules:object = {
    camera_name: [{ required: true, message: '摄像头名称不能为空', trigger: 'blur' }],
    location: [{ required: true, message: '不能为空', trigger: 'blur' }],
    position: [{ required: true, message: '不能为空', trigger: 'blur' }],
    useheight: [{ required: true, message: '不能为空', trigger: 'blur' }]
  }

  private newDevice:object = {
    camera_name: '',
    location: '',
    position: '',
    scene: [],
    custom_tags: [],
    useheight: 0
  }
  private realPreviewURL:string = ''
  private previewTimer = null
  private dialogDeviceForm:boolean = false
  private formLabelWidth:string = '100px'
  private local:object = this.device ? this.device : this.newDevice
  private deviceRecordTime:any
  private deviceRecordTimer = null

  get isPicturePreview () {
    return this.device ? this.device.is_pictrue_preview : false
  }
  get previewActionTitle () {
    return this.isPicturePreview ? '关闭预览' : '打开预览'
  }
  get stateClass () {
    if (this.device) {
      switch (this.device.state) {
        case 0:
          return 'state-offline'
        case 1:
          return 'state-recording'
        case 2:
          return 'state-stop'
      }
    }
    return ''
  }
  get deviceState () {
    if (this.device) {
      switch (this.device.state) {
        case 0:
          return '摄像头离线'
        case 1:
          return '录制中'
        case 2:
          return '停止录制'
      }
    }
    return ''
  }
  private mounted () {
    this.startPicturePreview()
    this.deviceRecordTimer = setInterval(() => {
      if (this.device.last_start_time === 0) {
        this.deviceRecordTime = new Date(1970, 1, 1, 0, 0, 0)
        return
      }

      let now = new Date()
      let timeqzoneTS =
        now -
        new Date(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds()
        )
      this.deviceRecordTime = new Date(now - this.device.last_start_time * 1000 - timeqzoneTS)
    }, 1000)
  }
  private beforeDestroy () {
    clearInterval(this.deviceRecordTimer)
    this.deviceRecordTimer = null
    this.stopPicturePreview()
  }
  private triggerPicturePreview () {
    if (this.isPicturePreview) {
      DataAPi.setPicturePreview(this.device.uuid, false).subscribe(() => {
        this.$emit('change-device')
      })
    } else {
      DataAPi.setPicturePreview(this.device.uuid, true).subscribe(() => {
        this.$emit('change-device')
      })
    }
  }
  private startPicturePreview () {
    if (!this.device) return
    if (this.device.is_pictrue_preview) {
      DataAPi.setPicturePreview(this.device.uuid, true).subscribe(() => {
        this.previewTimer = setInterval(() => {
          let ts = new Date().getTime()
          document.getElementById(`top-preview-${this.device.uuid}`).src = `/api/v1/picture-preview/${this.device.uuid}.jpg?${ts}`
        }, 300)
      })
    }
  }
  private stopPicturePreview () {
    clearInterval(this.previewTimer)
    this.previewTimer = null
  }
  private showMoreInfo () {
    this.$msgbox({
      title: `摄像头:${this.device.camera_name}[${this.device.ip_addr}]`,
      dangerouslyUseHTMLString: true,
      message: this.device.profiles ? this.formatJSON2HTML(this.device.profiles[0].ImagingSettings) : '没有更多信息了',
      type: 'info',
      showConfirmButton: false,
      showClose: false
    })
  }
  private showDeviceConfigDialog () {
    this.dialogDeviceForm = true
  }
  private formatJSON2HTML (json) {
    return `<pre>${JSON.stringify(json, null, 2)}</pre>`
  }
  private saveDeviceInfo (formName) {
    this.$refs[formName].validate(valid => {
      if (valid) {
        DataAPi.modifyDevice(this.local.uuid, this.local).subscribe(() => {
          this.$emit('change-device')
          this.dialogDeviceForm = false
        })
      }
    })
  }
  private startRecord () {
    DataAPi.setVideoRecord(this.device.uuid, true).subscribe(() => {
      this.$emit('change-device')
    })
  }
  private stopRecord () {
    DataAPi.setVideoRecord(this.device.uuid, false).subscribe(() => {
      this.$emit('change-device')
    })
  }
  private openVideoPreview () {
    DataAPi.setVideoPreview(this.device.uuid, true).subscribe(() => {})
  }
  private switchVoice (uuid, state) {
    DataAPi.switchDeviceVoice(uuid, state).subscribe(() => {})
  }
}
</script>
<style lang="less" scoped>
  img {
    height: 200px;
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
  .attr-block {
    text-align: left;
    font-size: 13px;
  }
  .attr-name {
    margin-right: 10px;
  }
  .attr-value {
  }
  .state-offline {
    /* border-style:solid; */
    border-width: 2px;
    border-color: red;
  }
  .state-recording {
    border-color: #00ff55;
  }
  .state-stop {
    border-color: #0083ff;
  }
  .device-info {
    padding-bottom: 0;
    text-align: left;
  }
  .timer {
    cursor: auto;
    border: 0px;
  }
  .device-info-name {
    display: inline-block !important;
    width: auto !important;
  }
  .device-voice {
    display: inline-block;
    cursor: pointer;
  }
  .device-voice-img {
    height: 20px;
    margin: 2px 5px;
    display: block;
  }
</style>

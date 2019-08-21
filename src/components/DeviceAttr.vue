<template>
  <el-form-item :label="name+':'">
    <span>{{value}}</span>
  </el-form-item>
</template>
<script lang="ts">
import { Prop, Watch, Component, Vue } from 'vue-property-decorator'
@Component
export default class DeviceAttr extends Vue {
  @Prop() private name!:string
  @Prop() private value!:any
}
</script>
<style scoped>
  label {
    width: 90px;
    color: #99a9bf;
    height: 20px;
  }
  .el-form-item,
  .el-form-item--mini.el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
    display: block;
  }
  span {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap;
  }
</style>

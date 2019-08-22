<template>
  <div>
    <el-button @click="clickContent">确定</el-button>
    <el-table :data="content" border>
      <el-table-column prop="help_topic_id" label="1"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="2"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="help_category_id" label="3"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="description" label="4"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="example" label="5"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="url" label="6"  show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataAPi from '@/api/data-api'

@Component
export default class Home extends Vue {
  private content:any = []

  clickContent () {
    DataAPi.getConfiguration().subscribe(data => {
      this.content = data.data
    })
  }
}
</script>
<style lang="less" scoped>

</style>

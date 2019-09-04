<template>
  <section class="component work-menu">
    <el-menu unique-opened :collapse="false">
      <el-menu-item v-for="(item,index) in menuList" :key="index" @click="menuRouter(item)">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";

@Component
export default class WorkMenu extends Vue {
  private menuList = [
    {icon:'el-icon-location',title:'设置',path:'/home'},
    {icon:'el-icon-menu',title:'磁盘',path:'/Page1'},
    {icon:'el-icon-document',title:'上传',path:'/Page2'},
    {icon:'el-icon-setting',title:'下载',path:'/Page3'}
  ]

  private menuRouter(item) {
    // 防止自身重复点击
    if (this.$route.path === item.path) return
    this.$router.push(item.path)
  }
}
</script>

<style lang="less" scoped>
.component.work-menu {
  background: beige;
}
</style>

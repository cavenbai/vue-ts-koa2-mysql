<template>
  <section class="component loading">
    <el-dialog  :visible.sync="boo" fullscreen  :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <div id="box">
        <div class="box box1"></div>
        <div class="box box2"></div>
        <div class="box box3"></div>
        <div class="box box4"></div>
        <div class="box box5"></div>
      </div>
    </el-dialog>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component
  export default class Loading extends Vue {
    private boo:boolean =true
  }
</script>

<style lang="less" scoped>
  .component.loading {
    #box{
      width: 70px;
      height: 120px;
    }
    .box{
      width: 5px;
      height: 40px;
      float: left;
      margin: 2px;
      background: linear-gradient(to bottom right, #90F7EC, #32CCBC);
      animation: loading 1s infinite ease-in-out;//animation：动画名称 持续时间 动画速度曲线 延迟 执行多少次 是否正反方向轮流播放
    }
    .box2{
      animation-delay: -0.9s;
    }
    .box3{
      animation-delay: -0.8s;
    }
    .box4{
      animation-delay: -0.7s;
    }
    .box5{
      animation-delay: -0.6s;
    }
    @keyframes loading {
      0%,40%,100%{
        -webkit-transform: scaleY(0.5);
      }
      20%{
        -webkit-transform: scaleY(1);
      }
    }
  }
</style>

<style lang="less">
  .component.loading {
    .el-dialog__wrapper {
      .el-dialog {
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-dialog__header,
        .el-dialog__footer {
          display: none;
        }
      }
    }
  }
</style>

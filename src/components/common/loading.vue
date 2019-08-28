<template>
  <section class="component loading">
    <el-dialog  :visible.sync="boo" fullscreen  :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <!--<div class="content row middle-span center-span">-->
        <!--<div class="sk-cube-grid">-->
          <!--<div class="sk-cube sk-cube1"></div>-->
          <!--<div class="sk-cube sk-cube2"></div>-->
          <!--<div class="sk-cube sk-cube3"></div>-->
          <!--<div class="sk-cube sk-cube4"></div>-->
          <!--<div class="sk-cube sk-cube5"></div>-->
          <!--<div class="sk-cube sk-cube6"></div>-->
          <!--<div class="sk-cube sk-cube7"></div>-->
          <!--<div class="sk-cube sk-cube8"></div>-->
          <!--<div class="sk-cube sk-cube9"></div>-->
        <!--</div>-->
      <!--</div>-->
      <div id="ddr">
        <div class="ddr ddr1"></div>
        <div class="ddr ddr2"></div>
        <div class="ddr ddr3"></div>
        <div class="ddr ddr4"></div>
        <div class="ddr ddr5"></div>
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
  #ddr{
    width: 70px;
    height: 120px;
  }
  .ddr{
    width: 5px;
    height: 40px;
    float: left;
    margin: 2px;
    background: linear-gradient(to bottom right, #90F7EC, #32CCBC);
    animation: loading 1s infinite ease-in-out;//animation：动画名称 持续时间 动画速度曲线 延迟 执行多少次 是否正反方向轮流播放
  }
  .ddr2{
    animation-delay: -0.9s;
  }
  .ddr3{
    animation-delay: -0.8s;
  }
  .ddr4{
    animation-delay: -0.7s;
  }
  .ddr5{
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
  /*.sk-cube-grid {*/
    /*width: 40px;*/
    /*height: 40px;*/
    /*margin: 100px auto;*/
  /*}*/

  /*.sk-cube-grid .sk-cube {*/
    /*width: 33%;*/
    /*height: 33%;*/
    /*background-color: #FFF0F5;*/
    /*float: left;*/
    /*border-radius: 50%;*/
    /*-webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;*/
    /*animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;*/
  /*}*/
  /*.sk-cube-grid .sk-cube1 {*/
    /*-webkit-animation-delay: 0.2s;*/
    /*animation-delay: 0.2s;*/
  /*}*/
  /*.sk-cube-grid .sk-cube2 {*/
    /*-webkit-animation-delay: 0.3s;*/
    /*animation-delay: 0.3s;*/
  /*}*/
  /*.sk-cube-grid .sk-cube3 {*/
    /*-webkit-animation-delay: 0.4s;*/
    /*animation-delay: 0.4s;*/
  /*}*/
  /*.sk-cube-grid .sk-cube4 {*/
    /*-webkit-animation-delay: 0.1s;*/
    /*animation-delay: 0.1s;*/
  /*}*/
  /*.sk-cube-grid .sk-cube5 {*/
    /*-webkit-animation-delay: 0.2s;*/
    /*animation-delay: 0.2s;*/
  /*}*/
  /*.sk-cube-grid .sk-cube6 {*/
    /*-webkit-animation-delay: 0.3s;*/
    /*animation-delay: 0.3s;*/
  /*}*/
  /*.sk-cube-grid .sk-cube7 {*/
    /*-webkit-animation-delay: 0s;*/
    /*animation-delay: 0s;*/
  /*}*/
  /*.sk-cube-grid .sk-cube8 {*/
    /*-webkit-animation-delay: 0.1s;*/
    /*animation-delay: 0.1s;*/
  /*}*/
  /*.sk-cube-grid .sk-cube9 {*/
    /*-webkit-animation-delay: 0.2s;*/
    /*animation-delay: 0.2s;*/
  /*}*/

  /*@-webkit-keyframes sk-cubeGridScaleDelay {*/
    /*0%,*/
    /*70%,*/
    /*100% {*/
      /*-webkit-transform: scale3D(1, 1, 1);*/
      /*transform: scale3D(1, 1, 1);*/
    /*}*/
    /*35% {*/
      /*-webkit-transform: scale3D(0, 0, 1);*/
      /*transform: scale3D(0, 0, 1);*/
    /*}*/
  /*}*/

  /*@keyframes sk-cubeGridScaleDelay {*/
    /*0%,*/
    /*70%,*/
    /*100% {*/
      /*-webkit-transform: scale3D(1, 1, 1);*/
      /*transform: scale3D(1, 1, 1);*/
    /*}*/
    /*35% {*/
      /*-webkit-transform: scale3D(0, 0, 1);*/
      /*transform: scale3D(0, 0, 1);*/
    /*}*/
  /*}*/
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

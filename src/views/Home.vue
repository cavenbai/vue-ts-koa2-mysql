<template>
  <section class="page index">
    <div>
      <swiper :options="swiperOption" ref="mySwiper" style="width:50%;height:300px">
        <swiper-slide v-for="(item,index) of items" :key="index">
          <img :src="item.src" alt="index" style="width: 100%;height: 100%">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
      </swiper>
    </div>

    <el-button @click="clickContent" type="success">确定</el-button>
    <el-table :data="content" border>
      <el-table-column prop="help_topic_id" label="1"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="2"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="help_category_id" label="3"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="description" label="4"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="example" label="5"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="url" label="6"  show-overflow-tooltip></el-table-column>
    </el-table>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataAPi from '@/api/data-api'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

@Component({components: { swiper, swiperSlide} })
export default class Home extends Vue {
  private content:Array<any> = []

  private swiperOption:object = {
    notNextTick: true,
    loop:true, //循环
    initialSlide:0, //设定初始化时slide的索引
    autoplay:true,  //自动播放
    fadeEffect: {
      crossFade: true,
    },
    effect : 'coverflow',
    speed:800, //滑动速度
    direction : 'horizontal', //滑动方向
    //滑动之后回调函数
    on: {
      slideChangeTransitionEnd: function(){
        // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
      },
    },
    //左右点击
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    //分页器设置
    pagination: {
      el: '.swiper-pagination',
      clickable :true
    }
  }
  private items:any[] = [
    {src: require('../assets/images/1.jpg')},
    {src: require('../assets/images/2.jpg')},
    {src: require('../assets/images/3.jpg')},
    {src: require('../assets/images/4.jpg')},
    {src: require('../assets/images/5.jpg')},
  ]

  private clickContent() :void{
    DataAPi.getConfiguration().subscribe(data => {
      this.content = data.data
    },({msg}) => {
      this.$notify.error({title: '错误', message: msg});
    })
  }
}
</script>
<style lang="less" scoped>
  .page.index {
    background-color: mediumturquoise;
  }
</style>

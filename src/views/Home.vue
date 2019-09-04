<template>
  <section class="page index">
    <!--<p>开始了</p>-->
    <!--<p>{{name | encryptPhone}}</p>-->
    <!--<svg width="100" height="100">-->
      <!--<rect x="10" y="10" width="100" height="100" fill="blue" />-->
    <!--</svg>-->
    <!--<svg>-->
      <!--<text x="10" y="10">白鹏飞</text>-->
    <!--</svg>-->
    <!--<svg>-->
      <!--<circle cx="50" cy="50" r="50" fill="#529fca" />-->
    <!--</svg>-->
    <!--<svg>-->
      <!--<line x1="0" y1="0" x2="100" y2="100" stroke="#529fca" />-->
    <!--</svg>-->
    <!--<svg height="300" width="300">-->
      <!--<path d="M 100 100 L 200 200 H 10 V 40 H 70"-->
            <!--fill="#59fa81" stroke="#d85b49" stroke-width="3" />-->
    <!--</svg>-->
    <!--<svg>-->
      <!--<polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />-->
    <!--</svg>-->
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataAPi from '@/api/data-api'
import { Layout } from "@/decorator"

@Layout("workspace")
export default class Home extends Vue {

  private name:string = 'dffdggfddfgdfgffgfg'

  private clickContent() :void {

  }

  mounted() {
    console.log(this.$common.isArray([1,2,3]));
  }
}
</script>
<style lang="less" scoped>
  .page.index {
    background-image: url("../assets/images/bg1.png");
    background-size: 100% 100%;
  }
</style>

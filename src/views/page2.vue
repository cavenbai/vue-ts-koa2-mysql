<template>
  <section class="page Page2">

  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout } from "@/decorator"

@Layout("workspace")
@Component
export default class Page2 extends Vue {


}
</script>
<style lang="less" scoped>
  .page.Page2 {
    background-image: url("../assets/images/bg3.jpg");
    background-size: 100% 100%;
  }
</style>

<template>
  <section class="page page3">

  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout } from "@/decorator"

@Layout("workspace")
@Component
export default class page3 extends Vue {


}
</script>
<style lang="less" scoped>
  .page.page3 {
    background-image: url("../assets/images/bg4.jpg");
    background-size: 100% 100%;
  }
</style>

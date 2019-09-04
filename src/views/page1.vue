<template>
  <section class="page page1">

  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout } from "@/decorator"

@Layout("workspace")
@Component
export default class Page1 extends Vue {


}
</script>
<style lang="less" scoped>
.page.page1 {
  background-image: url("../assets/images/bg2.jpg");
  background-size: 100% 100%;
}
</style>

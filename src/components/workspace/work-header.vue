<template>
    <section class="component header">
      <div class="content-header">
        我的作品
      </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class WorkHeader extends Vue {


}
</script>

<style lang="less" scoped>
.component.header {
  width: 100%;
  height:60px;
  background-image: url("../../assets/images/headBackground.png");
  background-size:100% 100%;
  .content-header{
    line-height: 60px;
    color: white;
  }
}
</style>

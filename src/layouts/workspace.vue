<template>
  <div class="layout full">
    <work-header></work-header>
    <div class="row work-content">
      <work-menu></work-menu>
      <div class="col-span" style="margin: 10px">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from "vuex-class";
import WorkHeader from '@/components/workspace/work-header.vue'
import WorkMenu from '@/components/workspace/work-menu.vue'

@Component({ components: { WorkHeader, WorkMenu } })
export default class WorkSpace extends Vue {

}
</script>
<style lang="less" scoped>
  .work-content {
    background: #eff3f5;
    padding: 0;
    height: calc(~"100% - 60px");
    & > * {
      /*height: 100%;*/
    }
  }

</style>

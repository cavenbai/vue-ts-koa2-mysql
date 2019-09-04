<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from "@/layouts/default.vue";
import WorkspaceLayout from "@/layouts/workspace.vue";
import { State } from "vuex-class";
@Component({
  components: {
    default: DefaultLayout,
    workspace: WorkspaceLayout
  }
})
export default class App extends Vue {
  @State layout: string;
}

</script>
<style lang="less">
  @import "assets/styles/default.less";
</style>

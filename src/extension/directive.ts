export default ({ store }:any): Object => ({
  /**
   * 资源认证
   */
  auth: {
    bind(el:HTMLElement, binding:any, vnode:any) {
      // 获取权限编码
      let authCode = binding.value
      // 验证权限码
      if (!authCode) {
        console.error('未传入权限')
        return
      }
      let hasAuth: boolean = (store.state.controlResource || []).includes(authCode.toString());
      // 验证权限
      if (!hasAuth) {
        (el as HTMLElement).style.display = "none";
      }
    }
  }
})

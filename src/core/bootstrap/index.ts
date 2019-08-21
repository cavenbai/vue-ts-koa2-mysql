import pluginInit from '@/core/bootstrap/plugin.init'
import baseInit from '@/core/bootstrap/base.init'

export default async function ({ store, router }:any) {
  //第三方插件初始化
  await pluginInit({ store })

  await baseInit({ store })
}

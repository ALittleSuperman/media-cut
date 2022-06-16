
const components = [
  OpenInDefaultBrowser
]

const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
// 兼容cdn环境
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install
}

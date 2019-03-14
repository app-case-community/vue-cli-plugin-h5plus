import Vue from 'vue'
import ReadyPlugin from './ready.plugin'

Vue.config.productionTip = false

Vue.use(ReadyPlugin)

Object.defineProperty(Vue.prototype, '$plus', {
  get: function () {
    return window.plus
  }
})

// 打开页面
var _openw = null
Vue.prototype.$page = {
  open (url, { title, anim, titleBarOpts }) {
    if (_openw) { return } // 防止快速点击
    var plus = window.plus
    var ws = {
      scrollIndicator: 'none',
      scalable: false,
      popGesture: 'close',
      backButtonAutoControl: 'close',
      titleNView: titleBarOpts || {
        autoBackButton: true,
        backgroundColor: '#D74B28',
        titleColor: '#CCCCCC'
      }
    }
    ws.titleNView.titleText = title
    _openw = plus.webview.create(url, url, ws)
    _openw.addEventListener('loaded', function () { // 页面加载完成后才显示
      _openw && _openw.show(anim || 'pop-in', null, function () {
        _openw = null// 避免快速点击打开多个页面
      })
    }, false)
    _openw.addEventListener('hide', function () {
      _openw = null
    }, false)
    _openw.addEventListener('close', function () { // 页面关闭后可再次打开
      _openw = null
    }, false)
  },
  close () {
    window.plus.webview.close(window.plus.webview.currentWebview())
  }
}

const initApp = (App, opts = {}) => {
  new Vue({
    ...opts,
    render: h => h(App)
  }).$mount('#app')
}
export default initApp

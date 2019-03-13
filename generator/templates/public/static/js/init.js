(function (window) {
  // DOMContentLoaded事件处理
  var _domReady = false
  // 兼容性样式调整
  var _adjust = false
  document.addEventListener('DOMContentLoaded', function () {
    _domReady = true
    compatibleAdjust()
  }, false)
  var compatibleAdjust = function () {
    if (_adjust || !window.plus || !_domReady) {
      return
    }
    _adjust = true
    // iOS平台特效
    if (window.plus.os.name === 'iOS') {
      document.getElementById('content').className = 'scontent' // 使用div的滚动条
      if (navigator.userAgent.indexOf('StreamApp') >= 0) { // 在流应用模式下显示返回按钮
        document.getElementById('back').style.visibility = 'visible'
      }
    }
    // 关闭启动界面
    setTimeout(function () {
      window.plus.navigator.closeSplashscreen()
    }, 200)
  }
  window.$init = function (fn) {
    document.body.addEventListener('touchstart', function () { })
    document.oncontextmenu = function () {
      return false
    }

    var plusReady = function () {
      document.dispatchEvent(new MessageEvent('apiready', {
        data: {}
      }))
      compatibleAdjust()
      fn && fn()
    }
    if (window.plus) {
      plusReady()
    } else {
      document.addEventListener('plusready', plusReady, false)
    }
  }
  window.$updateOrientation = function (fn) {
    var update = function () {
      setTimeout(function () {
        document.dispatchEvent(new MessageEvent('updateOrientation', {
          data: {}
        }))
        fn && fn()
      }, 200)
    }
    window.addEventListener('orientationchange', update, false)
    window.addEventListener('resize', update, false)
  }
})(window)

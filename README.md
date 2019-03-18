# vue-cli-plugin-h5plus
h5plus for vue-cli plugin

## use

vue add h5plus

## api

* 属性
    
    * this.$plus: window.plus
    * this.$$webview: window.plus.webview
    * this.$currentWebview: window.plus.webview.currentWebview()
    * this.$nativeUI: window.plus.nativeUI

* $options

    * onReady: apiready
    * onWindowChange: 屏幕变化（方向、尺寸）
    * events: 接收当前窗口监听事件（自动注册）
    * keyEvents：接收plus.key的事件（自动注册）
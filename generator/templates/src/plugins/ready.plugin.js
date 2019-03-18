const install = (Vue) => {
  if (install.installed) return
  install.installed = true
  Vue.mixin({
    beforeCreate () {
      if (this.$root.$children.length > 0 && this.$root.$children[0] === this) {
        document.addEventListener('apiready', () => {
          if (this.$options.keyEvents) {
            for (const key in this.$options.keyEvents) {
              if (this.$options.keyEvents.hasOwnProperty(key)) {
                const fn = this.$options.keyEvents[key]
                this.$plus.key.addEventListener(key, fn.bind(this), false)
              }
            }
          }
          if (this.$options.events) {
            for (const key in this.$options.events) {
              if (this.$options.events.hasOwnProperty(key)) {
                const fn = this.$options.events[key]
                this.$currentWebview.addEventListener(key, fn.bind(this), false)
              }
            }
          }
          this.$options.onReady && this.$options.onReady.bind(this).call()
        })
        document.addEventListener('updateOrientation', () => {
          this.$options.onWindowChange && this.$options.onWindowChange.bind(this).call()
        })
      }
    }
  })
}
export default {
  install
}

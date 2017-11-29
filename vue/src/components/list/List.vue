<style lang="less" scoped>
.list {
  font-weight: normal; text-align: left; height: 100%; overflow: hidden;
}
.list-item {
  height: 50px; line-height: 50px; padding: 0 10px; border-bottom: solid 1px #888;
}
</style>

<template>
  <div class="list" ref="list">
    <div class="scroll-body">
      <div class="list-item" v-for="item in data" v-bind:key="item.id">
        <span>{{item.firstName}}</span>
        <span>{{item.lastName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from 'util'
export default {
  name: 'list',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    render: {
      type: Function,
      default: p => p
    },
    lineHeight: 50,
    resizeHandler: null,
    lisyPoolCount: 20
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestory () {
    window.removeEventListener('resize', this.handleResize)
  },
  data () {
    return { }
  },
  computed: {
    maxLength () {
      return this.data.length
    }
  },
  methods: {
    handleResize (e) {
      if (!this.resizeHandler) {
        return (this.resizeHandler = throttle(this.reflow, 200))
      }
      return this.resizeHandler
    },
    reflow () {
      // TODO: Calculate
      // let visibleArea = this.$el.clientHeight
    }
  }
}
</script>

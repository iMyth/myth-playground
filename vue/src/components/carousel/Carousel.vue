<template>
  <div :style="styles" class="m-carousel">
    <div class="m-carousel-wrapper" :style="wrapperStyle">
      <div class="m-carousel-item" :style="{width:100/count + '%'}" v-for="(item, index) in items" v-bind:key="item.id">
        <img @click="handler(item)" :src="item.src" :alt="item.alt" />
      </div>
    </div>
    <div v-show="count > 1" class="dots-wrapper">
      <span class="carousel-dot" v-for="i in count" v-bind:key="i" :class="{'carousel-dot-selected':(currentIndex === (i - 1))}" @click="setIndex(i - 1, true)">
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentIndex: 0,
      autoPlayHandler: null
    }
  },
  computed: {
    wrapperStyle () {
      return {
        width: `${this.count * 100}%`,
        transform: `translateX(${-100 * (this.currentIndex / this.count)}%)`,
        transitionDuration: this.transitionDuration
      }
    },
    count () {
      return this.items.length
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    styles: {
      type: Object,
      default: () => ({
        height: '204px',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, .5)'
      })
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    transitionDuration: {
      type: String,
      default: '1.5s'
    },
    delay: {
      type: Number,
      required: false,
      default: 5
    }
  },
  methods: {
    setTimmer () {
      if (this.autoplay) {
        this.autoPlayHandler = setInterval(() => {
          this.setIndex(this.currentIndex + 1)
        }, this.delay * 1000)
      }
    },
    clearTimer () {
      clearInterval(this.autoPlayHandler)
    },
    setIndex (i, pauseAutoPlay) {
      this.currentIndex = i % this.count
      if (pauseAutoPlay) {
        this.clearTimer()
        this.setTimmer()
      }
    },
    handler (p) {
      console.log(p)
    }
  },
  mounted () {
    this.setTimmer()
  },
  beforeDestroy () {
    this.clearTimer()
  },
  watch: {
    items (value) {
      this.clearTimer()
      this.setTimmer()
    }
  }
}
</script>
<style lang="less" scoped>
.m-carousel {
  overflow: hidden;
  width: 100%;
  position: relative;
}
.m-carousel-wrapper {
  height: 100%;
  overflow: hidden;
  position: relative;
  left: 0;
  animation-timing-function: ease;
}
.m-carousel-item {
  display: inline-block;
  height: 100%;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  vertical-align: middle;
  img {
    display: inline-block;
    height: auto;
    max-height: 100%;
    cursor: pointer;
  }
}
.dots-wrapper {
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
}
.carousel-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border: 1px solid #ccc;
  margin: 6px 1px;
  cursor: pointer;
  background-color: white;
}
.carousel-dot:hover {
  border: 1px solid #2bb8aa;
}
.carousel-dot {
  &.carousel-dot-selected {
    background: rgba(0, 153, 255, 0.8);
  }
}
</style>
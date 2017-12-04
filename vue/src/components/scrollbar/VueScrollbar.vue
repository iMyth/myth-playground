<style lang="less">
.vue-scrollbar-transition, .vue-scrollbar__scrollbar-vertical {
  transition: all 0.5s ease;
}
.vue-scrollbar-transition--scrollbar {
  transition: opacity 0.5s linear;
}

.vue-scrollbar__area {
  min-height: 100%; // height: 100%;
}

.vue-scrollbar__wrapper {
  margin: 0 auto;  overflow: hidden; position: relative;
}
.vue-scrollbar__wrapper:hover .vue-scrollbar__scrollbar-vertical {
  opacity: 1;
}
.vue-scrollbar__scrollbar-vertical {
  position: absolute; background: #e8e8e8;
}
.vue-scrollbar__scrollbar-vertical .scrollbar {
  position: relative; background: #bfbfbf; cursor: default;
}
.vue-scrollbar__scrollbar-vertical {
  width: 12px; height: 100%; top: 0; right: 0; z-index: 30;
}
.vue-scrollbar__scrollbar-vertical .scrollbar {
  width: 12px; border-radius: 6px;
}
.dark {
  .vue-scrollbar__wrapper:hover .vue-scrollbar__scrollbar-vertical {
    background: transparent;
  }
  .vue-scrollbar__scrollbar-vertical {
    position: absolute; background: transparent;
  }
  .vue-scrollbar__scrollbar-vertical .scrollbar {
    position: relative; background: #a7a7a7; cursor: default;
  }
}
</style>

<template>
  <div
    class="vue-scrollbar__wrapper"
    :class="theme"
    ref="scrollWrapper"
    :style="style">
    <div
      :class="'vue-scrollbar__area' + ( dragging ? ' ' : ' vue-scrollbar-transition')"
      ref="scrollArea"
      @mousewheel="scrollHandler($event), continuesChecking(5)"
      :style="{
        marginTop: top * -1 +'px',
        marginLeft: left * -1 +'px'
      }">
        <slot></slot>
        <vertical-scrollbar
          v-if="ready"
          :area="{ height: scrollAreaHeight }"
          :wrapper="{ height: scrollWrapperHeight }"
          :scrolling="vMovement"
          :on-change-position="handleChangePosition"
          :on-dragging="handleScrollbarDragging"
          :on-stop-drag="handleScrollbarStopDrag" >
        </vertical-scrollbar>
    </div>
  </div>
</template>

<script>
  import VerticalScrollbar from './VerticalScrollbar';
  import { CHANNEL_MESSAGES } from 'config'
  import { subscribe } from 'event'
  import { throttle } from 'util'

  const support = 'onwheel' in document.createElement('div') ? 'wheel'
  : document.onmousewheel !== undefined ? 'mousewheel'
  : 'DOMMouseScroll'

  export default {
    props: {
      speed: {
        type: Number,
        default: 210
      },
      callback: {
        type: Function,
        default: () => {}
      },
      theme: {
        type: String,
        default: () => ''
      }
    },
    components: {
      VerticalScrollbar
    },
    data () {
      return  {
        ready: false,
        top: 0,
        left: 0,
        scrollAreaHeight: null,
        scrollWrapperHeight: null,
        vMovement: 0,
        hMovement: 0,
        dragging: false,
        start: { y: 0, x: 0},
        checkHandler: null,
        cancelCheckHandler: null,
        calculateSizeHandler: null,
        scrollHandler: null
      }
    },
    methods: {
      scroll(e){
        e.preventDefault()
        // Make sure the content height is not changed
        this.calculateSize(() => {
          // Set the wheel step
          let num = this.speed
          // DOM events
          let deltaY = e.deltaY || -e.wheelDeltaY
          let shifted = e.shiftKey
          let scrollY = deltaY > 0 ? num : -(num)
          // Fix Mozilla Shifted Wheel~
          if(shifted && e.deltaX == 0) scrollX = deltaY > 0 ? num : -(num)
          // Next Value
          let nextY = this.top + scrollY
          // Is it Scrollable?
          let canScrollY = this.scrollAreaHeight > this.scrollWrapperHeight
          // Vertical Scrolling
          if(canScrollY && !shifted) this.normalizeVertical(nextY)
          this.callback(nextY)
          // this.continuesChecking()
        })

      },
      normalizeVertical(next){
        next = next || 0
        let elementSize = this.getSize()
        if (!elementSize) {
          return
        }
        // Vertical Scrolling
        let lowerEnd = elementSize.scrollAreaHeight - elementSize.scrollWrapperHeight
        // Max Scroll Down
        if (next > lowerEnd) next = lowerEnd
        // Max Scroll Up
        else if (next < 0) next = 0
        // Update the Vertical Value
        this.top = next,
        this.vMovement = next / elementSize.scrollAreaHeight * 100
      },
      handleChangePosition(movement, orientation){
        // Make sure the content height is not changed
        this.calculateSize(() => {
          // Convert Percentage to Pixel
          let next = movement / 100
          if( orientation == 'vertical' ) this.normalizeVertical( next * this.scrollAreaHeight )
          this.callback()
          this.continuesChecking()
        })
      },
      handleScrollbarDragging(){
        this.dragging = true
      },
      handleScrollbarStopDrag(){
        this.dragging = false
      },
      getSize(){
        // The Elements
        let $scrollArea = this.$refs.scrollArea
        if (!$scrollArea || !$scrollArea.children) {
          return
        }
        let $scrollWrapper = this.$refs.scrollWrapper
        // Get new Elements Size
        let elementSize = {
          // Scroll Area Height and Width
          scrollAreaHeight: $scrollArea.children[0].clientHeight,
          // Scroll Wrapper Height and Width
          scrollWrapperHeight: $scrollWrapper.clientHeight,
        }
        return elementSize
      },
      calculateSize(cb, top){
        if (this._inactive && !top) {
          return
        }
        if(typeof cb !== 'function') cb = null;
        let elementSize = this.getSize()
        if (!elementSize) {
          return
        }
        let height = elementSize.scrollAreaHeight
        let wrapperHeight = elementSize.scrollWrapperHeight
        if( wrapperHeight !== this.scrollWrapperHeight ||
            height !== this.scrollAreaHeight )
        {
          if (height < this.scrollWrapperHeight && top === undefined) {
            this.top = 0
          }
          // Scroll Area Height
          this.scrollAreaHeight = height,
          // Scroll Wrapper Height
          this.scrollWrapperHeight = wrapperHeight,
          // Make sure The wrapper is Ready, then render the scrollbar
          this.ready = true
          if (top !== undefined) {
            this.top = top, this.normalizeVertical(top)
          }
          return cb ? cb() : false
        }
        else return cb ? cb() : false
      },
      continuesChecking () {
        if (!this.callback) {
          return
        }
        // Continues checking the position of element
        this.cancelChecking()
        window.clearTimeout(this.cancelCheckHandler)
        this.checkHandler = window.setInterval(() => {
          this.callback()
        }, 100)
        this.cancelCheckHandler = window.setTimeout(() => {
          this.cancelChecking()
        }, 600)
      },
      cancelChecking () {
        window.clearInterval(this.checkHandler)
      }
    },
    mounted () {
      this.calculateSizeHandler = throttle(this.calculateSize, 200)
      this.scrollHandler = throttle(this.scroll, 100)
      this.calculateSize()
      subscribe(CHANNEL_MESSAGES.CALCULATESIZE, top => {
        this.calculateSize(null, top)
      })
      // Attach The Event for Responsive View~
      window.addEventListener('resize', this.calculateSizeHandler)
    },
    beforeDestroy () {
      // Remove Event
      window.removeEventListener('resize', this.calculateSizeHandler)
    }
  }
</script>

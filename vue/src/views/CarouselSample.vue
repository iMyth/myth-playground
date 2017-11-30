<style lang="less" scoped>
.carousel-sample{ }
</style>

<template>
  <div class="carousel-sample">
    <carousel :items="items"></carousel>
  </div>
</template>

<script>
import Carousel from 'components/carousel/Carousel'

export default {
  name: 'carousel-sample',
  data () {
    return {
      items: [{
        id: 0,
        src: 'http://img1.template.cache.wps.cn/wps/cdnwps/upload/official/template/vip/commend_img/docer/hrtjjl_newdoc_zt_20170719.png/268X151.webp',
        alt: ''
      }, {
        id: 1,
        src: 'http://img1.template.cache.wps.cn/wps/cdnwps/upload/official/template/vip/commend_img/docer/hrtjjl_newdoc_zt_20170719.png/268X151.webp',
        alt: ''
      }, {
        id: 2,
        src: 'http://img1.template.cache.wps.cn/wps/cdnwps/upload/official/template/vip/commend_img/docer/hrtjjl_newdoc_zt_20170719.png/268X151.webp',
        alt: ''
      }]
    }
  },
  components: { Carousel }
}
</script>

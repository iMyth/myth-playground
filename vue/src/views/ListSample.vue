<style lang="less" scoped>
  .list-sample {
    height: 100%; position: relative;
  }
</style>

<template>
  <div class="list-sample">
    <list :data="testData"></list>
  </div>
</template>

<script>
import List from 'components/list/List'
import { genRandomStr } from 'util'
const listLength = 3000

export default {
  name: 'list-sample',
  data () {
    return {
      testData: []
    }
  },
  mounted () {
    this.genData()
  },
  methods: {
    genData () {
      this.testData = []
      for (let i = 0; i < listLength; i++) {
        this.testData.push({
          id: i,
          firstName: genRandomStr(),
          lastName: genRandomStr()
        })
      }
    }
  },
  components: { List }
}
</script>


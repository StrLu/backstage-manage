<template>
  <el-select clearable :value="value" @change="$emit('input', $event)" placeholder="请选择频道">
    <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ArticleChannel',
  props: {
    value: {
      type: [String, Number],
      require: true
    }
  },
  data () {
    return {
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/channels'
        })
        this.channels = data.channels
      } catch (error) {
        this.$message.error('获取频道数据失败', error)
      }
    }
  }
}
</script>

<style scoped>
</style>

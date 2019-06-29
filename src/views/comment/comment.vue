<template>
  <el-table :data="articles" style="width: 100%">
    <el-table-column prop="title" label="标题"></el-table-column>
    <el-table-column label="评论状态">
      <template slot-scope="scope">{{ scope.row.comment_status ? '开启' : '禁用' }}</template>
    </el-table-column>
    <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
    <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.comment_status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="handleChangeStatus(scope.row)"
        ></el-switch>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      articles: []
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/articles',
          params: {
            response_type: 'comment'
          }
        })
        this.articles = data.results
      } catch (error) {
        this.$message.error('加载文章列表失败')
      }
    },
    async handleChangeStatus (row) {
      try {
        await this.$http({
          method: 'PUT',
          url: '/comments/status',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: row.comment_status
          }
        })
        this.$message.success('修改状态成功!')
      } catch (error) {
        this.$message.error('操作失败')
      }
    }
  }
}
</script>

<style scoped>
</style>

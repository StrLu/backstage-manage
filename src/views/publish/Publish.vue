<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发布文章</span>
      <div>
        <el-button type="success" @click="handlePublish(false)">发布</el-button>
        <el-button type="primary" @click="handlePublish(true)">存入草稿</el-button>
      </div>
    </div>
    <el-row>
      <el-col :span="23">
        <!-- 表单 -->
        <el-form ref="form" label-width="60px">
          <el-form-item label="标题">
            <el-input v-model="articleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <quill-editor v-model="articleForm.content" ref="myQuillEditor" :options="editorOption"></quill-editor>
          </el-form-item>
          <el-form-item label="封面"></el-form-item>
          <el-form-item label="频道">
            <article-channel v-model="articleForm.channel_id"></article-channel>
          </el-form-item>
        </el-form>
        <!-- /表单 -->
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import ArticleChannel from '@/components/article-channel/articleChannel.vue'
// 加载样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './quill.user.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'publish',
  components: {
    ArticleChannel,
    quillEditor
  },
  data () {
    return {
      defaultArticleForm: {},
      articleForm: {
        title: '', // 标题
        content: '', // 内容
        channel_id: '', // 频道
        cover: {
          type: 0, // 封面类型 -1:自动, 0:无图, 1:1张图, 3:3张图
          images: []
        }
      },
      radio: '0',
      editorOption: {}
    }
  },
  created () {
    this.defaultArticleForm = JSON.parse(JSON.stringify(this.articleForm))
    if (this.$route.name === 'publish-edit') {
      this.loadArticle()
    }
  },
  methods: {
    async loadArticle () {
      try {
        const id = this.$route.params.id
        const data = await this.$http({
          method: 'GET',
          url: '/articles/' + id
        })
        this.articleForm = data
      } catch (error) {
        this.$message.error('获取文章列表失败')
      }
    },
    async handlePublish (draft) {
      switch (true) {
        case !this.articleForm.title:
          this.$message.warning('请输入标题!')
          return
        case !this.articleForm.content:
          this.$message.warning('请输入内容!')
          return
        case !this.articleForm.channel_id:
          this.$message.warning('请选择频道!')
          return
      }
      if (this.$route.name === 'publish-edit') {
        this.handleUpdate(draft)
      } else {
        this.publish(draft)
      }
    },
    async publish (draft) {
      try {
        await this.$http({
          method: 'POST',
          url: '/articles',
          params: {
            draft
          },
          data: this.articleForm
        })
        this.articleForm = JSON.parse(JSON.stringify(this.defaultArticleForm))
        this.$message({
          type: 'success',
          message: '发布成功'
        })
      } catch (err) {
        this.$message.error('发布失败', err)
      }
    },
    async handleUpdate (draft) {
      try {
        await this.$http({
          method: 'PUT',
          url: `/articles/${this.$route.params.id}`,
          params: {
            draft
          },
          data: this.articleForm
        })
        this.articleForm = JSON.parse(JSON.stringify(this.defaultArticleForm))
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      } catch (err) {
        this.$message.error('操作失败', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.publish-card {
  min-height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

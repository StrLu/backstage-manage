<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>账户设置</span>
    </div>
    <el-row>
      <el-col :span="10">
        <el-form v-loading="loading">
          <el-form-item label="媒体名称">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体简介">
            <!-- <el-input v-model="user.intro"></el-input> -->
            <el-input
              v-model="user.intro"
              type="textarea"
              placeholder="请输入内容"
              maxlength="100"
              resize="none"
              show-word-limit
              rows="7"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="头条号ID">
            <el-input disabled :value="user.id"></el-input>
          </el-form-item>
          <el-form-item label="绑定手机">
            <el-input disabled :value="user.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleUpdateUser">保存更新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :offset="2" :span="5">
        <p>点击图片更换头像</p>
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :show-file-list="false"
          :http-request="handleUpload"
        >
          <img v-if="user.photo" :src="user.photo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      loading: false
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/user/profile'
        })
        this.user = data
      } catch (error) {
        this.$message.error('加载用户信息失败', error)
      }
    },
    async handleUpdateUser () {
      try {
        const { name, intro, email } = this.user
        const data = await this.$http({
          method: 'PATCH',
          url: '/user/profile',
          data: {
            name,
            intro,
            email
          }
        })
        this.$store.commit('changeUser', data)
        this.$message.success('修改成功!')
      } catch (error) {
        this.$message.error('操作失败!')
      }
    },
    async handleUpload (uploadConfig) {
      try {
        const formData = new FormData()
        formData.append('photo', uploadConfig.file)
        const data = await this.$http({
          method: 'PATCH',
          url: '/user/photo',
          data: formData
        })
        this.user.photo = data.photo
        this.$store.commit('changeUser', this.user)
        this.$message.success('头像修改成功!')
      } catch (error) {
        this.$message.error('头像上传失败,请重试!')
      }
    }
  }
}
</script>

<style scoped>
</style>

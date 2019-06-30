<template>
  <el-row :gutter="20">
    <el-col :span="17">江苏传智播客教育科技股份有限公司</el-col>
    <el-col :span="6">
      <el-dropdown trigger="click" @command="handleCommand">
        <a class="userInfo" href="javascript:">
          <img :src="$store.state.user.photo" />
          <span class="el-dropdown-link">
            {{ $store.state.user.name }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userSet">用户设置</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import { removeUser } from '@/utils/auth'
export default {
  name: 'AppHeader',
  data () {
    return {
      userinfo: {}
    }
  },
  created () {
    // this.userinfo = getUser()
  },
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        this.logout()
      } else if (command === 'userSet') {
        this.$router.push('/account')
      }
    },
    logout () {
      this.$confirm('确认退出登录？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功退出!'
        })
        removeUser()
        window.location.reload()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped>
.el-row {
  min-width: 800px;
}
.el-dropdown {
  float: right;
}
.el-col {
  line-height: 60px;
}
.userInfo {
  text-decoration: none;
  color: #666;
}
img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  border-radius: 40px;
}
</style>

<template>
  <el-row :gutter="20">
    <el-col :span="17">江苏传智播客教育科技股份有限公司</el-col>
    <el-col :span="6">
      <el-dropdown trigger="click">
        <a class="userInfo" href="javascript:">
          <img width="30" src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi">
          <span class="el-dropdown-link">
            {{ userinfo.name }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </a>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户设置</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userinfo: {}
    }
  },
  created () {
    this.userinfo = JSON.parse(window.localStorage.getItem('user_info'))
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
  vertical-align: middle;
}
</style>

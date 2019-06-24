<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span>内容管理</span>
      </template>
      <el-menu-item index="1-1">发布文章</el-menu-item>
      <el-menu-item index="1-2">内容列表</el-menu-item>
      <el-menu-item index="1-3">评论管理</el-menu-item>
      <el-menu-item index="1-4">素材管理</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-help"></i>
        <span>粉丝管理</span>
      </template>
      <el-menu-item index="2-1">图文数据</el-menu-item>
      <el-menu-item index="2-2">粉丝概况</el-menu-item>
      <el-menu-item index="2-3">粉丝列表</el-menu-item>
    </el-submenu>
    <el-menu-item index="3">
      <i class="el-icon-s-custom"></i>
      <span slot="title">账户管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.el-menu{
  width: 100%;
}
</style>

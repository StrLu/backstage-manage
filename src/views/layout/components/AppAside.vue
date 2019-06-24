<template>
  <!--
    el-menu 组件
      default-active 设置默认激活的项
      open、close 当菜单展开和收起的时候会被触发
      background-color 菜单栏背景色
      text-color 菜单栏默认文本颜色
      active-text-color 激活时候的文本文件
      router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
    el-submenu
      index 用来区分不同的导航项目的，可以用作路由导航路径，必须唯一，否则会出现菜单冲突
  -->
  <el-menu
    default-active="2"
    background-color="#2f4050"
    text-color="#a7b1c2"
    active-text-color="#fff"
    :router="true"
  >
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span>内容管理</span>
      </template>
      <el-menu-item index="/publish">发布文章</el-menu-item>
      <el-menu-item index="2-2">内容列表</el-menu-item>
      <el-menu-item index="2-3">评论管理</el-menu-item>
      <el-menu-item index="2-4">素材管理</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-s-help"></i>
        <span>粉丝管理</span>
      </template>
      <el-menu-item index="3-1">图文数据</el-menu-item>
      <el-menu-item index="3-2">粉丝概况</el-menu-item>
      <el-menu-item index="3-3">粉丝列表</el-menu-item>
    </el-submenu>
    <el-menu-item index="/publish">
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

  }
}
</script>

<style scoped>
.el-menu {
  width: 100%;
}
</style>

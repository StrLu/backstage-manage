<template>
  <el-container>
    <el-aside width="220px">
      <!-- 侧边栏 -->
      <AppAside />
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <AppHeader />
      </el-header>
      <!-- 内容 -->
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppAside from './components/AppAside'

export default {
  name: 'AppLayout',
  components: {
    AppAside,
    AppHeader
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #2f4050;
}
.el-aside::-webkit-scrollbar {
  width: 0;
}
.el-main,
.el-header {
  min-width: 1000px;
}
.el-main::-webkit-scrollbar {
  height: 0;
}
.el-header {
  background-color: #f3f3f4;
}
.el-main {
  background-color: #fff;
}
</style>

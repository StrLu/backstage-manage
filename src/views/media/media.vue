<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>素材管理</span>
    </div>
    <div>
      <el-radio-group v-model="radio1" @change="handelAllTabCollect">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
      <!-- <el-button style="float: right" type="primary">上传图片</el-button> -->
      <el-upload
        style="float: right"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="{ Authorization: `Bearer ${$store.state.user.token}` }"
        name="image"
        :on-success="() => { this.loadImages(false) }"
        :show-file-list="false"
      >
        <el-button type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <el-row :gutter="20">
      <el-col
        :span="4"
        v-for="(item, index) in images"
        :key="item.id"
        :offset="index % 5 == 0 ? 0 : 1"
      >
        <el-card class="mediashow" :body-style="{ padding: '0px' }">
          <!-- <img :src="item.url" class="image" /> -->
          <el-avatar shape="square" :size="180" fit="contain" :src="item.url"></el-avatar>
          <div class="bottom">
            <el-button
              @click="handleCollect(item)"
              class="collection"
              type="text"
              :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            ></el-button>
            <el-button
              class="collection"
              type="text"
              @click="handleDeleteImg(item)"
              icon="el-icon-delete"
            ></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="page"
      :total="totalCount"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio1: '全部',
      images: [],
      page: 1,
      pageSize: 10,
      totalCount: 1
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    async loadImages (collect = false) {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/user/images',
          params: {
            collect,
            page: this.page,
            per_page: this.pageSize
          }
        })
        this.totalCount = data.total_count
        this.images = data.results
        console.log(data.results)
      } catch (error) {
        this.$message.error('获取图片出错!')
      }
    },
    async handleCollect (item) {
      try {
        const data = await this.$http({
          method: 'PUT',
          url: `/user/images/${item.id}`,
          data: {
            collect: !item.is_collected
          }
        })
        item.is_collected = data.collect
        this.$message.success(`${item.is_collected ? '' : '取消'}收藏成功!`)
      } catch (error) {
        this.$message.error('操作失败')
      }
    },
    handelAllTabCollect (val) {
      this.page = 1
      this.loadImages(val === '收藏')
    },
    async handleDeleteImg (item) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        try {
          await this.$http({
            method: 'DELETE',
            url: `/user/images/${item.id}`
          })
          this.loadImages()
          this.$message.success('删除成功!')
        } catch (error) {
          this.$message.error('操作失败!')
        }
      } catch (error) {
        this.$message.error('已取消删除!')
      }
    },
    handleCurrentChange (page) {
      this.page = page
      this.loadImages(this.radio1 === '收藏')
    }
  }
}
</script>

<style scoped>
.mediashow {
  width: 180px;
  margin: 10px 0;
}
.bottom {
  position: relative;
  display: flex;
  justify-content: space-around;
  height: 50px;
  bottom: 0;
}
.collection {
  font-size: 20px;
}
.image {
  width: 100%;
  display: block;
}
</style >

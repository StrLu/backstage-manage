<template>
  <div>
    <!-- 数据筛选 -->
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>数据筛选</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-form ref="form" :model="filterParams" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="filterParams.status">
            <el-radio label>全部</el-radio>
            <el-radio
              v-for="(item, index) in statTypes"
              :key="item.label"
              :label="index"
            >{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="filterParams.channel_id" placeholder="请选择活动区域">
            <el-option
            v-for="item in channels"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="range_date"
            @change="handleDateChange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 数据筛选 -->

    <!-- 文章列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>一共有xxx条数据</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-table
        class="article-list"
        :data="articles"
        style="width: 100%"
        v-loading="articleLoading"
      >
        <el-table-column label="封面">
          <!--
            template 中的内容就是自定义表格列内容
            如果需要在 template 中访问遍历项数据，则需要给 template 配置 slot-scope="scope"
              slot-scope 属性名是固定的
              scope 值是自己随便起的名字
            结果就是：我们可以通过 scope.row 访问到当前遍历项对象，就好比我们遍历中的 item 一样
          -->
          <template slot-scope="scope">
            <img width="33%" v-for="item in scope.row.cover.images" :key="item" :src="item">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态" max-width="140">
          <template slot-scope="scope">
            <el-tag :type="statTypes[scope.row.status].type">{{ statTypes[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" max-width="220"></el-table-column>
        <el-table-column label="操作" width="171">
          <template>
            <el-button type="primary" plain>修改</el-button>
            <el-button type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 数据分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :disabled="articleLoading"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <!-- /数据分页 -->
    </el-card>
    <!-- /文章列表 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [],
      statTypes: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      articleLoading: false,
      page: 1,
      pageSize: 10,
      totalCount: 0,
      channels: [],
      range_date: '',
      filterParams: {
        status: '', // 文章状态
        channel_id: '', // 频道id
        begin_pubdate: '', // 开始时间
        end_pubdate: '' // 结束时间
      }
    }
  },
  created () {
    this.loadArticle()
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
      } catch {
        this.$message.error('获取频道数据失败!')
      }
    },
    onSubmit () { },
    async loadArticle () {
      this.articleLoading = true
      const data = await this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page: this.page,
          per_page: this.pageSize
        }
      })
      this.articles = data.results
      this.totalCount = data.total_count
      this.articleLoading = false
    },
    handleCurrentChange (page) {
      this.page = page
      this.loadArticle()
    },
    handleDateChange (value) {
      this.filterParams.begin_pubdate = value[0]
      this.filterParams.end_pubdate = value[1]
    }
  }
}
</script>

<style scoped>
.filter-card {
  margin-bottom: 15px;
}
.article-list {
  margin-bottom: 30px;
}
</style>

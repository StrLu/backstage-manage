<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>素材管理</span>
    </div>
    <div>
      <el-radio-group v-model="radio1">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
      <el-button style="float: right" type="primary">上传图片</el-button>
    </div>
    <el-row >
      <el-col :span="4" v-for="(o, index) in 3" :key="o" :offset="index % 5 == 0 ? 0 : 1">
        <el-card class="mediashow" :body-style="{ padding: '0px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div class="bottom">
            <el-button class="collection" type="text" icon="el-icon-star-off"></el-button>
            <el-button class="collection" type="text" icon="el-icon-delete"></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio1: '全部'
    }
  }
}
</script>

<style scoped>
.mediashow {
  margin-top: 20px;
}
.bottom {
  display: flex;
  justify-content: space-around;
  height: 50px;
}
.collection {
  font-size: 20px;
}
.image {
  width: 100%;
  display: block;
}
</style >

<template>
  <div class="mixin-components-container">

    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>最想看图书榜</span>
            </div>
            <div>
              <el-table height="265" :data="wantReadBookList" style="width: 100%">
                <el-table-column type="index" width="50" />
                <el-table-column prop="name" label="书名" />
                <el-table-column prop="bookThumbsCount" label="点赞数" width="65%" />
              </el-table>
            </div>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>最喜爱图书榜</span>
            </div>
            <div class="component-item">
              <el-table height="265" :data="loveBookList" style="width: 100%">
                <el-table-column type="index" width="50" />
                <el-table-column prop="name" label="书名" />
                <el-table-column prop="bookLoveCount" label="喜爱数" width="65%" />
              </el-table>
            </div>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>高分图书榜</span>
              <el-button type="text">文字按钮</el-button>
            </div>
            <div class="component-item">
              <el-table height="265" :data="scoreBookList" style="width: 100%">
                <el-table-column type="index" width="50" />
                <el-table-column prop="name" label="书名" />
                <el-table-column prop="bookAverageScore" label="评分" width="65%" />
              </el-table>
            </div>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>最多评论图书榜</span>
            </div>
            <div>
              <el-table height="265" class="component-item" :data="mostCommentList" style="width: 100%">
                <el-table-column type="index" width="50" />
                <el-table-column prop="name" label="书名" />
                <el-table-column prop="bookCommentCount" label="评论数" width="65%" />
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class='chart-container'>
      <chart height='100%' width='100%'></chart>
    </div>

  </div>
</template>

<script>
import Chart from '@/components/Charts/mixChart'
import { getBookAndCommentInfo } from '@/api/book'

export default {
  name: 'mixChart',
  components: { Chart },
  data() {
    return {
      wantReadBookList: [],
      loveBookList: [],
      scoreBookList: [],
      mostCommentList: [],
      booksListAll: {}
    }
  },
  methods: {
    getList() {
      getBookAndCommentInfo().then(response => {
        this.booksListAll = response.data
        console.log(this.booksListAll)
        this.wantReadBookList = this.booksListAll.wantReadBookList.slice(0, 10)
        this.loveBookList = this.booksListAll.loveBookList.slice(0, 10)
        this.scoreBookList = this.booksListAll.scoreBookList.slice(0, 10)
        this.mostCommentList = this.booksListAll.mostCommentList.slice(0, 10)
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 15px;
  min-height: calc(100vh - 84px);
}
.chart-container {
  position: relative;
  padding: 15px 0px 0px 0px;
  width: 100%;
  height: 400px;
}
.moreBtn {
  margin-left: 5px;
}
</style>

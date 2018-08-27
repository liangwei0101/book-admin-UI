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
              <el-table height="265" :data="wantBooksList" style="width: 100%">
                <el-table-column type="index" width="25" />
                <el-table-column prop="name" label="书名" />
                <el-table-column prop="no" label="点赞数" width="auto" />
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
              <el-table height="265" :data="loveBooksList" style="width: 100%">
                <el-table-column type="index" width="50" />
                <el-table-column prop="name" label="书名" />
                <el-table-column prop="name" label="点赞数" />
              </el-table>
            </div>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>高分图书榜</span>
            </div>
            <div class="component-item">
              <el-table height="265" :data="scoreBooksList" style="width: 100%">
                <el-table-column type="index" width="50" />
                <el-table-column prop="name" label="书名" />
                <el-table-column prop="name" label="点赞数" />
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
              <el-table height="265" class="component-item" :data="commentBooksList" style="width: 100%">
                <el-table-column type="index" width="50" />
                <el-table-column prop="name" label="书名" />
                <el-table-column prop="name" label="点赞数" />
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
import { getAllBookInfo } from '@/api/book'

export default {
  name: 'mixChart',
  components: { Chart },
  data() {
    return {
      wantBooksList: [],
      loveBooksList: [],
      scoreBooksList: [],
      commentBooksList: [],
      booksListAll: []
    }
  },
  methods: {
    getList() {
      getAllBookInfo().then(response => {
        this.booksListAll = response.data
        console.log(this.booksListAll)
        this.wantBooksList = this.booksListAll.slice(0, 10)
        this.loveBooksList = this.booksListAll.slice(0, 10)
        this.scoreBooksList = this.booksListAll.slice(0, 10)
        this.commentBooksList = this.booksListAll.slice(0, 10)
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
.chart-container{
  position: relative;
  padding: 15px 0px 0px 0px;;
  width: 100%;
  height:400px;
}
</style>

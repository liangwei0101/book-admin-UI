<template>
  <div>
    <el-row>
      <el-card :body-style="{display:'flex'}">
        <icon iconName="default-book" xxlarge></icon>
        <div class="book-summery">
          <el-row type="flex" justify="space-between">
            <span class="title">{{book.title}}</span>
            <span><i class="score">{{book.score}}</i> 分</span>
          </el-row>
          <el-row class="author">
            作者:{{book.author}}
          </el-row>
          <el-row>
            <p>简介:{{book.summery}}</p>
          </el-row>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-tabs type="border-card">
        <el-tab-pane label="评论">
          <comment-detail v-for="(item, index) in commentList" :comment="item" :key="index"></comment-detail>
        </el-tab-pane>
        <el-tab-pane label="喜欢">喜欢</el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import CommentDetail from "@/components/CommentDetail";
export default {
  name: "book-detail",
  components: {
    Icon,
    CommentDetail
  },
  data() {
    return {
      book: {
        title: "异世傲天",
        score: 9.3,
        author: "傲月长空",
        summery:
          "《异世傲天》是在起点中文网连载的一部异界大陆小说，作者是傲月长空。该小说主要讲述了龙傲天带着逍遥神尊的传承，重生到玄天大陆的故"
      },
      commentList: [
        {
          clinentName: "詹小胖",
          clientId: "123",
          content: "这本书太赞了，值得看一看！",
          date: 1535940453,
          score: 9.4,
          isBestComment: true
        }
      ]
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/common.scss";
.book-summery {
  margin-left: 16px;
  .title {
    font-size: $font-24;
    color: $theme-black;
    font-weight: $semibold;
  }
  .score {
    font-size: $font-24;
    color: $pink;
    font-weight: $semibold;
  }
  .author {
    margin-top: 16px;
    font-size: $font-14;
    color: $theme-black;
    font-weight: $semibold;
  }
}
</style>

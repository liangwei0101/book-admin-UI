<template>
  <div>
    <el-row>
      <el-col :span="3">
      <icon name="icon" large></icon>
      </el-col>
      <el-col :span="21">
        <el-row type="flex" justify="space-between">
          <span>{{comment.clinentName}}</span>
          <span v-if="comment.isBestComment" class="best-comment">今日最佳</span>
        </el-row>
        <el-row class="date">
          <span >{{comment.date}}</span>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="score">
       <i>{{comment.score}}</i> 分
      </el-col>
      <el-col :span="21">
        {{comment.content}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
  name: 'comment-detail',
  components: {
    Icon
  },
  props: {
    comment: {
      clinentName: '',
      clientId: '',
      content: '',
      date: '',
      score: 9.4,
      isBestComment: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/common.scss";
.score{
  padding-left: 5px;
  i{
    font-size: $font-18;
    color: $red;
    font-weight: $semibold;
  }
}
.best-comment{
   background-color: $orange;
   font-size: $font-10;
   font-weight: $semibold;
   border-radius: 10px;
  color: $red;
  padding: 2px 10px;
}
.date{
  margin-top: 5px;
  span{
  color:$gray;
  font-size: $font-10;
  }
}
</style>

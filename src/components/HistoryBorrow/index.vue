<template>
  <div>
    <custom-title class="custom-title" title="历史借阅"></custom-title>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="借阅人ID" width="180"></el-table-column>
      <el-table-column prop="name" label="昵称" width="180"></el-table-column>
      <el-table-column prop="borrowStart" label="借阅时间"></el-table-column>
      <el-table-column prop="borrowEnd" label="还书时间"></el-table-column>
      <el-table-column prop="deposit" label="押金"></el-table-column>
      <el-table-column prop="isReturned" label="是否已退回" :formatter="isReturnedFilter"></el-table-column>
      <el-table-column prop="delayCost" label="延期扣费"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <!-- <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>

  <el-pagination
  background
  layout="prev, pager, next"
  class="pagination"
  :total="1000">
</el-pagination>
</div>
</template>

<script>
import CustomTitle from "@/components/CustomTitle";
export default {
  name: "history-borrow",
  props: {
    //tableData: []
  },
  data() {
    return {
      tableData: []
    };
  },
  components: {
    CustomTitle
  },
  created() {
    console.log("created");

    this.getHistoryList();
  },
  methods: {
    getHistoryList: function() {
      this.tableData = [];
      for (let index = 0; index < 10; index++) {
        this.tableData.push({
          id: index,
          name: index,
          borrowStart: 123,
          borrowEnd: 123,
          deposit: 123,
          isReturned: index % 2 ? true : false,
          delayCost: 123
        });
      }
    },
    isReturnedFilter: function(row, column, cellValue, index) {
      console.log(cellValue);

      return cellValue ? "是" : "否";
    }
  },
  filters: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scope>
@import "@/styles/common.scss";
.custom-title {
  border: $spilt-line;
  padding: 10px;
  border-bottom: 0px;
}
.pagination {
  margin: 10px;
  float: right;
}
</style>

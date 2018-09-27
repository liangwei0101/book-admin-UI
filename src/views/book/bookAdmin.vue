
<template>
  <div class="app-container">
    <el-row>
      <el-col v-for="item in titleList" :key="item.iconName" :span="8">
        <card :book="item"></card>
      </el-col>
    </el-row>
    <el-row padding class="title-container">
      <custom-avatar :iconName="'menu'" :bgColor="'blue'" xsmall></custom-avatar>
      <span class="title">图书信息</span>
    </el-row>
    <el-row>
      <el-row class="operation" :gutter="20" type="flex" justify="space-around">
        <el-col :span="6">
          <el-input placeholder="请输入" class="custom-input" suffix-icon="el-icon-edit" label="图书ID">
            <span slot="prepend">图书ID:</span>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入" class="custom-input" suffix-icon="el-icon-edit" label="图书ID">
            <span slot="prepend">书名:</span>
          </el-input>
        </el-col>
        <el-col :span="6">
          <div class="select">
            <span class="select-title">图书状态：</span>
            <el-select placeholder="请选择" v-model="value">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-button type="primary">查询</el-button>
      </el-row>
      <el-row>
        <el-row padding type="flex" justify="space-between">
          <custom-title title="图书列表"></custom-title>
          <div class="button-group">
            <el-button type="primary" icon="el-icon-plus">添加</el-button>
            <el-button type="primary" icon="el-icon-edit">修改</el-button>
            <el-button type="primary" icon="el-icon-delete">下架</el-button>
          </div>
        </el-row>
        <el-row>
          <el-col :span="8" class="book-list">
            <el-collapse @change="goToBookDetail">
              <el-collapse-item v-for="item in bookList" :title="item.id+':'+item.name" :key="item.name" :name="item.id">
                <el-table :data="item.children" :show-header="false" @row-click="goToBorrowHistory">
                  <el-table-column prop="id" label="编号">
                  </el-table-column>
                  <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                         <el-tag :type="scope.row.statusTag" disable-transitions>{{scope.row.statusName}}</el-tag>
                    </template>
                  </el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <el-col :span="16" v-if="isShowBookDetail">
            <book-detail></book-detail>
          </el-col>
          <el-col :span="16" v-if="!isShowBookDetail" class="history-borrow" padding>
            <history-borrow></history-borrow>
          </el-col>
        </el-row>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import BookDetail from "@/components/BookDetail";
import HistoryBorrow from "@/components/HistoryBorrow";
import { getAllBookInfo, addBook } from "@/api/book";
import Card from "@/components/Card";
import CustomAvatar from "@/components/CustomAvatar";
import CustomTitle from "@/components/CustomTitle";
import { BookStatus } from "@/model/common";

import waves from "@/directive/waves"; // 水波纹指令

const calendarTypeOptions = [
  {
    key: "CN",
    display_name: "China"
  },
  {
    key: "US",
    display_name: "USA"
  },
  {
    key: "JP",
    display_name: "Japan"
  },
  {
    key: "EU",
    display_name: "Eurozone"
  }
];

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "complexTable",
  directives: {
    waves
  },
  components: {
    Card,
    CustomAvatar,
    CustomTitle,
    BookDetail,
    HistoryBorrow
  },
  data() {
    return {
      value: "",
      tableKey: 0,
      list: null,
      total: null,
      listLoading: false,
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        {
          label: "ID Ascending",
          key: "+id"
        },
        {
          label: "ID Descending",
          key: "-id"
        }
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          {
            required: true,
            message: "type is required",
            trigger: "change"
          }
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change"
          }
        ],
        title: [
          {
            required: true,
            message: "title is required",
            trigger: "blur"
          }
        ]
      },
      downloadLoading: false,
      titleList: [],
      bookList: [],
      isShowBookDetail: true
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  created() {
    this.getList();
    this.addBookInfo();
  },
  methods: {
    getList() {
      this.listLoading = false;
      this.titleList = [
        {
          iconName: "all-book",
          count: 1000,
          title: "图书总量",
          bgColor: "orange"
        },
        {
          iconName: "borrow-book",
          count: 2000,
          title: "借阅数量",
          bgColor: "purple"
        },
        {
          iconName: "dead-line-book",
          count: 3000,
          title: "到期未还书数量",
          bgColor: "green"
        }
      ];
      this.bookList = [
        {
          id: "123",
          name: "异世龙傲天传奇1",
          children: [
            {
              id: "123",
              name: "异世龙傲天传奇2",
              status: 1
            },
            {
              id: "234",
              name: "异世龙傲天传奇3",
              status: 2
            }
          ]
        },
        {
          id: "235",
          name: "异世龙傲天传奇4",
          children: [
            {
              id: "123",
              name: "异世龙傲天传奇5",
              status: 0,
              statusTag: ""
            },
            {
              id: "234",
              name: "异世龙傲天传奇6",
              status: 1,
              statusTag: "success"
            },
            {
              id: "234",
              name: "异世龙傲天传奇",
              status: 2,
              statusTag: "danger"
            },
            {
              id: "234",
              name: "异世龙傲天传奇",
              status: 3,
              statusTag: "info"
            }
          ]
        }
      ];
      this.bookList.forEach(item => {
        item.children.forEach(element => {
          switch (element.status) {
            case BookStatus.NoBorrowed:
              element["statusTag"] = "";
              element["statusName"] = "架上";
              break;
            case BookStatus.Bororwed:
              element["statusTag"] = "success";
              element["statusName"] = "未还";
              break;
            case BookStatus.Delay:
              element["statusTag"] = "danger";
              element["statusName"] = "延期";
              break;
            case BookStatus.Locked:
              element["statusTag"] = "info";
              element["statusName"] = "锁定";
              break;
          }
        });
      });
    },
    addBookInfo() {
      var book = {
        no: 1,
        name: "放弃",
        author: "梁伟",
        status: 0,
        introduce: "无",
        url: ""
      };
      addBook(book).then(response => {
        var aa = response.data;
      });
    },
    goToBookDetail(val) {
      this.isShowBookDetail = true;
    },
    goToBorrowHistory(row, event, column) {
      this.isShowBookDetail = false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scope>
@import "@/styles/common.scss";
.title-container {
  padding-top: 9px;
  padding-bottom: 9px;
  margin-top: 8px;
  background-color: $white;
  border-bottom: $border-line;
}

.title {
  font-weight: $semibold;
  font-size: $font-18;
}

.custom-input {
  .el-input-group__prepend {
    border: none;
    border-radius: 0px;
    padding: 0;
    width: auto;
    padding-right: 5px;
    background-color: transparent;
    color: $gray;
  }
}

.select {
  display: flex;
  align-items: center;
  .select-title {
    white-space: nowrap;
    font-size: $font-14;
    color: $gray;
  }
}

.operation {
  margin-top: 10px;
  padding: 20px 60px;
  background-color: #f9f9f9;
  border: $border-line;
  margin-left: 0px !important;
  margin-right: 0px !important;
}

.button-group {
  display: flex;
  overflow: hiden;
  .el-button--medium {
    padding: 5px 10px !important;
  }
}

.el-table::before {
  display: none;
}
.book-list {
  table {
    border-left: 1px solid #ebeef5 !important;
    td {
      border: 0px;
    }
  }
}

.el-collapse-item__header {
  background-color: #f7f7f7;
  border: 1px solid #ebeef5;
  border-top: 0px;
  border-bottom: 1px solid #ebeef5 !important;
}

.el-collapse-item__wrap {
  border-bottom: 0px;
  .el-collapse-item__content {
    padding-bottom: 0px;
    .el-table__body-wrapper {
      border-right: 1px solid #ebeef5 !important;
    }
  }
}
.history-borrow {
  border: $spilt-line;
}
</style>

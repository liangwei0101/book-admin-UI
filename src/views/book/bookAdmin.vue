<template>
<div class="app-container">

    <el-table :data="list" v-loading="listLoading" fit highlight-current-row style="width: 100%">

      <el-table-column prop="no" align="center" width="*" label="序号" />

      <el-table-column prop="name" align="center" width="*"  label="书名">
      </el-table-column>

      <el-table-column prop="author" align="center" width="*" label="作者">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { getAllBookInfo, addBook } from "@/api/book";
import waves from "@/directive/waves"; // 水波纹指令

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" }
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
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" }
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
          { required: true, message: "type is required", trigger: "change" }
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
          { required: true, message: "title is required", trigger: "blur" }
        ]
      },
      downloadLoading: false
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
      this.listLoading = true;
      getAllBookInfo().then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    addBookInfo () {
       var book = {
        no: 1,
        name: '放弃',
        author: '梁伟',
        status: 0,
        introduce: '无',
        url: ''
      };
      addBook(book).then(response => {
        var aa = response.data;
      });
    }
  }
};
</script>

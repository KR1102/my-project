<template>
  <div id="article">
    <div class>
      <el-button size="small" type="primary" icon="el-icon-circle-plus" @click="toAdd">新增</el-button>
      <div class="widthDiv marginLeft">
        <el-input size="small" clearable v-model="pageParam.title" placeholder="请输入内容"></el-input>
      </div>
      <div class="widthDiv">
        <el-select size="small" clearable v-model="pageParam.categoryId" placeholder="请选择分类">
          <el-option
            v-for="item in categoryData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <el-button size="small" type="primary" icon="el-icon-search" @click="toSearch">搜索</el-button>
    </div>

    <el-card shadow="hover" class="tebale_card">
      <el-table
        id="table-back"
        size="mini"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: 'transparent' }"
      >
        <el-table-column label="发布时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <!-- <span style="margin-left: 10px">{{ scope.row.publishTime }}</span> -->
            <span
              style="margin-left: 10px"
            >{{moment(scope.row.publishTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="450">
          <template slot-scope="scope">
            <el-tag type="success" size="medium">{{ scope.row.title }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="访问次数" width="180">
          <template slot-scope="scope">
            <el-tag type="success" size="medium">{{ scope.row.id }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="category.name" label="所属分类"></el-table-column>
      </el-table>
    </el-card>

    <div>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParam.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageParam.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog width="70%" :title="title" :visible.sync="visible" :before-close="beforeClose">
      <el-form :model="form" ref="ruleForm" :rules="rules">
        <el-form-item prop="title" label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="categoryId" label="所属分类" :label-width="formLabelWidth">
          <el-select size="small" clearable v-model="form.categoryId" placeholder="请选择分类">
            <el-option
              v-for="item in categoryData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="content" label="资讯" :label-width="formLabelWidth">
          <tinymce v-model="form.content"></tinymce>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel">取 消</el-button>
        <el-button type="primary" @click="toSave('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "../../utils/request";
// 引入tinymce组件
import Tinymce from "../../components/Tinymce/index";
let moment = require("moment");
export default {
  // 注册组件
  components: {
    // 组件名(标签名):组件对象
    tinymce: Tinymce
  },
  data() {
    return {
      form: {},
      title: "录入资讯信息",
      visible: false,
      categoryData: [],
      total: 0,
      tableData: [],
      // 分页查询的参数
      pageParam: {
        page: 1,
        pageSize: 10,
        title: "",
        categoryId: ""
      },
      // 模态框表单控件标题的宽度
      formLabelWidth: "100px",
      // 表单校验规则
      rules: {
        title: [{ required: true, message: "请输入资讯标题", trigger: "blur" }],
        categoryId: [
          { required: true, message: "请选择资讯分类", trigger: "change" }
        ],
        content: [
          { required: true, message: "请输入资讯内容", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      return "background:#3f5c6d2c;color:#000;";
    },
    moment,
    // 点击确定按钮
    toSave(formName) {
      this.$refs[formName].validate(valid => {
        // 校验通过
        if (valid) {
          // console.log(this.form, "=====");
          axios.post("/article/saveOrUpdate", this.form).then(res => {
            if (res.status == 200) {
              //保存成功，关闭模态框，刷新数据
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success"
              });
              this.toCancel();
              this.pageQuery();
            } else {
              this.$notify.error({
                title: "失败",
                message: res.statusText
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭模态框
    toCancel() {
      this.$refs["ruleForm"].resetFields();
      this.visible = false;
    },
    // 模态框关闭之前
    beforeClose(done) {
      this.$refs["ruleForm"].resetFields();
      done();
    },
    // 添加
    toAdd() {
      this.form = {};
      this.visible = true;
      this.title = "录入资讯信息";
    },
    // 搜索
    toSearch() {
      this.pageParam.page = 1;
      this.pageQuery();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageParam.pageSize = val;
      this.pageQuery();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageParam.page = val;
      this.pageQuery();
    },
    // 分页查找
    async pageQuery() {
      let res = await axios.get("/article/pageQuery", {
        params: this.pageParam
      });
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    // 查找分类
    async findAllCategory() {
      let res = await axios.get("/category/findAll");
      this.categoryData = res.data;
    }
  },
  created() {
    this.pageQuery();
    this.findAllCategory();
  }
};
</script>




<style scoped>
/* #article {
  background: url("../../assets/fyhpicture/背景.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
} */
#article {
  background-color: aliceblue;
}

.widthDiv {
  width: 200px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}
.marginLeft {
  margin-left: 10px;
}
</style>
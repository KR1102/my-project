<template>
  <transition name="el-zoom-in-top">
    <div>
      <div>
        <div class="widthDiv">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-circle-plus"
            @click="toAdd"
            >新增</el-button
          >
        </div>
        <div class="widthDiv">
          <el-input
            size="small"
            clearable
            v-model="pageParam.username"
            placeholder="请输入用户名"
          ></el-input>
        </div>

        <div class="widthDiv">
          <el-select
            size="small"
            clearable
            v-model="pageParam.rolename"
            placeholder="请选择角色"
          >
            <el-option
              v-for="item in rolenameData"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="toSearch"
          >搜索</el-button
        >
      </div>

      <div class="table">
        <el-table size="small" :data="tableData" style="width: 100%" border>
          <el-table-column label="序号" type="index"> </el-table-column>
          <el-table-column prop="username" label="用户名" width="200">
            <template slot-scope="scope">
              <div class="yis">{{ scope.row.username }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="realname" label="姓名"></el-table-column>
          <el-table-column prop="gender" label="性别"></el-table-column>
          <el-table-column prop="telephone" label="手机号"></el-table-column>
          <el-table-column prop="birth" label="出生日期">
            <template slot-scope="scope">
              <!-- <span style="margin-left: 10px">{{ scope.row.publishTime }}</span> -->
              <span style="margin-left: 10px">{{
                moment(scope.row.birth).format("YYYY-MM-DD ")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog :title="title" :visible.sync="visible">
        <el-form :model="form" ref="ruleForm" :rules="rules">
          <el-form-item
            prop="username"
            label="用户名"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            label="密码"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="realname"
            label="姓名"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.realname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="gender"
            label="性别"
            :label-width="formLabelWidth"
          >
            <template>
              <el-radio v-model="form.gender" label="男">男</el-radio>
              <el-radio v-model="form.gender" label="女">女</el-radio>
            </template></el-form-item
          >

          <el-form-item
            prop="birth"
            label="出生日期"
            :label-width="formLabelWidth"
            ><template>
              <div class="block">
                <el-date-picker
                  v-model="form.birth"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="timestamp"
                >
                  >
                </el-date-picker>
              </div>
            </template>
          </el-form-item>
          <el-form-item
            prop="telephone"
            label="手机号码"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.telephone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="toCancel">取 消</el-button>
          <el-button type="primary" @click="toSave('ruleForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <div class="page">
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
    </div>
  </transition>
</template>

<script>
import axios from "../../utils/request";
let moment = require("moment");

export default {
  data() {
    return {
      visible: false,
      categoryData: [],
      formLabelWidth: "120px",
      rolenameData: [],
      total: 0,
      tableData: [],
      // tableData1: {},
      form: {},
      pageParam: {
        page: 1,
        pageSize: 10,
        title: "",
        categoryId: "",
      },
      title: "录入用户信息",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    moment,

    // 查找角色
    async findAllrolename() {
      let res = await axios.get("/role/findAll");
      this.rolenameData = res.data;
    },
    toSearch() {
      this.pageParam.page = 1;
      this.pageQuery();
    },
    handleDelete(id) {
      // id 就是要删除的分类的对象的id
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // await等待后面异步函数运行完毕，拿到响应的数据，然后返回
          let res;
          if (id) {
            res = await axios.get("/baseUser/deleteById", { params: { id } });
          }
          this.$notify({
            title: res.status == 200 ? "成功" : "失败",
            message: res.statusText,
            type: res.status == 200 ? "success" : "error",
          });
          this.pageQuery();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑
    handleEdit(row) {
      this.title = "编辑用户信息";
      this.form = { ...row };
      this.visible = true;
    },
    //取消
    toCancel() {
      this.$refs["ruleForm"].resetFields();
      this.visible = false;
    },
    // 确认保存
    toSave(formName) {
      this.$refs[formName].validate((valid) => {
        // 校验通过
        if (valid) {
          // console.log(this.form, "=====");
          axios.post("/baseUser/saveOrUpdate", this.form).then((res) => {
            if (res.status == 200) {
              //保存成功，关闭模态框，刷新数据
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success",
              });
              this.toCancel();
              this.pageQuery();
            } else {
              this.$notify.error({
                title: "失败",
                message: "保存失败",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    toAdd() {
      this.form = {};
      this.visible = true;
      this.title = "录入用户信息";
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
    async pageQuery() {
      let res = await axios.get("/baseUser/pageQuery", {
        params: this.pageParam,
      });
      this.tableData = res.data.list;
      this.total = res.data.total;
      // this.tableData1 = tableData[0];
    },
    async findAllCategory() {
      let res = await axios.get("/baseUser/findAll");
      this.categoryData = res.data;
    },
  },
  created() {
    this.findAllCategory();
    this.findAllrolename();
    this.pageQuery();
  },
  mounted() {},
};
</script>
<style  scoped>
.widthDiv {
  width: 200px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}
.table {
  min-height: 600px;
  max-height: 600px;
  overflow: auto;
}
.yis {
  line-height: 30px;
  color: #ff0000;
  /* border: 1px #fff1cc solid; */

  /* background-color: #fff8e6; */
}
</style>
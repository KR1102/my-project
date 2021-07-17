<template>
  <div id="infoList">
    <el-carousel :interval="4000" type="card" height="200px" width="500px">
      <el-carousel-item v-for="item in imagebox" :key="item.id">
        <img :src="item.idView" class="image" />
      </el-carousel-item>
    </el-carousel>
    <div>
      <el-button size="small" type="primary" icon="el-icon-circle-plus" @click="toAdd">新增</el-button>
      <el-button
        size="small"
        type="danger"
        @click="handleDelete(null)"
        :disabled="multipleSelection.length==0"
      >批量删除</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="编号">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="简介" width="180"></el-table-column>
      <el-table-column prop="no" label="序号"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="visible" :before-close="beforeClose">
      <el-form :model="form" ref="ruleForm" :rules="rules">
        <el-form-item prop="name" label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="description" label="介绍" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="no" label="序号" :label-width="formLabelWidth">
          <el-input v-model.number="form.no" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel">取 消</el-button>
        <el-button type="primary" @click="toSave('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <span style="color:#F00; font-weight:bold">强防护、不恐慌，信科学、不传谣。</span>
    <el-divider></el-divider>
    <span style="color:#F00; font-weight:bold">少出门、戴口罩、勤洗手、常通风。</span>-->
  </div>
</template>

<script>
import axios from "../../utils/request";
export default {
  name: "zmd",
  data() {
    return {
      imagebox: [
        { id: 0, idView: require("../../assets/fyhpicture/2.jpg") },
        { id: 1, idView: require("../../assets/fyhpicture/1.jpg") },
        { id: 2, idView: require("../../assets/fyhpicture/3.jpg") }
        //imagebox是assets下一个放图片的文件夹
      ],
      multipleSelection: [],
      tableData: [],
      // 模态框可见性 dialog  modal
      visible: false,
      // 模态框的数据
      form: {},
      // 模态框表单控件标题的宽度
      formLabelWidth: "120px",
      // 模态框的标题
      title: "录入分类信息",
      // 表单校验规则
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入介绍", trigger: "blur" }
        ],
        no: [{ required: true, message: "请输入序号", trigger: "blur" }]
      }
    };
  },
  computed: {},
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
    // 多选
    handleSelectionChange(val) {
      // val是用户选中的数据对象数组
      // val = [ { "id": 3, "name": "最新进展", "description": "疫情的动态", "no": 1, "parentId": null }, { "id": 4, "name": "公告", "description": null, "no": 2, "parentId": null } ] ;
      // this.multipleSelection = [3,4]
      this.multipleSelection = val.map(item => item.id);
    },
    // 批量删除
    // toBatchDelete() {
    //   console.log("批量删除");
    // },
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
    // 点击新增按钮
    toAdd() {
      this.form = {};
      this.visible = true;
      this.title = "录入分类信息";
    },
    // 点击确定按钮
    toSave(formName) {
      this.$refs[formName].validate(valid => {
        // 校验通过
        if (valid) {
          // console.log(this.form, "=====");
          axios.post("/category/saveOrUpdate", this.form).then(res => {
            if (res.status == 200) {
              //保存成功，关闭模态框，刷新数据
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success"
              });
              this.toCancel();
              this.findAll();
            } else {
              this.$notify.error({
                title: "失败",
                message: "保存失败"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 编辑
    handleEdit(row) {
      this.title = "编辑分类信息";
      this.form = { ...row };
      this.visible = true;
    },
    // 删除
    handleDelete(id) {
      // id 就是要删除的分类的对象的id
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // await等待后面异步函数运行完毕，拿到响应的数据，然后返回
          let res;
          if (id) {
            res = await axios.get("/category/deleteById", { params: { id } });
          } else {
            res = await axios.post("/category/batchDelete", {
              ids: this.multipleSelection.toString()
            });
          }
          this.$notify({
            title: res.status == 200 ? "成功" : "失败",
            message: res.statusText,
            type: res.status == 200 ? "success" : "error"
          });
          this.findAll();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    findAll() {
      axios.get("/category/findAll").then(res => {
        this.tableData = res.data;
      });
    }
  },
  created() {
    this.findAll();
    // axios.get 第二个参数是axios的配置对象
    // axios.get('url',{params:{}}).then((res)=>{})
    /*
    , {
        headers: {
          test: "123",
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJOZz09Iiwic3ViIjoiYWRtaW4xIiwiaXNzIjoiMDk4ZjZiY2Q0NjIxZDM3M2NhZGU0ZTgzMjYyN2I0ZjYiLCJpYXQiOjE2MDkyOTEwNzQsImF1ZCI6InJlc3RhcGl1c2VyIiwiZXhwIjoxNjA5NDYzODc0LCJuYmYiOjE2MDkyOTEwNzR9.hFlB0QINV9j7E2ePscmbuwmoJWq6SuEQ_2ytkNtZzBw",
        },
      } */
    // axios.get("/category/findAll").then((res) => {
    //   this.tableData = res.data;
    // });
    // axios.post 第二个参数是给后台的数据
    // axios.post('url',{}).then((res)=>{})
    /* axios({
      url:'',
      method:'',
      data:{},
      params:{}
    }).then((res)=>{
      res.data
    }) */
  }
};
</script>
<style scoped>
/* .marginLeft {
  margin-left: 10px;
} */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
</style>

<style>
.el-table .warning-row {
  background: rgb(239, 253, 230);
}

.el-table .success-row {
  background: #ebf9f9;
}
</style>


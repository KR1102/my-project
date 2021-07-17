<template>
  <div id="hospital">
    <div class="btn">
      <el-button
        size="small"
        type="primary"
        icon="el-icon-circle-plus"
        @click="toAdd"
        >新增</el-button
      >
    </div>
    <div class="tableDiv">
      <el-table
        max-height="470"
        size="small"
        :data="tableData"
        style="width: 100%; color: teal"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed type="text" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column
          prop="name"
          label="医院名称"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="introduce"
          label="医院简介"
          width="140"
        ></el-table-column>
        <el-table-column width="150" label="所属地区">
          <template slot-scope="scope"
            >{{ scope.row.province }}-{{ scope.row.city }}-{{
              scope.row.area
            }}</template
          >
        </el-table-column>
        <el-table-column prop="address" label="医院地址"></el-table-column>
        <el-table-column prop="flags" label="标记" width="70"></el-table-column>
        <el-table-column
          prop="longitude"
          label="经度"
          width="90"
        ></el-table-column>
        <el-table-column
          prop="latitude"
          label="纬度"
          width="80"
        ></el-table-column>
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
    <div id="yema">
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
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :before-close="beforeClose"
      class="dialog"
    >
      <!-- {{form}} -->
      <el-dialog
        width="80%"
        :title="'获取' + (form.name ? form.name : '') + '经纬度'"
        :visible.sync="innerVisible"
        append-to-body
      >
        <!--  v-if="form.id" -->
        <el-amap
          :center="
            form.id
              ? [form.longitude, form.latitude]
              : [currentPosition.longitude, currentPosition.latitude]
          "
          vid="amapDemo1"
          :events="events"
          class="map"
        >
          <el-amap-marker
            vid="component-marker"
            :position="markerPosition"
          ></el-amap-marker>
        </el-amap>
      </el-dialog>

      <el-form :model="form" ref="ruleForm" :rules="rules" id="dialog2">
        <el-form-item prop="name" label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="introduce"
          label="介绍"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            v-model="form.introduce"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pca" label="省市区" :label-width="formLabelWidth">
          <el-cascader
            @change="pcaChange"
            :props="{ value: 'label' }"
            v-model="form.pca"
            :options="regionData"
          ></el-cascader>
        </el-form-item>
        <el-form-item
          prop="address"
          label="详细地址"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="flags" label="标记" :label-width="formLabelWidth">
          <el-input v-model="form.flags" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="longitude"
          label="经度"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.longitude" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="latitude"
          label="纬度"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.latitude" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel" class="dialog_footer1">取 消</el-button>
        <el-button
          type="primary"
          @click="innerVisible = true"
          class="dialog_footer2"
          >选取经纬度</el-button
        >
        <el-button
          type="primary"
          @click="toSave('ruleForm')"
          class="dialog_footer3"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
import axios from "../../utils/request";
export default {
  data() {
    return {
      // 当前地理位置对象
      currentPosition: {},
      markerPosition: [
        // this.currentPosition.longitude,
        // this.currentPosition.latitude,
      ],
      events: {
        click: (e) => {
          // console.log(e.lnglat, this.form, "---");
          this.markerPosition = [e.lnglat.lng, e.lnglat.lat];
          this.form.longitude = e.lnglat.lng;
          this.form.latitude = e.lnglat.lat;
        },
      },
      innerVisible: false,
      regionData,
      total: 0,
      // 分页查询的参数
      pageParam: {
        page: 1,
        pageSize: 10,
        name: "",
      },
      multipleSelection: [],
      tableData: [],
      // 模态框可见性 dialog  modal
      visible: false,
      // 模态框的数据
      form: {},
      // 模态框表单控件标题的宽度
      formLabelWidth: "120px",
      // 模态框的标题
      title: "录入医院信息",
      // 表单校验规则
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        introduce: [{ required: true, message: "请输入介绍", trigger: "blur" }],
        pca: [{ required: true, message: "请选择省市区", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        flags: [{ required: true, message: "请输入标记", trigger: "blur" }],
        longitude: [{ required: true, message: "请输入经度", trigger: "blur" }],
        latitude: [{ required: true, message: "请输入纬度", trigger: "blur" }],
      },
    };
  },
  computed: {},
  methods: {
    pcaChange(val) {
      this.form = {
        ...this.form,
        province: val[0],
        city: val[1],
        area: val[2],
      };
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
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val.map((item) => item.id);
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
    // 点击新增按钮
    toAdd() {
      this.form = {};
      this.markerPosition = [
        this.currentPosition.longitude,
        this.currentPosition.latitude,
      ];
      this.title = "录入医院信息";
      this.visible = true;
    },
    // 点击确定按钮
    toSave(formName) {
      this.$refs[formName].validate((valid) => {
        // 校验通过
        if (valid) {
          axios.post("/hospital/saveOrUpdate", this.form).then((res) => {
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
    // 编辑
    handleEdit(row) {
      this.title = "编辑医院信息";
      this.form = {
        ...row,
        pca: [row.province, row.city, row.area],
      };
      this.markerPosition = [this.form.longitude, this.form.latitude];
      this.visible = true;
    },
    // 删除
    handleDelete(id) {
      // id 就是要删除的医院的对象的id
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // await等待后面异步函数运行完毕，拿到响应的数据，然后返回
          let res;
          if (id) {
            res = await axios.get("/hospital/deleteById", { params: { id } });
          } else {
            res = await axios.post("/category/batchDelete", {
              ids: this.multipleSelection.toString(),
            });
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
    // 分页查找
    async pageQuery() {
      let res = await axios.get("/hospital/pageQuery", {
        params: this.pageParam,
      });
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
  },
  created() {
    this.pageQuery();
    this.currentPosition = {
      longitude: 109.501845,
      latitud: 24.305464,
    };
    this.markerPosition = [
      this.currentPosition.longitude,
      this.currentPosition.latitude,
    ];
    // 当前位置;
    // navigator.geolocation.getCurrentPosition(
    //   (data) => {
    //     // console.log(data, "当前地理位置信息");
    //     this.currentPosition = data.coords;
    //     this.markerPosition = [
    //       this.currentPosition.longitude,
    //       this.currentPosition.latitude,
    //     ];
    //   },
    //   (err) => {
    //     console.log(err);
    //   },
    //   {
    //     enableHighAccuracy: true, //高精度
    //     timeout: 5000, //超时时间
    //     maximumAge: 10000, //位置缓存时间
    //   }
    // );
  },
};
</script>
<style scoped>
.tableDiv {
  height: 470px;
}
.map {
  height: 300px;
}

.dialog_footer1 {
  float: left;
  background-color: #4e6ef2;
}
.dialog_footer2 {
  margin-right: 240px;
  background-color: #4e6ef2;
}
.dialog_footer3 {
  background-color: #4e6ef2;
}
#yema,
.btn {
  background-color: #b3c0d1;
}
.dialog {
  background-color: pink;
}
</style>
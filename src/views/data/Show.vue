<template>
  <div id="up">
    <div class="upTop">
      <el-row>
        <el-col :span="13">
          <div class="upLeft1">
            <!-- 菜单栏 -->
            <el-button @click="toAdd">回收</el-button>
            <el-button @click="jumper">新增/修改</el-button>
            <el-button @click="close">关闭/打开音乐</el-button>
            <div class="music">
              <!-- <span> 关闭/打开音乐</span> -->

              <!-- <video id="myVideo" class="video-js">
                <source src="../../assets/kno1.mp4" type="video/mp4" />
              </video> -->
              <audio
                :src="mus"
                id="media-audio"
                loop
                autoplay
                ref="MusicPlay"
              ></audio>
            </div>
            <div class="vedio">
              <!-- <video id="myVideo" class="video-js">
                <source
                  src="../../assets/疫情防控小知识.mp4"
                  type="video/mp4"
                />
              </video> -->
            </div>
          </div>
        </el-col>
        <el-col :span="11"><div id="upRight1"></div></el-col>
      </el-row>
      <!-- <div class="upLeft1"></div>
      <div class="upRight1"></div> -->
    </div>
    <div class="upBottom">
      <el-row>
        <el-col :span="14">
          <div class="upLeft2">
            <el-table
              height="300"
              size="mini"
              :data="tableData"
              style="width: 100%"
            >
              <!-- 批量删除 -->
              <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
              <el-table-column
                align="center"
                prop="date"
                label="序号"
                type="index"
              >
              </el-table-column>
              <el-table-column align="center" prop="country" label="国">
              </el-table-column>
              <el-table-column align="center" prop="province" label="省">
              </el-table-column>
              <el-table-column align="center" prop="city" label="市">
              </el-table-column>
              <el-table-column align="center" prop="area" label="区">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>新增确诊: {{ scope.row.confirmed }}</p>
                    <p>疑似: {{ scope.row.suspected }}</p>
                    <p>死亡: {{ scope.row.dead }}</p>
                    <p>治愈: {{ scope.row.cure }}</p>
                    <p>重症: {{ scope.row.severe }}</p>
                    <p>境外输入: {{ scope.row.outside }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium" type="info">{{
                        scope.row.area
                      }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="inputTime"
                label="上报时间"
                width="180"
              >
                {{ moment(tableData.inputTime).format("YYYY-MM-DD HH:mm:ss") }}
              </el-table-column>
              <el-table-column
                align="center"
                label="操作"
                width="100"
                fixed="right"
              >
                <template slot-scope="scope">
                  <!-- scope.$index表示这一行的索引 scope.row表示这一行的内容 -->

                  <!-- scope.row.id获取行内容的id将其传给后台 -->
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-dialog
              title="数据回收站"
              :visible.sync="visible"
              width="80%"
              :before-close="beforeClose"
            >
              <el-table
                height="300"
                size="mini"
                :data="tableData"
                style="width: 100%"
              >
                <!-- 批量删除 -->
                <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
                <el-table-column
                  align="center"
                  prop="date"
                  label="序号"
                  type="index"
                >
                </el-table-column>
                <el-table-column align="center" prop="country" label="国">
                </el-table-column>
                <el-table-column align="center" prop="province" label="省">
                </el-table-column>
                <el-table-column align="center" prop="city" label="市">
                </el-table-column>
                <el-table-column align="center" prop="area" label="区">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="confirmed"
                  label="新增确诊"
                >
                </el-table-column>
                <el-table-column align="center" prop="suspected" label="疑似">
                </el-table-column>
                <el-table-column align="center" prop="dead" label="死亡">
                </el-table-column>
                <el-table-column align="center" prop="cure" label="治愈">
                </el-table-column>
                <el-table-column align="center" prop="severe" label="重症">
                </el-table-column>
                <el-table-column align="center" prop="outside" label="境外输入">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="inputTime"
                  label="上报时间"
                  width="180"
                >
                  {{
                    moment(tableData.inputTime).format("YYYY-MM-DD HH:mm:ss")
                  }}
                </el-table-column>
                <el-table-column
                  align="center"
                  label="操作"
                  width="100"
                  fixed="right"
                >
                  <!-- scope.$index表示这一行的索引 scope.row表示这一行的内容 -->

                  <!-- scope.row.id获取行内容的id将其传给后台 -->
                  <el-button size="mini" type="danger">删除</el-button>
                </el-table-column>
              </el-table>
              <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="visible = false"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <!-- 分页器 -->
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
              >
              </el-pagination>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div id="upRight2">
            <!-- 放置图表 -->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
var elementResizeDetectorMaker = require("element-resize-detector");
var echarts = require("echarts");
import axios from "../../utils/request";
let moment = require("moment");
import { regionData } from "element-china-area-data";

export default {
  data() {
    return {
      mus: require("../../assets/SUL/musi.mp3"),
      visible: false,
      //模态框数据
      form: [],

      //批量删除
      multipleSelection: "",
      total: 0,
      tableData: [],

      pageParam: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  computed: {},
  methods: {
    close() {
      var audio = document.getElementById("media-audio");
      if (audio.paused) {
        audio.play(); // 播放
      } else {
        audio.pause(); // 暂停
      }
    },
    musicPause() {
      this.$refs.MusicPlay.pause("myVideo");
      this.musicTF = true;
    },

    /**
     * 播放音乐并开始旋转
     */
    musicPlay() {
      this.$refs.MusicPlay.play();
      this.musicTF = false;
    },
    initVideo() {
      //初始化视频方法
      let myPlayer = this.$video(myVideo, {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        autoplay: "muted",
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //设置视频播放器的显示宽度（以像素为单位）
        width: "650px",
        //设置视频播放器的显示高度（以像素为单位）
        height: "300px",
      });
    },
    //模态框关闭之前 X号和遮罩
    beforeClose(done) {
      //   alert(1);
      //   // 关闭模态框的作用
      done();
    },
    // //点击回收站按钮
    toAdd() {
      // this.form = {};
      this.visible = true;
      this.title = "回收站";
    },

    handleDelete(id) {
      //  id是要删除分类的对象的id get第二个参数是配置对象 params:{id:id}由于id:id是一样 的就简写
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await axios.get("/epidemic/deleteById", {
            params: { id },
          });

          // console.log(res);
          this.$notify({
            title: res.status == 200 ? "成功" : "失败",
            message: res.statusText,
            type: res.status == 200 ? "success" : "error",
          });
          // 刷新数据
          this.findEpidemic();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    jumper() {
      this.$router.push({ name: "Up" });
    },
    //图表1
    getOption1() {
      return {
        title: {
          text: "全国疫情分布比例",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          top: "bottom",
          data: ["北京市", "辽宁省", "上海市", "江苏省"],
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
            },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [20, 110],
            center: ["25%", "50%"],
            roseType: "radius",
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [
              { value: 5, name: "北京市" },
              { value: 57, name: "辽宁省" },
              { value: 15, name: "上海市" },
              { value: 21, name: "江苏省" },
            ],
          },
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 110],
            center: ["75%", "50%"],
            roseType: "area",
            data: [
              { value: 5, name: "北京市" },
              { value: 57, name: "辽宁省" },
              { value: 15, name: "上海市" },
              { value: 21, name: "江苏省" },
            ],
          },
        ],
      };
    },
    //图表2
    getOption() {
      return {
        title: {
          text: "全国疫情数据",
        },
        length: {
          data: ["疫情总和"],
        },
        color: ["#b6d9c9"],
        tooltip: {
          trigger: "axis",

          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["确诊", "疑似", "死亡", "治愈", "重症", "境外输入"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "疫情总和",
            type: "line",
            barWidth: "30%",
            data: [38, 9, 9, 6, 29, 10],
          },
          {
            name: "疫情总和",
            type: "bar",
            barWidth: "60%",
            data: [38, 9, 9, 6, 29, 10],
          },
        ],
      };
    },
    toDraw1() {
      let charts = echarts.init(document.getElementById("upRight1"));
      // let option = this.getOption();

      let option = this.getOption1();
      // 使用刚指定的配置项和数据显示图表。
      charts.setOption(option);
    },
    toDraw() {
      // console.log(document.getElementById("currentAdd"), "--------");
      //   基于准备好的dom，初始化echarts实例
      let chart = echarts.init(document.getElementById("upRight2"));
      // let option = this.getOption();

      let option = this.getOption();
      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option);
    },

    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      //   获取后台对应页数的数据
      this.pageParam.page = val;
      //   获取数据
      this.findEpidemic();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      //   获取当前页数的条数
      this.pageParam = {
        ...this.pageParam,
        pageSize: val,
      };
    },
    moment,
    async findEpidemic() {
      let res = await axios.get("/epidemic/pageQuery", {
        params: this.pageParam,
      });
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
  },
  created() {
    this.findEpidemic();
  },
  mounted() {
    this.toDraw();
    this.toDraw1();
  },
};
</script>
<style scoped>
.upTop {
  height: 300px;
  min-height: 300px;
}
.upBottom {
  height: calc(100vh - 300px);
  min-height: 400px;
}
.upleft1 {
  /* width: 40%; */
  height: 500px;
  background-color: burlywood;
}
.vedio {
  width: 650px;
  height: 300px;
  background: url("../../assets/SUL/know.png") no-repeat;
  background-size: 100% 100%;
}
/* .demo-image__lazy {
  height: 200px !important;
  overflow: scroll !important;
} */
#upRight1 {
  height: 300px;
}

.upLeft2 {
  height: 100%;
  border-top: 1px solid black;
  border-right: 1px solid black;
}
#upRight2 {
  height: 300px;
  width: 100%;
  min-height: 300px;
}
</style>
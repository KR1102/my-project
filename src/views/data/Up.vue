<template>
  <div id="up">
    <div class="choice">
      <div class="Adress">
        <el-cascader-panel
          @change="pcaChange"
          :props="{ value: 'label' }"
          v-model="pcaData"
          :options="regionData"
          clearable
        ></el-cascader-panel>
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
      </div>
      <!-- <div header>
        <el-cascader
          v-model="pcaData"
          :options="regionData"
          @change="pcaChange"
        ></el-cascader>
        <el-button @click="toAdd">下一步</el-button>
      </div> -->

      <div class="content">
        <el-dialog
          title="提示"
          :visible.sync="visible"
          width="80%"
          :before-close="beforeClose"
        >
          <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="visible = false">确 定</el-button>
          </span>
        </el-dialog>
        <div class="formDivParent">
          <div class="formDiv sim">
            <el-form
              :model="form"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
            >
              <el-form-item
                min="0"
                type="number"
                size="small"
                label="确诊"
                prop="confirmed"
              >
                <!-- type="number"数值输入框 -->
                <el-input
                  min="0"
                  type="number"
                  size="mini"
                  v-model="form.confirmed"
                  @click="pop"
                ></el-input>
              </el-form-item>
              <el-form-item min="0" size="small" label="疑似" prop="suspected">
                <!-- type="number"数值输入框 -->
                <el-input
                  min="0"
                  type="number"
                  v-model="form.suspected"
                ></el-input>
              </el-form-item>
              <el-form-item min="0" size="small" label="死亡" prop="dead">
                <!-- type="number"数值输入框 -->
                <el-input min="0" type="number" v-model="form.dead"></el-input>
              </el-form-item>
              <el-form-item min="0" size="small" label="治愈" prop="cure">
                <!-- type="number"数值输入框 -->
                <el-input min="0" type="number" v-model="form.cure"></el-input>
              </el-form-item>
              <el-form-item min="0" size="small" label="重症" prop="severe">
                <!-- type="number"数值输入框 -->
                <el-input
                  min="0"
                  type="number"
                  v-model="form.severe"
                ></el-input>
              </el-form-item>
              <el-form-item
                min="0"
                size="small"
                label="境外输入"
                prop="outside"
              >
                <!-- type="number"数值输入框 -->
                <el-input
                  min="0"
                  type="number"
                  v-model="form.outside"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >上报</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <!-- <div class="tipDiv sim">
            温馨提示：
            <br />
            1. 选中城市
            <br />
            2. 录入数据
            <br />
            疫情防控，众志成城
            <br />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../utils/request";
let moment = require("moment");
import { regionData } from "element-china-area-data";
export default {
  data() {
    return {
      mus: require("../../assets/SUL/musi.mp3"),
      visible: false,
      pcaData: "",
      regionData,
      //   提交给后台的数据
      form: {
        country: "中国",
        province: "",
        city: "",
        area: "",
        confirmed: "",
        suspected: "",
        dead: "",
        cure: "",
        severe: "",
        outside: "",
      },
      rules: {
        confirmed: [
          { required: true, message: "请输入正确的确诊数量", trigger: "blur" },
        ],
        suspected: [
          { required: true, message: "请输入正确的疑似数量", trigger: "blur" },
        ],
        dead: [
          { required: true, message: "请输入正确的死亡数量", trigger: "blur" },
        ],
        cure: [
          { required: true, message: "请输入正确的治愈数量", trigger: "blur" },
        ],
        severe: [
          { required: true, message: "请输入正确的重症数量", trigger: "blur" },
        ],
        outside: [
          { required: true, message: "请输入正确的境外数量", trigger: "blur" },
        ],
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
    beforeClose(done) {
      //   alert(1);
      //   // 关闭模态框的作用
      done();
    },
    toAdd() {
      // this.form = {};
      this.visible = true;
      this.title = "回收站";
    },
    moment,
    //上报
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        //验证省市区数据
        if (this.pcaData.length == 0) {
          this.$notify({
            title: "提示",
            message: "请选择省市区",
            type: "warning",
          });
          return;
        }
        if (valid) {
          //保存或更新数据
          let res = await axios.post("/epidemic/saveOrUpdate", this.form);
          this.$notify({
            title: res.status == 200 ? "成功" : "失败",
            message: res.statusText,
            type: res.status == 200 ? "success" : "error",
          });
          //上报后就进行表单清空
          this.form = {};
          this.pcaData = [];
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async pcaChange(val) {
      //   console.log(val);
      // 找到该省市区的当天数据，如果当天有数据，在表单中填充，做修改操作，如果当天没有数据，表单清空，做新增操作
      let res = await axios.get("/epidemic/pageQuery", {
        params: {
          page: 1,
          pageSize: 10,
          province: val[0],
          city: val[1],
          area: val[2],
          inputTime: moment(new Date()).format("YYYY-MM-DD"),
        },
      });
      //   console.log(res.data.list);
      if (res.data.list.length == 0) {
        //要新增
        this.form = {
          country: "中国",
          province: val[0],
          city: val[1],
          area: val[2],
          confirmed: "",
          suspected: "",
          dead: "",
          cure: "",
          severe: "",
          outside: "",
        };
      } else {
        //修改  将拿到的数据全部放入到form中
        this.form = {
          ...res.data.list[0],
        };
      }
    },
    pop() {
      alert(
        "温馨提示数据上报步骤如下:\n1.选中城市\n 2. 录入数据\n  3.点击上报\n 疫情防控，众志成城"
      );
    },
  },
  created() {
    this.pop();
  },
  mounted() {},
};
</script>
<style scoped>
.choice {
  width: 100%;
  height: 100vh;
  background: url("../../assets/SUL/bac5.gif") no-repeat;
  background-size: 100% 100%;
}
.Adress {
  width: 100%;
  height: 190px;
  color: black;
  border: 2px solid rgb(191, 69, 191);
  border-radius: 20px;
  /* margin-left: 30%; */
  background-color: rgb(255, 255, 255, 0.8);
}
/* #up {
  background: url("../../assets/up背景1.jpg") no-repeat;
  width: 100%;
  height: 100vh;
  background-size: 100% 100%;
} */

.formDivParent {
  /* 清除子元素浮动对父元素的影响 */
  width: 50%;
  height: 400px;

  overflow: hidden;
  margin: auto;
}
/* .sim {
  display: inline-block;
} */
.formDiv {
  float: left;
  margin-top: 18px;
  width: 100%;
  margin-right: 5px;
  height: 380px;
  border: 2px solid rgb(191, 69, 191);
  border-radius: 20px;
  /* margin-left: 30%; */
  background-color: rgb(255, 255, 255, 0.8);
}
.tipDiv {
  float: left;
  background-color: darkblue;
  color: red;
  width: 30%;
  height: 100px;
  /* margin-left: 20px; */
  font-size: 12px;
  line-height: 16px;
  font-weight: bold;
}
</style>
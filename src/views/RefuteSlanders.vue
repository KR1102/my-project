<template>
  <div id="refuteSlanders ">
    <div id="carousel">
      <el-carousel
        :interval="4000"
        type="card"
        height="400px"
        indicator-position="outside"
      >
        <el-carousel-item v-for="item in imgs" :key="item.url">
          <!-- <h3 class="medium">{{ item }}</h3> -->
          <img :src="item.url" style="width: 100% hight: 100%" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="title1">辟谣小专区</div>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="辟谣首页">
          <div>
            <!-- <el-row :gutter="20">
              <el-col :span="16" :offset="4">
                <div class="grid-content3 bg-purple">
                  <div class="gdb"></div>
                </div>
              </el-col>
            </el-row> -->

            <el-link>
              <a
                href="https://alihealth.taobao.com/msearch/rumorlist?popup=true&spm=a2o11a.13937218.more.rumors&isextonly=1"
                >查看更多</a
              >
              <i class="el-icon-view el-icon--right"></i>
            </el-link>
          </div>
          <div>
            <el-row :gutter="24">
              <el-col :span="8">
                <div class="grid-content1 bg-purple">
                  <div class="center2">
                    <i class="el-icon-message-solid">这是谣言</i>
                    <div class="title2">第一例新冠来自病毒研究所？</div>
                    <div class="title3">
                      近日有传言说，首个新冠肺炎患者是
                      <br />
                      中科院武汉病毒研究所的研究员，真
                      <br />
                      的假的？
                    </div>
                    <div class="buttonB">
                      <el-button type="success">
                        <a
                          href="https://alihealth.taobao.com/msearch/rumordetail/42?popup=true&spm=a2o11a.13937218.more.rumors&isextonly=1"
                          >查看真相</a
                        >
                      </el-button>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content1 bg-purple">
                  <div class="center2">
                    <i class="el-icon-message-solid">这是谣言</i>
                    <div class="title2">新冠肺炎是全球性流行病？</div>
                    <div class="title3">
                      中国以外的多个国家已确诊新冠肺炎
                      <br />
                      病例，新冠肺炎已经成为全球性的流
                      <br />
                      行病吗？
                    </div>
                    <div class="buttonB">
                      <el-button type="success">
                        <a
                          href="https://alihealth.taobao.com/msearch/rumordetail/31?popup=true&spm=a2o11a.13937218.more.rumors&isextonly=1"
                        >
                          查看真相</a
                        >
                      </el-button>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content1 bg-purple">
                  <div class="center2">
                    <i class="el-icon-message-solid">这是谣言</i>
                    <div class="title2">新型冠状病毒属于SARS病毒?</div>
                    <div class="title3">
                      有院士在湖北新冠肺炎疫情防控工作
                      <br />
                      例行新闻发布会上称「新型冠状病毒
                      <br />
                      属于SARS病毒」，是真的吗？
                    </div>
                    <div class="buttonB">
                      <el-button type="success">
                        <a
                          href="https://alihealth.taobao.com/msearch/rumordetail/55?popup=true&spm=a2o11a.13937218.more.rumors&isextonly=1"
                          >查看真相</a
                        >
                      </el-button>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col>
                <div class="grid-content4 bg-purple">
                  <span class="title2">我还想辟谣</span>
                  <span class="title3"> 有机会被选中成为新辟谣话题！</span>
                  <div class="block">
                    <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
                    <el-carousel height="100px">
                      <el-carousel-item>
                        <h3 class="small">新冠肺炎是全球性流行病</h3>
                      </el-carousel-item>
                      <el-carousel-item>
                        <h3 class="small">核酸检测阳性就是确诊病例</h3>
                      </el-carousel-item>
                      <el-carousel-item>
                        <h3 class="small">第一例新冠来自病毒研究所</h3>
                      </el-carousel-item>
                      <el-carousel-item>
                        <h3 class="small">新冠肺炎是全球性流行病</h3>
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                  <el-button type="primary" @click="visible = true"
                    >新增辟谣</el-button
                  >

                  <el-dialog
                    title="新增辟谣"
                    :visible.sync="visible"
                    :before-close="beforeClose"
                  >
                    <el-form :model="form" :rules="rules" ref="ruleForm">
                      <el-form-item
                        prop="name"
                        label="辟谣名称"
                        :label-width="formLabelWidth"
                      >
                        <el-input
                          v-model="form.name"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                      <el-form-item
                        label="解释"
                        :label-width="formLabelWidth"
                        prop="explain"
                      >
                        <el-input
                          type="textarea"
                          v-model="form.explain"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="toCancel">取 消</el-button>
                      <el-button type="primary" @click="toSave('ruleForm')"
                        >确 定</el-button
                      >
                    </div>
                  </el-dialog>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- <div>治愈出院复查阳性也会传染？</div> -->
        </el-tab-pane>
        <el-tab-pane label="往期回顾">
          <el-divider></el-divider>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div class="center3">
                  <div class="font1">
                    <a
                      href="https://alihealth.taobao.com/msearch/rumordetail/1?popup=true&spm=a2o11a.13937218.more.rumors&isextonly=1"
                      >三文鱼会感染新冠病毒？</a
                    >
                  </div>
                  <div class="font2">2020-06-13</div>
                </div>
                <div class="center1u"></div>
              </div>
              <el-divider></el-divider>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div class="center3">
                  <div class="font1">
                    <a
                      href="https://alihealth.taobao.com/msearch/rumordetail/5?popup=true&spm=a2o11a.13937218.more.rumors&isextonly=1"
                    >
                      猫会感染新型冠状病毒
                    </a>
                  </div>
                  <div class="font2">2020-03-20</div>
                </div>
                <div class="center1r"></div>
              </div>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div class="center3">
                  <div class="font1">
                    <a
                      href="https://alihealth.taobao.com/msearch/rumordetail/9?popup=true&spm=a2o11a.13937218.more.rumors&isextonly=1"
                    >
                      出院复阳患者造成传染
                    </a>
                  </div>
                  <div class="font2">2020-03-20</div>
                </div>
                <div class="center1y"></div>
              </div>
              <el-divider></el-divider>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div class="center3">
                  <div class="font1">
                    <a
                      href="https://alihealth.taobao.com/msearch/rumordetail/11?popup=true&spm=a2o11a.13937218.more.rumors&isextonly=1"
                    >
                      新冠疫苗获批启动临床试验
                    </a>
                  </div>
                  <div class="font2">2020-03-17</div>
                </div>
                <div class="center1r"></div>
              </div>
              <el-divider></el-divider>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div class="center3">
                  <div class="font1">
                    <a
                      href="https://alihealth.taobao.com/msearch/rumordetail/15?popup=true&spm=a2o11a.13937218.more.rumors&isextonly=1"
                    >
                      狗能感染新冠并传染给人
                    </a>
                  </div>
                  <div class="font2">2020-03-09</div>
                </div>
                <div class="center1y"></div>
              </div>
              <el-divider></el-divider>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      visible: false,
      formLabelWidth: "120px",
      /* dialogTableVisible: false,
      : false, */
      form: {},
      rules: {
        //模态框数据校验
        name: [
          //  required: true为必填项 trigger: 'blur'失焦的时候
          { required: true, message: "请输入辟谣名称", trigger: "blur" },
        ],
        explain: [
          //  required: true为必填项 trigger: 'blur'失焦的时候
          { required: true, message: "请输入解释", trigger: "blur" },
        ],
      },
      imgs: [
        {
          url: require("../assets/mqjy1.jpg"),
          // title: "【中国网评】中国疫苗启动接种，为全球抗疫带来曙光",
          // link: "/content1",
        },
        {
          url: require("../assets/mqjy2.jpg"),
          // title: "同舟共济、共克时艰，夺取全球抗疫最终胜利",
          // link: "/content1",
        },
        {
          url: require("../assets/mqjy3.jpg"),
          // title: "寒风中的“疫”线坚守",
          // link: "/content1",
        },
        {
          url: require("../assets/mqjy4.jpg"),
          // title: "河北石家庄市9个地区调整为中风险地区",
          // link: "/content1",
        },
        /*  {
          url: require("../assets/mqjy5.jpg"),
          // title: "钟南山：冬季国内疫情不会大爆发",
          // link: "/content1",
        }, */
        {
          url: require("../assets/mqjy6.jpg"),
          // title: "聆听抗疫故事，致敬抗疫英雄",
          // link: "/content1",
        },
      ],
    };
  },
  computed: {},
  methods: {
    toSave(formName) {
      this.toCancel();
    },
    toCancel() {
      //$refs['ruleForm']获取属性对象 resetFields重置表单
      this.$refs["ruleForm"].resetFields();
      // 不能调用 beforeClose,因为我们不能提供done这个
      this.visible = false;
    },
    //模态框关闭之前 X号和遮罩
    beforeClose(done) {
      // 重置表单
      this.$refs["ruleForm"].resetFields();
      // 关闭模态框的作用
      done();
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
/* .imgTextDiv {
  width: 100%;
  height: 30%;
  background-color: #6e6e6ece;
  position: absolute;
  bottom: 0;
  text-align: center;
  color: #fae3ff;
  font-size: 18px;
  background-size: 100% 100%;
} */
/* .gdb {
  width: 100px;
  height: 100px;
  background: url("../assets/mqjgdb.jpg");
  margin: auto;
  background-size: 100% 100%;
} */
.buttonB {
  margin-top: 20px;
}
a {
  color: rgb(93, 93, 94);
  text-decoration: none;
}
.center2 {
  height: 250px;
  width: 250px;
  position: relative;
  margin: auto;
  /*   background: turquoise; */
}
.font1 {
  color: #000;
  line-height: 70px;
  /* margin-top: 20px; */
  /* padding: 20px; */
}
.title1 {
  margin-top: 30px;
  color: #000;
  font-weight: bolder;
  font-size: 40px;
  text-align: center;
}
.title2 {
  line-height: 40px;
  color: #000;
  font-weight: bolder;
  font-size: 18px;
}
.title3 {
  line-height: 25px;
  color: #999;
  font-size: 15px;
}
i {
  color: #fa6100;
  margin-top: 25px;
  font-size: 20px;
}
.font2 {
  color: #999;
  float: left;
  /* line-height: 30px; */
  font-size: 12px;
}
.center1 {
  float: left;
  width: 300px;
}
.center3 {
  float: left;
  /* background: burlywood; */
  height: 100px;
}
.center1r {
  float: right;
  /* margin-top: -100px; */
  /* margin: auto; */
  width: 100px;
  height: 100px;
  background: url("../assets/mqjr.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.center1y {
  float: right;
  /* margin-top: -160px; */
  width: 100px;
  height: 100px;
  background: url("../assets/mqjy.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.center1u {
  float: right;
  /* margin-top: -100px; */
  /* margin: auto; */
  width: 100px;
  height: 100px;
  background: url("../assets/mqju.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
.el-row {
  margin-bottom: 10px;
}
.grid-content {
  border-radius: 10px;
  height: 100px;
}
.grid-content1 {
  border-radius: 10px;
  height: 250px;
}
.grid-content3 {
  border-radius: 10px;
  height: 500px;
}
.grid-content4 {
  border-radius: 10px;
  height: 300px;
}
/* .bg-purple {
  background: #dddedf;
} */
.block {
  width: 500px;
  margin: auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
/* .bg-purple-dark {
  background: #99a9bf;
} */
</style>
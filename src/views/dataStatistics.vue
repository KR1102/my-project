<template>
  <div id="dataStatistics">
    <div clasa="head">
      <el-row :gutter="24">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="title">全国累计确诊</div>
            <div class="title1">last 30 days</div>
            <div class="title2">97254</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="title">全国累计治愈</div>
            <div class="title1">last 30 days</div>
            <div class="title2">91176</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <!-- <i class="el-icon-watch"></i> -->
            <div class="title">全国累计死亡</div>
            <div class="title1">last 30 days</div>
            <div class="title2">4795</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="title">广西累计确诊</div>
            <div class="title1">last 30 days</div>
            <div class="title2">264</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="title">广西累计治愈</div>
            <div class="title1">last 30 days</div>
            <div class="title2">261</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="title">柳州累计确诊</div>
            <div class="title1">last 30 days</div>
            <div class="title2">24</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="button1">
      <!-- @click="currentData" -->
      <el-button type="success" size="small" @click="addUp">现有确诊</el-button>
      <!--  @click="addUp" -->
      <el-button type="success" size="small" @click="addUp">累计确诊</el-button>
    </div>
    <div id="currentAdd"></div>
    <div>
      <el-row :gutter="24">
        <el-col :span="7">
          <div class="grid-content1 bg-purple">
            <div class="title3">广西省疫情最新消息跟踪</div>
            <div class="title1">来源：澎湃新闻、腾讯网、自动采集</div>
            <div class="block">
              <el-timeline>
                <el-timeline-item
                  timestamp="2021-01-07 12:02:58"
                  placement="top"
                >
                  <el-card>
                    <div class="title4">南宁都知道</div>
                    <a
                      class="title1"
                      href="https://www.163.com/dy/article/FVO4IFJU0525BM5G.html"
                    >
                      国内再现高风险地区！南宁疾控发布重要提醒！还有全国疫情风险等级查询系统来了！
                    </a>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2021-01-06" placement="top">
                  <el-card>
                    <div class="title4">腾讯网</div>
                    <a
                      class="title1"
                      href="https://new.qq.com/rain/a/20210106A0AUXS00"
                    >
                      高风险！南宁疾控发布重要提醒！全国疫情风险地区最新汇总
                    </a>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2021-01-02 10:33" placement="top">
                  <el-card>
                    <div class="title4">澎湃新闻</div>
                    <a
                      class="title1"
                      href="https://www.thepaper.cn/newsDetail_forward_10633993"
                      >最新！广西元旦新增1名密接者，广西疾控发布重要防控建议！</a
                    >
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2021-01-01 13:48" placement="top">
                  <el-card>
                    <div class="title4">澎湃新闻</div>
                    <a
                      class="title1"
                      href="https://www.thepaper.cn/newsDetail_forward_10627217"
                    >
                      最新！广西新增4名密接者；一阶段将给50万人接种疫苗，涉及这5类人群
                    </a>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content1 bg-purple">
            <div class="title3">广西省疫情地图</div>
            <div class="title1">广西省疫情分布</div>
            <div id="currentAdd1"></div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content1 bg-purple">
            <div class="title3">确诊病例数</div>
            <div class="title1">广西省各城市确诊病例占比</div>
            <div id="currentAdd2"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// 引入echarts对象
var echarts = require("echarts");
import "../utils/china.js";
import "../utils/guangxi.js";
export default {
  data() {
    return {
      mydata: [
        { name: "北京", value: this.randomData() },
        { name: "天津", value: this.randomData() },
        { name: "上海", value: this.randomData() },
        { name: "重庆", value: this.randomData() },
        { name: "河北", value: this.randomData() },
        { name: "河南", value: this.randomData() },
        { name: "云南", value: this.randomData() },
        { name: "辽宁", value: this.randomData() },
        { name: "黑龙江", value: this.randomData() },
        { name: "湖南", value: this.randomData() },
        { name: "安徽", value: this.randomData() },
        { name: "山东", value: this.randomData() },
        { name: "新疆", value: this.randomData() },
        { name: "江苏", value: this.randomData() },
        { name: "浙江", value: this.randomData() },
        { name: "江西", value: this.randomData() },
        { name: "湖北", value: this.randomData() },
        { name: "广西", value: this.randomData() },
        { name: "甘肃", value: this.randomData() },
        { name: "山西", value: this.randomData() },
        { name: "内蒙古", value: this.randomData() },
        { name: "陕西", value: this.randomData() },
        { name: "吉林", value: this.randomData() },
        { name: "福建", value: this.randomData() },
        { name: "贵州", value: this.randomData() },
        { name: "广东", value: this.randomData() },
        { name: "青海", value: this.randomData() },
        { name: "西藏", value: this.randomData() },
        { name: "四川", value: this.randomData() },
        { name: "宁夏", value: this.randomData() },
        { name: "海南", value: this.randomData() },
        { name: "台湾", value: this.randomData() },
        { name: "香港", value: this.randomData() },
        { name: "澳门", value: this.randomData() },
      ],
      data1: [
        { name: "南宁市", value: this.randomData1() },
        { name: "百色市", value: this.randomData1() },
        { name: "玉林市", value: this.randomData1() },
        { name: "柳州市", value: this.randomData1() },
        { name: "河池市", value: this.randomData1() },
        { name: "桂林市", value: this.randomData1() },
        { name: "崇左市", value: this.randomData1() },
        { name: "来宾市", value: this.randomData1() },
        { name: "贺州市", value: this.randomData1() },
        { name: "梧州市", value: this.randomData1() },
        { name: "贵港市", value: this.randomData1() },
        { name: "钦州市", value: this.randomData1() },
        { name: "防城港市", value: this.randomData1() },
        { name: "北海市", value: this.randomData1() },
      ],
    };
  },
  computed: {},
  methods: {
    addUp() {
      this.mydata = [
        { name: "北京", value: this.randomData() },
        { name: "天津", value: this.randomData() },
        { name: "上海", value: this.randomData() },
        { name: "重庆", value: this.randomData() },
        { name: "河北", value: this.randomData() },
        { name: "河南", value: this.randomData() },
        { name: "云南", value: this.randomData() },
        { name: "辽宁", value: this.randomData() },
        { name: "黑龙江", value: this.randomData() },
        { name: "湖南", value: this.randomData() },
        { name: "安徽", value: this.randomData() },
        { name: "山东", value: this.randomData() },
        { name: "新疆", value: this.randomData() },
        { name: "江苏", value: this.randomData() },
        { name: "浙江", value: this.randomData() },
        { name: "江西", value: this.randomData() },
        { name: "湖北", value: this.randomData() },
        { name: "广西", value: this.randomData() },
        { name: "甘肃", value: this.randomData() },
        { name: "山西", value: this.randomData() },
        { name: "内蒙古", value: this.randomData() },
        { name: "陕西", value: this.randomData() },
        { name: "吉林", value: this.randomData() },
        { name: "福建", value: this.randomData() },
        { name: "贵州", value: this.randomData() },
        { name: "广东", value: this.randomData() },
        { name: "青海", value: this.randomData() },
        { name: "西藏", value: this.randomData() },
        { name: "四川", value: this.randomData() },
        { name: "宁夏", value: this.randomData() },
        { name: "海南", value: this.randomData() },
        { name: "台湾", value: this.randomData() },
        { name: "香港", value: this.randomData() },
        { name: "澳门", value: this.randomData() },
      ];
      this.toDraw();
    },
    randomData() {
      return Math.round(Math.random() * 1000);
    },
    randomData1() {
      return Math.round(Math.random() * 80);
    },
    getOption() {
      return {
        // backgroundColor: '#FFFFFF',
        title: {
          text: "全国地图大数据",
          subtext: "",
          x: "center",
        },
        tooltip: {
          trigger: "item",
        },
        //左侧小导航图标
        visualMap: {
          show: true,
          x: "left",
          y: "center",
          splitList: [
            { start: 600, end: 1000 },
            { start: 500, end: 600 },
            { start: 400, end: 500 },
            { start: 300, end: 400 },
            { start: 200, end: 300 },
            { start: 100, end: 200 },
            { start: 0, end: 100 },
          ],
          // color: ['#c5d8f4', #d5cef4',#f6d2af', '#dc9470']
          color: [
            "#F44A43",
            "#F77C67",
            "#FA997D",
            "#FCAE8C",
            "#FDCAA0",
            "#FFE6B3",
          ],
          /* color: [
            "orangered",
            "#e0645d",
            "#d8cc85",
            "#cae96e",
            "#92d3e3",
            "#d5cef4",
            "#e6d0d2",
          ], */
        },
        //配置属性
        series: [
          {
            name: "数据",
            type: "map",
            mapType: "china",
            roam: false,
            label: {
              normal: {
                show: true, //省份名称
              },
              emphasis: {
                show: false,
              },
            },
            data: this.mydata, //数据
          },
        ],
      };
    },
    getOption1() {
      return {
        title: {
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c}人",
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        visualMap: {
          min: 0,
          max: 300,
          text: ["High", "Low"],
          realtime: false,
          calculable: true,
          inRange: {
            color: [
              "lightskyblue",
              "yellow",
              "#56dfb8",
              "#9c71ec",
              "orangered",
            ],
          },
        },
        series: [
          {
            name: "数据",
            type: "map",
            mapType: "广西", // 自定义扩展图表类型
            label: {
              show: true,
            },
            data: this.data1,
            /*  // 自定义名称映射
            nameMap: {
              "Central and Western": "中西区",
              Eastern: "东区",
              Islands: "离岛",
              "Kowloon City": "九龙城",
              "Kwai Tsing": "葵青",
              "Kwun Tong": "观塘",
              North: "北区",
              "Sai Kung": "西贡",
              "Sha Tin": "沙田",
              "Sham Shui Po": "深水埗",
              Southern: "南区",
              "Tai Po": "大埔",
              "Tsuen Wan": "荃湾",
              "Tuen Mun": "屯门",
              "Wan Chai": "湾仔",
              "Wong Tai Sin": "黄大仙",
              "Yau Tsim Mong": "油尖旺",
              "Yuen Long": "元朗",
            }, */
          },
        ],
      };
    },
    getOption2() {
      return {
        // backgroundColor: "#0f375f",
        /* legend: {
          orient: "vertical",
          // top: "center",
          right: 2,
          data: [
            "南宁市",
            "百色市",
            "玉林市",
            "柳州市",
            "河池市",
            "桂林市",
            "崇左市",
            "来宾市",
            "贺州市",
            "梧州市",
            "贵港市",
            "钦州市",
            "防城港市",
            "北海市",
          ],
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
        }, */
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}人 ({d}%)",
        },
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: ["30%", "80%"],
            // center: ["40%", "50%"],
            roseType: "radius",
            label: {
              show: true,
              normal: {
                position: "outside",
                fontSize: 12,
              },
            },
            labelLine: {
              length: 1,
              length2: 20,
              smooth: true,
            },
            data: this.data1,
          },
        ],
      };
    },
    toDraw() {
      // console.log(document.getElementById("currentAdd"), "--------");
      //   基于准备好的dom，初始化echarts实例
      let chart = echarts.init(document.getElementById("currentAdd"));
      let option = this.getOption();
      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option);
    },
    toDraw1() {
      // console.log(document.getElementById("currentAdd"), "--------");
      //   基于准备好的dom，初始化echarts实例
      let chart = echarts.init(document.getElementById("currentAdd1"));
      let option = this.getOption1();
      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option);
    },
    toDraw2() {
      // console.log(document.getElementById("currentAdd"), "--------");
      //   基于准备好的dom，初始化echarts实例
      let chart = echarts.init(document.getElementById("currentAdd2"));
      let option = this.getOption2();
      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option);
    },
  },
  created() {
    // console.log("-------", document.getElementById("currentAdd"));
  },
  mounted() {
    this.toDraw();
    this.toDraw1();
    this.toDraw2();
  },
};
</script>
<style scoped>
/* #dataStatistics {
  background: #0f375f;
} */
/* .head {
  height: 300px;
} */
#currentAdd {
  width: 1000px;
  height: 600px;
  margin: auto;
}
#currentAdd1 {
  height: 650px;
  width: 100%;
  /* background: bisque; */
  margin: auto;
}
#currentAdd2 {
  height: 650px;
  width: 100%;
  /* background: bisque; */
  margin: auto;
}
/* .bg-purple {
  background: #e9eaecdc;
} */
.grid-content {
  border-radius: 4px;
  height: 170px;
  text-align: center;
}
.grid-content1 {
  border-radius: 4px;
  height: 750px;
}
.title {
  /* padding: 30px; */
  padding: 12px;
  font-size: 25px;
  font-weight: bold;
  /* line-height: 20px; */
}
.title1 {
  color: #999;
  padding: 5px;
  font-size: 14px;
}
.title2 {
  color: #ff6a57;
  font-size: 45px;
  font-weight: bold;
}
.title3 {
  font-size: 19px;
  padding: 5px;
  font-weight: bold;
}
.title4 {
  font-size: 14px;
  font-weight: bold;
  color: rgb(154, 224, 107);
}
.button1 {
  margin-top: 10px;
}
.center {
  color: #999;
  margin-bottom: 5px;
}
.currentBg {
  background-color: #eefaff;
  height: 100px;
  border-radius: 5px;
  font-size: 15px;
  /* 设置边距 */
  padding: 20px 0;
  /* 设置height为整个容器的高度 */
  box-sizing: border-box;
  text-align: center;
  line-height: 30px;
  font-weight: bold;
  margin-bottom: 5px;
}
</style>
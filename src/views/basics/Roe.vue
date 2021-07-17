<template>
  <transition name="el-zoom-in-top">
    <div class="roe">
      <div class="head">
        <div class="btn"></div>
      </div>

      <!-- //评论 -->
      <transition name="el-zoom-in-center">
        <div v-if="isdiscuss" class="commentArea">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="当前" name="first"></el-tab-pane>
            <el-tab-pane label="精选评论" name="second">
              <div class="heade2" @click="Visible = true">
                <span>精选评论</span>
              </div></el-tab-pane
            >
            <el-tab-pane label="精华资讯" name="third"
              ><div class="heade1" @click="dialogVisible = true">
                <span>精华资讯</span>
              </div></el-tab-pane
            >
            <el-tab-pane label="定时任务补偿" name="fourth"
              ><div class="heade2">
                <span>定时任务补偿</span>
              </div></el-tab-pane
            >
          </el-tabs>
          <div class="sit">
            <div>
              <el-dialog :visible.sync="dialogVisible" width="70%">
                <span v-html="tableData1.content"></span>
                <el-button type="primary" @click="dialogVisible = false"
                  >关 闭</el-button
                >
              </el-dialog>

              <el-dialog :visible.sync="Visible" width="70%">
                <span v-html="tableData2.content"></span>
                <el-button type="primary" @click="Visible = false"
                  >关 闭</el-button
                >
              </el-dialog>
              <div class="wenzi">
                <div class="h2"><h1>讨论：众志成城，我们必胜！</h1></div>
                <div>
                  <div class="block">
                    <el-carousel indicator-position="outside">
                      <el-carousel-item v-for="item in phoneData" :key="item">
                        <img :src="item.url" alt="" />
                      </el-carousel-item>
                    </el-carousel>
                  </div>

                  <div class="p2">
                    <p>
                      2月12日0—24时，31个省（自治区、直辖市）和新疆生产建设兵团报告新增确诊病例15152例（含湖北临床诊断病例13332例），重症病例减少174例，新增死亡病例254例（湖北242例，河南2例，天津、河北、辽宁、黑龙江、安徽、山东、广东、广西、海南、新疆生产建设兵团各1例），新增疑似病例2807例。
                      当日新增治愈出院病例1171例，解除医学观察的密切接触者29429人。
                      截至2月12日24时，据31个省（自治区、直辖市）和新疆生产建设兵团报告，现有确诊病例52526例（其中重症病例8030例），累计治愈出院病例5911例，累计死亡病例1367例，累计报告确诊病例59804例，现有疑似病例13435例。累计追踪到密切接触者471531人，尚在医学观察的密切接触者181386人。
                      湖北新增确诊病例14840例（武汉13436例），新增治愈出院病例802例（武汉538例），新增死亡病例242例（武汉216例），现有确诊病例43455例（武汉30043例），其中重症病例7084例（武汉5426例）。累计治愈出院病例3441例（武汉1915例），累计死亡病例1310例（武汉1036例），累计确诊病例48206例（武汉32994例）。新增疑似病例1377例（武汉620例），现有疑似病例9028例（武汉4904例）。
                      累计收到港澳台地区通报确诊病例78例：香港特别行政区50例（死亡1例，出院1例），澳门特别行政区10例（出院2例），台湾地区18例(出院1例)。
                      湖北首次将临床诊断病例纳入新增确诊
                      据悉，为做好新型冠状病毒肺炎患者早诊早治，落实好湖北病例应收尽收、应治尽治工作，按照《新型冠状病毒肺炎诊疗方案（试行第五版修正版）》，对湖北省以及湖北省以外其他省份的病例诊断标准进行了区分，湖北省增加了“临床诊断病例”分类，对疑似病例具有肺炎影像学特征者，确定为临床诊断病例，以便患者能及早按照确诊病例相关要求接受规范治疗，进一步提高救治成功率。
                    </p>
                  </div>
                </div>
              </div>

              <div class="pl">
                <el-button type="primary" title="" @click="pin"
                  >发 表 评 论</el-button
                >
              </div>
            </div>

            <div class="comment0">
              <div class="comment1" v-for="item in commentData" :key="item">
                <el-row :gutter="24">
                  <el-col :span="1"
                    ><div class="phone">
                      <img :src="item.url" alt="" width="40px" height="40px" />
                    </div>
                  </el-col>
                  <el-col :span="20"
                    ><div>{{ item.data }}</div></el-col
                  >

                  <el-col :span="3"
                    ><div class="reply">
                      <el-badge :value="item.value[0]" class="item">
                        <el-button size="small" @click="pin">评论</el-button>
                      </el-badge>

                      <el-badge :value="item.value[1]" class="item">
                        <el-button size="small" @click="hui">回复</el-button>
                      </el-badge>
                    </div></el-col
                  >
                </el-row>
              </div>
            </div>
            <el-dialog :title="title" :visible.sync="v">
              <el-form :model="form" ref="ruleForm" :rules="rules">
                <el-form-item prop="realname" :label-width="formLabelWidth">
                  <el-input
                    type="text"
                    v-model="to"
                    autocomplete="off"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="v = false">发 表</el-button>
              </div>
            </el-dialog>
          </div>
          <el-button class="bn" type="primary" plain @click="isdiscuss = false"
            >发布站</el-button
          >
        </div>
      </transition>
      <transition name="el-zoom-in-center">
        <div v-if="!isdiscuss" class="station">
          <div class="bk">
            <div class="wztitle">
              <h1>最新疫情相关帖子</h1>
            </div>
          </div>
          <div class="wenzhang">
            <div v-for="item in articleData" :key="item" class="wenz">
              <div class="img">
                <img :src="item.url" alt="" width="200px" height="200px" />
              </div>
              <div class="wzp">
                <p>
                  {{ item.data }}
                </p>
              </div>
            </div>
          </div>

          <el-button class="bn" type="primary" plain @click="isdiscuss = true"
            >讨论区</el-button
          >
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import axios from "../../utils/request";
import Tinymce from "../../components/Tinymce/index";
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
export default {
  components: {
    // 组件名(标签名):组件对象
    tinymce: Tinymce,
  },
  data() {
    return {
      todo: "",
      to: "",
      todolist: [],
      v: false,
      form: {},
      show3: true,
      title: "",
      currentArticle: {},
      tableData1: [],
      tableData2: [],
      phoneData: [
        {
          url: require("../../assets/zkr/一.jpg"),
        },

        {
          url: require("../../assets/zkr/二.jpg"),
        },

        {
          url: require("../../assets/zkr/三.jpg"),
        },
        {
          url: require("../../assets/zkr/四.jpg"),
        },
      ],
      articleData: [
        {
          url: require("../../assets/zkr/一.jpg"),
          data:
            "根据法国公共卫生部门9月2日公布的数据显示，截至当天，法国24小时新增新冠肺炎确诊病例7017例，新增聚集性感染39起。据报道，法国新学年开始仅一天，法国各地就有多所学校被曝出现感染病例而被迫关闭。在西班牙，根据西班牙卫生部当天公布的最新数据显示，过去7天内西班牙新增新冠肺炎确诊病例数达到47423例。西班牙卡洛斯三世研究所的研究结果显示，西班牙的第二波新冠肺炎疫情大流行始于7月27日，迄今为止第二波新冠肺炎疫情大流行造成的死亡人数至少有2540人。截至当地时间9月2日，英国单日新增新冠肺炎确诊病例1508例。英国卫生大臣汉考克警告说，欧洲大陆已经出现了第二波因为新冠疫情而入院的人数激增的情况，英国必须竭尽所能阻止这一情况的发生。",
        },
        {
          url: require("../../assets/zkr/二.jpg"),
          data:
            "根据法国公共卫生部门9月2日公布的数据显示，截至当天，法国24小时新增新冠肺炎确诊病例7017例，新增聚集性感染39起。据报道，法国新学年开始仅一天，法国各地就有多所学校被曝出现感染病例而被迫关闭。在西班牙，根据西班牙卫生部当天公布的最新数据显示，过去7天内西班牙新增新冠肺炎确诊病例数达到47423例。西班牙卡洛斯三世研究所的研究结果显示，西班牙的第二波新冠肺炎疫情大流行始于7月27日，迄今为止第二波新冠肺炎疫情大流行造成的死亡人数至少有2540人。截至当地时间9月2日，英国单日新增新冠肺炎确诊病例1508例。英国卫生大臣汉考克警告说，欧洲大陆已经出现了第二波因为新冠疫情而入院的人数激增的情况，英国必须竭尽所能阻止这一情况的发生。",
        },
        {
          url: require("../../assets/zkr/三.jpg"),
          data:
            "根据法国公共卫生部门9月2日公布的数据显示，截至当天，法国24小时新增新冠肺炎确诊病例7017例，新增聚集性感染39起。据报道，法国新学年开始仅一天，法国各地就有多所学校被曝出现感染病例而被迫关闭。在西班牙，根据西班牙卫生部当天公布的最新数据显示，过去7天内西班牙新增新冠肺炎确诊病例数达到47423例。西班牙卡洛斯三世研究所的研究结果显示，西班牙的第二波新冠肺炎疫情大流行始于7月27日，迄今为止第二波新冠肺炎疫情大流行造成的死亡人数至少有2540人。截至当地时间9月2日，英国单日新增新冠肺炎确诊病例1508例。英国卫生大臣汉考克警告说，欧洲大陆已经出现了第二波因为新冠疫情而入院的人数激增的情况，英国必须竭尽所能阻止这一情况的发生。",
        },
        {
          url: require("../../assets/zkr/四.jpg"),
          data:
            "根据法国公共卫生部门9月2日公布的数据显示，截至当天，法国24小时新增新冠肺炎确诊病例7017例，新增聚集性感染39起。据报道，法国新学年开始仅一天，法国各地就有多所学校被曝出现感染病例而被迫关闭。在西班牙，根据西班牙卫生部当天公布的最新数据显示，过去7天内西班牙新增新冠肺炎确诊病例数达到47423例。西班牙卡洛斯三世研究所的研究结果显示，西班牙的第二波新冠肺炎疫情大流行始于7月27日，迄今为止第二波新冠肺炎疫情大流行造成的死亡人数至少有2540人。截至当地时间9月2日，英国单日新增新冠肺炎确诊病例1508例。英国卫生大臣汉考克警告说，欧洲大陆已经出现了第二波因为新冠疫情而入院的人数激增的情况，英国必须竭尽所能阻止这一情况的发生。",
        },
        {
          url: require("../../assets/zkr/二.jpg"),
          data:
            "根据法国公共卫生部门9月2日公布的数据显示，截至当天，法国24小时新增新冠肺炎确诊病例7017例，新增聚集性感染39起。据报道，法国新学年开始仅一天，法国各地就有多所学校被曝出现感染病例而被迫关闭。在西班牙，根据西班牙卫生部当天公布的最新数据显示，过去7天内西班牙新增新冠肺炎确诊病例数达到47423例。西班牙卡洛斯三世研究所的研究结果显示，西班牙的第二波新冠肺炎疫情大流行始于7月27日，迄今为止第二波新冠肺炎疫情大流行造成的死亡人数至少有2540人。截至当地时间9月2日，英国单日新增新冠肺炎确诊病例1508例。英国卫生大臣汉考克警告说，欧洲大陆已经出现了第二波因为新冠疫情而入院的人数激增的情况，英国必须竭尽所能阻止这一情况的发生。",
        },
      ],
      commentData: [
        {
          url: require("../../assets/zkr/1.jpg"),
          data:
            ":河北加油，石家庄加油，我的家乡加油✊ 致敬所有奋战在抗击疫情一线的医护和工作人员,你们辛苦了",
          value: [2, 3],
        },

        {
          url: require("../../assets/zkr/2.jpg"),
          data: ":真的是一方有难八方支援，我们南宫人民谢谢大家了，多谢，感恩",
          value: [62, 43],
        },

        {
          url: require("../../assets/zkr/3.jpg"),
          data: ":官宣了，病毒太狡猾了。出门带口罩😷不乱走动，聚集！",
          value: [22, 3],
        },
        {
          url: require("../../assets//zkr/4.jpg"),
          data:
            ":年终将至，疫情又反弹了，大家出门在外多注意防护，戴口罩，勤消毒，勤洗手",
          value: [12, 3],
        },
        {
          url: require("../../assets/zkr/5.jpg"),
          data: ":希望疫情赶紧过去 ",
          value: [7, 3],
        },
        {
          url: require("../../assets/zkr/2.jpg"),
          data: ":真的是一方有难八方支援，我们南宫人民谢谢大家了，多谢，感恩",
          value: [62, 43],
        },

        {
          url: require("../../assets/zkr/3.jpg"),
          data: ":官宣了，病毒太狡猾了。出门带口罩😷不乱走动，聚集！",
          value: [22, 3],
        },
        {
          url: require("../../assets/zkr/4.jpg"),
          data:
            ":年终将至，疫情又反弹了，大家出门在外多注意防护，戴口罩，勤消毒，勤洗手",
          value: [12, 3],
        },
        {
          url: require("../../assets/zkr/5.jpg"),
          data: ":希望疫情赶紧过去 ",
          value: [7, 3],
        },
      ],
      dialogVisible: false,
      Visible: false,
      isdiscuss: true,
      tableData: [],
      pageParam: {
        page: 1,
        pageSize: 10,
        categoryId: 3,
      },
    };
  },
  computed: {},
  methods: {
    pin() {
      this.to = "";
      this.form = {};
      this.title = "评论";
      this.v = true;
    },
    hui() {
      this.form = {};
      this.to = "";

      this.title = "回复";
      this.v = true;
    },
    async pageQuery() {
      let res = await axios.get("/article/pageQuery", {
        params: this.pageParam,
      });

      this.tableData = res.data.list;
      this.tableData1 = this.tableData[0];
      this.tableData2 = this.tableData[1];
    },
  },
  created() {
    this.pageQuery();
  },
  mounted() {},
};
</script>
<style  scoped>
.roe > p {
  color: rgba(117, 111, 111, 0.603) !important;
}
.p2 {
  width: 60%;
  min-height: 200px;
  max-width: 900px;
  padding: 35px;
  border-width: 0 0 0 1px;
  border-style: solid;
  margin: 10px !important;
  float: right;
}
/* .head {
  margin: 0 auto; 
   background: url("../../assets/12.png"); 
   padding: 0 20px;

  width: calc(100% - 40px);
  border-radius: 10px;
  height: 40px;
  border: 2px #c5119873 solid;
  line-height: 80px;
  background-color: #c5119873;
} */
.head .btn {
  margin-bottom: 0px;
}
.wenzi {
}
.heade1 {
  color: #f8f8f8;
  text-align: center;
  height: 30px;
  line-height: 30px;
  width: 150px;
  background-color: #ff722c41;

  border-radius: 5px;
}
.h2 {
  border-width: 1px 0 1px 0;
  border-style: solid;
}
.heade2 {
  background-color: #ff087b4d;
  color: #ffffff;

  text-align: center;
  height: 30px;
  line-height: 30px;
  width: 150px;
  border-radius: 5px;
}
.commentArea {
  width: calc(100% - 40px);
  min-height: 1000px;
  /* background: url("../../assets/bk5.jpg") no-repeat center; */
  /* background-size: 100% 100%; */
  overflow: auto;

  /* background-color: wheat; */
}
.pl {
  width: 200px;
  height: 60px;
  clear: both;
  position: relative;
  left: 20px;
  /* background-color: #ffffff23; */
  text-align: center;
}
.pl > button {
  position: relative;
  top: 20px;
  right: 60px;
}
.comment0 {
  background-color: #ffffff23;
  border-width: 1px 0 1px 0;
  border-style: solid;
  height: 300px;
  overflow: auto;
  width: 100%;
}
.comment1 {
  color: #000000;

  line-height: 50px;
  width: calc(100% - 20px);

  /* position: relative; */
  border-radius: 5px;
}
.reply {
  float: right;
}
.block {
  float: left;
  position: relative;
  top: 60px;
  left: 90px;
  width: 28%;
  height: 400 px;
}
/* .block1 {
  width: 100%;
} */

.station {
  width: calc(100% - 40px);

  /* text-align: center; */
  background-color: #ffffff;
  /* min-height: 750px; */
  /* background: url("../../assets/bk3.jpg") no-repeat center; */
  /* background-size: 100% 100%; */
}
.bk {
  /* height: 200px !important; */
  /* position: relative; */
  /* bottom: 230px; */
  width: 100%;
  height: 400px;
  background-color: #ffffff;
  overflow: auto;
  background: url("../../assets/zkr/bk6.jpg") no-repeat center;
  background-size: 100% 400px;
}
.wenzhang {
  margin: 0 auto;
  width: 800px;
  overflow: auto;
  position: relative;
  bottom: 300px;
  max-height: 600px;
  background-color: #ffffff;
  min-height: 500px;
}
.wenzhang .wenz {
}
.wenzhang .wztitle {
  position: relative;
  left: 500px;
  /* bottom: calc(100% +10px); */
}
.wenzhang .img {
  padding: 0 20px;
  width: 25%;
  border-width: 0 1px 0 0;
  border-style: solid;
  position: relative;
  top: 15px;
  float: left;
}
.wenzhang .wzp {
  margin: 0 20px;
  float: left;

  width: 60%;
}
.bn {
  position: fixed;
  right: 90px;
  bottom: 30px;
}
</style>
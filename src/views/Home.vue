<template>
  <div class="home">
    <!-- 头部封面 -->
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="header">
      <img src="../assets/images-wal/疫情.png" style="width: 100%" />
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@############@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
    <!-- 疫情数据一览 -->
    <div>
      <div class="til">疫情数据一览</div>
      <!-- 数据概况 -->
      <el-button
        type="primary"
        plain
        @click="
          (show2 = false),
            (show1 = true),
            (inlandShow = true),
            (stateShow = false)
        "
        >国内疫情</el-button
      >
      <el-button
        type="primary"
        plain
        @click="
          (show2 = true),
            (show1 = false),
            (inlandShow = false),
            (stateShow = true)
        "
        >国外疫情</el-button
      >
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false" @click="show2 = false,show1 = true,inlandShow=true,stateShow=false">展开</el-radio-button>
        <el-radio-button :label="true" @click="show2 = true,show1 = false,inlandShow=false,stateShow=true">收起</el-radio-button>
      </el-radio-group> -->
      <!-- 国内数据概况 -->
      <el-row type="flex" class="row-bg" v-show="show1" :gutter="20">
        <el-col :span="6" v-for="item in chinaData" :key="item">
          <div
            shadow="hover"
            v-bind:style="item.colorBg"
            class="grid-content bg-purple"
          >
            <div :style="item.colorNum">{{ item.num }}</div>
            <div :style="item.colorNum">{{ item.name }}</div>
          </div>
        </el-col>
        <!-- <el-col :span="6"><div class="grid-content ce">48664</div></el-col> -->
        <!-- <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col> -->
      </el-row>
      <!-- 国外数据概况 -->
      <el-row type="flex" class="row-bg" v-show="show2" :gutter="20">
        <el-col :span="6" v-for="item in worldData" :key="item">
          <div class="grid-content bg-purple" v-bind:style="item.colorBg">
            <div :style="item.colorNum">{{ item.num }}</div>
            <div :style="item.colorNum">{{ item.name }}</div>
          </div>
        </el-col>
      </el-row>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@############@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
      <!-- 具体到各省份/国家地区的数据 -->
      <!-- 国内各省份数据 -->
      <div v-show="inlandShow">
        <el-table
          :header-cell-style="cellClass"
          :data="inlandData"
          height="500"
          border
          style="width: 100%"
          stripe
          :default-sort="{ prop: 'nowConfirmed', order: 'descending' }"
        >
          <el-table-column
            prop="province"
            label="省份/地区"
            sortable
          ></el-table-column>
          <el-table-column
            prop="nowConfirmed"
            label="现存确诊"
            sortable
          ></el-table-column>
          <el-table-column
            prop="historyConfirmed"
            label="累计确诊"
            sortable
          ></el-table-column>
          <el-table-column prop="dead" label="死亡" sortable></el-table-column>
          <el-table-column prop="cure" label="治愈" sortable></el-table-column>
        </el-table>
      </div>

      <!-- 世界主要国家和地区疫情数据 -->
      <div v-show="stateShow">
        <el-table
          :header-cell-style="cellClass"
          :data="stateData"
          height="500"
          border
          style="width: 100%"
          stripe
          :default-sort="{ prop: 'nowConfirmed', order: 'descending' }"
        >
          <el-table-column
            prop="state"
            label="国家/地区"
            sortable
          ></el-table-column>
          <el-table-column
            prop="nowConfirmed"
            label="现存确诊"
            sortable
          ></el-table-column>
          <el-table-column
            prop="historyConfirmed"
            label="累计确诊"
            sortable
          ></el-table-column>
          <el-table-column prop="dead" label="死亡" sortable></el-table-column>
          <el-table-column prop="cure" label="治愈" sortable></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 小注释 -->
    <span class="annotation"
      >以上数据来自国家和各地方卫健委，截至{{
        this.moment(new Date()).format("Y年M月D日")
      }}</span
    >
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@############@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
    <!-- 走马灯 疫情新闻图片连播 -->
    <div class="til">疫情新闻资讯</div>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <div id="carousel">
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in imgs" :key="item.url">
          <!-- <h3 class="medium">{{ item }}</h3> -->
          <div
            @click="
              imgArticle = item;
              dialogVisible2 = true;
            "
          >
            <div class="imgTextDiv">
              <p>{{ item.title }}</p>
            </div>
            <img :src="item.url" style="width: 100%" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 展示图片内容文章的模态框 -->
    <el-dialog :visible.sync="dialogVisible2" width="50%">
      <!-- <div>{{ moment(currentArticle.publishTime).format("YYYY-MM-DD HH:mm:ss") }}</div> -->
      <!-- v-html可以将代码片段字符串设置到内部内容区 -->
      <span class="imgWidth" v-html="imgArticle.content"></span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible2 = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@############@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
    <!-- 疫情资讯 -->
    <!-- 分割线 -->
    <el-divider></el-divider>
    <div>
      <el-button
        type="primary"
        plain
        @click="
          plateChange();
          findArticle();
        "
        >全部</el-button
      >
      <el-button
        type="primary"
        plain
        @click="
          plateChange();
          findNewestArticle();
        "
        >最新进展</el-button
      >
      <el-button
        type="primary"
        plain
        @click="
          plateChange();
          findNoticeArticle();
        "
        >公告</el-button
      >
      <el-button
        type="primary"
        plain
        @click="
          plateChange();
          findVaccineArticle();
        "
        >疫苗动态</el-button
      >
      <el-button
        type="primary"
        plain
        @click="
          plateChange();
          findStoryArticle();
        "
        >抗疫故事</el-button
      >
      <!-- 小注释 -->
      <span class="annotation" style="float: right; font-size: 20px"
        >点击文章标题可查看详情</span
      >
      <!-- 列表展示区域 -->
      <div>
        <div class="contentList">
          <div
            v-for="item in listData"
            :key="item.id"
            @click="
              currentArticle = item;
              dialogVisible = true;
            "
          >
            <div class="listContent">
              <span>{{ item.title }}</span>
              <span style="float: right"
                >最后发布于{{
                  moment(item.publishTime).format("YYYY-MM-DD HH:mm:ss")
                }}</span
              >
              <span style="float: right; margin-right: 50px">{{
                item.category.name
              }}</span>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="contentPage">
          <el-pagination
            @current-change="currentChange"
            background
            layout="prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
      <!-- 展示文章的模态框 -->
      <el-dialog :visible.sync="dialogVisible" width="70%">
        <div>
          {{ moment(currentArticle.publishTime).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
        <!-- v-html可以将代码片段字符串设置到内部内容区 -->
        <span class="imgWidth" v-html="currentArticle.content"></span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">
            确 定
          </el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@############@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
    <!-- 谣言排行榜 -->
    <div>
      <div class="til">谣言榜</div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 时间线、谣言卡片 -->
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="item in rumorData"
            :key="item.name"
            timestamp=""
            placement="top"
            :color="timelineStyle.color"
          >
            <el-card style="border-radius: 30px; border-color: #bf45bf">
              <!-- <el-tag type="danger">谣言</el-tag> -->
              <img
                class="logo"
                src="../assets/images-wal/千库网_新型冠状病毒防疫杜绝谣言标志_元素编号12812100.png"
              />
              <span class="textT">{{ item.name }}</span>
              <p>{{ item.explode }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@############@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
    <!-- 疫情通识 -->
    <div>
      <div class="til">防疫必备知识</div>
      <div>
        <el-timeline>
          <el-timeline-item
            v-for="item in knowledgeData"
            :key="item"
            timestamp=""
            placement="top"
            :color="timelineStyle.color"
          >
            <el-row :gutter="12">
              <el-col>
                <div
                  @click="
                    knowledgeArticle = item;
                    dialogVisible1 = true;
                  "
                >
                  <el-card shadow="hover">
                    <!-- 记得src前面要加冒号！！！ -->
                    <div style="width: 150px; float: left">
                      <img :src="item.imgUrl" style="width: 100%" />
                    </div>
                    <div class="kown">
                      <span>{{ item.title }}</span>
                      <!-- <span>{{item.content}}</span> -->
                    </div>
                    <!-- 小注释 -->
                    <span
                      class="annotation"
                      style="float: right; font-size: 20px"
                      >详情</span
                    >
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </el-timeline-item>
        </el-timeline>
      </div>
      <!-- 展示疫情知识文章的模态框 -->
      <el-dialog
        :title="knowledgeArticle.title"
        :visible.sync="dialogVisible1"
        width="50%"
      >
        <!-- <div>{{ moment(currentArticle.publishTime).format("YYYY-MM-DD HH:mm:ss") }}</div> -->
        <!-- v-html可以将代码片段字符串设置到内部内容区 -->
        <span class="imgWidth" v-html="knowledgeArticle.content"></span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible1 = false">
            确 定
          </el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@############@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
    <!-- 底部温馨小提示 -->
    <div>
      <el-row :gutter="12">
        <el-col>
          <el-card shadow="hover">
            <div class="footertitle">
              <span>查看更多数据，请移步左侧菜单栏。</span>
              <span
                >温馨提醒浏览到这里的您：早发现、早报告、早隔离、早治疗，对自己负责，对他人负责。</span
              >
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@############@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from "../utils/request";
let moment = require("moment");
export default {
  name: "Home",
  data() {
    return {
      // isCollapse: true,
      // 最新进展数据
      listData: [],
      // 当前查看内容的资讯对象
      currentArticle: {},
      knowledgeArticle: {},
      imgArticle: {},
      // 进展数据总数
      total: 0,
      //分页参数
      pageParam: {
        page: 1,
        pageSize: 10,
        categoryId: "",
      },
      //新闻资讯模块的状态
      show1: true,
      show2: false,
      //轮播图片的数组
      imgs: [
        {
          url: require("../assets/images-wal/中国疫苗启动接种，为全球抗疫带来曙光.jpg"),
          title: "【中国网评】中国疫苗启动接种，为全球抗疫带来曙光",
          content: `<p><span class="el-dialog__title">【中国网评】中国疫苗启动接种，为全球抗疫带来曙光</span></p>
            <div class="el-dialog__body">
            <div data-v-fae5bece="">2021-01-08 10:40:34</div>
            <div class="content_18313" style="text-size-adjust: none; margin: 0px; padding: 0px 100px; color: #000000; font-family: PingFangSC-Regular, Helvetica, Arial, 'Microsoft Yahei', sans-serif; font-size: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div id="title_area" class="title_area" style="text-size-adjust: none; margin: 0px 0px 35px; padding: 0px; color: #333333;">
            <h1 style="text-size-adjust: none; padding: 0px; margin: 0px; list-style: none; font-weight: normal; font-size: 30px; line-height: 45px;" data-spm-anchor-id="C73544894212.P59511941341.0.i0">【中国网评】中国疫苗启动接种，为全球抗疫带来曙光</h1>
            <div class="info" style="text-size-adjust: none; margin: 21px 0px 0px; padding: 0px; color: #999999; display: block; font-size: 14px; line-height: 14px;" data-spm-anchor-id="C73544894212.P59511941341.0.i3">来源：<a style="text-decoration: none; outline: none; color: #999999;" href="http://www.china.com.cn/opinion/2021-01/06/content_77084689.html" target="_blank" rel="noopener" data-spm-protocol="i">中国网</a>&nbsp;| 2021年01月07日 16:29</div>
            <h6 id="sourcetitle" style="text-size-adjust: none; padding: 0px; margin: 13px 0px 0px; list-style: none; font-weight: normal; font-size: 14px; line-height: 18px; color: #999999; display: block;">原标题：【中国网评】中国疫苗启动接种，为全球抗疫带来曙光</h6>
            </div>
            <div id="text_area" class="text_area" style="text-size-adjust: none; margin: 0px; padding: 0px; display: block;">&nbsp;</div>
            <div id="content_area" class="content_area" style="text-size-adjust: none; margin: 0px; padding: 0px; overflow: hidden; display: block;">
            <p class="photo_img_20190808" style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 0px; color: #333333; word-break: break-all; text-align: center;"><img style="border: none; margin: 0px auto; padding: 0px; display: block; max-width: 1000px; text-align: center;" src="https://p1.img.cctvpic.com/photoworkspace/contentimg/2021/01/07/2021010716290037448.jpg" alt="" /></p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　随着中国国家药监局批准国药集团的一款新冠病毒灭活疫苗附条件上市，北京、武汉等多个城市已开始对重点人群有序开展疫苗接种工作。此外，巴西、印尼等国也开始分发订购的中国科兴公司疫苗，并即将开启大规模接种。正如英国广播公司1月2日评论称，这让世界向结束新冠疫情迈进一步。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　中国疫苗上市并启动接种，有力回击了西方的质疑抹黑。在各国疫苗研发之初，中国就处于第一梯队，多种疫苗率先进入一期、二期、三期临床试验，与欧美疫苗不遑多让。既出于戴着有色眼镜审视中国的传统偏见，也为了打压这个来自东方的疫苗竞争对手，西方媒体、专家抹黑诋毁中国疫苗的声音一直存在。他们以&ldquo;数据不透明&rdquo;为由，质疑中国公司疫苗的安全性，并毫无根据地宣称中国疫苗可能无法按时按量供给。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　随着国药集团公布数据称，疫苗针对由新冠病毒感染引起的疾病（COVID-19）的保护效力为79.34%，到国务院联防联控机制宣布其获批上市，再到如今中国多地开始有序为民众接种本土生产的疫苗，西方的猜测、质疑甚至抹黑，已再无生存的土壤。英国经济学人智库专家伊莫金&middot;佩格里特表示，有理由相信中国疫苗的安全性和有效性，如果疫苗有问题，中国政府不可能给民众接种，因为那将会给政府带来巨大负面影响。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;" data-spm-anchor-id="C73544894212.P59511941341.0.i1">　　中国疫苗上市并启动接种，极大增强了发展中国家战胜疫情的信心。据《洛杉矶时报》测算，要战胜疫情，需要全球80%的人口接种疫苗，鉴于目前疫苗都需要注射两针，总计需要120亿剂，按照目前各公司的产能，需要到2024年才能实现接种目标。而根据上个月杜克大学的追踪数据，发达国家普遍存在超额订购现象，总计已订购90亿支新冠疫苗，人口仅有3.3亿的美国甚至已经购买了26亿支。这必然导致在发达国家和发展中国家之间形成&ldquo;接种鸿沟&rdquo;，并拖累后者重启经济，让南北差距进一步拉大；考虑到新冠病毒的强传染性，这种接种差异还会扰乱全球抗疫大局，因为只要一个国家没有战胜疫情，全球抗疫就难言胜利。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　此前，中国宣布加入&ldquo;新冠疫苗实施计划&rdquo;（COVAX），向世界庄重承诺推动新冠疫苗成为全球公共产品。从实际情况来看，中国疫苗也的确更符合国际道义，更具普适性。此前外媒报道称，中国在巴西圣保罗州出售的疫苗价格仅为10.3美元，只有辉瑞公司在美国国内售价的一半；中国疫苗皆采用灭活技术，不需要像辉瑞公司疫苗那样需要在零下70度的低温下储存和运输；中国还与多国签署了疫苗生产协议，可以通过出口疫苗原材料的方式，帮助一些国家自行生产疫苗。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;" data-spm-anchor-id="C73544894212.P59511941341.0.i2">　　在全球新冠疫苗极度紧缺的情况下，中国在疫苗研发和分配上积极作为，并如期启动疫苗上市，对弥合疫苗&ldquo;接种鸿沟&rdquo;，助力全球特别是广大发展中国家战胜疫情意义重大，是对习近平主席倡导的人类卫生健康共同体理念的生动实践。中国勇担大国道义，积极践行人类命运共同体理念，协调各国共抗疫情共度时艰，也为疫后推进国际合作，尽早实现全球经济恢复性增长注入了正能量。（责任编辑：李小华 蔡晓娟）</p>
            </div>
            </div>
            <div class="bottom_ind01" style="text-size-adjust: none; margin: 0px; padding: 5px 100px 0px; font-size: 21px; color: #000000; font-family: PingFangSC-Regular, Helvetica, Arial, 'Microsoft Yahei', sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div class="zebian" style="text-size-adjust: none; margin: 0px 0px 20px; padding: 0px; color: #a7a7a7; font-size: 14px;">&nbsp;<span style="margin-right: 16px;">编辑：肖潇</span>&nbsp;<span id="zb" style="margin-right: 16px;">责任编辑：刘亮</span></div>
            </div>
            </div>`,
          // link: "/content1",
        },
        {
          url: require("../assets/images-wal/同舟共济、共克时艰，夺取全球抗疫最终胜利.jpg"),
          title: "同舟共济、共克时艰，夺取全球抗疫最终胜利",
          content: `<p><span class="el-dialog__title">同舟共济、共克时艰，夺取全球抗疫最终胜利</span></p>
            <div class="el-dialog__body">
            <div data-v-fae5bece="">2021-01-08 11:13:45</div>
            <div class="content_18313" style="text-size-adjust: none; margin: 0px; padding: 0px 100px; color: #000000; font-family: PingFangSC-Regular, Helvetica, Arial, 'Microsoft Yahei', sans-serif; font-size: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div id="title_area" class="title_area" style="text-size-adjust: none; margin: 0px 0px 35px; padding: 0px; color: #333333;">
            <h1 style="text-size-adjust: none; padding: 0px; margin: 0px; list-style: none; font-weight: normal; font-size: 30px; line-height: 45px;" data-spm-anchor-id="C73544894212.P59511941341.0.i0">同舟共济、共克时艰，夺取全球抗疫最终胜利</h1>
            <div class="info" style="text-size-adjust: none; margin: 21px 0px 0px; padding: 0px; color: #999999; display: block; font-size: 14px; line-height: 14px;">来源：<a style="text-decoration: none; outline: none; color: #999999;" href="http://www.china.com.cn/opinion2020/2021-01/06/content_77084904.shtml" target="_blank" rel="noopener" data-spm-protocol="i">中国网</a>&nbsp;| 2021年01月07日 16:23</div>
            <h6 id="sourcetitle" style="text-size-adjust: none; padding: 0px; margin: 13px 0px 0px; list-style: none; font-weight: normal; font-size: 14px; line-height: 18px; color: #999999; display: block;">原标题：同舟共济、共克时艰，夺取全球抗疫最终胜利</h6>
            </div>
            <div id="text_area" class="text_area" style="text-size-adjust: none; margin: 0px; padding: 0px; display: block;">&nbsp;</div>
            <div id="content_area" class="content_area" style="text-size-adjust: none; margin: 0px; padding: 0px; overflow: hidden; display: block;">
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　根据世界卫生组织的统计数据，截至1月3日全球新冠肺炎确诊病例超8332万例，死亡病例超183万例。单是美国死亡病例就超过35万。且多位美国专家表示，美国的疫情形势令人担忧，更糟糕的情况还在后面。此外英国3日报告，过去24小时新增新冠肺炎确诊病例接近55000例，连续6天单日新增确诊病例超5万。日本3日新增新冠肺炎确诊病例3158例，新增死亡病例60例。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　数字无情，令人警醒；形势严峻，万莫大意。一串串冰冷数字的背后，是一个个鲜活生命的戛然而止，是一个个和顺家庭的无尽悲伤。而且它还表明，已经肆虐全球一年之久的新冠疫情非但没有销声匿迹，变异病毒反倒向人类发出新的挑战。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　奇怪吗？其实一点都不奇怪。病毒作为非细胞型生物，为了自身生存，必须在活细胞内寄生并以复制方式不断增殖，人类就是它存活并侵害的猎物。为了依靠细胞进行增殖，不怕与人同归于尽，这就是病毒的邪恶本性。SARS病毒如此，H5N1如此，埃博拉病毒如此，新冠病毒亦是如此。我们能做的，除了防控还是防控，舍此没有别的出路。而且还要携手并肩、共同应对，全球化时代，谁都不是一座孤岛。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　病毒是人类共同的敌人，一部人类文明史，就是一部人类同疾病和灾难的斗争史。病毒没有国界，疫病不分种族。面对来势汹汹的新冠肺炎疫情，国际社会不能退缩，各国人民应当勇敢前行、科学应对，守望相助、风雨同舟，用人间大爱汇聚起同疫情斗争的磅礴力量。甩锅、推责不行，双标、污蔑也不行。越是不把精力放在疫情防控上，越是会受到疫情的袭扰，带来极为严重的后果。这样的教训触目可见，这样的灾难惨不忍睹。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　当下世界疫情形势十分严峻，且随着冬季到来、气候变冷，更适合病毒进行传播。特别是，英国发现变异新冠病毒之后，各国虽然严阵以待，加强了入境检测，但目前英国报告的变异新冠病毒，已在全球39个国家和地区陆续现身。我国虽然较早遏制了疫情蔓延，但输入性病例或本土病例也在持续增加，现在中风险地区已经增加到49个，&ldquo;外防输入、内防反弹&rdquo;任务繁重。世界卫生组织(WHO)日前警告说，未来很可能还会发生更大疫情，世界必须认真对待。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　各国怎么办？我们朝哪走？这是一个绕不过去的现实问题。首先要坚守以民为本、生命至上，把全力搞好疫情防控看作重中之重和当务之急，采取防护、隔离、检测、救治、追踪等一切必要举措，尽快遏制全球疫情蔓延态势，尽力阻止疫情跨境传播。其次要加强信息分享，交流有益经验和做法，开展检测方法、临床救治、药物研发国际合作。第三也是最重要的，要共同构建人类卫生健康共同体，携起手来，共同佑护各国人民生命和健康，共同佑护人类共同的地球家园。要充分认识到人类是命运共同体，团结合作，才是战胜疫情的有力武器。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　&ldquo;沉舟侧畔千帆过，病树前头万木春。&rdquo;疫情终会过去，但也会出现反复；对人类来说，对类似新冠疫情这种重大公共卫生突发事件，要有长期作战的思想准备。所幸一年多的战&ldquo;疫&rdquo;实践充分证明，新冠病毒可防可控，新冠肺炎可救可治，而且新冠疫苗已经投入使用，中国正在兑现将疫苗作为全球公共产品的郑重承诺，让疫苗普惠可及，为世界战&ldquo;疫&rdquo;提供助力。只要全球科学防治、精准施策，人类同舟共济、共克时艰，就一定能赢得全球抗疫的最后胜利。（责任编辑：乐水）</p>
            </div>
            </div>
            <div class="bottom_ind01" style="text-size-adjust: none; margin: 0px; padding: 5px 100px 0px; font-size: 21px; color: #000000; font-family: PingFangSC-Regular, Helvetica, Arial, 'Microsoft Yahei', sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div class="zebian" style="text-size-adjust: none; margin: 0px 0px 20px; padding: 0px; color: #a7a7a7; font-size: 14px;" data-spm-anchor-id="C73544894212.P59511941341.0.i1">&nbsp;<span style="margin-right: 16px;">编辑：肖潇</span>&nbsp;<span id="zb" style="margin-right: 16px;">责任编辑：刘亮</span></div>
            </div>
            </div>`,
          // link: "/content1",
        },
        {
          url: require("../assets/images-wal/寒风中的“疫”线坚守.jpg"),
          title: "寒风中的“疫”线坚守",
          content: `<p><span class="el-dialog__title">寒风中的&ldquo;疫&rdquo;线坚守</span></p>
            <div class="el-dialog__body">
            <div data-v-fae5bece="">2021-01-08 11:23:04</div>
            <div class="tj_top" style="text-size-adjust: none; margin: 0px 0px 38px; padding: 0px; display: block; clear: both; color: #000000; font-family: PingFangSC-Regular, Helvetica, Arial, 'Microsoft Yahei', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">&nbsp;</div>
            <div class="bottom_area" style="text-size-adjust: none; margin: 25px 0px 0px; padding: 0px; position: relative; color: #000000; font-family: PingFangSC-Regular, Helvetica, Arial, 'Microsoft Yahei', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div id="wrapperbox" class="wrapper" style="text-size-adjust: none; margin: 0px; padding: 0px; vertical-align: top; clear: both; zoom: 1;">
            <p class="show_txt" style="text-size-adjust: none; padding: 0px; margin: 0px; list-style: none; font-weight: normal; width: 910px; float: right; font-size: 14px; color: #333333; line-height: 25px; display: block;" data-spm-anchor-id="C89268935449.P63979898165.0.i0">保驾护航。新华社记者 张玉薇 摄</p>
            <div class="tj_top" style="text-size-adjust: none; margin: 0px 0px 38px; padding: 0px; display: block; clear: both; color: #000000; font-family: PingFangSC-Regular, Helvetica, Arial, 'Microsoft Yahei', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div class="bigTitle" style="text-size-adjust: none; margin: 0px 0px 21px; padding: 0px; color: #333333; font-size: 30px; height: auto; line-height: 50px;">寒风中的&ldquo;疫&rdquo;线坚守</div>
            <div class="info" style="text-size-adjust: none; margin: 0px; padding: 0px; color: #999999; font-size: 16px; float: left;">
            <p style="text-size-adjust: none; padding: 0px; margin: 0px; list-style: none; font-weight: normal;">来源 ：&nbsp;<em style="font-style: normal;">新华网&nbsp;&nbsp;</em>&nbsp;2021年01月07日 09:04</p>
            </div>
            <div class="tj_t_right" style="text-size-adjust: none; margin: 0px; padding: 0px; display: inline-block; color: #666666; font-size: 16px; height: 22px; line-height: 22px; vertical-align: top; float: right;">&nbsp;</div>
            <div class="clear" style="text-size-adjust: none; margin: 0px; padding: 0px; clear: both; height: 0px; line-height: 0; font-size: 0px; overflow: hidden;">&nbsp;</div>
            </div>
            <div class="main" style="text-size-adjust: none; margin: 0px; padding: 0px; position: relative; color: #000000; font-family: PingFangSC-Regular, Helvetica, Arial, 'Microsoft Yahei', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div id="mainContent" class="mainContent" style="text-size-adjust: none; margin: 0px; padding: 0px; position: relative;">
            <div class="swiper-container gq_nrdt " style="text-size-adjust: none; margin: 0px; padding: 0px;">
            <ul class="swiper-wrapper" style="padding: 0px; margin: 0px; list-style: none; font-weight: normal; overflow: hidden; position: relative; clear: both; zoom: 1; min-height: 684px;">
            <li class="swiper-slide showimg" style="padding: 0px; margin: 0px; list-style: none; font-weight: normal; display: block; text-align: center; position: relative; width: 1000px; background: transparent; z-index: 4; font-size: 0px;"><img id="img0" class="actimage" style="border: none; margin: 0px; padding: 0px; display: inline-block; width: 900px; height: 684px;" src="https://p4.img.cctvpic.com/photoAlbum/photo/2021/01/07/PHOTvyzSgWPeB6Hr3GY9Bzow210107_1000x2000.jpg" /></li>
            </ul>
            </div>
            <div class="prev_btn" style="text-size-adjust: none; margin: 0px; padding: 0px; width: 500px; height: 684px; display: block; position: absolute; left: 0px; top: 0px; z-index: 5; font-size: 0px; background: url('//p5.img.cctvpic.com/photoAlbum/templet/common/DEPA1565600861431987/Bottomplan.gif');">&nbsp;</div>
            <div class="next_btn" style="text-size-adjust: none; margin: 0px; padding: 0px; width: 540px; height: 684px; display: block; position: absolute; right: 0px; top: 0px; z-index: 5; font-size: 0px; background: url('//p5.img.cctvpic.com/photoAlbum/templet/common/DEPA1565600861431987/Bottomplan.gif');">&nbsp;</div>
            </div>
            </div>
            <div class="bottom_area" style="text-size-adjust: none; margin: 25px 0px 0px; padding: 0px; position: relative; color: #000000; font-family: PingFangSC-Regular, Helvetica, Arial, 'Microsoft Yahei', sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div id="wrapperbox" class="wrapper" style="text-size-adjust: none; margin: 0px; padding: 0px; vertical-align: top; clear: both; zoom: 1;">
            <p class="show_txt" style="text-size-adjust: none; padding: 0px; margin: 0px; list-style: none; font-weight: normal; width: 910px; float: right; font-size: 14px; color: #333333; line-height: 25px; display: block;" data-spm-anchor-id="C89268935449.P63979898165.0.i3">　　1月6日，在沈阳市和平区马路湾街道电业社区南京一校振兴街分校检测点，工作人员的护目镜上结了冰霜。当日，沈阳最低气温达到零下24摄氏度。沈阳市从4日开始在市内9区开展全员第二轮核酸检测，疫情防控一线的工作者在寒风中坚守岗位。新华社记者 杨青 摄</p>
            </div>
            </div>
            </div>
            </div>
            </div>
            <div class="el-dialog__footer">&nbsp;</div>`,
          // link: "/content1",
        },
        {
          url: require("../assets/images-wal/河北石家庄市9个地区调整为中风险地区.jpg"),
          title: "河北石家庄市9个地区调整为中风险地区",
          content: `<div class="content_18313" style="text-size-adjust: none; margin: 0px; padding: 0px 100px; color: #000000; font-family: PingFangSC-Regular, Helvetica, Arial, 'Microsoft Yahei', sans-serif; font-size: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div id="title_area" class="title_area" style="text-size-adjust: none; margin: 0px 0px 35px; padding: 0px; color: #333333;">
            <h1 style="text-size-adjust: none; padding: 0px; margin: 0px; list-style: none; font-weight: normal; font-size: 30px; line-height: 45px;">河北石家庄市9个地区调整为中风险地区</h1>
            <div class="info" style="text-size-adjust: none; margin: 21px 0px 0px; padding: 0px; color: #999999; display: block; font-size: 14px; line-height: 14px;">来源：<a style="text-decoration: none; outline: none; color: #999999;" href="https://www.chinanews.com/sh/2021/01-08/9381936.shtml" target="_blank" rel="noopener" data-spm-protocol="i">中国新闻网</a>&nbsp;| 2021年01月08日 14:59</div>
            <h6 id="sourcetitle" style="text-size-adjust: none; padding: 0px; margin: 13px 0px 0px; list-style: none; font-weight: normal; font-size: 14px; line-height: 18px; color: #999999; display: block;">原标题：河北石家庄市9个地区调整为中风险地区</h6>
            </div>
            <div id="text_area" class="text_area" style="text-size-adjust: none; margin: 0px; padding: 0px; display: block;">&nbsp;</div>
            <div id="content_area" class="content_area" style="text-size-adjust: none; margin: 0px; padding: 0px; overflow: hidden; display: block;">
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　中新网1月8日电 据河北省卫健委官方网站消息，根据国务院应对新冠肺炎联防联控机制关于科学划分、精准防控等工作要求，自2021年1月8日起，将石家庄新乐市天悦花苑、计生宿舍、瑞达玫瑰园小区、坚固村、芦新村，新华区都市阳光小区、丽都河畔小区，桥西区平安小区，行唐县滨河小区调整为中风险地区。目前，石家庄藁城区全域仍为高风险地区，邢台南宫市鸿兴小区、文景名苑小区、在水一方、凤岗街道办事处十里铺居委会、大高村镇石家庄村、天地名城小区、天一和院小区、凤岗街道办事处仍为中风险地区。全省其他地区均为低风险地区。</p>
            </div>
            </div>
            <div class="bottom_ind01" style="text-size-adjust: none; margin: 0px; padding: 5px 100px 0px; font-size: 21px; color: #000000; font-family: PingFangSC-Regular, Helvetica, Arial, 'Microsoft Yahei', sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div class="zebian" style="text-size-adjust: none; margin: 0px 0px 20px; padding: 0px; color: #a7a7a7; font-size: 14px;" data-spm-anchor-id="C73544894212.P99790479609.0.i0">&nbsp;<span style="margin-right: 16px;">编辑：苏璇</span>&nbsp;<span id="zb" style="margin-right: 16px;">责任编辑：刘亮</span></div>
            </div>`,
          // link: "/content1",
        },
        {
          url: require("../assets/images-wal/钟南山：冬季国内疫情不会大爆发.jpg"),
          title: "钟南山：冬季国内疫情不会大爆发",
          content: `<p><span class="el-dialog__title">钟南山：冬季国内疫情不会大爆发</span></p>
            <div class="el-dialog__body">
            <div data-v-fae5bece="">2021-01-08 15:19:18</div>
            <div class="title" style="margin: 0px; padding: 14px 0px 0px; line-height: 50px; color: #47413f; font-size: 30px; font-weight: bold; width: 870px; font-family: 'PingFangSC-Regular,Helvetica,Arial,Microsoft Yahei,sans-serif'; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">钟南山：冬季国内疫情不会大爆发</div>
            <div class="biref" style="margin: 5px 0px 40px; padding: 0px; line-height: 41px; font-size: 20px; color: #47413f; font-family: 'PingFangSC-Regular,Helvetica,Arial,Microsoft Yahei,sans-serif'; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><em style="font-style: normal; margin-right: 10px;"><a id="mianbaoxie" style="color: #47413f; text-decoration: none; outline-style: none;" href="https://news.cctv.com/kuaikan/wxc/" target="_blank" rel="noopener">微现场&nbsp;</a></em>&nbsp;央视网 发布时间：2020年12月30日 18:26</div>
            <div class="cont" style="margin: 0px; padding: 0px; color: #47413f; text-align: justify; font-family: 'PingFangSC-Regular,Helvetica,Arial,Microsoft Yahei,sans-serif'; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <p style="margin: 0px; padding: 0px; line-height: 37px; font-size: 20px; text-indent: 2em; text-align: center;">&nbsp;</p>
            <p style="margin: 0px; padding: 0px; line-height: 37px; font-size: 20px; text-indent: 2em;"><strong>央视网消息：</strong>近日，国内一些城市陆续出现一些新冠肺炎本土病例和无症状感染者，很多人担心疫情会不会反弹？12月29日，中国工程院院士钟南山就疫情和疫苗进展等问题接受了总台央视记者专访。</p>
            <p style="margin: 0px; padding: 0px; line-height: 37px; font-size: 20px; text-indent: 2em;">关于冬季新冠肺炎疫情是否会有所反弹，钟南山院士表示，国内病例不会大规模增加，但散发病例在当前形势下仍会出现。</p>
            <p class="bianji" style="margin: 8px 0px 0px; padding: 0px; line-height: 37px; font-size: 20px; text-indent: 2em; text-align: right;">编辑：张玉玲</p>
            </div>
            </div>`,
          // link: "/content1",
        },
        {
          url: require("../assets/images-wal/聆听抗疫故事，致敬抗疫英雄.jpg"),
          title: "聆听抗疫故事，致敬抗疫英雄",
          content: `<p><span class="el-dialog__title">聆听抗疫故事，致敬抗疫英雄</span></p>
            <div class="el-dialog__body">
            <div data-v-fae5bece="">2021-01-08 15:32:23</div>
            <div class="content_18313" style="text-size-adjust: none; margin: 0px; padding: 0px 100px; color: #000000; font-family: PingFangSC-Regular, Helvetica, Arial, 'Microsoft Yahei', sans-serif; font-size: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;" data-spm-anchor-id="C73544894212.P79045410447.0.i0">
            <div id="title_area" class="title_area" style="text-size-adjust: none; margin: 0px 0px 35px; padding: 0px; color: #333333;">
            <h1 style="text-size-adjust: none; padding: 0px; margin: 0px; list-style: none; font-weight: normal; font-size: 30px; line-height: 45px;">聆听抗疫故事，致敬抗疫英雄</h1>
            <div class="info" style="text-size-adjust: none; margin: 21px 0px 0px; padding: 0px; color: #999999; display: block; font-size: 14px; line-height: 14px;">来源：央视网&nbsp;&nbsp;|&nbsp;&nbsp;2020年07月28日 17:24</div>
            </div>
            <div id="text_area" class="text_area" style="text-size-adjust: none; margin: 0px; padding: 0px; display: block;">&nbsp;</div>
            <div id="content_area" class="content_area" style="text-size-adjust: none; margin: 0px; padding: 0px; overflow: hidden; display: block;">
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　6月11日北京新增1例新冠肺炎确诊病例,这是时隔56天后北京再现本地新冠肺炎确诊病例。随后几天陆续确诊病例的行动轨迹共同指向一个场所&mdash;&mdash;北京新发地农产品批发市场。</p>
            <p class="photo_img_20190808" style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 0px; color: #333333; word-break: break-all; text-align: center;"><img style="border: none; margin: 0px auto; padding: 0px; display: block; max-width: 1000px; text-align: center;" src="http://p4.img.cctvpic.com//photoworkspace/imageLocalized/2020/07/28/2020072817230462923.jpg" alt="" /></p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　北京新发地批发市场聚集性疫情发生后,周边社区似乎被按下了"暂停键"。就在防控力量极度紧缺,疫情防控刻不容缓之时,一群临危不惧、逆向而行的支援力量悄然而至。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　6月18日中建一局党委决定成立首都防疫先锋志愿服务队,到首都疫情防控一线新发地附近社区进行支援,接到中建一局党委通知后,中建一局安装公司闫瑞璟主动请缨,加入志愿者队伍中。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　"身在社区,居民的事就是我分内的事!"闫瑞璟这样说到。尽管知道疫情危险,他还是主动申请到疫情高风险地区&mdash;&mdash;新发地附近宜兰园二区进行志愿服务。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　严抓社区疫情防控,做好居民生活服务,在下沉支援的28天里,闫瑞璟与队友们协助医护人员为小区居民做核酸检测,帮助居民转接快递和生活物资,对社区定时进行防疫消杀,承担起"宣传员""安全员""管理员""快递员"等的职责,汇聚成社区联防联控的强大力量。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　负责任的快递小哥:</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　小区封锁大门紧闭,所有物资都要先到警戒线卡口处接货再挨家挨户送上门。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　"穿红衣服的,你过来,你把我的菜弄哪去了?"刚上岗的闫瑞璟被当成外卖小哥了。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　"我的快递少了一包,就是你们给分错了,赶紧给我找回来,要不就赔钱!"被封锁社区的居民心情焦躁,错把他当成快递小哥后朝他发了火。闫瑞璟虽然心里难受极了,但还是尽力帮居民们找到快递,站好每一班岗。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　烈日炎炎下清扫垃圾:</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　宜兰园小区垃圾囤积量极大,这些垃圾给正常生活造成影响的同时也对小区防疫工作造成了极大阻碍。闫瑞璟他们临危受命,接下了这个清扫垃圾的重任,连续两天清理垃圾弯腰捡拾上百次。六月的北京艳阳高照,使得他浑身的衣服都湿透了。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　协助核酸检测:</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　协助医护人员为社区居民进行核酸检测也是闫瑞璟的日常工作。他一天要贴400多个标签,连续核酸检测工作6小时,工作期间全程穿着防护服,护目镜的镜片也都充满了水雾,每次脱下防护服后的他就像重生了一般。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　社区解封后办理出入证:</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　社区解封后,闫瑞璟为社区居民办理出入证,他忙到凌晨两点多,挨家挨户为社区居民们发放出入证。即使带着口罩,但也能感受到居民们脸上的喜悦。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　公司慰问抗疫先锋:</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　在闫瑞璟及队友们战斗在抗疫第一线的同时,公司不会让他们孤军奋战,充足的后勤保障更是必不可少的。公司党委副书记、工会主席李井东受党委书记沙海的委托,多次代表公司对志愿者们进行了慰问,带去了丰富的后勤保障资源,让他们在艰苦的工作中感受到"家"的关怀,更加充满斗志!</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　在这场特殊的战役中,每个人都是战士,每个人都在这场战役中贡献着自己的力量。平凡中见伟大,朴实中见崇高,细微中见真情。每一个记录或者未被记录的时刻都是一段伟大的故事,即便是那些未被提及的名字,他们也是最勇敢的英雄。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　疫情温馨小故事:</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　故事1:"小伙子,能帮我去四环边取个菜吗?我女儿在那等半天了。"刚要回驻地的闫瑞璟,却被一大爷叫住了。此时已是晚上9点,按照规定,晚上7点以后就不送菜了,可这推辞的话让他不知如何开口。闫瑞璟就骑车出发了,来回4公里路,连跑了两趟才送完,回到驻地时已是晚上11点,桌上同事给他泡的方便面早已凉透了。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　故事2:6月21日下午两点,小区里一位妈妈又来了,这已是她第三次过来了。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　"我女儿要回衡水高考,咱们小区全封闭,连门都出不了,怎么回去呀!"妈妈焦急地问闫瑞璟。此时距离高考仅剩16天了,即便回到衡水,还需要隔离两周,可不能耽误孩子一辈子的大事儿,闫瑞璟这样想着并立即逐级上报了这个情况。当晚10点,出门的单子才批下来,他连夜带考生去做核酸检测。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　本以为会一切顺利,可到了次日中午11点,检测结果还没出来。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　距离开往衡水的火车发车还有3个小时,小姑娘急得团团转,"大哥哥,我还能回去高考吧?"小姑娘不断重复地问。"怎么样了,时间来不及了&hellip;&hellip;"闫瑞璟也一遍一遍地催着。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　"阴性!是阴性!"半个小时后,区委组织部的干部拿着检测阴性的报告跑到小区门口时,小姑娘高兴得蹦了起来。</p>
            <p style="text-size-adjust: none; padding: 0px; margin: 0px 0px 30px; list-style: none; font-weight: normal; font-size: 18px; line-height: 32px; color: #333333; word-break: break-all;">　　"我一定会拿着大学录取通知书来看你们&hellip;&hellip;"20多天过去了,小姑娘临走时的话,还萦绕在他的耳边。</p>
            </div>
            </div>
<div class="bottom_ind01" style="text-size-adjust: none; margin: 0px; padding: 5px 100px 0px; font-size: 21px; color: #000000; font-family: PingFangSC-Regular, Helvetica, Arial, 'Microsoft Yahei', sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
<div class="zebian" style="text-size-adjust: none; margin: 0px 0px 20px; padding: 0px; color: #a7a7a7; font-size: 14px;">&nbsp;<span style="margin-right: 16px;">编辑：王玉西</span>&nbsp;<span id="zb" style="margin-right: 16px;">责任编辑：刘亮</span></div>
</div>
</div>`,
          // link: "/content1",
        },
      ],
      //疫情数据的数组
      //显示与隐藏
      inlandShow: true,
      stateShow: false,
      // 国内数据概况
      chinaData: [
        {
          name: "确诊",
          num: 97155,
          colorBg: "background-color: #fa030341",
          colorNum: "color:red",
        },
        {
          name: "境外输入",
          num: 4348,
          colorBg: "background-color:#fa660341",
          colorNum: "color:#ff6600",
        },
        {
          name: "现存无症状",
          num: 360,
          colorBg: "background-color: #fa03e548",
          colorNum: "color: #fa03b0",
        },
        {
          name: "治愈",
          num: 91082,
          colorBg: "background-color: #03fa4d4d",
          colorNum: "color: #33b300",
        },
        {
          name: "死亡",
          num: 4794,
          colorBg: "background-color: #a0ada4b6",
          colorNum: "color:#000",
        },
      ],
      // 全球数据概况
      worldData: [
        {
          name: "现存确诊",
          num: 2562979,
          colorBg: "background-color: #fa030341",
          colorNum: "color:red",
        },
        {
          name: "累计确诊",
          num: 87149975,
          colorBg: "background-color:#fa660341",
          colorNum: "color:#ff6600",
        },
        {
          name: "累计治愈",
          num: 59903375,
          colorBg: "background-color: #03fa4d4d",
          colorNum: "color: #33b300",
        },
        {
          name: "累计死亡",
          num: 1883621,
          colorBg: "background-color: #a0ada4b6",
          colorNum: "color:#000",
        },
      ],
      // 国内数据（具体到省份）
      inlandData: [
        {
          province: "香港",
          nowConfirmed: 719,
          historyConfirmed: 9074,
          dead: 154,
          cure: 8201,
        },
        {
          province: "台湾",
          nowConfirmed: 112,
          historyConfirmed: 819,
          dead: 7,
          cure: 700,
        },
        {
          province: "上海",
          nowConfirmed: 97,
          historyConfirmed: 1543,
          dead: 7,
          cure: 1439,
        },
        {
          province: "河北",
          nowConfirmed: 92,
          historyConfirmed: 465,
          dead: 6,
          cure: 367,
        },
        {
          province: "辽宁",
          nowConfirmed: 72,
          historyConfirmed: 374,
          dead: 2,
          cure: 300,
        },
        {
          province: "北京",
          nowConfirmed: 38,
          historyConfirmed: 994,
          dead: 9,
          cure: 947,
        },
        {
          province: "广东",
          nowConfirmed: 36,
          historyConfirmed: 2062,
          dead: 8,
          cure: 2018,
        },
        {
          province: "四川",
          nowConfirmed: 26,
          historyConfirmed: 857,
          dead: 3,
          cure: 828,
        },
        {
          province: "陕西",
          nowConfirmed: 25,
          historyConfirmed: 521,
          dead: 3,
          cure: 493,
        },
        {
          province: "福建",
          nowConfirmed: 23,
          historyConfirmed: 518,
          dead: 1,
          cure: 494,
        },
        {
          province: "内蒙古",
          nowConfirmed: 19,
          historyConfirmed: 366,
          dead: 1,
          cure: 346,
        },
        {
          province: "浙江",
          nowConfirmed: 12,
          historyConfirmed: 1306,
          dead: 1,
          cure: 1293,
        },
        {
          province: "天津",
          nowConfirmed: 12,
          historyConfirmed: 316,
          dead: 3,
          cure: 301,
        },
        {
          province: "云南",
          nowConfirmed: 12,
          historyConfirmed: 230,
          dead: 2,
          cure: 216,
        },
        {
          province: "黑龙江",
          nowConfirmed: 8,
          historyConfirmed: 970,
          dead: 13,
          cure: 949,
        },
        {
          province: "河南",
          nowConfirmed: 7,
          historyConfirmed: 1300,
          dead: 22,
          cure: 1271,
        },
        {
          province: "山东",
          nowConfirmed: 5,
          historyConfirmed: 863,
          dead: 7,
          cure: 851,
        },
        {
          province: "山西",
          nowConfirmed: 3,
          historyConfirmed: 225,
          dead: 0,
          cure: 222,
        },
        {
          province: "湖南",
          nowConfirmed: 1,
          historyConfirmed: 1021,
          dead: 4,
          cure: 1016,
        },
        {
          province: "安徽",
          nowConfirmed: 1,
          historyConfirmed: 993,
          dead: 6,
          cure: 986,
        },
        {
          province: "江苏",
          nowConfirmed: 1,
          historyConfirmed: 685,
          dead: 0,
          cure: 684,
        },
        {
          province: "广西",
          nowConfirmed: 1,
          historyConfirmed: 264,
          dead: 2,
          cure: 261,
        },
        {
          province: "湖北",
          nowConfirmed: 0,
          historyConfirmed: 68149,
          dead: 4512,
          cure: 63637,
        },
        {
          province: "新疆",
          nowConfirmed: 0,
          historyConfirmed: 980,
          dead: 3,
          cure: 997,
        },
        {
          province: "江西",
          nowConfirmed: 0,
          historyConfirmed: 935,
          dead: 1,
          cure: 934,
        },
        {
          province: "重庆",
          nowConfirmed: 0,
          historyConfirmed: 590,
          dead: 6,
          cure: 584,
        },
        {
          province: "甘肃",
          nowConfirmed: 0,
          historyConfirmed: 182,
          dead: 2,
          cure: 180,
        },
        {
          province: "海南",
          nowConfirmed: 0,
          historyConfirmed: 171,
          dead: 6,
          cure: 165,
        },
        {
          province: "吉林",
          nowConfirmed: 0,
          historyConfirmed: 157,
          dead: 2,
          cure: 155,
        },
        {
          province: "贵州",
          nowConfirmed: 0,
          historyConfirmed: 147,
          dead: 2,
          cure: 145,
        },
        {
          province: "宁夏",
          nowConfirmed: 0,
          historyConfirmed: 75,
          dead: 0,
          cure: 75,
        },
        {
          province: "澳门",
          nowConfirmed: 0,
          historyConfirmed: 46,
          dead: 0,
          cure: 46,
        },
        {
          province: "青海",
          nowConfirmed: 0,
          historyConfirmed: 18,
          dead: 0,
          cure: 18,
        },
        {
          province: "西藏",
          nowConfirmed: 0,
          historyConfirmed: 1,
          dead: 0,
          cure: 1,
        },
      ],
      // 全球数据（具体到世界主要国家和地区）
      stateData: [
        {
          state: "美国",
          nowConfirmed: 11266326,
          historyConfirmed: 21292109,
          dead: 360999,
          cure: 9664784,
        },
        {
          state: "墨西哥",
          nowConfirmed: 216751,
          historyConfirmed: 1479875,
          dead: 129987,
          cure: 1133137,
        },
        {
          state: "加拿大",
          nowConfirmed: 79204,
          historyConfirmed: 626800,
          dead: 16369,
          cure: 531227,
        },
        {
          state: "英国",
          nowConfirmed: 2758916,
          historyConfirmed: 2836801,
          dead: 77346,
          cure: "--",
        },
        {
          state: "西班牙",
          nowConfirmed: 1780738,
          historyConfirmed: 1982544,
          dead: 51430,
          cure: 150376,
        },
        {
          state: "荷兰",
          nowConfirmed: 817278,
          historyConfirmed: 841163,
          dead: 11999,
          cure: "--",
        },
        {
          state: "法国",
          nowConfirmed: 660278,
          historyConfirmed: 2705618,
          dead: 66565,
          cure: 1978756,
        },
        {
          state: "比利时",
          nowConfirmed: 613669,
          historyConfirmed: 652735,
          dead: 19827,
          cure: 19239,
        },
        {
          state: "意大利",
          nowConfirmed: 568712,
          historyConfirmed: 2201945,
          dead: 76877,
          cure: 1556356,
        },
        {
          state: "俄罗斯",
          nowConfirmed: 562927,
          historyConfirmed: 3308601,
          dead: 59951,
          cure: 2685723,
        },
        {
          state: "德国",
          nowConfirmed: 352598,
          historyConfirmed: 1841228,
          dead: 38199,
          cure: 1450431,
        },
        {
          state: "波兰",
          nowConfirmed: 226964,
          historyConfirmed: 1344763,
          dead: 30055,
          cure: 1087744,
        },
        {
          state: "印度",
          nowConfirmed: 227546,
          historyConfirmed: 10374932,
          dead: 150114,
          cure: 9997272,
        },
        {
          state: "伊朗",
          nowConfirmed: 165552,
          historyConfirmed: 1261903,
          dead: 55830,
          cure: 104021,
        },
        {
          state: "土耳其",
          nowConfirmed: 97821,
          historyConfirmed: 2283931,
          dead: 22070,
          cure: 2164040,
        },
        {
          state: "日本",
          nowConfirmed: 41559,
          historyConfirmed: 252317,
          dead: 3719,
          cure: 207039,
        },
        {
          state: "菲律宾",
          nowConfirmed: 22690,
          historyConfirmed: 480737,
          dead: 9347,
          cure: 448700,
        },
        {
          state: "韩国",
          nowConfirmed: 17991,
          historyConfirmed: 66686,
          dead: 1046,
          cure: 47649,
        },
        {
          state: "泰国",
          nowConfirmed: 4847,
          historyConfirmed: 9331,
          dead: 66,
          cure: 4418,
        },
        {
          state: "蒙古",
          nowConfirmed: 447,
          historyConfirmed: 1308,
          dead: 1,
          cure: 830,
        },
        {
          state: "新加坡",
          nowConfirmed: 244,
          historyConfirmed: 58749,
          dead: 29,
          cure: 58476,
        },
        {
          state: "越南",
          nowConfirmed: 117,
          historyConfirmed: 1505,
          dead: 35,
          cure: 1353,
        },
        {
          state: "中国",
          nowConfirmed: 1316,
          historyConfirmed: 97218,
          dead: 4795,
          cure: 91107,
        },
        {
          state: "巴西",
          nowConfirmed: 638996,
          historyConfirmed: 7874539,
          dead: 199043,
          cure: 7036530,
        },
        {
          state: "阿根廷",
          nowConfirmed: 158145,
          historyConfirmed: 16761154,
          dead: 43976,
          cure: 1474033,
        },
        {
          state: "南非",
          nowConfirmed: 138188,
          historyConfirmed: 1149591,
          dead: 30524,
          cure: 980879,
        },
        {
          state: "埃及",
          nowConfirmed: 21640,
          historyConfirmed: 145590,
          dead: 7975,
          cure: 115975,
        },
      ],
      // 模态框开始或者关闭的状态,默认false关闭
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      // 存放谣言数据的数组
      rumorData: [
        {
          // 序号
          no: "1",
          // 谣言内容
          name: "可在家使用新冠病毒试剂盒自测？",
          //官方辟谣
          explode: "北京市药监局提示：普通市民家庭不可自行使用",
          content: ``,
        },
        {
          no: "2",
          name: "疫情期间大强度锻炼可提高抵抗力？",
          explode:
            "国家体育总局科学研究所研究员徐建方：长时间大强度的运动，会导致身体机能失调，免疫功能下降",
          content: ``,
        },
        {
          no: "3",
          name: "吃降压药会增加感染病毒的风险？",
          explode: "目前没有任何动物和临床研究数据证实这种说法的可靠性",
          content: ``,
        },
        {
          no: "4",
          name: "改用吸痰机后，武汉死亡人数减半？",
          explode: "刘良教授辟谣：没有干预国任何个例的临床治疗",
          content: ``,
        },
        {
          no: "5",
          name: "第一例新冠肺炎患者来自美国？",
          explode: "经查证：谣言系翻译错误",
          content: ``,
        },
        {
          no: "6",
          name: "新冠病毒传播途径有变化？",
          explode:
            "科技部社会发展科技司司长吴远彬：目前研究结论显示，呼吸道飞沫和密切接触传播仍然是主要传播途径",
          content: ``,
        },
        {
          no: "7",
          name: "十年前就有人预测疫情？",
          explode:
            "上海图书馆查证：没有找到传闻里提到的这本书，同名文章也没有相关内容",
          content: ``,
        },
        {
          no: "8",
          name: "戴多层口罩才能防住病毒？",
          explode: "辟谣：佩戴多层口罩可能造成呼吸不畅",
          content: ``,
        },
        {
          no: "9",
          name: "确诊家中的狗检测呈弱阳性？",
          explode:
            "香港食卫局长陈肇始强调：虽查到弱阳性，但无证据狗会传播新冠病毒给人",
          content: ``,
        },
        {
          no: "10",
          name: "家畜家禽海鲜都不能吃了？",
          explode: "辟谣：正规家畜家禽海鲜都能吃",
          content: ``,
        },
      ],
      //时间线样式
      timelineStyle: {
        color: "#bf45bf",
        // timestamp:"item.no",
      },
      //防疫知识数据
      knowledgeData: [
        {
          // 编号
          no: "1",
          // 标题
          title: "做好预防免感染",
          // 内容
          content: `<h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">1.如何预防新型冠状病毒感染？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">预防新型冠状病毒感染，需采取以下措施：</p>
            <ul style="margin: 0px 0px 20px; padding: 0px 0px 0px 15px; list-style: outside none disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5; color: #666666; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">避免去疫情高发区</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">避免去人流密集的场所。避免到封闭、空气不流通的公共场所和人多聚集的地方，尤其是儿童、老年人和免疫力低下的人群。外出记得佩戴口罩。</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">加强开窗通风。居家每天都要开窗通风一段时间。加强空气流通，可有效预防呼吸道传染病。</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">注意个人卫生。勤洗手，用肥皂和流动水或者免洗洗手液洗手。打喷嚏或咳嗽的时候注意用纸巾或胳膊肘捂住口鼻，不要直接用双手捂住口鼻。</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">及时观察就医。如果出现发热（尤其是高热不退）、咳嗽、气促等呼吸道感染症状，应及时佩戴口罩并及时就医。</li>
            </ul>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">2.在家中怎样预防新型冠状病毒感染？</h2>
            <ul style="margin: 0px 0px 20px; padding: 0px 0px 0px 15px; list-style: outside none disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5; color: #666666; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">增强卫生健康意识，适量运动，早睡早起，不熬夜可提高自身免疫力；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">保持良好的个人卫生习惯，咳嗽或者打喷嚏时用纸巾掩住口鼻，经常彻底洗手，不用脏手触摸眼睛、鼻口；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">居室多通风换气并保持整洁卫生；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">尽可能避免与有呼吸道症状的人密切接触；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">尽量避免到人多拥挤和空间密闭场所，如必须去佩戴口罩；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">避免接触野生动物或家畜家禽；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">坚持安全的饮食习惯，食用肉类和蛋类要煮熟；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">密切关注发热、咳嗽等症状，出现此类症状一定要及时就近就医。</li>
            </ul>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">3.如何保护自己远离新型冠状病毒传染？</h2>
            <ul style="margin: 0px 0px 20px; padding: 0px 0px 0px 15px; list-style: outside none disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5; color: #666666; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">冠状病毒以飞沫传播为主，正确佩戴外科口罩；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">打喷嚏或者咳嗽时不要用手直接遮挡；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">正确、及时洗手；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">提高免疫力，尽量少去人多且封闭的场所。加强锻炼、规律作息，提高自身免疫力是避免被感染的重要手段。</li>
            </ul>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">4.咳嗽和打喷嚏的时候要注意什么？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">咳嗽和打喷嚏时，含有病毒的飞沫可散布至大约 2 米范围内的空气中，周围人可能吸入这些飞沫而被感染，因此要注意：</p>
            <ul style="margin: 0px 0px 20px; padding: 0px 0px 0px 15px; list-style: outside none disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5; color: #666666; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">咳嗽或者打喷嚏时应用纸巾或胳膊肘（而非双手）遮掩口鼻。</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">把打喷嚏和咳嗽时用过的纸巾放入有盖的垃圾桶内。</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">打喷嚏和咳嗽后最好用肥皂或洗手液彻底清洁双手，并用流动的水冲洗干净。</li>
            </ul>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">5.怎样选择口罩？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">戴口罩是阻断呼吸道分泌物传播的有效手段。目前市面上能看到的口罩主要有医用防护口罩（如 N95 口罩）、医用外科口罩和普通级别的一次性使用医用口罩。此外，市场上还有各种明星经常佩戴的棉布口罩、海绵口罩等「网红口罩」。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">市民日常防护选择医用外科口罩就好。N95 口罩的防病效果更好，但是透气性差，呼吸阻力大，不适合长时间佩戴。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><img style="margin: 0px; padding: 0px; max-width: 100%;" src="https://file1.dxycdn.com/2020/0206/330/3395103241590413873-22.jpg" alt="微信图片_20200206134834.jpg" /></p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">6.如何合理使用口罩</h2>
            <ul style="margin: 0px 0px 20px; padding: 0px 0px 0px 15px; list-style: outside none disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5; color: #666666; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">一次性使用医用口罩：推荐公众在非人员密集的公共场所佩戴；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">医用外科口罩：推荐公共交通司乘人员、环卫工人、出租司机、公共场所服务人员佩戴；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">N95、KN95 颗粒防护口罩：推荐公共防护人员现场调查、采样、核酸检测或公共在人员高度密集场所佩戴；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">医用防护口罩：推荐隔离病房医护人员或确诊病人转移时佩戴。</li>
            </ul>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">7.怎样正确佩戴口罩？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">戴口罩时，将折面完全展开，将嘴、鼻、下颌完全包住，然后压紧鼻夹，使口罩与面部完全贴合。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">戴口罩前应当洗手，或者在戴口罩过程中避免手接触到口罩内面，以降低口罩被污染的可能。要分清楚口罩的内外、上下，浅色为内侧，内侧应当贴着口鼻，深色侧朝外；有金属条（鼻夹）一端是口罩的上方。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">口罩要定期更换，不可内外侧戴反，更不能两面轮流戴。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">8.口罩过期了，还能使用吗？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">口罩过期原则上是不建议使用的。对于医用外科口罩来说都是消毒无菌的，过期了有可能会滋生细菌。现在情况特殊，如果使用过期口罩，需要检查一下存放的地方是否干燥，原包装是否发霉或者破损有异味、变色。如果没有这些情况，可以作为备用。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">9.在人流不密集的地方可以不带口罩吗？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">去人群密集的场所，因为人多、不通风，可能有病原在你周围，那戴口罩是必要的。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">但是人口不密集的地方，如果是开放的环境，病原体被稀释，不足以感染人，可以不戴口罩。但是如果自身有咳嗽、发烧等症状，为了防止传染别人，需要戴口罩。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">10.口罩短缺，能否重复戴？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">医用外科口罩不能重复使用。原则上来说，N95 防护口罩也是如此。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">但实际情况特殊，对于普通人来说，现在口罩普遍稀缺。如果无发热或卡他症状（流涕、打喷嚏、鼻塞等）症状，可以重复使用，重复次数不得超过 5 次。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">但我们还是要强调，重复使用有危险。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">除了戴口罩，我们更强调勤洗手。新型冠状病毒通过手接触之后，再去摸鼻子、嘴巴等黏膜从而进入体内，通过肥皂和流动水洗手超过 20 秒以上可以有效杀灭病原体起到防护作用。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">11.近期去过疫情高发区，回到居住地后要注意什么？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">如果近期去过疫情高发区，回到居住地后要特别留意自己及周围人的身体状况，并尽量避免前往公共场所及人群密集处。如出现发热、乏力、干咳、肌肉酸痛、气促等症状，应正确佩戴口罩并立即就医，就医时应主动告知医生自己的武汉旅行史和接触史，不要隐瞒自己的病情和经历。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">12.怎样洗手才有效？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">在餐前、便后、外出回家、接触垃圾、抚摸动物后，记得洗手。洗手时注意使用流动水和肥皂或洗手液彻底清洗双手，揉搓时间不少于 20 秒。为了方便记忆，揉搓步骤简单归纳为七字口诀：内-外-夹-弓-大-立-腕。<a style="margin: 0px; padding: 0px; text-decoration: none; color: #00c792; -webkit-tap-highlight-color: transparent;" href="https://dxy.com/column/4473">点击查看图片教程</a></p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">内：掌心对掌心，相互揉搓。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">外：掌心对手背，两手交叉揉搓。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">夹：掌心对掌心，十指交叉揉搓。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">弓：是指弯曲紧扣，转动揉搓。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">大：拇指握在掌心，转动揉搓。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">立：指尖在掌心揉搓。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">腕：清洁手腕。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">如果双手没有明显变脏时，可以使用含有酒精的手部消毒液，避免用未清洁的手触摸眼睛、鼻子和嘴巴。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">13.预防新型冠状病毒感染在饮食方面要注意什么？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">日常饮食建议按照《中国居民膳食指南》进行食物搭配，应注意保持合理的饮食结构，保障均衡营养。注意食物的多样性，粗细搭配、荤素适当，多吃新鲜水果蔬菜，补充维生素与纤维素，多饮水。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">不要听信偏方和食疗可以治疗新型冠状病毒感染的说法。如发现可疑症状，应做好防护，前往正规医院就诊。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">14.在家该如何预防新冠肺炎？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">确保室内空气流通，每星期至少彻底清洁家具环境一次。当物品表面或地面被呼吸道分泌物、呕吐物或排泄物污染时，应当先用吸水力强的即弃抹布清除可见的污垢，然后用适当的消毒剂清洁消毒受污染处及其附近地方。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">15.出门在外应该如何预防新冠肺炎？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">首先要确保自己的身体是健康的，如近期有发热、咳嗽等身体不适症状，应暂缓出行，前往医院就诊。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">其次出行应当尽量避免疫情高发区，如武汉等地。若前往其他地区，也要注意做好个人防护，如正确佩戴一次性医用外科口罩，打喷嚏或咳嗽时注意用纸巾或屈肘掩住口鼻，避免手在接触公共物品或设施后直接接触面部或眼睛，有条件时要用流水和肥皂洗手，或用免洗消毒液清洁双手。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">16.老年人、儿童等体弱人群有哪些防护措施？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">老年人是新型冠状病毒的易感人群，在疫情流行期间，应该做到不要出入人员密集的公共场所，减少不必要的社交活动，出行应该佩戴口罩、勤洗手，加强居家环境的清洁和消毒，保持室内空气流通。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">儿童是需要保护的重点人群，在勤洗手、少出行、戴口罩、多通风的同时，还应该叮嘱亲戚朋友避免对儿童，尤其是婴幼儿的近距离接触，比如亲吻、逗乐等。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">17.参加朋友聚餐要注意采取哪些防护措施？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">如果有发热、咳嗽、咽痛等不适症状，不应参加聚餐。在疾病流行的季节，要减少聚餐的频次，降低患病风险。如果一定要参加，请佩戴口罩，以减少病毒传播。聚会或聚餐时，尽量选择通风良好的场所。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">18.去人群聚集场所要注意采取哪些防护措施？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">高风险地区尽量避免去人群聚集的公共场所，以减少与患病人群接触的机会。如必须前往公共场所，要佩戴口罩以降低接触病原体的风险，前提是选择正确的口罩并正确的佩戴。同时应尽量避免去疾病流行地区以降低感染风险。</p>`,
          // 封面图片
          imgUrl: require("../assets/images-wal/001.jpg"),
        },
        {
          no: "2",
          title: "冠状病毒怕什么?",
          content: `<h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">1.新型冠状病毒肺炎的病原学特点？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">新型冠状病毒属于 &beta; 属的新型冠状病毒，有包膜，颗粒呈圆形或椭圆形，常为多形性，直径 60～140 nm，其基因特征与 SARSr-CoV 和 MERSr-CoV 有明显区别。目前研究显示与蝙蝠 SARSr 样冠状病毒同源性高达 85% 以上，体外分离培养时，SARS-Cov-2 96 小时左右即可在人呼吸道上皮细胞内发现，而在 Vero E6 和 Huh-7 细胞系中分离培养约需 6 天。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">2.新型冠状病毒肺炎如何传播？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">经呼吸道飞沫、接触传播是主要的传播途径，相对封闭环境中长时间暴露于高浓度气溶胶情况下存在经气溶胶传播的可能，由于在粪便及尿中可分离到新冠病毒，应注意粪便及尿液对环境污染造成气溶胶或接触传播。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">3.什么是可疑暴露者？什么是密切接触者？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">可疑暴露者是指暴露于新型冠状病毒检测阳性的野生动物、物品和环境，而且暴露的时候未采取有效防护（如戴口罩）。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">密切接触者是指与可疑感染者或确诊感染者有过如下接触情形之一：</p>
            <ol style="margin: 0px 0px 20px; padding: 0px 0px 0px 15px; list-style: outside none disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5; color: #666666; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: decimal; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">与病例共同居住、学习、工作或其他有密切接触的人员；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: decimal; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">诊疗、护理、探视病例时未采取有效防护措施的医护人员、家属或其他与病例有类似近距离接触的人员；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: decimal; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">病例同病室的其他患者及陪护人员；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: decimal; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">与病例乘坐同一交通工具并有近距离接触人员；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: decimal; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">现场调查人员调查后经评估认为符合条件的人员。</li>
            </ol>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">对于密切接触者，需要在家进行医学观察。不要上班不要随便外出，做好自我身体状况观察，定期接受社区医生随访。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">观察以下这些体征和症状：</p>
            <ol style="margin: 0px 0px 20px; padding: 0px 0px 0px 15px; list-style: outside none disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5; color: #666666; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: decimal; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">发烧。每天两次测量您的体温。</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: decimal; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">咳嗽。</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: decimal; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">呼吸短促或呼吸困难。</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: decimal; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">其他需要注意的早期症状包括畏寒、身体疼痛、咽喉痛、头痛、腹泻、恶心/呕吐和流鼻涕。</li>
            </ol>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">如果出现发热、咳嗽等异常症状，及时向当地社区随访医生报告，在医生的指导下到指定医疗部门进行排查、诊治。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">4.什么是接触传播？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">接触传播，包括直接接触传播和间接接触传播。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><strong style="margin: 0px; padding: 0px;">直接接触传播</strong></p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">直接接触传播指的是中间没有通过其他物品，病原体直接引起的感染。我们最常说的直接接触传播包括接吻和性交。接吻、性交本身就是近距离接触才能发生的，所以如果有疑似感染症状还是不建议的。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><strong style="margin: 0px; padding: 0px;">间接接触传播</strong></p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">间接接触传播指间接接触了被污染的物品所造成的传播。如手及日常生活用品（床上用品、玩具、食具、衣物等）被传染源的排泄物（如粪便可能存在传播，目前不能完全确定）或分泌物（如咳嗽喷嚏伴随的排泄物）污染后被手接触到，然后用手触摸鼻子、嘴巴、眼睛等粘膜从而进入体内。因此，最主要是的预防是洗手。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">5.什么是飞沫传播？什么是气溶胶传播？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">飞沫可以通过一定的距离（一般是 1～2 米）进入易感的粘膜表面。由于飞沫颗粒较大（大于 5um），不会长时间悬浮在空气中。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">日常面对面说话、咳嗽、打喷嚏都可能造成飞沫传播。如果周围有疑似新型冠状病毒患者，记得戴口罩并尽量保持 2 米以上的距离。口罩使用后应当正确丢弃，与患者接触后应该用肥皂和流动水等彻底清洗双手。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">气溶胶传播：可通过空气传播的颗粒，一般直径小于 5 um，能长时间远距离散播后仍有传染性的颗粒。通过空气传播的病原体也可以经过接触传播。之前流行的 SARS 冠状病毒，有人推测可以通过空气传播。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">6.「气溶胶传播」会传播新型冠状病毒吗？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">关于「气溶胶传播」，总而言之就是八个字：要重视，但不要恐慌。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">在开放环境中遇到病毒气溶胶的可能性很低。通过气溶胶形式悬停在衣物、皮肤的病毒，只有极微小的比例能通过手部触摸进入眼口鼻。这样的病毒量，引发疾病的可能性不高。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">除了在医院特定场所（比如插管操作）之外，并不需要过于担心气溶胶传播新冠病毒。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">勤开窗勤通风，保持室内空气流动，依然是重要的家居防护手段。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">7.自己或家人在家隔离观察，还能不能开窗通风？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">可以。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">必须单间隔离，或处在全屋出风的位置，公共区域或其它房间自然通风时，必须关闭患者所在屋子门窗。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">隔离房间的窗户打开时，应该尽量将隔离房间与其他房间隔绝，避免流向室内。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">只要开窗，空气就可以流通交换。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">8.如果家住在发热定点医院附近，还能不能开窗通风？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">可以。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">医院建筑设计都是严格按照相关标准和规范，民用建筑就算是住在发热定点医院附近，也足以保障安全有效的距离。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">9.如果邻居在家中隔离，还能不能开窗通风？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">可以。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">作为小区一般居民，无需过度恐慌，在家中只需要继续做好个人防护。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">除非跟邻居家（确诊或疑似病例；隔离观察）窗户紧挨着，邻居正对着你家窗户咳嗽，否则开窗通风并不会产生感染的风险。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">10.家里可以用空调吗？能不能代替开窗通风？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">空调可以用，但无法代替开窗通风。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">如果不能与室外进行空气交换，那么单纯增加空气流动意义不大。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">不同的空调设计不同，能否与室外发生空气交换，取决于空调是否有「换气」功能。普通空调在处于换气功能时，相当于一个小功率电扇，而加热制冷功能都会停止。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">简而言之，如果有「换气」功能，那么可以打开它同时开窗；如果没有，那么空调增加室内空气流动对于防控病菌没有意义。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">当然也不会造成房间内的交叉污染。目前大部分家庭是分体式空调，空气只是通过空调器后在室内自行循环。只要注意开窗通风，对回风口的滤网及时清洗、消毒即可。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">11.中央空调还能不能用？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">根据场所、实际情况决定是否使用。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">目前中央空调基本是风机盘管加新风系统设计，房间相对来说变成一个正压的环境，在这种情况下，通过增加新风量来减少室内空气的重复循环。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">此外中央空调本身并不会产生病毒，也不是病毒的宿主，它只是增加了空气在不同房间的交流。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">对于家庭使用的中央空调，如果家中不是有人在某个房间隔离，使用是没有任何问题。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">如果是整栋楼相通的中央空调，特别是公共区域（如酒店、公司、商场等）有排风口，万一有人感染，那么病毒有可能通过送风系统在楼内传播，形成交叉污染。需要消毒后经过评估后才能重新使用。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">12.空气净化器能不能代替开窗？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">可以，但不要过分依赖。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">病毒附着在飞沫上，一般的空气净化器都可以吸附过滤飞沫，所以在室内打开空气净化器是有帮助的。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">但注意的是目前空气净化器多采用过滤式除尘作用，并不具备消毒作用，因此开窗通风才是更好的选择。</p>`,
          imgUrl: require("../assets/images-wal/002.jpg"),
        },
        {
          no: "3",
          title: "帮你排除感染症状",
          content: `<h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">1.出现什么症状可能感染了新型冠状病毒？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">新型冠状病毒感染的一般症状有：发热、乏力、干咳，逐渐出现呼吸困难；部分患者起病症状轻微，甚至可无明显发热。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">严重症状有：急性呼吸窘迫综合征、脓毒性休克、难以纠正的代谢性酸中毒、出凝血功能障碍。从目前收治的病例情况看，多数患者预后良好，少数患者病情危重，甚至死亡。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">除了以上发病症状，还有可能发病症状「不典型」，例如：</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">（1）仅以消化系统症状为首发表现：如轻度纳差、乏力、精神差、恶心呕吐、腹泻等；<br style="margin: 0px; padding: 0px;" />（2）以神经系统症状为首发表现：如头痛；<br style="margin: 0px; padding: 0px;" />（3）以心血管系统症状为首发表现：如心慌、胸闷等；<br style="margin: 0px; padding: 0px;" />（4）以眼科症状为首发表现：如结膜炎；<br style="margin: 0px; padding: 0px;" />（5）仅有轻度四肢或腰背部肌肉酸痛。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">2.如果出现发热、乏力、干咳等临床表现，是否意味着感染新冠肺炎了？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">很多呼吸道疾病都会表现为发热、乏力、干咳等症状，是否感染还需要医生结合发病前是否去过疾病流行区、是否接触过可疑或确诊病例、实验室检查结果等一起来综合判断。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">3.干咳是症状之一，那么干咳和咳嗽有什么区别？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">干咳与咳嗽的主要区别在于是否有痰。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">干咳是指咳嗽时无痰或痰量极少的咳嗽。普通感冒、急性支气管炎也会引起干咳，一些呼吸道感染性疾病也很常见，如急性鼻窦炎、急性鼻炎、急性扁桃体炎、急性咽炎、慢性支气管炎急性发作等。除此之外，吸入一些刺激性气体、粉尘等也可以诱发急性干咳。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">咳嗽是呼吸道的一种保护性反应机制，通过咳嗽能清除呼吸道里的分泌物和有害因子。当气道内的分泌物或者有害因子随着咳嗽的动作排出体外时就形成了咳痰。咳嗽与咳痰通常意味着呼吸道受到了某种刺激或者存在某种疾病。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">4.出现什么症状需要及时就医？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">如果出现发热、乏力、肌肉酸痛、咳嗽、咳痰、气促、腹泻、结膜充血等症状，都应及时就医，并告诉医生发病前两周的旅行史或接触史，以便医生快速做出判断。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">5.出现症状去医院看什么科室？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">对于出现发热、乏力、咳嗽的患者，到医院之后，首先会由护士测量体温，引导到发热门诊就诊，门诊医生会询问你 2 周内是否到过疾病流行区，是否接触过可疑或确诊病例。如果是可疑肺炎，医生会对你采集咽拭子、痰液等标本送疾病预防控制中心或有条件的医院实验室进行新型冠状病毒检测。如果 2 次核算检测结果为阳性，即确诊。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">6.新型冠状病毒肺炎与流感、普通感冒症状有什么区别？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><strong style="margin: 0px; padding: 0px;">新型冠状病毒肺炎</strong>以<strong style="margin: 0px; padding: 0px;">发热</strong>、<strong style="margin: 0px; padding: 0px;">乏力</strong>、<strong style="margin: 0px; padding: 0px;">干咳</strong>等为主要表现，少数患者伴有<strong style="margin: 0px; padding: 0px;">鼻塞</strong>、<strong style="margin: 0px; padding: 0px;">流涕</strong>、<strong style="margin: 0px; padding: 0px;">腹泻</strong>等上呼吸道和消化道症状。可伴有<strong style="margin: 0px; padding: 0px;">肺炎</strong>，但早期肺炎可能不发热，仅有<strong style="margin: 0px; padding: 0px;">畏寒</strong>和<a style="margin: 0px; padding: 0px; text-decoration: none; color: #00c792; -webkit-tap-highlight-color: transparent;" href="https://m.dxy.com/disease/2252/detail">呼吸道感染</a>症状，但 CT 会显示有肺炎现象。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><strong style="margin: 0px; padding: 0px;">重症病例</strong>多在 1 周后出现呼吸困难或/和低氧血症，严重者快速进展为<strong style="margin: 0px; padding: 0px;">急性呼吸窘迫综合征</strong>、<strong style="margin: 0px; padding: 0px;">脓毒性休克</strong>、难以纠正的<strong style="margin: 0px; padding: 0px;">代谢性酸中毒</strong>和<strong style="margin: 0px; padding: 0px;">出凝血功能障碍</strong>。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">值得注意的是重症、危重症患者病程中可为<strong style="margin: 0px; padding: 0px;">中低热</strong>，甚至<strong style="margin: 0px; padding: 0px;">无明显发热</strong>。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><strong style="margin: 0px; padding: 0px;">轻症患者</strong>仅表现为<strong style="margin: 0px; padding: 0px;">低热</strong>、<strong style="margin: 0px; padding: 0px;">轻微乏力</strong>等，无肺炎表现，多在 1 周后恢复。少数感染者<strong style="margin: 0px; padding: 0px;">无明显临床症状</strong>、仅检测阳性。从目前收治的病例情况看，多数患者预后良好，儿童病例相对较轻，少数患者病情危重。部分儿童及新生儿病例症状可不典型，表现为呕吐、腹泻等消化道症状或仅表现为精神弱、呼吸急促。死亡病例多见于老年人和慢性基础疾病者。<br style="margin: 0px; padding: 0px;" /><img style="margin: 0px; padding: 0px; max-width: 100%;" src="https://file1.dxycdn.com/2020/0130/757/3393849506277163545-22.jpg" alt="感冒.jpg" /></p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">图片来自于中国疾病预防控制中心《新型冠状病毒感染的肺炎公众防护指南》</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><strong style="margin: 0px; padding: 0px;">流感症状</strong>主要表现为发热、头痛、肌肉痛和全身不适，体温可达 39～40 ℃，可有畏寒、寒战，多伴全身肌肉关节酸痛、乏力、食欲减退等全身症状，常有咽喉痛、干咳，可有鼻塞、流涕、胸骨后不适等。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">颜面潮红，眼结膜充血。部分以呕吐、腹痛、腹泻为特点，常见于感染乙型流感的儿童。无并发症者病程呈自限性，多余发病 3～4 天后体温恢复正常，全身症状好转，但咳嗽、体力恢复常需 1～2 周。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">肺炎是最常见的并发症，其他并发症有神经系统损伤、心肌损害、肌炎、横纹肌溶解综合征和脓毒性休克等。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><strong style="margin: 0px; padding: 0px;">普通感冒</strong>以鼻塞、流鼻涕为主要表现，多数患者症状较轻，一般不引起肺炎症状。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><img style="margin: 0px; padding: 0px; max-width: 100%;" src="https://file1.dxycdn.com/2020/0208/615/3395549976171289431-22.jpg" alt="2.jpg" /></p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">7.怀疑周围人有感染新型冠状病毒怎么办？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">如果怀疑周围人感染了新型冠状病毒，首先应自己佩戴口罩，与对方保持 2 米 以上的距离，避免与对方近距离交流，然后建议对方佩戴口罩，及时前往就近的定点医院发热门诊接受治疗。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">8.老人更容易感染新型冠状病毒吗？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">首先，诊断学上一般将 65 周岁及以上的人定义为「老年人」。不过，每个人的身体状况都不同，建议 60 周岁以上的人都提高健康意识，密切关注自身状况。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">新型冠状病毒对各人群普遍易感。但老年人的整体免疫力通常较低，并且经常伴有心血管疾病等基础疾病，感染病毒之后病情较重，更有可能快速进展为重症，乃至死亡，因此，确实需要更加重视。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">9.无发烧、咳嗽的「不典型」患者如何不漏诊？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">「不典型」患者可能的首发症状</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">根据武汉大学人民医院研究组 1 月 23 日发布的《新型冠状病毒性肺炎（2019-nCOV）患者的识别与防护&mdash;&mdash;高度重视非呼吸系统的首发症状》</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">有部分患者是以非呼吸系统症状为首发症状的情况，如：</p>
            <ul style="margin: 0px 0px 20px; padding: 0px 0px 0px 15px; list-style: outside none disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5; color: #666666; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px;">以消化系统症状为首发表现：如轻度纳差、乏力、精神差、恶心呕吐、腹泻等；</p>
            </li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px;">以神经系统症状为首发表现：如头痛；</p>
            </li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px;">以心血管系统症状为首发表现：如心慌、胸闷等；</p>
            </li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px;">以眼科症状为首发表现：如结膜炎；</p>
            </li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px;">仅有轻度四肢或腰背部肌肉酸痛。</p>
            </li>
            </ul>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">上述以非呼吸系统为首发表现的患者，易至相关科室就诊，如消化内科、神经内科、心血管内科等，容易造成误诊和漏诊。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">10.作为医护人员该如何应对？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">由于新型冠状病毒性肺炎部分病人无发热等明显症状，必须充分提高对纳差、乏力、肌肉酸痛（包括轻微酸痛）和精神稍差患者的警惕，及时进行相关排查。</p>
            <ol style="margin: 0px 0px 20px; padding: 0px 0px 0px 15px; list-style: outside none disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5; color: #666666; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: decimal; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px;">应更加详细地对患者的病史进行询问：特别是对于有疑诊或确诊患者的接触史、近两周内是否出现发热的病史。</p>
            </li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: decimal; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px;">对此类「不典型」病例，及时进行血常规、呼吸道病原学检测，有条件情况下行胸部 CT 的检查，同时应与患者及家属进行充分的沟通。</p>
            </li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: decimal; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px;">若提示异常，应进一步完善冠状病毒的检测。</p>
            </li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: decimal; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px;">特别强调不建议进行胸片的检查以避免漏诊难以发现的早期病变。</p>
            </li>
            </ol>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">11.疑似病例和确诊病例是否可以自行隔离？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">根据钟南山的指导意见，他认为疑似病例和确诊病例因病房不够自行在家隔离，这种行为非常危险。目前医疗资源相对充足，一旦发现有疑似症状，应立即就医。</p>`,
          imgUrl: require("../assets/images-wal/003.jpg"),
        },
        {
          no: "4",
          title: "什么是新型冠状病毒",
          content: `<h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">1.什么是新型冠状病毒？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">此次流行的冠状病毒为一种新发现的冠状病毒，国际病毒分类委员会命名为 SARS-Cov-2。因为人群缺少对新型病毒株的免疫力，所以人群普遍易感。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">2.新型冠状病毒肺炎由什么引起的？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">由 SARS-Cov-2 冠状病毒引起，WHO 将 SARS-Cov-2 感染导致的疾病命名为 COVID-19，其中多数感染可以导致肺炎，就称之为新型冠状病毒肺炎/新冠肺炎。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">传染源主要是新型冠状病毒感染的患者和无症状感染者， 在潜伏期即有传染性，发病后 5 天内传染性较强。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">3.冠状病毒的致病性如何？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">冠状病毒主要感染成人或较大儿童，引起<a style="margin: 0px; padding: 0px; text-decoration: none; color: #00c792; -webkit-tap-highlight-color: transparent;" href="https://m.dxy.com/disease/2253/detail">普通感冒</a>和<a style="margin: 0px; padding: 0px; text-decoration: none; color: #00c792; -webkit-tap-highlight-color: transparent;" href="https://m.dxy.com/disease/2254/detail">咽喉炎</a>，某些毒株还可引起成人<a style="margin: 0px; padding: 0px; text-decoration: none; color: #00c792; -webkit-tap-highlight-color: transparent;" href="https://m.dxy.com/disease/10410/detail">腹泻</a>。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">经呼吸道飞沫和密切接触传播是主要的传播途径。接触病 毒污染的物品也可造成感染。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">在相对封闭的环境中长时间暴露于高浓度气溶胶情况下存 在经气溶胶传播的可能。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">由于在粪便、尿液中可分离到新型冠状病毒，应注意其对 环境污染造成接触传播或气溶胶传播。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">4.新型冠状病毒与 SARS 病毒的区别是什么？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">新型冠状病毒与 SARS 病毒、MERS 病毒同属于冠状病毒这个大家族，是「兄弟姐妹」，基因序列有很多一样的地方，但不完全相同。传染性与&nbsp;<a style="margin: 0px; padding: 0px; text-decoration: none; color: #00c792; -webkit-tap-highlight-color: transparent;" href="https://m.dxy.com/disease/8590/detail">SARS</a>&nbsp;相比有待确定，致死率按照目前来看较 SARS 较低，但是不排除病毒变异的可能。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">5.新型冠状病毒会人传人吗？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">会。根据目前的证据，可以确定新型冠状病毒可以持续人传人。经呼吸道飞沫和密切接触传播是主要的传播途径。接触病 毒污染的物品也可造成感染。 在相对封闭的环境中长时间暴露于高浓度气溶胶情况下存 在经气溶胶传播的可能。 由于在粪便、尿液中可分离到新型冠状病毒，应注意其对 环境污染造成接触传播或气溶胶传播。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">新型冠状病毒具有一定的传播强度，如果不采取防护措施，理论上平均 1 名患者可以将病毒传播给 2～3 个人（尚无定论，详见下一个问题）。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">6.R<sub style="margin: 0px; padding: 0px;" data-tomark-pass="">0</sub>&nbsp;是什么？新型冠状病毒的 R<sub style="margin: 0px; padding: 0px;" data-tomark-pass="">0</sub>&nbsp;是多少？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">R<sub style="margin: 0px; padding: 0px;" data-tomark-pass="">0</sub>，英文读作 R naught，是基本传染数（basic reproductive number）的简写。基本传染数也译作「基本传播数」「基本再生数」「基本传播系数」等。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">R<sub style="margin: 0px; padding: 0px;" data-tomark-pass="">0</sub>&nbsp;是一个流行病学术语，指在<strong style="margin: 0px; padding: 0px;">没有外力介入</strong>、所有人都<strong style="margin: 0px; padding: 0px;">没有免疫力</strong>的情况下，一个感染者在他具有传染性的这一段时间内，<strong style="margin: 0px; padding: 0px;">平均</strong>可以传染多少个人。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">可见，R<sub style="margin: 0px; padding: 0px;" data-tomark-pass="">0</sub>&nbsp;主要用来衡量某种病原体的传染能力、传播效率。R<sub style="margin: 0px; padding: 0px;" data-tomark-pass="">0</sub>&nbsp;越高，说明病原体的传染性越强。比如：</p>
            <ul style="margin: 0px 0px 20px; padding: 0px 0px 0px 15px; list-style: outside none disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5; color: #666666; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">麻疹病毒的 R<sub style="margin: 0px; padding: 0px;" data-tomark-pass="">0</sub>&nbsp;是 12～18；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">艾滋病毒的 R<sub style="margin: 0px; padding: 0px;" data-tomark-pass="">0</sub>&nbsp;是 2～5；</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">SARS 的 R<sub style="margin: 0px; padding: 0px;" data-tomark-pass="">0</sub>&nbsp;是 2～5。</li>
            <li style="margin: 0px; padding: 0px 0px 6px; -webkit-tap-highlight-color: transparent; list-style: disc; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; line-height: 1.5;">新型冠状病毒的 R<sub style="margin: 0px; padding: 0px;" data-tomark-pass="">0</sub>&nbsp;是 2～3（目前还没有定论，有最新研究认为是 3.77）。</li>
            </ul>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">7.R<sub style="margin: 0px; padding: 0px;" data-tomark-pass="">0</sub>&nbsp;会随着疫情的发展而变化吗？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">不会。R<sub style="margin: 0px; padding: 0px;" data-tomark-pass="">0</sub>&nbsp;是在疫情早期、未采取任何介入措施、人群没有免疫力的情况下计算出的数值，反映病原体固有的传染能力、传播效率。会随疫情变化的系数是 R<sub style="margin: 0px; padding: 0px;" data-tomark-pass="">t</sub>。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">当有外力介入（比如采取了有效的隔离措施）且人群有免疫力（比如，病后痊愈患者获得短期的免疫力，发现有效的预防性药物，疫苗研发成功等）后，病原体的传播系数（流行病学中称为「有效传染数（effective reproduction number, R<sub style="margin: 0px; padding: 0px;" data-tomark-pass="">t</sub>）」会随之下降。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">疫情是否能够得到控制，取决于有效传染数 R<sub style="margin: 0px; padding: 0px;" data-tomark-pass="">t</sub>&nbsp;是否可以持续小于 1。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">8.康复期和出院患者有传染性吗？出院后会继续被感染吗？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">东南大学附属中大医院副院长邱海波：康复期和出院病人经过了两次核酸检测阴性，没有病毒复制了。同时自身产生抗体，就能抵御新型冠状病毒的感染。这种抗体虽然不是终身的，但在半年或更长时间感染这种新型冠状病毒的可能性很小。新冠肺炎患者康复出院后仍有传播病毒风险，要求继续 14 天健康监测和医学观察。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">9.哪些人容易感染新型冠状病毒？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">人群普遍易感。新型冠状病毒肺炎在免疫功能低下和免疫功能正常人群均可发生，与接触病毒的量有一定关系。如果一次接触大量病毒，即使免疫功能正常，也可能患病。对于免疫功能较差的人群，例如老年人、孕产妇或存在肝肾功能障碍的人群，病情进展有可能相对较快，严重程度也有可能更高。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">是否会感染，主要取决于接触机会，并不是抵抗力强的人群就不会感染。能够保护自己和家人不感染新型冠状病毒最好的办法，就是不接触任何感染者。只要接触到患者，就有可能感染，无论是抵抗力强的人，还是抵抗力差的人。儿童接触的机会少，感染的机率低；同样的接触机会，老年人、有慢性病的人以及抵抗力差的人感染几率可能更大。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">感染后或接种新型冠状病毒疫苗后可获得 一定的免疫力，但持续时间尚不明确。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">10.新型冠状病毒怕什么？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">对冠状病毒理化特性的认知多来自对 SARS-CoV 和 MRRS-CoV 的研究。病毒对紫外线和热敏感，在 56 ℃ 条件下，30 分钟就能杀灭病毒；含氯消毒剂、酒精、碘类、过氧化物类等多种消毒剂也可有效灭活该病毒。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">权威数据库 UPTODATE 指出，医院和家庭常用的几种杀菌/消毒溶液，包括对氯间二甲苯酚，苯扎氯铵和西曲溴铵/ 氯已定，已被证明对新型冠状病毒无效。购买消毒剂的时候，需要不建议购买这三种成分的消毒剂。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">11.为什么要对密切接触者医学观察 14 天？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">新型冠状病毒肺炎的潜伏期 1～14 天，多为 3～7 天。</p>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">参照其他冠状病毒所致疾病的潜伏期，此次新冠肺炎病例将密切接触者医学观察期定为 14 天，并对密切接触者进行居家医学观察。过了 14 天，如果没有发病，才可以判定此人未被感染。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">12.潜伏期能查出来吗？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">潜伏期可以通过对患者样本进行核酸检测，可以早期发现新型冠状病毒感染。</p>
            <h2 style="margin: 0px; padding: 0px 0px 20px; font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; overflow-wrap: break-word; color: #333333; font-weight: 500; font-size: 1.7rem; line-height: 1.12; letter-spacing: 1px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">13.被治愈的人还会继续患病（被传染）吗？</h2>
            <p style="margin: 0px; padding: 0px 0px 20px; font-family: 'Source Han Sans CN', 'Noto Sans CJK SC', sans-serif; overflow-wrap: break-word; font-size: 1.6rem; line-height: 24px; color: #666666; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">冠状病毒属于单链 RNA 病毒，容易变异，所以很难形成持续性免疫力。比如每年流行的流感病毒，都需要接种最新的疫苗，也是因为病毒类型经常会发生变化。新冠肺炎患者康复出院后仍有传播病毒风险，要求继续 14 天健康监测和医学观察。</p>`,
          imgUrl: require("../assets/images-wal/004.jpg"),
        },
        {
          no: "5",
          title: "紧急上市的研发流程",
          content: `<h1 style="margin: 0px; padding: 0px; color: #333333; font-size: 26px; font-weight: 600; font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', '\微软雅黑', Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">新冠疫苗紧急上市，需要经过哪些流程？</h1>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; color: #000000; font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', '\微软雅黑', Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">新冠疫苗快速上市的研发流程有哪些？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">新型冠状病毒疫苗从研发到上市要经过以下几个步骤：</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">一、临床前试验</strong>：</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">临床前试验的目的是掌握新型冠状病毒的抗原特征信息，选取合适的抗原组分并制作疫苗在动物模型中进行试验。初步了解疫苗是否对动物安全有效。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">二、临床试验</strong>：</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">药品或疫苗上市前在人群中的临床试验，分为 Ⅰ 至 Ⅲ 期。用来全面评价疫苗上市前的有效性和安全性。只有前一期临床试验成功，才能进行下一期临床试验。临床试验很少一帆风顺，每一期都可能因为达不到理想的标准被暂停、推倒重来，甚至停止。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">三、注册审批、规模生产、批签发检验：</strong></p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">疫苗三期临床试验全部完成后才能申请上市注册。如果监管部门审评认为疫苗达到安全、有效、质量可控，才能批准上市。生产企业还需要准备大规模生产需要的场地、设备等。疫苗生产出来后还需要进行严格的检验，检验合格才能真正用于上市接种。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">国内疫苗的研发和上市进度怎么判断？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <ul style="margin: 10px 0px 0px; padding: 0px; list-style: none; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">研发阶段</strong>：</li>
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">临床前</strong>：在新疫苗正式用于人体前，为了保证安全性，研究人员会先在细胞上进行测试，然后在小鼠或猴等动物身上进行测试，查看安全性和免疫原性（效果）情况。这些都通过了可以向国家药品监督管理部门申请临床试验。</li>
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">Ⅰ 期临床试验</strong>：针对少数人群注射疫苗，重点是观察不同剂量疫苗的安全性，部分情况也会研究人体对疫苗的免疫反应。这一阶段受试者数量有限，通常为几十到上百人不等，受试者通常为 18岁以上的健康成年人。</li>
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">Ⅱ 期临床试验</strong>：进一步确认疫苗的安全性和免疫原性，并确定疫苗剂量和免疫程序。II 期临床试验人数会增加到几百至上千人，这些研究中的受试者可能包括感染传染病的高危人群。</li>
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">Ⅲ 期临床试验</strong>：此期在几千至上万人中开展，这些试验用来确定疫苗是否能预防新型冠状病毒感染。FDA 在 6 月份表示，冠状病毒疫苗必须保护至少 50％ 的疫苗接种者才被视为有效。此外，III 期临床试验的规模要足以显示早期研究中可能遗漏的相对罕见的不良反应。III 期临床试验的方案设计和实施要求最严格，难度也最高，历史上许多研究项目都是在 III 期试验阶段功亏一篑。</li>
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">Ⅳ期临床试验（正式上市）</strong>：在疫苗上市后继续进行研究，这其中包括安全性、有效性、免疫持久性、联合其他疫苗接种的影响，甚至其他的潜在功效。</li>
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">有限批准（紧急上市）</strong>：由于疫苗 Ⅲ 期临床试验耗时较长，因此在疫情大流行期间，疫苗可能会在正式完成 Ⅲ 期临床试验并获得批准之前得到紧急使用授权，以用于一些特殊情况或特定人群。中国有多款疫苗已经有限获批用于医务人员等特定人群，而不是等待Ⅲ期临床试验的结果。俄罗斯甚至连Ⅲ期临床试验都没做就批准了疫苗使用。提前使用有一定必要性，但这种匆忙进行的过程同时也必然增加了安全性方面的潜在风险。</li>
            </ul>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">&nbsp;</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">审核专家：田伟 王素娜</strong></p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">内容策划：范运柱</strong></p>
            </div>
            </div>`,
          imgUrl: require("../assets/images-wal/005.jpg"),
        },
        {
          no: "6",
          title: "疫苗不良反应",
          content: `<h1 style="margin: 0px; padding: 0px; color: #333333; font-size: 26px; font-weight: 600; font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', '\微软雅黑', Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">接种新冠病毒疫苗可能出现哪些不良反应？如何处理？</h1>
            <div class="author" style="margin: 0px; padding: 20px 0px; -webkit-tap-highlight-color: transparent; display: flex; line-height: 1.17; color: #000000; font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', '\微软雅黑', Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <div class="avatar avatar-rectangle" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; width: 36px; height: 36px; border-radius: 4px; overflow: hidden; border: 1px solid #ebebeb; box-sizing: border-box; object-fit: contain;"><img style="margin: 0px; padding: 0px; max-width: 100%; object-fit: contain; display: block; width: 34px;" src="https://img1.dxycdn.com/2019/1207/661/3383858813198700403-22.jpg!wh200" alt="avatar" /></div>
            </div>
            <div class="author-info" style="margin: 0px 0px 0px 10px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p class="author-name" style="margin: 0px; padding: 0px; color: #4d4d4d; font-weight: 500; font-size: 13px; min-height: 5px;">张量智</p>
            <p class="author-remark" style="margin: 6px 0px 0px; padding: 0px; color: #666666; font-weight: 300; font-size: 12px; display: -webkit-box; word-break: break-all; overflow: hidden; -webkit-line-clamp: 1; text-overflow: ellipsis; -webkit-box-orient: vertical; white-space: normal;">成都疾病预防控制中心 免疫规划科</p>
            </div>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; color: #000000; font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', '\微软雅黑', Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">接种新冠疫苗会不会感染上新冠病毒？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">目前我们国家批准紧急使用的新冠疫苗属于灭活疫苗，是利用贝塔丙内酯将人工大量培养的新冠病毒灭活，使其丧失感染性和毒性而保持免疫原性，并结合相应的佐剂而制成的疫苗，所以接种新冠疫苗是不会感染上新冠病毒的。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">从今年 7 月份到目前，在自愿、知情、同意的前提下，我国对高风险暴露人群进行了紧急接种，目前累计已经完成 100 多万剂次的新冠疫苗紧急接种工作，严重不良反应发生率很低。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">接种新冠病毒疫苗可能出现哪些不良反应？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">接种新冠病毒疫苗导致的不良反应包括全身性反应和局部反应，常见的不良反应包括一过性发热、接种部位的红肿、疼痛和硬结等，其它严重不良反应较罕见。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">截止至 2020 年 12 月的数据显示，新冠疫苗接种后发生了一定比例的不良反应，总的发生率与常规接种的灭活疫苗接近，主要表现是局部疼痛、硬结，轻度发热比例大概不到 0.1%，过敏反应比较严重的不良发生率大约为百万分之二。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">目前尚未发现接种新冠病毒疫苗后出现抗体依赖增强（ADE）效应，即接种疫苗后，再次接触新型冠状病毒反而加重病毒感染后症状的现象。但新冠疫苗是否存在 ADE 效应还需要在 Ⅲ 期临床甚至疫苗上市后的监测分析才能得到答案。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">出现上述不良反应，应该如何处理？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">疫苗引起的发烧、接种部位红肿、疼痛等不良反应通常会在两到三天之内自行缓解，一般不需要特殊处理。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">如果症状较重或者发生严重不良反应及时就医处理。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">接种新冠病毒疫苗需不需要检查是否产生了抗体？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">由于在疫苗上市前的临床试验中已经做了充分的疫苗免疫原性评价，和其它大多数疫苗一样，接种新冠病毒疫苗后通常不再需要检查是否产生了抗体，且目前市面上抗体检测方法鱼龙混杂，因此检测后的结果并不一定可靠。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">如果接种后检测抗体阴性应该怎么办？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">尚无研究数据表明接种后抗体阴性的受种者是否需要补种。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">接种新冠疫苗后还需做核酸检测吗？接种证明能否替代核酸检测报告？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">接种疫苗可以在一定程度上降低感染风险，但任何疫苗的保护效果都不能达到 100%，必要时仍应配合相关部门进行核酸检测。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">打了新冠疫苗，是不是还要继续戴口罩？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">到目前为止，任何疫苗的保护效果都不能达到 100%，少数人接种后仍可能不产生保护力或者发病。目前，人群免疫屏障尚未建立。因此，接种疫苗后仍需要做好戴口單、勤洗手、开窗通风、保持社交距离等个人防护措施。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">妈妈接种新冠病毒疫苗后可以哺乳吗？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">理论上接种疫苗后不影响哺乳。但目前暂无新型冠状病毒疫苗抗体是否会通过乳汁分泌，以及是否会影响婴幼儿健康的数据，所以哺乳期暂不建议接种。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">接种新冠疫苗需要多少钱？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">2020 年 12 月 31 日，国家卫健委副主任、国务院联防联控机制科研攻关组疫苗研发专班负责人曾益新介绍，新冠病毒疫苗的基本属性是公共产品，价格根据使用规模的大小会有所变化，但是一个大前提肯定是为全民免费提供。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">到哪里可以接种新冠疫苗？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">到 2020 年 12 月 31 日为止，国药集团中国生物北京公司等三家企业已经完成了今年的产能建设任务，特别是国药集团中国生物北京公司已经启动了大规模生产。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">疫苗生产上市后，可以在各地县级以上卫生行政部门批准的预防接种门诊或临时接种点接种。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">为什么儿童不是目前新冠疫苗的优先接种对象？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">（本内容由李卫国医生贡献）</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">一、安全性是最大考虑：</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">疫苗在注册上市之前，要经历立项研究、安全评估、I、II、III 期临床试验等多个环节，从研发到上市通常需要数年至数十年不等的时间。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">特殊疫情威胁之下，各国纷纷加快新冠疫苗研发速度，新冠疫苗有望用时 1 年上市。为了更快的上市，在早期只选择成年人作为 3 期临床试验对象。新冠更是全球紧急公共卫生事件，疫苗研发和投入使用是各国药监部门紧急授权。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">即使是普通疫苗也是先从成人验证安全性，比如麻疹疫苗、脊髓灰质炎疫苗和破伤风疫苗，都是逐渐扩大年龄范围开展临床试验。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">二、而且儿童疫苗研发的复杂性也决定了儿童无法优先接种：</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">1. 疫苗研发需要科学严谨的测试，确保使用安全。</strong></p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">因为安全性问题，一些已经流行很多年的对儿童威胁较大的常见病毒，至今都没有疫苗诞生。如呼吸道合胞病毒（RSV）造成的毛细支气管炎导致每年 3000 万次下呼吸道感染，300 万次住院。但在 RSV 疫苗研发过程中，曾经出现过加重病情，甚至导致儿童死亡的情况，数十年来科学家仍在继续研发中。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">2. 从病毒感染的机制角度，新冠疫苗造成的免疫应答有复杂性。</strong></p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">儿童和成人的免疫反应不一样，从几个月的婴儿到十几岁的青少年，免疫应答肯定有很多不同。这种差异造成了一些疫苗接种的剂量及接种次数不同。比如乙肝疫苗在儿童接种的剂量则较成人少很多；另外，接种次数也有可能不同，比如流感疫苗，9 岁及以上儿童和成人仅需接种 1 剂，首次接种或既往接种 2 剂次以下流感疫苗的 6 月龄~8 岁儿童应接种2剂次。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">3. 儿童多系统炎症综合征（MIS-C）是近期在欧美观察到的儿童新冠肺炎并发症。</strong></p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">大约在今年 4 月份时，意大利和英国的儿科观察到类似川崎病表现的儿童在当地激增。病原学检查发现，很多 MIS-C 患者都有新冠病毒感染的证据。尤其是血清学检查阳性，提示这可能是由病毒引发的免疫反应造成的炎症风暴。因此，就有学者担心疫苗造成的免疫反应会触发同样的并发症。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">关于新冠病毒疫苗的其它注意事项？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">接种现场应备有肾上腺素等药物，以备偶有发生严重过敏反应时急救使用。所有受种者完成疫苗注射后都应在接种门诊观察至少 30 分钟，无异常表现方可离开。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">&nbsp;</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">审核专家：田伟 王素娜</strong></p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">内容策划：范运柱</strong></p>
            </div>
            </div>`,
          imgUrl: require("../assets/images-wal/006.jpg"),
        },
        {
          no: "7",
          title: "新冠疫苗接种方法",
          content: `<h1 style="margin: 0px; padding: 0px; color: #333333; font-size: 26px; font-weight: 600; font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', '\微软雅黑', Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">新冠疫苗如何接种？需要接种几针？</h1>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; color: #000000; font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', '\微软雅黑', Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">新冠病毒疫苗接种频率？剂次？每次间隔多久？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">目前批准开展紧急接种的新型冠状病毒疫苗的免疫程序为接种两剂，每剂 0.5 mL，两剂之间间隔 2～4 周。疫苗正式上市后，以疫苗说明书要求为准。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">新冠病毒疫苗如何接种？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">目前批准开展紧急接种的新型冠状病毒疫苗的接种途径为上臂三角肌肌内注射。疫苗正式上市后，以疫苗说明书要求为准。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">错过接种时间或延误接种后如何补种？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">目前尚未获得不同免疫程序的临床研究数据，因此不确定两剂疫苗的最大间隔。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">但结合其他疫苗的经验，如果推迟接种或者未能按照免疫程序完成接种，应尽快开始接种或者补齐相应剂次。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">国内这些疫苗的效果怎么样？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">已有数据显示，保护率为 79.34%，实现安全性、有效性、可及性、可负担性的统一，达到世界卫生组织及国家药监局相关标准要求。后续，疫苗免疫的持久性和保护效果还需持续观察。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">接种新冠疫苗后，抗体可持续多长时间？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">病毒发现的时间还不到一年，所以现在说这个疫苗能够保护多长时间还为时过早，还不能下这个结论。目前证据提示，按世界卫生组织规定要求，疫苗保护期达到半年以上，基本上没有问题。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">接种新冠疫苗后，是不是就不会再感染新冠病毒了？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">接种疫苗是预防和控制传染病最经济、有效的措施，但截止到目前还没有任何一个疫苗的保护率能达到百分之百。新冠疫苗也不例外，尤其是在当前群体免疫还没有建立起来的情况下，建议即使接种新冠疫苗以后，大家还是要继续维持个人防护措施，包括戴口罩、保证社交距离、勤洗手等，这样才能更好地保障你我和大家的安全。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">新冠病毒变异，现在研发的疫苗还有用吗？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><span style="margin: 0px; padding: 0px; color: #333333;">在 31 日举行的国务院联防联控机制新闻发布会上，科技部副部长徐南平说，根据国家生物信息中心掌握的近 30 万条新冠病毒基因组序列的数据监测结果，综合分析研判认为，目前观察到的变异仍属正常范围的变异积累。总体来说，专家研判认为，目前没有证据证明观察到的变异对疫苗使用效果构成实质影响。</span><span style="margin: 0px; padding: 0px; color: #999999;">（来源：新华视点 @微博）</span></p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">&nbsp;</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">审核专家：田伟 王素娜</strong></p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">内容策划：范运柱</strong></p>
            </div>
            </div>`,
          imgUrl: require("../assets/images-wal/007.jpg"),
        },
        {
          no: "8",
          title: "新冠疫苗分几种",
          content: `<h1 style="margin: 0px; padding: 0px; color: #333333; font-size: 26px; font-weight: 600; font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', '\微软雅黑', Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">新冠疫苗分几种，优缺点有哪些？怎么选？</h1>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; color: #000000; font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', '\微软雅黑', Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">根据研发原理和生产工艺的不同，WHO 的疫苗分类一共是 10 类，但是为了便于说明，下面将新冠病毒疫苗分为 6 类（不同种类疫苗的优劣见下文）：</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <ul style="margin: 10px 0px 0px; padding: 0px; list-style: none; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">全病毒灭活疫苗</strong></li>
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">病毒载体疫苗（复制 / 非复制）</strong></li>
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">蛋白亚单位疫苗</strong></li>
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">核酸类疫苗（DNA、mRNA）</strong></li>
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">病毒样颗粒疫苗</strong></li>
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">减毒活疫苗</strong></li>
            </ul>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">什么是传统疫苗和新型疫苗？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">传统疫苗是指用病原微生物及代谢物经过减毒、灭活等方法制成的疫苗。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">新型疫苗采用的技术与传统疫苗常用的灭活、减毒技术不同，包括重组疫苗、核酸疫苗等。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">什么是减毒活疫苗？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">减毒活疫苗是在实验室内对病原体进行减毒处理，减弱甚至去除其致病性，但保留其生长或复制和引起免疫的能力制成的疫苗。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">常用减毒活疫苗有卡介苗、麻腮风疫苗、口服脊髓灰质炎疫苗、水痘疫苗等。活疫苗中的病原体在体内可繁殖，免疫效果好，免疫保护时间较长，但对于免疫功能缺陷人群可能存在潜在致病风险。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">什么是灭活疫苗？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">灭活疫苗是先对病原体进行培养，再用物理或化学方法将其灭活制成的疫苗。灭活疫苗也称「死疫苗」，不具有致病和繁殖的能力。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">常见的灭活疫苗有百白破疫苗、乙脑灭活疫苗、甲肝灭活疫苗、流感灭活疫苗等，灭活疫苗要获得较好的免疫效果和持久免疫力通常需要多次接种。灭活疫苗对生物安全等生产条件要求很高，生产成本也较高。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">灭活疫苗分哪几类？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">根据病原体的成分不同，<strong style="margin: 0px; padding: 0px; font-weight: bold;">灭活病毒疫苗</strong>可以分为全病毒灭活疫苗、裂解疫苗、亚单位疫苗等；<strong style="margin: 0px; padding: 0px; font-weight: bold;">灭活细菌疫苗</strong>一般是组分疫苗，一般由菌体结构或代谢产物组成，比如破伤风疫苗（抗原为破伤风类毒素）、b型流感嗜血杆菌疫苗（抗原为荚膜多糖结合破伤风类毒素）。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">以病毒疫苗为例，全病毒灭活疫苗含有病毒的各种抗原蛋白，免疫原性相对更好。而组分疫苗则只是提纯出病毒的其中一部分携带抗原蛋白的结构&mdash;&mdash;比如亚单位疫苗&mdash;&mdash;以减少疫苗引起的不良反应，安全性更高，但免疫原性可能稍差。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">我国目前（2020 年 10 月）已经有包括中生集团和科兴控股在内的两家企业共计三个全病毒灭活新冠疫苗进入 Ⅲ 期临床阶段，在全球处于领先阶段。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">什么是裂解疫苗？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">裂解疫苗是将病毒进行培养，将病毒在灭活前或灭活后裂解为抗原片段，再经过纯化和分装制成的疫苗，常见的裂解疫苗主要是流感病毒裂解疫苗。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">什么是蛋白亚单位疫苗？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">亚单位疫苗是指提取或者合成病原体外壳的一部分具有特征性的蛋白结构来制成的疫苗，和重组疫苗有部分重合。因为只选取了一部分能引起免疫反应的结构，所以理论上可以减少疫苗引起不良反应的风险，安全性更好。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">什么是基因工程疫苗？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">基因工程疫苗是通过基因工程对抗原基因与其他细胞、病毒、质粒重组或将其作为载体，甚至通过技术平台直接合成基因序列制备的疫苗，包括了<strong style="margin: 0px; padding: 0px; font-weight: bold;">病毒载体疫苗</strong>、<strong style="margin: 0px; padding: 0px; font-weight: bold;">核酸疫苗</strong>（DNA 疫苗和 mRNA 疫苗）等。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <ul style="margin: 10px 0px 0px; padding: 0px; list-style: none; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">病毒载体疫苗</strong>是指以无致病性或改造过的病毒如腺病毒、痘病毒、甲病毒等为载体，搭载具有免疫原性的病原体基因的疫苗，通过病毒载体进入人体产生免疫反应。我国目前已有腺病毒载体新型冠状病毒疫苗在进行三期临床试验。</li>
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;">&nbsp;</li>
            <li style="margin: 10px 0px 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: inside disc; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; background: none;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">核酸疫苗</strong>是将编码病原体抗原蛋白的外源基因(DNA 或 RNA ) 导入人体细胞内， 在细胞内表达合成抗原蛋白， 诱导人体产生对该抗原蛋白的免疫应答， 以达到预防疾病的目的。</li>
            </ul>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">什么是病毒样颗粒疫苗？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">病毒样颗粒疫苗是指通过合成和病毒体极为相似具有病毒体表面结构但不具有致病性和传染性的颗粒制备的疫苗，由于不具有功能性病毒包膜因此没有传染性，非常安全。我们熟知的 HPV 疫苗就是通过这种工艺制备的。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">不同技术平台的疫苗研发有什么不同？</strong></h2>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">不同种类的疫苗研发平台都有自己的优势和局限性（表 1），在新冠肺炎形成全球大流行的形势下，接种疫苗是应对疫情和控制疫情最有效的方式。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;">目前以减毒活疫苗技术研的新冠肺炎疫苗均处于临床前研究阶段，全球尚无以减毒活疫苗技术研的新冠疫苗进入临床试验。</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><img style="margin: 20px 0px; padding: 0px; max-width: 100%; display: block; border-radius: 4px; width: 736px;" src="https://img1.dxycdn.com/2020/1021/865/0680941926731592443-22.png" /></p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333; text-align: center;">表 1 不同技术平台疫苗研发的优势和局限性比较</p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">审核专家：田伟 王素娜</strong></p>
            </div>
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <p style="margin: 10px 0px 0px; padding: 0px; font-size: 17px; font-weight: 300; line-height: 30px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">内容策划：范运柱</strong></p>
            </div>
            </div>`,
          imgUrl: require("../assets/images-wal/008.jpg"),
        },
        {
          no: "9",
          title: "所有人都能接种新冠疫苗吗？",
          content: `<h1 style="margin: 0px; padding: 0px; color: #333333; font-size: 26px; font-weight: 600; font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', '\微软雅黑', Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">新冠疫苗所有人都能接种吗？儿童、老人、孕妇呢？</h1>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; color: #000000; font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', '\微软雅黑', Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
            <div class="html-parse continuous-img-no-margin article-html" style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; overflow: auto; color: #333333; font-weight: 300; font-size: 12px; line-height: 32px; word-break: break-word;">
            <h2 style="margin: 30px 0px 20px; padding: 0px 0px 10px; font-size: 22px; font-weight: 600; line-height: 31px; color: #333333;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">哪些人建议接种新冠病毒疫苗？</strong></h2>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;">国内计划通过新冠病毒疫苗接种建立全人群免疫屏障，来控制疫情。2021 年进入下一步&mdash;&mdash;疫苗批准附条件上市，接种将逐步扩大到高危人群（老年人和有基础疾病的人群接种），再下一步再扩大到全人群接种。</p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;">一般认为接种率达到 60%～70% 才能建立全民保护。鉴于我国已批准的疫苗安全性良好，有效性也有了很好的证据，倡导老百姓在知情同意、排除禁忌证前提下，积极参加接种，保护自己也保护家人、他人。</p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <h2 style="margin: 0px; padding: 0px;">哪些重点人群将接种新冠疫苗？</h2>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;"><span style="margin: 0px; padding: 0px; color: #262626;">疫苗接种将分两步实施：</span></p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;"><span style="margin: 0px; padding: 0px; color: #262626;">第一步主要针对部分重点人群，包括从事进口冷链、口岸检疫、船舶引航、航空空勤、生鲜市场、公共交通、医疗疾控等感染风险比较高的工作人员，以及前往中高风险国家或者地区去工作或者学习的人员，尽力缓解输入性疫情防控的压力，降低本土病例发生和国内疫情暴发的风险；</span></p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;"><span style="margin: 0px; padding: 0px; color: #262626;">第二步随着疫苗获批上市，或疫苗产量逐步提高，将会有更多的疫苗投入使用，通过有序开展预防接种，符合条件的群众都能实现应接尽接，逐步构筑起人群的免疫屏障，来阻断新冠病毒在国内的传播。</span></p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <h2 style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;">哪些人不能接种新冠病毒疫苗？</strong></h2>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;">适宜接种新型冠状病毒疫苗的人群要根据疫苗的临床试验选择的人群来决定。一般来说，如果只进行了 18～59 岁健康人群的临床试验，那超出该年龄和健康状况范围的人群就不推荐接种（特殊情况下，需要政策批准和知情自愿）。</p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;">另外，对疫苗中的任何成份过敏、患有严重急性疾病、发热或慢性疾病急性发作期都不能接种新型冠状病毒疫苗。</p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <h2 style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;">哪些人要谨慎接种新冠病毒疫苗？</strong></h2>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;">有药物过敏史、慢性疾病、免疫功能异常的人群应谨慎接种，由医生衡量接种疫苗的获益和可能发生的风险，权衡利弊后决定是否接种。</p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <h2 style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;">儿童、怀孕、哺乳期、老年人可以接种新冠病毒疫苗吗？</strong></h2>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;">由于目前国内疫苗企业刚开始启动 18 岁以下人群的临床试验，且孕期、哺乳期的妇女及 60 岁以上的老年人临床研究尚未开始，因此这些人群暂不能接种。</p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;">特殊情况可以进行接种评估，权衡利弊后接种。比如 2020 年末，国家接种将逐步扩大到高危人群，其中就包括老年人。</p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <h2 style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;">得过新冠肺炎或是无症状感染者，还有必要接种新冠疫苗吗？</strong></h2>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;">基于现有已发表信息，在包括中国香港、比利时、荷兰、美国等地通过基因测序的结果均发现再次感染现象，目前无法得出一次感染终身免疫的结论。</p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;">参考流感、轮状病毒肠炎等季节性流行病毒的接种建议，考虑到规范接种后所获得抗体的保护力和保护时间更稳定，建议这类人群在无接种禁忌证的情况下，考虑接种新冠疫苗。</p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <h2 style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;">HPV 疫苗可以和新冠病毒疫苗一起接种吗？</strong></h2>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;">尽管理论上灭活疫苗与其它疫苗接种间隔不受影响，但因为无研究数据，目前建议 HPV 疫苗和新冠病毒疫苗的接种间隔在两周以上。</p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <h2 style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;">新冠病毒疫苗可以跟其它疫苗一起接种吗？间隔多久？</strong></h2>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;">由于缺乏新型冠状病毒疫苗和其它疫苗同时接种对安全性和免疫原性相互影响的研究信息，因此暂不建议和其它疫苗同时接种。</p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;">尽管理论上灭活疫苗与其它疫苗接种间隔不受影响，但接种单位通常的建议是与其它疫苗间隔两周以上。</p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <h2 style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;">接种新冠疫苗需要注意哪些事项？</strong></h2>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <ol style="margin: 0px; padding: 0px; list-style: none;">
            <li style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: none;">接种前应注意休息，保持良好的精神状态，不空腹接种。</li>
            <li style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: none;">携带本人身份证或其他有效证件，按预约时间到指定接种单位进行实名登记接种。</li>
            <li style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: none;">接种新冠疫苗前需主动告知接种医生本人的身体健康状况。</li>
            <li style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: none;">对接种医生有关健康询问应如实告知，并签订知情同意书。</li>
            <li style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: none;">接种疫苗后应在现场留观30分钟，无异常情况方可离开。</li>
            <li style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; list-style: none;">回家后要注意饮食、休息，保持接种部位的清洁、干燥，注意观察，如果出现较为严重的不适症状，应立即到医疗机构就诊，同时向接种医生报告。</li>
            </ol>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;">&nbsp;</p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;">本文审核专家：田伟 王素娜</strong></p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;">内容编辑：范运柱</strong></p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;"><span style="margin: 0px; padding: 0px; color: #999999;">原创文章：丁香园版权所有，未经许可不得转载。</span></strong></p>
            </div>
            <div style="margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent;">
            <p style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px;"><span style="margin: 0px; padding: 0px; color: #999999;">本文已通过丁香医生审稿专家委员会的同行评议。</span></strong></p>
            </div>
            </div>`,
          imgUrl: require("../assets/images-wal/009.jpg"),
        },
      ],
    };
  },
  methods: {
    // print(){
    //   console.log("22");
    // },
    moment,
    //分页获取全部新闻
    async findArticle() {
      this.pageParam.categoryId = "";
      let res = await axios.get("/article/pageQuery", {
        params: this.pageParam,
      });
      this.listData = res.data.list;
      this.total = res.data.total;
      // console.log(this.listData);
    },
    //分页获取最新进展 categoryId:3
    async findNewestArticle() {
      this.pageParam.categoryId = 3;
      let res = await axios.get("/article/pageQuery", {
        params: this.pageParam,
      });
      this.listData = res.data.list;
      this.total = res.data.total;
    },
    //分页获取公告 categoryId:4
    async findNoticeArticle() {
      this.pageParam.categoryId = 4;
      let res = await axios.get("/article/pageQuery", {
        params: this.pageParam,
      });
      this.listData = res.data.list;
      this.total = res.data.total;
      // console.log(this.listData);
    },
    //分页获取疫苗动态 categoryId:24
    async findVaccineArticle() {
      this.pageParam.categoryId = 24;
      let res = await axios.get("/article/pageQuery", {
        params: this.pageParam,
      });
      this.listData = res.data.list;
      this.total = res.data.total;
      // console.log(this.listData);
    },
    //分页获取抗疫故事 categoryId:25
    async findStoryArticle() {
      this.pageParam.categoryId = 25;
      let res = await axios.get("/article/pageQuery", {
        params: this.pageParam,
      });
      this.listData = res.data.list;
      this.total = res.data.total;
      // console.log(this.listData);
    },
    // 当前板块发生改变
    plateChange() {
      //当前页码归1
      this.pageParam.page = 1;
      // console.log(this.pageParam.page);
    },
    // 当前页码发生变化
    currentChange(val) {
      this.pageParam.page = val;
      console.log(this.pageParam.page);
      if (this.pageParam.categoryId == "") {
        this.findArticle();
      } else if (this.pageParam.categoryId == 3) {
        this.findNewestArticle();
      } else if (this.pageParam.categoryId == 4) {
        this.findNoticeArticle();
      } else if (this.pageParam.categoryId == 24) {
        this.findVaccineArticle();
      } else if (this.pageParam.categoryId == 25) {
        this.findStoryArticle();
      }
    },

    cellClass({ columnIndex }) {
      // columnIndex是列索引，从0开始
      let color = "#e0e0fe";
      if (columnIndex == 1) color = "#fa030341";
      if (columnIndex == 2) color = "#fa660341";
      if (columnIndex == 3) color = "#a0ada4b6";
      if (columnIndex == 4) color = "#03fa4d4d";
      return {
        backgroundColor: color,
        color: "#000",
        height: "60px",
      };
    },
  },
  async created() {
    this.findArticle();
    // let res = await axios.get("/epidemic/pageQuery", {
    //   params: { page: 1, pageSize: 36 },
    // });
    // this.tableData = res.data.list;
  },
  components: {
    // HelloWorld
  },
};
</script>
<style>
.home {
  background-image: url("../assets/images-wal/bg005.jpg");
  background-size: 100%;
}
.header {
  width: 100%;
  height: auto;
  /* display: inline-block; */
}
.imgTextDiv {
  width: 100%;
  height: 20%;
  background-color: #6e6e6ece;
  position: absolute;
  bottom: 0;
  text-align: center;
  color: #fae3ff;
  font-size: 18px;
}
/* 小注释 */
.annotation {
  float: right;
  color: #aaa;
}
.til {
  font-size: 30px;
  margin: 30px 0;
  /* border-radius: 10px; */
}
/* .ce{
  background-color: #a0ada4b6;
  color: #000000;
} */
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
    margin-bottom: 0;
  } */
}
.el-col {
  border-radius: 4px;
}
/* .bg-purple-dark {
  background: #99a9bf;
} */
/* .bg-purple {
  background: #d3dce6;
} */
/* .bg-purple-light {
  background: #e5e9f2;
} */
.grid-content {
  border-radius: 10px;
  min-height: 60px;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  font-weight: bold;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.contentList {
  background-color: #fae3ff;
  padding: 10px;
}
.listContent {
  padding: 10px;
  color: #666;
  background-color: #fff;
  border-radius: 5px;
  /* margin-top: 5px; */
  font-size: 14px;
  margin-bottom: 5px;
}
.logo {
  width: 5%;
  float: right;
}
.textT {
  font-size: 30px;
}
.logo .textT {
  display: inline-block;
}
.kown {
  /* width:150px; */
  float: left;
  line-height: 120px;
  font-size: 30px;
  padding-left: 20px;
}
.footertitle {
  text-align: center;
  color: #d725ff;
  font-size: 20px;
}
</style>
<template>
  <div id="learn">
    <div class="content">
      <el-row>
        <el-col :span="3"><div class="left"></div></el-col>
        <el-col :span="18">
          <div class="cont">
            <div class="centerTitle">
              新&nbsp;&nbsp;&nbsp;&nbsp;冠&nbsp;&nbsp;&nbsp;&nbsp;知&nbsp;&nbsp;&nbsp;&nbsp;识&nbsp;&nbsp;&nbsp;&nbsp;小&nbsp;&nbsp;&nbsp;&nbsp;
              课&nbsp;&nbsp;&nbsp;&nbsp;堂
            </div>
            <div class="tableDiv">
              <table
                class="h1"
                border="1"
                rules="all"
                cellpadding="9"
                cellspacing="8"
              >
                <thead>
                  <tr>
                    <th rowspan="1" id="zuoce">疫情动态更新专题</th>
                    <td align="center">
                      <a
                        href="https://news.qq.com/zt2020/page/feiyan.htm"
                        target="_blank"
                        >腾讯新闻专题</a
                      >
                    </td>
                    <td align="center">
                      <a
                        href="http://news.163.com/special/epidemic/"
                        target="_blank"
                        >网易新闻专题</a
                      >
                    </td>
                    <td align="center">
                      <a
                        href="https://news.sina.cn/zt_d/yiqing0121"
                        target="_blank"
                        >新浪新闻专题</a
                      >
                    </td>
                    <td align="center">
                      <a
                        href="https://3g.dxy.cn/newh5/view/pneumonia?scene=2&amp;clicktime=1579583556&amp;enterid=1579583556&amp;from=groupmessage&amp;isappinstalled=0"
                        target="_blank"
                        >百度新闻专题</a
                      >
                    </td>
                  </tr>
                  <tr class="success">
                    <th rowspan="1" id="zuoce"></th>
                    <td align="center">
                      <a
                        href="https://broccoli.uc.cn/apps/pneumonia/routes/index?uc_param_str=dsdnfrpfbivesscpgimibtbmnijblauputogpintnwktprchmt#zhibo"
                        target="_blank"
                        >夸克浏览器专题</a
                      >
                    </td>

                    <td align="center">
                      <a
                        href="https://news.ifeng.com/c/special/7tPlDSzDgVk?aman=160d454Y830e2633468&amp;from=timeline"
                        target="_blank"
                        >凤凰新闻专题</a
                      >
                    </td>
                    <td align="center">
                      <a
                        href="https://www.zhihu.com/special/19681091"
                        target="_blank"
                        >知乎专题页</a
                      >
                    </td>
                    <td align="center">
                      <a
                        href="https://www.mdeer.com/influenzamap?noask=1&amp;spm=a2oua.beiyou.wuhan.wenzhen"
                        target="_blank"
                        >阿里健康专题</a
                      >
                    </td>
                    <td align="center">
                      <a href="http://translate.google.cn/" target="_blank">
                      </a>
                    </td>
                  </tr>
                  <tr class="success">
                    <th rowspan="1" id="zuoce">重点推荐阅读</th>
                    <td align="center">
                      <a
                        href="https://zhuanlan.zhihu.com/p/104315451"
                        target="_blank"
                        >疫情100条科普</a
                      >
                    </td>
                    <td align="center">
                      <a
                        href="https://qianxi.baidu.com/?from=shoubai"
                        target="_blank"
                        id="lianjie1"
                        >全国热门迁徙城市</a
                      >
                    </td>
                    <td align="center">
                      <a
                        href="https://mp.weixin.qq.com/s?src=11&amp;timestamp=1580394602&amp;ver=2128&amp;signature=3nnwwyYQMs3eg3TICC-rQdDfl1MDTqj3yXP1cpatk8cJotWcTqD0i0653ky3lheRbjCdaOMt13ZLsVY6sQ35COAlUepx1FR*reNsAIN3JlU=&amp;new=1"
                        target="_blank"
                        >新冠疫情最新辟谣</a
                      >
                    </td>
                    <td align="center">
                      <a
                        href="http://3g.dxy.cn/newh5/view/pneumonia_rumors?from=timeline&amp;isappinstalled=0"
                        target="_blank"
                        >疫情谣言排行榜</a
                      >
                    </td>

                    <td align="center">
                      <a
                        href="http://2019ncov.chinacdc.cn/2019-nCoV/"
                        target="_blank"
                        >官方疫情分布情况</a
                      >
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="conf">
              <el-row :gutter="5">
                <el-col :span="8">
                  <div class="listBg">
                    <span>央视：金银潭院长：新冠肺炎是自限性疾病 </span>
                    <p>什么是自限性疾病呢？又该如何理解呢？</p>
                    <a
                      href="https://mp.weixin.qq.com/s?src=11&amp;timestamp=1581417002&amp;ver=2152&amp;signature=dO7bhIPeqDfZVuNJLefLipVOL
                  cztbtgQiM-0YnqEFZbyAnOZA1VPiMNm*O9QHbBCROVRJz112AuqVHFA59XJDdV8SZ2AhnT-hDWabTj2EvmYX9*LXl1SA-rdFzvavQ1m&amp;new=1"
                      role="button"
                      >点击查看全文</a
                    >
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="listBg">
                    <span>知乎：返程途中，如何做好个人疫情防护</span>
                    <p>新型冠状病毒肺炎期间，我们如何做好消毒？</p>
                    <a
                      href="https://www.zhihu.com/question/369215532/answer/995100551"
                      role="button"
                      >点此查看全文</a
                    >
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="listBg">
                    <span>知乎：新型肺炎药物研制为什么这么难？</span>
                    <p>药物研制需多久，目前到了哪个阶段？</p>
                    <a
                      href="https://www.zhihu.com/question/367784886"
                      role="button"
                      >点此查看网友热议</a
                    >
                  </div>
                </el-col>
              </el-row>
            </div>

            <div clss="list">
              <div class="ulLt">
                <ul>
                  <li class="title">相关新闻预览</li>
                  <li class="liLt">
                    <a href="https://m.dxy.com/article/35612">
                      7 日新增新冠肺炎本土确诊 37 例
                    </a>
                  </li>
                  <li class="liLt">
                    <a href="https://m.dxy.com/article/35577">
                      石家庄全市车辆及人员均不出市
                    </a>
                  </li>
                  <li class="liLt">
                    <a href="https://m.dxy.com/article/35542"
                      >河北新增 51 例本地确诊病例行动轨迹公布！</a
                    >
                  </li>
                  <li class="liLt">
                    <a href="https://m.dxy.com/article/35571"
                      >接种新冠疫苗出现过敏反应是罕见的</a
                    >
                  </li>
                </ul>
              </div>
              <div class="ulRt">
                <ul>
                  <li class="liLt">
                    <a
                      href="http://www.baidu.com/link?url=c1ye00KCjPrddM0R65lV7jW9yLUMXreEZFHFIN0RVifAHzSbF
                  ye-T99CyzsRPpk_gaShntch56V1BIND4HZdhvxGCF_BQJRaJTEYGDBlkY3"
                      >因新冠疫情严重，东京宣布暂停奥运圣火巡展活动</a
                    >
                  </li>
                  <li class="liLt">
                    <a
                      href="http://www.baidu.com/link?url=c1ye00KCjPrddM0R65lV7jW9yLUMXreEZFHFIN0RVihiPcGkR
                  18Fv7lEFiMUnOM_8JacCHKnOHKkgySpAhhEwZMlfZygRZYQ2uiBIXF0jwC"
                      >世卫专家：变异新冠病毒将成2021年新挑战</a
                    >
                  </li>
                  <li class="liLt">
                    <a
                      href="http://www.baidu.com/link?url=CpsGEPIM-jePT66CBhd9qtVwpHY33g_SJ_XrAJfnRdZF1KDJG3St
                  PgcbII3iiLBWoutScCoKRaa-KKDvxI3qSoWHw7Y9hbirWAG5Om7-TIq"
                      >一图读懂丨新冠肺炎防控指南</a
                    >
                  </li>
                  <li class="liLt">
                    <a
                      href="http://www.jiangxi.gov.cn/art/2021/1/8/art_5862_3045674.html?xxgkhide=1"
                      >江西省新冠肺炎疫情防控工作新闻发布会(第二十八场)在南昌举行</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="protect">
              <div class="Tit">疫情防控知识</div>
              <div class="par">
                <h1>疫情防控措施</h1>

                <p>
                  1、公务外出如何做。须佩戴口罩出行，避开
                  密集人群。与人接触保持1米以上距离，避免在公共场所长时间停留。乘
                  坐的车辆内部及门把手建议每日用75%酒精擦拭1次。乘车须佩戴口罩。
                </p>
                <p>
                  2、公共区域如何做。每日须对门厅、楼道、会议室、电梯、
                  楼梯、卫生间等公共部位进行消毒，尽量使用喷雾消毒。每个区域使用的保洁用具要分开
                  ，避免混用。
                </p>
                <p>
                  3、后勤人员如何做。服务人员、安保人员、清洁人员工作时须佩戴口罩，并与人保持安全距离。食堂
                  采购人员或供货人员须佩戴口罩和一次性橡胶手套，避免直接手触肉禽类生鲜材料，
                  摘手套后及时洗手消毒。保洁人员 工作时须佩戴一次性橡胶手套
                  ，工作结束后洗手消毒。安保人员须佩戴口罩工作，并认真询问和登记外来人员状况，
                  发现异常情况及时报告。
                </p>
                <!-- <el-carousel height="400px" type="card">
                  <el-carousel-item v-for="item in urls" :key="item.a">
                    <img :src="item.a" />
                  </el-carousel-item>
                </el-carousel> -->
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="3"><div class="right"></div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   urls: [
      //     {
      //       a: require("../../assets/1.jpg"),
      //     },
      //     {
      //       a: require("../../assets/2.jpg"),
      //     },
      //   ],
    };
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped>
.content {
  margin: 0;
  padding: 0;
  background: url("../../assets/SUL/knoledgeBa.jpg") no-repeat;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: relative;
}
.left {
  width: 100%;
  height: 100vh;
  background-color: rgba(152, 144, 144, 0);
}
.centerTitle {
  height: 50px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: white;
  margin: 20px;
}
.conf {
  margin-top: 30px;
  width: 100%;
  background-color: rgba(152, 144, 144, 0.33);
  height: 180px;
}
.listBg {
  width: 98%;
  transition: border 0.2s ease-in-out;
  background: oldlace;
  height: 130px;
  margin: 25px 0;
}
.listBg span {
  line-height: 1.1;
  font-weight: 900;
  font-size: 14px;
}
.listBg p {
  font-size: 12px;
  font-weight: 200;
}
.listBg a {
  text-decoration: none;
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.listBg a:hover {
  outline: 0;
}
.h1 {
  border: 1px solid #ddd;
  width: 100%;
  max-width: 100%;
  height: 150px;
  border-spacing: 0;
  border-collapse: collapse;
  box-sizing: border-box;
  background-color: transparent;
  background-color: rgb(191, 69, 191, 0.33);
}
.h1 a {
  text-decoration: none;
  color: white;
  font-size: 15px;
}
.h1 a:hover {
  color: rgb(191, 69, 191);
}
table,
td,
th {
  border: 1px solid white;
}
thead:first-child > tr:first-child > th {
  border-top: 0;
}
#zuoce {
  text-align: center;
  position: auto;
  color: rgb(191, 69, 191);
  font-size: 16px;
}
.list {
  background-color: rgb(191, 69, 191, 0.33);
  height: 250px;
}

.ulLt {
  margin-top: 30px;
  width: 45%;
  float: left;
  padding: 0 10px;
  height: 300px;
}
.ulLt li {
  color: rgb(191, 69, 191);
  margin-right: 1.5%;
}
.title {
  list-style: none;

  font-size: 30px;
  font-weight: bold;
}

.liLt {
  margin-top: 20px;
}
.liLt a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 200;
}
.liLt a:hover {
  color: aqua;
}
.ulRt {
  width: 45%;
  float: right;
  margin-top: 55px;
  padding: 0;
  height: 300px;
}
.ulRt li {
  color: rgb(191, 69, 191);
  margin-right: 1.5%;
}
.protect {
  clear: both;
  margin-top: 30px;
}
.Tit {
  color: rgb(191, 69, 191);
  font-size: 30px;
  font-weight: bold;
  /* margin-top: 20px; */
  margin: auto 50px 0;
}
.par {
  width: 100%;
  height: 200px;
  margin-top: 30px;
  color: whitesmoke;
  font-size: 15px;
  font-weight: 200;
  overflow: auto;
  background-color: rgba(152, 144, 144, 0.33);
  margin-bottom: 20px;
}
.par h1 {
  color: whitesmoke;
  font-weight: 800;
}
</style>
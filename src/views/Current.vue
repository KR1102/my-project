/*
 * @Author: MQJ 
 * @Date: 2021-01-06 11:04:01 
 * @Last Modified by: Bill
 * @Last Modified time: 2021-01-09 17:10:38
 */

<template>
  <div id="current">
    <div class="heard">
      <div class="heardFont1">2021全球疫情可视化</div>
      <div class="heardFont2">
        当前时间：{{ moment(date).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
    </div>
    <div id="center1">
      <el-row :gutter="24">
        <el-col :span="13">
          <div>
            <div class="grid-content bg-purple">
              <div class="title">世界疫情地图</div>
              <div id="currentAdd1"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-row>
              <el-col>
                <div class="centerChild2">
                  <div class="center1Font1">国外现有确诊</div>
                  <div class="center1Font2">24027179</div>
                  <div class="center1Font3">昨日</div>
                  <div class="center1Font4">+274452</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="centerChild2">
                  <div class="center1Font1">国外累计确诊</div>
                  <div class="center1Font2">24027179</div>
                  <div class="center1Font3">昨日</div>
                  <div class="center1Font4">+274452</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="centerChild2">
                  <div class="center1Font1">国外累计治愈</div>
                  <div class="center1Font2">61883053</div>
                  <div class="center1Font3">昨日</div>
                  <div class="center1Font4">+510842</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="centerChild2">
                  <div class="center1Font1">国外累计死亡</div>
                  <div class="center1Font2">1891393</div>
                  <div class="center1Font3">昨日</div>
                  <div class="center1Font4">+14994</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="title">世界确诊人数TOP12</div>
            <div id="currentAdd2"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="24">
        <el-col :span="7">
          <div class="grid-content1 bg-purple">
            <div class="title">当前和新增比例</div>
            <div id="currentAdd3"></div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content1 bg-purple">
            <div class="title">近期新增趋势</div>
            <div id="currentAdd4"></div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content1 bg-purple">
            <div class="title">新闻播报</div>
            <div class="center2_1">
              <div class="title1">
                美国疫情形势持续恶化 疫苗接种进度异常缓慢
              </div>
              <div>
                <a
                  href="http://news.cctv.com/2021/01/07/ARTIhhTo4GdTyDuac6r6x5No210107.shtml"
                  >据美国有线电视新闻网报道，美国新冠病毒追踪项目的数据显示，
                  美国5日报告目前有131195名患者因新冠肺炎住院，再次达到疫情以来的新高，
                  这也是美国的新冠肺炎住院患者连续第35天超过10万人。
                  加利福尼亚州是美国疫情的重灾区，目前仅洛杉矶县一地累计确诊病例就已达到约80万，
                  当地的医疗资源极度紧张。据报道，洛杉矶县的救护人员已被告知停止将一些存活几率极低的患者送往医院。</a
                >
              </div>
              <el-button
                @click="drawer = true"
                type="text"
                style="margin-left: 115px"
              >
                了解更多新闻
              </el-button>

              <el-drawer
                title="新闻播报"
                :visible.sync="drawer"
                :with-header="false"
              >
                <div class="title2">
                  <a
                    href="https://baijiahao.baidu.com/s?id=1688212031816433933&wfr=spider&for=pc"
                    >1、国际机构：后疫情时代全球或将面对系统性危机</a
                  >
                  <br />
                  <a
                    href="https://baijiahao.baidu.com/s?id=1688137043934364900&wfr=spider&for=pc"
                    >2、全球疫情“大考”：美国确诊超2千万，印度1千万！中国成绩亮眼</a
                  >
                </div>
              </el-drawer>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
let moment = require("moment");
// 引入echarts对象
var echarts = require("echarts");
import "../utils/world.js";
export default {
  data() {
    return {
      date: new Date(),
      drawer: false,
      salvProName: [
        "美国",
        "印度",
        "巴西",
        "俄罗斯",
        "英国",
        "法国",
        "土耳其",
        "意大利",
        "西班牙",
        "德国",
      ],
      salvProValue: [
        22132045,
        10414044,
        7961673,
        3332142,
        2889419,
        2727321,
        2296102,
        2220361,
        2024904,
        1869306,
      ],
      salvProMax: [],
      xData: [
        "阿富汗",
        "安哥拉",
        "阿尔巴尼亚",
        "阿联酋",
        "阿根廷",
        "亚美尼亚",
        "澳大利亚",
        "奥地利",
        "阿塞拜疆",
        "布隆迪",
        "比利时",
        "贝宁",
        "布基纳法索",
        "孟加拉国",
        "保加利亚",
        "巴哈马",
        "波黑",
        "白俄罗斯",
        "伯利兹",
        "玻利维亚",
        "巴西",
        "文莱",
        "不丹",
        "博茨瓦纳",
        "中非共和国",
        "加拿大",
        "瑞士",
        "智利",
        "中国",
        "象牙海岸",
        "喀麦隆",
        "刚果金",
        "刚果共和国",
        "哥伦比亚",
        "哥斯达黎加",
        "古巴",
        "北塞浦路斯",
        "塞浦路斯",
        "捷克共和国",
        "德国",
        "吉布提",
        "多米尼加共和国",
        "阿尔及尼亚",
        "厄瓜多尔",
        "埃及",
        "厄立特里亚",
        "西班牙",
        "爱沙尼亚",
        "埃塞俄比亚",
        "芬兰",
        "斐济",
        "加蓬",
        "格鲁吉亚",
        "加纳",
        "几内亚",
        "冈比亚",
        "几内亚比绍",
        "赤道几内亚",
        "希腊",
        "丹麦",
        "危地马拉",
        "圭亚那",
        "洪都拉斯",
        "克罗地亚",
        "海地",
        "匈牙利",
        "印度尼西亚",
        "印度",
        "爱尔兰",
        "伊朗",
        "伊拉克",
        "冰岛",
        "意大利",
        "牙买加",
        "约旦",
        "日本",
        "克什米尔",
        "哈萨克斯坦",
        "肯尼亚",
        "吉尔吉斯坦",
        "柬埔寨",
        "韩国",
        "科索沃",
        "科威特",
        "老挝",
        "黎巴嫩",
        "利比里亚",
        "利比亚",
        "斯里兰卡",
        "莱索托",
        "立陶宛",
        "卢森堡",
        "拉脱维亚",
        "摩洛哥",
        "摩尔多瓦",
        "马达加斯加",
        "墨西哥",
        "马其顿",
        "马里",
        "缅甸",
        "黑山",
        "蒙古",
        "莫桑比克",
        "毛里塔尼亚",
        "马拉维",
        "马来西亚",
        "纳米比亚",
        "法国",
        "尼日尔",
        "尼日利亚",
        "尼加拉瓜",
        "荷兰",
        "挪威",
        "尼泊尔",
        "新西兰",
        "阿曼",
        "巴基斯坦",
        "巴拿马",
        "秘鲁",
        "菲律宾",
        "巴布亚新几内亚",
        "波兰",
        "朝鲜",
        "葡萄牙",
        "巴拉圭",
        "以色列",
        "卡塔尔",
        "罗马尼亚",
        "俄罗斯",
        "卢旺达",
        "西撒哈拉",
        "沙特阿拉伯",
        "苏丹",
        "南苏丹",
        "塞内加尔",
        "英国",
        "所罗门群岛",
        "塞拉利昂",
        "塞尔瓦多",
        "索马里蓝",
        "索马里",
        "塞尔维亚",
        "苏里南",
        "斯洛伐克",
        "斯洛文尼亚",
        "瑞典",
        "瑞士",
        "叙利亚",
        "乍得",
        "多哥",
        "泰国",
        "塔吉克斯坦",
        "土库曼斯坦",
        "东帝汶",
        "特立尼达和多巴哥",
        "突尼斯",
        "土耳其",
        "坦桑尼亚",
        "乌干达",
        "乌克兰",
        "乌拉圭",
        "美国",
        "乌兹别克斯坦",
        "委内瑞拉",
        "越南",
        "瓦努阿图",
        "也门",
        "南非",
        "赞比亚",
        "津巴布韦",
      ],
      dieData: [
        { name: "Afghanistan", value: this.randomData() },
        { name: "Angola", value: this.randomData() },
        { name: "Albania", value: this.randomData() },
        { name: "United Arab Emirates", value: this.randomData() },
        { name: "Argentina", value: this.randomData() },
        { name: "Armenia", value: this.randomData() },
        {
          name: "French Southern and Antarctic Lands",
          value: this.randomData(),
        },
        { name: "Australia", value: this.randomData() },
        { name: "Austria", value: this.randomData() },
        { name: "Azerbaijan", value: this.randomData() },
        { name: "Burundi", value: this.randomData() },
        { name: "Belgium", value: this.randomData() },
        { name: "Benin", value: this.randomData() },
        { name: "Burkina Faso", value: this.randomData() },
        { name: "Bangladesh", value: this.randomData() },
        { name: "Bulgaria", value: this.randomData() },
        { name: "The Bahamas", value: this.randomData() },
        { name: "Bosnia and Herzegovina", value: this.randomData() },
        { name: "Belarus", value: this.randomData() },
        { name: "Belize", value: this.randomData() },
        { name: "Bermuda", value: this.randomData() },
        { name: "Bolivia", value: this.randomData() },
        { name: "Brazil", value: this.randomData() },
        { name: "Brunei", value: this.randomData() },
        { name: "Bhutan", value: this.randomData() },
        { name: "Botswana", value: this.randomData() },
        { name: "Central African Republic", value: this.randomData() },
        { name: "Canada", value: this.randomData() },
        { name: "Switzerland", value: this.randomData() },
        { name: "Chile", value: this.randomData() },
        { name: "China", value: this.randomData() },
        { name: "Ivory Coast", value: this.randomData() },
        { name: "Cameroon", value: this.randomData() },
        { name: "Dem.Rep.Congo", value: this.randomData() },
        { name: "Dem.Rep.Congo", value: this.randomData() },
        { name: "Colombia", value: this.randomData() },
        { name: "Costa Rica", value: this.randomData() },
        { name: "Cuba", value: this.randomData() },
        { name: "Northern Cyprus", value: this.randomData() },
        { name: "Cyprus", value: this.randomData() },
        { name: "Czech Republic", value: this.randomData() },
        { name: "Germany", value: this.randomData() },
        { name: "Djibouti", value: this.randomData() },
        { name: "Denmark", value: this.randomData() },
        { name: "Dominican Republic", value: this.randomData() },
        { name: "Algeria", value: this.randomData() },
        { name: "Ecuador", value: this.randomData() },
        { name: "Egypt", value: this.randomData() },
        { name: "Eritrea", value: this.randomData() },
        { name: "Spain", value: this.randomData() },
        { name: "Estonia", value: this.randomData() },
        { name: "Ethiopia", value: this.randomData() },
        { name: "Finland", value: this.randomData() },
        { name: "Fiji", value: this.randomData() },
        { name: "Falkland Islands", value: this.randomData() },
        { name: "France", value: this.randomData() },
        { name: "Gabon", value: this.randomData() },
        { name: "United Kingdom", value: this.randomData() },
        { name: "Georgia", value: this.randomData() },
        { name: "Ghana", value: this.randomData() },
        { name: "Guinea", value: this.randomData() },
        { name: "Gambia", value: this.randomData() },
        { name: "Guinea Bissau", value: this.randomData() },
        { name: "Equatorial Guinea", value: this.randomData() },
        { name: "Greece", value: this.randomData() },
        { name: "Greenland", value: this.randomData() },
        { name: "Guatemala", value: this.randomData() },
        { name: "French Guiana", value: this.randomData() },
        { name: "Guyana", value: this.randomData() },
        { name: "Honduras", value: this.randomData() },
        { name: "Croatia", value: this.randomData() },
        { name: "Haiti", value: this.randomData() },
        { name: "Hungary", value: this.randomData() },
        { name: "Indonesia", value: this.randomData() },
        { name: "India", value: this.randomData() },
        { name: "Ireland", value: this.randomData() },
        { name: "Iran", value: this.randomData() },
        { name: "Iraq", value: this.randomData() },
        { name: "Iceland", value: this.randomData() },
        { name: "Israel", value: this.randomData() },
        { name: "Italy", value: this.randomData() },
        { name: "Jamaica", value: this.randomData() },
        { name: "Jordan", value: this.randomData() },
        { name: "Japan", value: this.randomData() },
        { name: "Kazakhstan", value: this.randomData() },
        { name: "Kenya", value: this.randomData() },
        { name: "Kyrgyzstan", value: this.randomData() },
        { name: "Cambodia", value: this.randomData() },
        { name: "South Korea", value: this.randomData() },
        { name: "Kosovo", value: this.randomData() },
        { name: "Kuwait", value: this.randomData() },
        { name: "Laos", value: this.randomData() },
        { name: "Lebanon", value: this.randomData() },
        { name: "Liberia", value: this.randomData() },
        { name: "Libya", value: this.randomData() },
        { name: "Sri Lanka", value: this.randomData() },
        { name: "Lesotho", value: this.randomData() },
        { name: "Lithuania", value: this.randomData() },
        { name: "Luxembourg", value: this.randomData() },
        { name: "Latvia", value: this.randomData() },
        { name: "Morocco", value: this.randomData() },
        { name: "Moldova", value: this.randomData() },
        { name: "Madagascar", value: this.randomData() },
        { name: "Mexico", value: this.randomData() },
        { name: "Macedonia", value: this.randomData() },
        { name: "Mali", value: this.randomData() },
        { name: "Myanmar", value: this.randomData() },
        { name: "Montenegro", value: this.randomData() },
        { name: "Mongolia", value: this.randomData() },
        { name: "Mozambique", value: this.randomData() },
        { name: "Mauritania", value: this.randomData() },
        { name: "Malawi", value: this.randomData() },
        { name: "Malaysia", value: this.randomData() },
        { name: "Namibia", value: this.randomData() },
        { name: "New Caledonia", value: this.randomData() },
        { name: "Niger", value: this.randomData() },
        { name: "Nigeria", value: this.randomData() },
        { name: "Nicaragua", value: this.randomData() },
        { name: "Netherlands", value: this.randomData() },
        { name: "Norway", value: this.randomData() },
        { name: "Nepal", value: this.randomData() },
        { name: "New Zealand", value: this.randomData() },
        { name: "Oman", value: this.randomData() },
        { name: "Pakistan", value: this.randomData() },
        { name: "Panama", value: this.randomData() },
        { name: "Peru", value: this.randomData() },
        { name: "Philippines", value: this.randomData() },
        { name: "Papua New Guinea", value: this.randomData() },
        { name: "Poland", value: this.randomData() },
        { name: "Puerto Rico", value: this.randomData() },
        { name: "North Korea", value: this.randomData() },
        { name: "Portugal", value: this.randomData() },
        { name: "Paraguay", value: this.randomData() },
        { name: "Qatar", value: this.randomData() },
        { name: "Romania", value: this.randomData() },
        { name: "Russia", value: this.randomData() },
        { name: "Rwanda", value: this.randomData() },
        { name: "Western Sahara", value: this.randomData() },
        { name: "Saudi Arabia", value: this.randomData() },
        { name: "Sudan", value: this.randomData() },
        { name: "South Sudan", value: this.randomData() },
        { name: "Senegal", value: this.randomData() },
        { name: "Solomon Islands", value: this.randomData() },
        { name: "Sierra Leone", value: this.randomData() },
        { name: "El Salvador", value: this.randomData() },
        { name: "Somaliland", value: this.randomData() },
        { name: "Somalia", value: this.randomData() },
        { name: "Republic of Serbia", value: this.randomData() },
        { name: "Suriname", value: this.randomData() },
        { name: "Slovakia", value: this.randomData() },
        { name: "Slovenia", value: this.randomData() },
        { name: "Sweden", value: this.randomData() },
        { name: "Swaziland", value: this.randomData() },
        { name: "Syria", value: this.randomData() },
        { name: "Chad", value: this.randomData() },
        { name: "Togo", value: this.randomData() },
        { name: "Thailand", value: this.randomData() },
        { name: "Tajikistan", value: this.randomData() },
        { name: "Turkmenistan", value: this.randomData() },
        { name: "East Timor", value: this.randomData() },
        { name: "Trinidad and Tobago", value: this.randomData() },
        { name: "Tunisia", value: this.randomData() },
        { name: "Turkey", value: this.randomData() },
        { name: "Tanzania", value: this.randomData() },
        { name: "Uganda", value: this.randomData() },
        { name: "Ukraine", value: this.randomData() },
        { name: "Uruguay", value: this.randomData() },
        { name: "United States", value: this.randomData() },
        { name: "Uzbekistan", value: this.randomData() },
        { name: "Venezuela", value: this.randomData() },
        { name: "Vietnam", value: this.randomData() },
        { name: "Vanuatu", value: this.randomData() },
        { name: "West Bank", value: this.randomData() },
        { name: "Yemen", value: this.randomData() },
        { name: "South Africa", value: this.randomData() },
        { name: "Zambia", value: this.randomData() },
        { name: "Zimbabwe", value: this.randomData() },
      ],
      cureData: [
        { name: "Afghanistan", value: this.randomData() },
        { name: "Angola", value: this.randomData() },
        { name: "Albania", value: this.randomData() },
        { name: "United Arab Emirates", value: this.randomData() },
        { name: "Argentina", value: this.randomData() },
        { name: "Armenia", value: this.randomData() },
        {
          name: "French Southern and Antarctic Lands",
          value: this.randomData(),
        },
        { name: "Australia", value: this.randomData() },
        { name: "Austria", value: this.randomData() },
        { name: "Azerbaijan", value: this.randomData() },
        { name: "Burundi", value: this.randomData() },
        { name: "Belgium", value: this.randomData() },
        { name: "Benin", value: this.randomData() },
        { name: "Burkina Faso", value: this.randomData() },
        { name: "Bangladesh", value: this.randomData() },
        { name: "Bulgaria", value: this.randomData() },
        { name: "The Bahamas", value: this.randomData() },
        { name: "Bosnia and Herzegovina", value: this.randomData() },
        { name: "Belarus", value: this.randomData() },
        { name: "Belize", value: this.randomData() },
        { name: "Bermuda", value: this.randomData() },
        { name: "Bolivia", value: this.randomData() },
        { name: "Brazil", value: this.randomData() },
        { name: "Brunei", value: this.randomData() },
        { name: "Bhutan", value: this.randomData() },
        { name: "Botswana", value: this.randomData() },
        { name: "Central African Republic", value: this.randomData() },
        { name: "Canada", value: this.randomData() },
        { name: "Switzerland", value: this.randomData() },
        { name: "Chile", value: this.randomData() },
        { name: "China", value: this.randomData() },
        { name: "Ivory Coast", value: this.randomData() },
        { name: "Cameroon", value: this.randomData() },
        { name: "Dem.Rep.Congo", value: this.randomData() },
        { name: "Dem.Rep.Congo", value: this.randomData() },
        { name: "Colombia", value: this.randomData() },
        { name: "Costa Rica", value: this.randomData() },
        { name: "Cuba", value: this.randomData() },
        { name: "Northern Cyprus", value: this.randomData() },
        { name: "Cyprus", value: this.randomData() },
        { name: "Czech Republic", value: this.randomData() },
        { name: "Germany", value: this.randomData() },
        { name: "Djibouti", value: this.randomData() },
        { name: "Denmark", value: this.randomData() },
        { name: "Dominican Republic", value: this.randomData() },
        { name: "Algeria", value: this.randomData() },
        { name: "Ecuador", value: this.randomData() },
        { name: "Egypt", value: this.randomData() },
        { name: "Eritrea", value: this.randomData() },
        { name: "Spain", value: this.randomData() },
        { name: "Estonia", value: this.randomData() },
        { name: "Ethiopia", value: this.randomData() },
        { name: "Finland", value: this.randomData() },
        { name: "Fiji", value: this.randomData() },
        { name: "Falkland Islands", value: this.randomData() },
        { name: "France", value: this.randomData() },
        { name: "Gabon", value: this.randomData() },
        { name: "United Kingdom", value: this.randomData() },
        { name: "Georgia", value: this.randomData() },
        { name: "Ghana", value: this.randomData() },
        { name: "Guinea", value: this.randomData() },
        { name: "Gambia", value: this.randomData() },
        { name: "Guinea Bissau", value: this.randomData() },
        { name: "Equatorial Guinea", value: this.randomData() },
        { name: "Greece", value: this.randomData() },
        { name: "Greenland", value: this.randomData() },
        { name: "Guatemala", value: this.randomData() },
        { name: "French Guiana", value: this.randomData() },
        { name: "Guyana", value: this.randomData() },
        { name: "Honduras", value: this.randomData() },
        { name: "Croatia", value: this.randomData() },
        { name: "Haiti", value: this.randomData() },
        { name: "Hungary", value: this.randomData() },
        { name: "Indonesia", value: this.randomData() },
        { name: "India", value: this.randomData() },
        { name: "Ireland", value: this.randomData() },
        { name: "Iran", value: this.randomData() },
        { name: "Iraq", value: this.randomData() },
        { name: "Iceland", value: this.randomData() },
        { name: "Israel", value: this.randomData() },
        { name: "Italy", value: this.randomData() },
        { name: "Jamaica", value: this.randomData() },
        { name: "Jordan", value: this.randomData() },
        { name: "Japan", value: this.randomData() },
        { name: "Kazakhstan", value: this.randomData() },
        { name: "Kenya", value: this.randomData() },
        { name: "Kyrgyzstan", value: this.randomData() },
        { name: "Cambodia", value: this.randomData() },
        { name: "South Korea", value: this.randomData() },
        { name: "Kosovo", value: this.randomData() },
        { name: "Kuwait", value: this.randomData() },
        { name: "Laos", value: this.randomData() },
        { name: "Lebanon", value: this.randomData() },
        { name: "Liberia", value: this.randomData() },
        { name: "Libya", value: this.randomData() },
        { name: "Sri Lanka", value: this.randomData() },
        { name: "Lesotho", value: this.randomData() },
        { name: "Lithuania", value: this.randomData() },
        { name: "Luxembourg", value: this.randomData() },
        { name: "Latvia", value: this.randomData() },
        { name: "Morocco", value: this.randomData() },
        { name: "Moldova", value: this.randomData() },
        { name: "Madagascar", value: this.randomData() },
        { name: "Mexico", value: this.randomData() },
        { name: "Macedonia", value: this.randomData() },
        { name: "Mali", value: this.randomData() },
        { name: "Myanmar", value: this.randomData() },
        { name: "Montenegro", value: this.randomData() },
        { name: "Mongolia", value: this.randomData() },
        { name: "Mozambique", value: this.randomData() },
        { name: "Mauritania", value: this.randomData() },
        { name: "Malawi", value: this.randomData() },
        { name: "Malaysia", value: this.randomData() },
        { name: "Namibia", value: this.randomData() },
        { name: "New Caledonia", value: this.randomData() },
        { name: "Niger", value: this.randomData() },
        { name: "Nigeria", value: this.randomData() },
        { name: "Nicaragua", value: this.randomData() },
        { name: "Netherlands", value: this.randomData() },
        { name: "Norway", value: this.randomData() },
        { name: "Nepal", value: this.randomData() },
        { name: "New Zealand", value: this.randomData() },
        { name: "Oman", value: this.randomData() },
        { name: "Pakistan", value: this.randomData() },
        { name: "Panama", value: this.randomData() },
        { name: "Peru", value: this.randomData() },
        { name: "Philippines", value: this.randomData() },
        { name: "Papua New Guinea", value: this.randomData() },
        { name: "Poland", value: this.randomData() },
        { name: "Puerto Rico", value: this.randomData() },
        { name: "North Korea", value: this.randomData() },
        { name: "Portugal", value: this.randomData() },
        { name: "Paraguay", value: this.randomData() },
        { name: "Qatar", value: this.randomData() },
        { name: "Romania", value: this.randomData() },
        { name: "Russia", value: this.randomData() },
        { name: "Rwanda", value: this.randomData() },
        { name: "Western Sahara", value: this.randomData() },
        { name: "Saudi Arabia", value: this.randomData() },
        { name: "Sudan", value: this.randomData() },
        { name: "South Sudan", value: this.randomData() },
        { name: "Senegal", value: this.randomData() },
        { name: "Solomon Islands", value: this.randomData() },
        { name: "Sierra Leone", value: this.randomData() },
        { name: "El Salvador", value: this.randomData() },
        { name: "Somaliland", value: this.randomData() },
        { name: "Somalia", value: this.randomData() },
        { name: "Republic of Serbia", value: this.randomData() },
        { name: "Suriname", value: this.randomData() },
        { name: "Slovakia", value: this.randomData() },
        { name: "Slovenia", value: this.randomData() },
        { name: "Sweden", value: this.randomData() },
        { name: "Swaziland", value: this.randomData() },
        { name: "Syria", value: this.randomData() },
        { name: "Chad", value: this.randomData() },
        { name: "Togo", value: this.randomData() },
        { name: "Thailand", value: this.randomData() },
        { name: "Tajikistan", value: this.randomData() },
        { name: "Turkmenistan", value: this.randomData() },
        { name: "East Timor", value: this.randomData() },
        { name: "Trinidad and Tobago", value: this.randomData() },
        { name: "Tunisia", value: this.randomData() },
        { name: "Turkey", value: this.randomData() },
        { name: "Tanzania", value: this.randomData() },
        { name: "Uganda", value: this.randomData() },
        { name: "Ukraine", value: this.randomData() },
        { name: "Uruguay", value: this.randomData() },
        { name: "United States", value: this.randomData() },
        { name: "Uzbekistan", value: this.randomData() },
        { name: "Venezuela", value: this.randomData() },
        { name: "Vietnam", value: this.randomData() },
        { name: "Vanuatu", value: this.randomData() },
        { name: "West Bank", value: this.randomData() },
        { name: "Yemen", value: this.randomData() },
        { name: "South Africa", value: this.randomData() },
        { name: "Zambia", value: this.randomData() },
        { name: "Zimbabwe", value: this.randomData() },
      ],
      allData: [
        { name: "卢旺达", value: this.randomData() },
        { name: "布隆迪", value: this.randomData() },
        { name: "尼泊尔", value: this.randomData() },
        { name: "乌干达", value: this.randomData() },
        { name: "老挝", value: this.randomData() },
        { name: "埃塞俄比亚", value: this.randomData() },
        { name: "马达加斯加", value: this.randomData() },
        { name: "海地", value: this.randomData() },
        { name: "也门", value: this.randomData() },
        { name: "肯尼亚", value: this.randomData() },
        { name: "菲律宾", value: this.randomData() },
        { name: "索马里", value: this.randomData() },
        { name: "阿富汗", value: this.randomData() },
        { name: "巴基斯坦", value: this.randomData() },
        { name: "朝鲜", value: this.randomData() },
        { name: "印度", value: this.randomData() },
        { name: "厄立特里亚", value: this.randomData() },
        { name: "哥伦比亚", value: this.randomData() },
        { name: "哥伦比亚", value: this.randomData() },
        { name: "巴布亚新几内亚", value: this.randomData() },
        { name: "布基纳法索", value: this.randomData() },
        { name: "马拉维", value: this.randomData() },
        { name: "埃及", value: this.randomData() },
        { name: "塞拉利昂", value: this.randomData() },
        { name: "尼加拉瓜", value: this.randomData() },
        { name: "坦桑尼亚", value: this.randomData() },
        { name: "尼日利亚", value: this.randomData() },
        { name: "尼日尔", value: this.randomData() },
        { name: "毛里塔尼亚", value: this.randomData() },
        { name: "喀麦隆", value: this.randomData() },
        { name: "新加坡", value: this.randomData() },
        { name: "缅甸", value: this.randomData() },
        { name: "印尼", value: this.randomData() },
        { name: "贝宁", value: this.randomData() },
        { name: "摩洛哥", value: this.randomData() },
        { name: "马里", value: this.randomData() },
        { name: "哥斯达黎加", value: this.randomData() },
        { name: "萨尔瓦多", value: this.randomData() },
        { name: "厄瓜多尔", value: this.randomData() },
        { name: "泰国", value: this.randomData() },
        { name: "斯里兰卡", value: this.randomData() },
        { name: "多米尼加", value: this.randomData() },
        { name: "韩国", value: this.randomData() },
        { name: "刚果民主共和国", value: this.randomData() },
        { name: "越南", value: this.randomData() },
        { name: "几内亚", value: this.randomData() },
        { name: "危地马拉", value: this.randomData() },
        { name: "利比里亚", value: this.randomData() },
        { name: "多哥", value: this.randomData() },
        { name: "秘鲁", value: this.randomData() },
        { name: "毛里求斯", value: this.randomData() },
        { name: "莫桑比克", value: this.randomData() },
        { name: "阿尔及利亚", value: this.randomData() },
        { name: "柬埔寨", value: this.randomData() },
        { name: "斯威士兰", value: this.randomData() },
        { name: "乍得", value: this.randomData() },
        { name: "塞内加尔", value: this.randomData() },
        { name: "津巴布韦", value: this.randomData() },
        { name: "黎巴嫩", value: this.randomData() },
        { name: "洪都拉斯", value: this.randomData() },
        { name: "伊拉克", value: this.randomData() },
        { name: "科特迪瓦", value: this.randomData() },
        { name: "孟加拉国", value: this.randomData() },
        { name: "赞比亚", value: this.randomData() },
        { name: "巴拿马", value: this.randomData() },
        { name: "中非共和国", value: this.randomData() },
        { name: "突尼斯", value: this.randomData() },
        { name: "加纳", value: this.randomData() },
        { name: "斐济", value: this.randomData() },
        { name: "安哥拉", value: this.randomData() },
        { name: "冈比亚", value: this.randomData() },
        { name: "中国", value: this.randomData() },
        { name: "刚果共和国", value: this.randomData() },
        { name: "古巴", value: this.randomData() },
        { name: "苏丹", value: this.randomData() },
        { name: "伊朗", value: this.randomData() },
        { name: "委内瑞拉", value: this.randomData() },
        { name: "土耳其", value: this.randomData() },
        { name: "牙买加", value: this.randomData() },
        { name: "叙利亚", value: this.randomData() },
        { name: "玻利维亚", value: this.randomData() },
        { name: "巴西", value: this.randomData() },
        { name: "阿联酋", value: this.randomData() },
        { name: "智利", value: this.randomData() },
        { name: "马来西亚", value: this.randomData() },
        { name: "苏里南", value: this.randomData() },
        { name: "前南马其顿", value: this.randomData() },
        { name: "加蓬", value: this.randomData() },
        { name: "日本", value: this.randomData() },
        { name: "阿尔巴尼亚", value: this.randomData() },
        { name: "墨西哥", value: this.randomData() },
        { name: "波多黎各", value: this.randomData() },
        { name: "以色列", value: this.randomData() },
        { name: "西班牙", value: this.randomData() },
        { name: "特立尼达和多巴哥", value: this.randomData() },
        { name: "卡塔尔", value: this.randomData() },
        { name: "克罗地亚", value: this.randomData() },
        { name: "乌拉圭", value: this.randomData() },
        { name: "塔吉克斯坦", value: this.randomData() },
        { name: "巴林", value: this.randomData() },
        { name: "巴拉圭", value: this.randomData() },
        { name: "沙特阿拉伯", value: this.randomData() },
        { name: "瑞士", value: this.randomData() },
        { name: "蒙古", value: this.randomData() },
        { name: "科威特", value: this.randomData() },
        { name: "圭亚那", value: this.randomData() },
        { name: "英国", value: this.randomData() },
        { name: "塞浦路斯", value: this.randomData() },
        { name: "阿根廷", value: this.randomData() },
        { name: "爱尔兰", value: this.randomData() },
        { name: "意大利", value: this.randomData() },
        { name: "南非", value: this.randomData() },
        { name: "荷兰", value: this.randomData() },
        { name: "黑山共和国", value: this.randomData() },
        { name: "利比亚", value: this.randomData() },
        { name: "亚美尼亚", value: this.randomData() },
        { name: "斯洛文尼亚", value: this.randomData() },
        { name: "波兰", value: this.randomData() },
        { name: "希腊", value: this.randomData() },
        { name: "纳米比亚", value: this.randomData() },
        { name: "德国", value: this.randomData() },
        { name: "阿曼", value: this.randomData() },
        { name: "格鲁吉亚", value: this.randomData() },
        { name: "卢森堡", value: this.randomData() },
        { name: "葡萄牙", value: this.randomData() },
        { name: "阿塞拜疆", value: this.randomData() },
        { name: "新喀里多尼亚", value: this.randomData() },
        { name: "吉尔吉斯斯坦", value: this.randomData() },
        { name: "新西兰", value: this.randomData() },
        { name: "乌兹别克斯坦", value: this.randomData() },
        { name: "塞尔维亚", value: this.randomData() },
        { name: "法国", value: this.randomData() },
        { name: "奥地利", value: this.randomData() },
        { name: "捷克共和国", value: this.randomData() },
        { name: "斯洛伐克", value: this.randomData() },
        { name: "拉脱维亚", value: this.randomData() },
        { name: "挪威", value: this.randomData() },
        { name: "土库曼斯坦", value: this.randomData() },
        { name: "比利时", value: this.randomData() },
        { name: "丹麦", value: this.randomData() },
        { name: "匈牙利", value: this.randomData() },
        { name: "伯利兹", value: this.randomData() },
        { name: "瑞典", value: this.randomData() },
        { name: "博茨瓦纳", value: this.randomData() },
        { name: "罗马尼亚", value: this.randomData() },
        { name: "俄罗斯", value: this.randomData() },
        { name: "澳大利亚", value: this.randomData() },
        { name: "加拿大", value: this.randomData() },
        { name: "保加利亚", value: this.randomData() },
        { name: "哈萨克斯坦", value: this.randomData() },
        { name: "立陶宛", value: this.randomData() },
        { name: "爱沙尼亚", value: this.randomData() },
        { name: "白俄罗斯", value: this.randomData() },
        { name: "美国", value: this.randomData() },
        { name: "美国", value: this.randomData() },
        { name: "文莱", value: this.randomData() },
        { name: "摩尔多瓦", value: this.randomData() },
        { name: "巴哈马", value: this.randomData() },
        { name: "芬兰", value: this.randomData() },
        { name: "乌克兰", value: this.randomData() },
        { name: "北马里亚纳", value: this.randomData() },
      ],
      nameMap: {
        Afghanistan: "阿富汗",
        Albania: "阿尔巴尼亚",
        Algeria: "阿尔及利亚",
        Andorra: "安道尔",
        Angola: "安哥拉",
        Antarctica: "南极洲",
        "Antigua and Barbuda": "安提瓜和巴布达",
        Argentina: "阿根廷",
        Armenia: "亚美尼亚",
        Australia: "澳大利亚",
        Austria: "奥地利",
        Azerbaijan: "阿塞拜疆",
        "The Bahamas": "巴哈马",
        Bahrain: "巴林",
        Bangladesh: "孟加拉国",
        Barbados: "巴巴多斯",
        Belarus: "白俄罗斯",
        Belgium: "比利时",
        Belize: "伯利兹",
        Benin: "贝宁",
        Bermuda: "百慕大",
        Bhutan: "不丹",
        Bolivia: "玻利维亚",
        "Bosnia and Herzegovina": "波斯尼亚和黑塞哥维那",
        Botswana: "博茨瓦纳",
        Brazil: "巴西",
        Brunei: "文莱",
        Bulgaria: "保加利亚",
        "Burkina Faso": "布基纳法索",
        Burundi: "布隆迪",
        Cambodia: "柬埔寨",
        Cameroon: "喀麦隆",
        Canada: "加拿大",
        "Cape Verde": "佛得角",
        "Central African Republic": "中非共和国",
        Chad: "乍得",
        Chile: "智利",
        China: "中国",
        Colombia: "哥伦比亚",
        Comoros: "科摩罗",
        "Republic of the Congo": "刚果共和国",
        "Costa Rica": "哥斯达黎加",
        Croatia: "克罗地亚",
        Cuba: "古巴",
        Cyprus: "塞浦路斯",
        "Czech Republic": "捷克共和国",
        Denmark: "丹麦",
        Djibouti: "吉布提",
        Dominica: "多米尼加",
        "Dominican Republic": "多明尼加共和国",
        Ecuador: "厄瓜多尔",
        Egypt: "埃及",
        "El Salvador": "萨尔瓦多",
        "Equatorial Guinea": "赤道几内亚",
        Eritrea: "厄立特里亚",
        Estonia: "爱沙尼亚",
        Ethiopia: "埃塞俄比亚",
        "Falkland Islands": "福克兰群岛",
        "Faroe Islands": "法罗群岛",
        Fiji: "斐济",
        Finland: "芬兰",
        France: "法国",
        "French Guiana": "法属圭亚那",
        "French Southern and Antarctic Lands": "法属南半球和南极领地",
        Gabon: "加蓬",
        Gambia: "冈比亚",
        "Gaza Strip": "加沙",
        Georgia: "格鲁吉亚",
        Germany: "德国",
        Ghana: "加纳",
        Greece: "希腊",
        Greenland: "格陵兰",
        Grenada: "格林纳达",
        Guadeloupe: "瓜德罗普",
        Guatemala: "危地马拉",
        Guinea: "几内亚",
        "Guinea Bissau": "几内亚比绍",
        Guyana: "圭亚那",
        Haiti: "海地",
        Honduras: "洪都拉斯",
        "Hong Kong": "香港",
        Hungary: "匈牙利",
        Iceland: "冰岛",
        India: "印度",
        Indonesia: "印尼",
        Iran: "伊朗",
        Iraq: "伊拉克",
        "Iraq-Saudi Arabia Neutral Zone": "伊拉克阿拉伯中立区",
        Ireland: "爱尔兰",
        "Isle of Man": "马恩岛",
        Israel: "以色列",
        Italy: "意大利",
        "Ivory Coast": "科特迪瓦",
        Jamaica: "牙买加",
        "Jan Mayen": "扬马延岛",
        Japan: "日本",
        Jordan: "约旦",
        Kazakhstan: "哈萨克斯坦",
        Kenya: "肯尼亚",
        Kerguelen: "凯尔盖朗群岛",
        Kiribati: "基里巴斯",
        "North Korea": "北朝鲜",
        "South Korea": "韩国",
        Kuwait: "科威特",
        Kyrgyzstan: "吉尔吉斯斯坦",
        Laos: "老挝",
        Latvia: "拉脱维亚",
        Lebanon: "黎巴嫩",
        Lesotho: "莱索托",
        Liberia: "利比里亚",
        Libya: "利比亚",
        Liechtenstein: "列支敦士登",
        Lithuania: "立陶宛",
        Luxembourg: "卢森堡",
        Macau: "澳门",
        Macedonia: "马其顿",
        Madagascar: "马达加斯加",
        Malawi: "马拉维",
        Malaysia: "马来西亚",
        Maldives: "马尔代夫",
        Mali: "马里",
        Malta: "马耳他",
        Martinique: "马提尼克",
        Mauritania: "毛里塔尼亚",
        Mauritius: "毛里求斯",
        Mexico: "墨西哥",
        Moldova: "摩尔多瓦",
        Monaco: "摩纳哥",
        Mongolia: "蒙古",
        Morocco: "摩洛哥",
        Mozambique: "莫桑比克",
        Myanmar: "缅甸",
        Namibia: "纳米比亚",
        Nepal: "尼泊尔",
        Netherlands: "荷兰",
        "New Caledonia": "新喀里多尼亚",
        "New Zealand": "新西兰",
        Nicaragua: "尼加拉瓜",
        Niger: "尼日尔",
        Nigeria: "尼日利亚",
        "Northern Mariana Islands": "北马里亚纳群岛",
        Norway: "挪威",
        Oman: "阿曼",
        Pakistan: "巴基斯坦",
        Panama: "巴拿马",
        "Papua New Guinea": "巴布亚新几内亚",
        Paraguay: "巴拉圭",
        Peru: "秘鲁",
        Philippines: "菲律宾",
        Poland: "波兰",
        Portugal: "葡萄牙",
        "Puerto Rico": "波多黎各",
        Qatar: "卡塔尔",
        Reunion: "留尼旺岛",
        Romania: "罗马尼亚",
        Russia: "俄罗斯",
        Rwanda: "卢旺达",
        "San Marino": "圣马力诺",
        "Sao Tome and Principe": "圣多美和普林西比",
        "Saudi Arabia": "沙特阿拉伯",
        Senegal: "塞内加尔",
        Seychelles: "塞舌尔",
        "Sierra Leone": "塞拉利昂",
        Singapore: "新加坡",
        Slovakia: "斯洛伐克",
        Slovenia: "斯洛文尼亚",
        "Solomon Islands": "所罗门群岛",
        Somalia: "索马里",
        "South Africa": "南非",
        Spain: "西班牙",
        "Sri Lanka": "斯里兰卡",
        "St. Christopher-Nevis": "圣",
        "St. Lucia": "圣露西亚",
        "St. Vincent and the Grenadines": "圣文森特和格林纳丁斯",
        Sudan: "苏丹",
        Suriname: "苏里南",
        Svalbard: "斯瓦尔巴特群岛",
        Swaziland: "斯威士兰",
        Sweden: "瑞典",
        Switzerland: "瑞士",
        Syria: "叙利亚",
        Taiwan: "台湾",
        Tajikistan: "塔吉克斯坦",
        "United Republic of Tanzania": "坦桑尼亚",
        Thailand: "泰国",
        Togo: "多哥",
        Tonga: "汤加",
        "Trinidad and Tobago": "特里尼达和多巴哥",
        Tunisia: "突尼斯",
        Turkey: "土耳其",
        Turkmenistan: "土库曼斯坦",
        "Turks and Caicos Islands": "特克斯和凯科斯群岛",
        Uganda: "乌干达",
        Ukraine: "乌克兰",
        "United Arab Emirates": "阿联酋",
        "United Kingdom": "英国",
        "United States of America": "美国",
        Uruguay: "乌拉圭",
        Uzbekistan: "乌兹别克斯坦",
        Vanuatu: "瓦努阿图",
        Venezuela: "委内瑞拉",
        Vietnam: "越南",
        "Western Sahara": "西撒哈拉",
        "Western Samoa": "西萨摩亚",
        Yemen: "也门",
        Yugoslavia: "南斯拉夫",
        "Democratic Republic of the Congo": "刚果民主共和国",
        Zambia: "赞比亚",
        Zimbabwe: "津巴布韦",
        "South Sudan": "南苏丹",
        Somaliland: "索马里兰",
        Montenegro: "黑山",
        Kosovo: "科索沃",
        "Republic of Serbia": "塞尔维亚",
      },
    };
  },
  computed: {},
  methods: {
    moment,
    randomData() {
      return Math.round(Math.random() * 1000000);
    },
    getSalvProMax() {
      for (let i = 0; i < this.salvProValue.length; i++) {
        this.salvProMax.push(this.salvProValue[0]);
      }
    },
    getOption1() {
      return {
        timeline: {
          axisType: "category",
          orient: "vertical",
          autoPlay: true,
          inverse: true,
          playInterval: 5000,
          left: null,
          right: -105,
          top: 20,
          bottom: 20,
          width: 46,
        },
        baseOption: {
          visualMap: {
            type: "piecewise", //分段型。
            splitNumber: 6,
            inverse: true,
            pieces: [
              {
                min: 0,
                max: 1000,
                color: "#759aa0",
              },
              {
                min: 1000,
                max: 5000,
                color: "#73b9bc",
              },
              {
                min: 5000,
                max: 100000,
                color: "#8dc1a9",
              },
              {
                min: 100000,
                max: 500000,
                color: "#e69d87",
              },
              {
                min: 500000,
                max: 1000000,
                color: "#ea7e53",
              },
              {
                min: 1000000,
                //max: 5000000,
                color: "#dd6b66",
              },
            ],
            x: "left",
            y: "center",
            textStyle: {
              color: "#b8e2f2",
            },
          },
          series: [
            {
              type: "map",
              map: "world",
              roam: true,
              itemStyle: {
                emphasis: { label: { show: false } },
              },
              nameMap: this.nameMap,
            },
          ],
        },

        options: [
          {
            /*  title: {
              text: "1.6 世界各国地均GDP",
              subtext: "国家基础地理信息中心",
              //sublink: 'http://esa.un.org/wpp/Excel-Data/population.htm',
              left: "center",
              top: "top",
            }, */
            tooltip: {
              trigger: "item",
              formatter: function (params) {
                var value = params.value;
                //value = value.toFixed(5);toFixed(3)控制小数位数
                value = value;
                if (!value) {
                  return;
                }
                //var abc=(params.abc);
                return params.name + " 累计确诊: " + value + " 人";
              },
            },
            series: {
              data: this.allData,
            },
          },
        ],
      };
    },
    getOption2() {
      return {
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
          top: "2%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          formatter: function (params) {
            return params[0].name + " : " + params[0].value;
          },
        },
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: this.salvProName,
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12",
              },
            },
            data: this.salvProValue,
          },
        ],
        series: [
          {
            name: "值",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgb(57,89,255,1)",
                  },
                  {
                    offset: 1,
                    color: "rgb(46,200,207,1)",
                  },
                ]),
              },
            },
            barWidth: 20,
            data: this.salvProValue,
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 20,
            barGap: "-100%",
            data: this.salvProMax,
            itemStyle: {
              normal: {
                color: "rgba(24,31,68,1)",
                barBorderRadius: 30,
              },
            },
          },
        ],
      };
    },
    getOption3() {
      return {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          // color: #fffff,
          data: ["死亡", "确诊", "疑似", "治愈"],
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
        },
        series: [
          {
            // name: "访问来源",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],

            label: {
              position: "inner",
            },
            labelLine: {
              length: 1,
              length2: 20,
              show: false,
            },
            data: [
              { value: 335, name: "新增死亡", selected: true },
              { value: 1679, name: "新增治愈" },
            ],
          },
          {
            name: "数据",
            fontSize: 20,
            type: "pie",
            radius: ["40%", "55%"],
            /*  label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 10,
                  align: "center",
                },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0,
                },
                b: {
                  fontSize: 10,
                  lineHeight: 10,
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2,
                },
              },
            }, */
            data: [
              { value: 2135, name: "死亡" },
              { value: 11210, name: "确诊" },
              { value: 22234, name: "治愈" },
              { value: 11135, name: "疑似" },
            ],
          },
        ],
      };
    },
    getOption4() {
      return {
        // backgroundColor: "#1A1835",

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
            },
          },
        },
        grid: {
          borderWidth: 0,
          top: 110,
          bottom: 95,
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          x: "46%",
          top: "11%",
          textStyle: {
            color: "#90979c",
          },
          data: ["死亡", "治愈"],
        },

        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "rgba(204,187,225,0.5)",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            data: this.xData,
          },
        ],

        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(204,187,225,0.5)",
              },
            },
          },
        ],
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,

            start: 10,
            end: 80,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#5B3AAE",
            },
            textStyle: {
              color: "rgba(204,187,225,0.5)",
            },
            fillerColor: "rgba(67,55,160,0.4)",
            borderColor: "rgba(204,187,225,0.5)",
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35,
          },
        ],
        series: [
          {
            name: "治愈",
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: "#6f7de3",
            },
            markPoint: {
              label: {
                normal: {
                  textStyle: {
                    color: "#fff",
                  },
                },
              },
              data: [
                {
                  type: "max",
                  name: "最大值",
                },
                {
                  type: "min",
                  name: "最小值",
                },
              ],
            },
            data: this.cureData,
          },
          {
            name: "死亡",
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: "#c257F6",
            },
            markPoint: {
              label: {
                normal: {
                  textStyle: {
                    color: "#fff",
                  },
                },
              },
              data: [
                {
                  type: "max",
                  name: "最大值",
                },
                {
                  type: "min",
                  name: "最小值",
                },
              ],
            },
            data: this.dieData,
          },
        ],
      };
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
    toDraw3() {
      // console.log(document.getElementById("currentAdd"), "--------");
      //   基于准备好的dom，初始化echarts实例
      let chart = echarts.init(document.getElementById("currentAdd3"));
      let option = this.getOption3();
      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option);
    },
    toDraw4() {
      // console.log(document.getElementById("currentAdd"), "--------");
      //   基于准备好的dom，初始化echarts实例
      let chart = echarts.init(document.getElementById("currentAdd4"));
      let option = this.getOption4();
      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option);
    },
  },
  created() {},
  mounted() {
    this.toDraw1();
    this.toDraw2();
    this.toDraw3();
    this.toDraw4();
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
};
</script>

<style scoped>
a {
  color: rgb(224, 210, 210);
  text-decoration: none;
}
#current {
  min-height: calc(100vh - 20px);
  background: url("../assets/mqj1.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.title {
  color: #ffffff;
  text-align: center;
  font-weight: bolder;
  font-size: 20px;
}
.title1 {
  color: #ffffff;
  font-weight: bolder;
  font-size: 16px;
}
.title2 {
  color: #000000;
  font-weight: bolder;
  font-size: 16px;
}
.heard {
  height: 100px;
}
.heardFont1 {
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  font-size: 35px;
  padding: 20px;
  font-weight: 800;
}
.heardFont2 {
  color: #ffffff;
  float: right;
  font-size: 20px;
  /* padding: 5px; */
}
/* .bg-purple {
  background: #e9eaecdc;
} */

.grid-content {
  border-radius: 4px;
  height: 600px;
  border: 2px solid #1359df;
}
.grid-content1 {
  margin-top: 5px;
  height: 450px;
  border: 2px solid #1359df;
}
.center1 {
  height: 600px;
  width: 96%;
  /* background: rgb(182, 236, 231); */
}
.centerChild2 {
  height: 135px;
  width: 90%;
  /*   background: url("../assets/mqj2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  /* z-index: -1;
  -webkit-filter: blur(5px);
  filter: blur(px); */
  /*  background: turquoise; */
  margin: auto;
  margin-top: 12px;
}
.center1Font1 {
  text-align: center;
  font-size: 14px;
  line-height: 40px;
  color: #ffffff;
  font-weight: bolder;
}
.center1Font2 {
  text-align: center;
  font-size: 15px;
  line-height: 10px;
  color: #ff6a57;
  font-weight: bolder;
}
/* .center1Child2_1 {
  text-align: center;
  display: inline-block;
} */
.center1Font3 {
  text-align: center;
  /* margin-left: 20px; */
  font-size: 12px;
  line-height: 25px;
  color: #ffffff;
  /* position: relative; */
  /* display: inline-block; */
}
.center1Font4 {
  text-align: center;
  font-size: 12px;
  color: #ff6a57;
  line-height: 10px;
  /* display: inline-block; */
}
.center2_1 {
  padding: 7px;
  margin: auto;
  width: 250px;
  height: 350px;
  /* background: cadetblue; */
}
.currentBg1_c1 {
  background: seagreen;
  height: 100%;
}
#currentAdd1 {
  height: 100%;
  width: 100%;
  margin: auto;
}
#currentAdd2 {
  height: 100%;
  width: 100%;
  margin: auto;
}
#currentAdd3 {
  height: 100%;
  width: 100%;
  margin: auto;
}
#currentAdd4 {
  height: 100%;
  width: 100%;
  margin: auto;
}
</style>
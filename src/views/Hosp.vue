<template>
  <div id="hosp">
    <div class="header">
      <div class="yb"><h1>医院百科</h1></div>
    </div>

    <div id="Ipt">
      <el-input placeholder="请输入关键字" class="ipt" v-model="pageParam.name"
        ><i slot="prefix" class="el-input__icon el-icon-search"></i
      ></el-input>
      <span
        ><el-button
          type="primary"
          icon="el-icon-search"
          id="btn"
          @click="toSearch"
          >搜索</el-button
        ></span
      >
    </div>
    <!-- {{hospData}} -->

    <div @click="toJump(item)" v-for="(item, index) in hospData" :key="index">
      <span id="no">{{ index + 1 }}. </span>{{ item.name }}
      <span id="km">
        <i class="el-icon-location-information"></i>
        {{
          distanceTwo(
            currentPosition[0],
            currentPosition[1],
            item.longitude,
            item.latitude
          )
        }}
        km</span
      >
      <br />
      <span id="js">{{ item.introduce }}</span
      ><br />
      <i class="el-icon-location"></i>
      <span id="dz">{{ item.address }}</span>
    </div>
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
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "../utils/request";
export default {
  data() {
    return {
      currentPosition: [],
      hospData: [],
      // 分页查询的参数
      pageParam: {
        page: 1,
        pageSize: 10,
        name: "",
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
    // 跳转页面
    toJump(hospital) {
      // hospital是医院对象
      console.log(hospital);
      //使用js进行路由跳转页面
      // this.$router.push("/hospMap");
      this.$router.push({
        path: "/hospMap",
        query: {
          longitude: hospital.longitude,
          latitude: hospital.latitude,
          name: hospital.name,
        },
      });
    },
    distanceTwo(lng1, lat1, lng2, lat2) {
      var radLat1 = (lat1 * Math.PI) / 180.0;
      var radLat2 = (lat2 * Math.PI) / 180.0;
      var a = radLat1 - radLat2;
      var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
      var s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s = s * 6378.137; // EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000;
      console.log("两地距离千米：", s);
      return s;
    },
    // 分页查找
    async pageQuery() {
      let res = await axios.get("/hospital/pageQuery", {
        params: this.pageParam,
      });
      this.hospData = res.data.list;
      this.total = res.data.total;
    },
    toSearch() {
      this.pageQuery();
    },
  },
  created() {
    this.pageQuery();
    this.currentPosition = [109.501845, 24.305464];

    // navigator.geolocation.getCurrentPosition(
    //   (data) => {
    //     // console.log(data, "当前地理位置信息");
    //     this.currentPosition = [data.coords.longitude, data.coords.latitude];
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
  mounted() {},
};
</script>
<style scoped>
.tb {
  height: 700px;
}
#hosp {
  line-height: 35px;
  font-size: 20px;
  background: url(../assets/wyw1.jpg);
  background-size: 100% 100%;
  border-radius: 30px 30px 30px 30px;
}
#km {
  float: right;
}
.el-icon-location-information {
  color: rgb(55, 0, 255);
}
.el-icon-location {
  color: #999;
}
.ipt {
  width: 250px;
}
#Ipt {
  margin-bottom: 20px;
}
.yb {
  margin-left: 10px;
}
#btn {
  margin-left: 20px;
  background-color: #4e6ef2;
  border-color: #4e6ef2;
}
#js,
#dz {
  font-size: 14px;
  color: #999;
}
#no {
  background-color: #ffb34e;
  border-radius: 50%;
  text-align: center;
  font-size: 18px;
}
.header {
  width: 100%;
  height: 250px;
  background: url(../assets/wyw2.jpg);
  background-size: 100% 100%;
  border-radius: 30px 30px 30px 30px;
  margin-bottom: 20px;
}
</style>

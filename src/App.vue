<template>
  <div id="app">
    <div>
      <el-container>
        <el-header class="h0">
          <iframe
            width="300"
            scrolling="no"
            height="30"
            frameborder="0"
            allowtransparency="true"
            src="https://i.tianqi.com?c=code&id=34&icon=1&site=12"
          ></iframe>
          <!-- 用户按钮 -->
          <div class="h3">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="home">首页</el-dropdown-item>
                <el-dropdown-item id="sbut" command="quit" divided
                  >退出</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="h3">
            <el-dropdown @command="handleCommand" trigger="click">
              <div class="h3">
                <img
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  alt=""
                />
              </div>
              <el-dropdown-menu class="h1" slot="dropdown">
                <el-dropdown-item command="home">首页</el-dropdown-item>
                <el-dropdown-item id="sbut" command="quit" divided
                  >退出</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-container>
          <el-aside
            width="auto"
            @mouseenter.native="collapseOpen"
            @mouseleave.native="collapseClose"
          >
            <transition name="el-zoom-in-top">
              <!-- 在el-menu上写了router之后启动路由，内部的index属性代表导航打开的路由，注意路由对应的页面是在src/router/index.js中配置的 -->
              <el-menu
                :default-active="active"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :collapse="isCollapse"
                router
              >
                <el-menu-item index="/" width="190px">
                  <i class="el-icon-menu"></i>
                  <span slot="title">疫情动态</span>
                </el-menu-item>
                <el-menu-item index="/map">
                  <i class="el-icon-s-opportunity"></i>
                  <span slot="title">疫情地图</span>
                </el-menu-item>
                <el-menu-item index="/current">
                  <i class="el-icon-suitcase"></i>
                  <span slot="title">实时疫情</span>
                </el-menu-item>
                <el-menu-item index="/dataStatistics">
                  <i class="el-icon-school"></i>
                  <span slot="title">数据统计</span>
                </el-menu-item>
                <el-menu-item index="/hosp">
                  <i class="el-icon-school"></i>
                  <span slot="title">定点医院</span>
                </el-menu-item>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-user-solid"></i>
                    <span>基础配置</span>
                  </template>
                  <el-menu-item index="/user"> 用户管理</el-menu-item>
                  <!-- <el-menu-item index="/roe"> 角色管理 </el-menu-item> -->
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-folder-opened"></i>
                    <span>疫情管理</span>
                  </template>
                  <el-menu-item index="/hospital"> 定点医院</el-menu-item>
                  <el-menu-item index="/infoList"> 资讯分类 </el-menu-item>
                  <el-menu-item index="/article"> 新闻资讯 </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>疫情数据</span>
                  </template>
                  <el-menu-item index="/show"> 数据列表</el-menu-item>
                  <el-menu-item index="/up"> 数据上报 </el-menu-item>
                  <el-menu-item index="/learn"> 疫情防控 </el-menu-item>
                </el-submenu>
                <el-menu-item index="/roe">
                  <i class="el-icon-loading"></i>
                  <span slot="title">疫情讨论区</span>
                </el-menu-item>
                <el-menu-item index="/refuteSlanders">
                  <i class="el-icon-loading"></i>
                  <span slot="title">辟谣小专区</span>
                </el-menu-item>
              </el-menu>
            </transition>
          </el-aside>

          <el-main>
            <div>
              <router-view></router-view>
            </div>
            <!-- 路由对应的组件展示的位置 -->
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import axios from "./utils/request";
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
export default {
  data() {
    return {
      collapseBtnClick: false,
      isCollapse: true,
      active: "/",
      isLogin: sessionStorage.getItem("token"),
      Form: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    collapseOpen() {
      if (this.collapseBtnClick) return;
      this.isCollapse = false;
    },
    collapseClose() {
      if (this.collapseBtnClick) return;
      this.isCollapse = true;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      if (command == "home") {
        this.$router.push("/");
      }
      if (command == "quit") {
        this.$confirm("退出用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            axios.post("/user/logout");
            sessionStorage.clear();
            this.isLogin = false;
            this.Form = {};
            this.$router.push("/");
            this.$message({
              type: "success",
              message: "退出成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消退出",
            });
          });
      }
    },
    // formname包含密码用户名
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await axios.post("/user/login", this.Form);
          if (res.status == 200) {
            // 存token到sessionStorage 属性名叫token
            sessionStorage.setItem("token", res.data.token);
            this.$notify({
              title: "成功",
              message: "登陆成功",
              type: "success",
            });
            this.isLogin = true;
          } else {
            this.$notify.error({
              title: "登陆失败",
              message: res.statusText,
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  // 监听器：router变化
  watch: {
    $route: function (route) {
      // console.log(route, "============");
      this.active = route.path;
    },
  },
  created() {
    //怎么拿到地址栏
    // console.log(location.pathname, "111");
    // console.log(this.$route, "000");
    let l = location.hash.length;
    console.log(l);
    console.log(location.hash.substring(1, l));
    this.active = location.hash.substring(1, l);
  },
};
</script>

<style >
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  /* background-color: #d3dce6; */
  color: #333;
  /* line-height: 200px; */
  height: calc(100vh - 60px);
  min-height: 500px;
}

.el-main {
  background-color: rgb(0, 128, 128, 0.1);
  color: #333;
  padding: 10px !important;
  /* line-height: 160px; */
  height: calc(100vh - 60px);
  min-height: 500px;
}
.el-main > div {
  min-height: calc(100% - 40px);
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: 200px; */
  min-height: 400px;
}
.el-button el-button--default {
  width: 20px;
  height: 20px;
}
.loginbody {
  /* 内容溢出控制-始终显示滚动条 */
  overflow: hidden;
  /* 超出时隐藏内容 */
  overflow-y: hidden;
  overflow-x: hidden;
}

.login {
  width: 100vw;
  padding: 0;
  margin: 0;
  height: 100vh;
  font-size: 16px;
  background-position: left top;
  background-color: #242645;
  color: #fff;
  font-family: "Source Sans Pro";
  position: relative;
  background-image: url("./assets/home-page.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.mylogin {
  width: 240px;
  height: 280px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 50px 40px 40px 40px;
  box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
  opacity: 1;
  background: linear-gradient(
    230deg,
    rgba(53, 57, 74, 0) 0%,
    rgb(0, 0, 0) 100%
  );
}
.regst {
  color: black;
  margin-top: 20px;
  margin-left: 120px;
}

.inps input {
  border: none;
  color: #fff;
  background-color: transparent;
  font-size: 12px;
}

.submitBtn1 {
  width: 200px;
  margin-top: 20px;
}
.submitBtn2 {
  background-color: transparent;
  color: #39f;
  width: 200px;
}
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
}

.el-aside {
  /* background-color: #d3dce6; */
  color: #333;
  /* text-align: center; */
  /* line-height: 200px; */
  height: calc(100vh - 60px);
  min-height: 500px;
}

.el-main {
  background-color: #bf45bf56;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
  height: calc(100% - 60px);
  min-height: 500px;
  padding: 10px !important;
}
.el-main > div {
  background-color: white;
  border-radius: 10px;
  height: calc(100%-40px);
  padding: 20px;
}
.h3 {
  background-color: transparent;
  display: inline-block;
  float: right;
}
.h3 img {
  width: 35px;
  height: 35px;
}
.h0 {
  line-height: 84px !important;
}
</style>

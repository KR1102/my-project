<template>
  <div>
    {{hospName}}
    <el-amap :center="center" vid="amapDemo1" class="map">
      <el-amap-marker vid="component-marker" :position="center"></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: [115.90363, 28.684013],
      hospName: "",
    };
  },
  computed: {},
  methods: {},
  created() {
    // 接受其他页面跳转携带的参数
    // console.log(this.$route.query);
    let { longitude, latitude, name } = this.$route.query;
    this.center = [longitude, latitude];
    this.hospName = name;
  },
  mounted() {},
};
</script>
<style scoped>
.map {
  height: 600px;
}
</style>
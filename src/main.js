import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import VueAMap from 'vue-amap';

Vue.config.productionTip = false
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '70abb46c0021822523e9565a8a9e0cc7',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import  '../public/css/reset.css'
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import QR_CODE from '@/views/common/QR_code'
import animated from 'animate.css'
import './permission'
Vue.config.productionTip = false
Vue.component('QR_CODE',QR_CODE)

window.etos=function(entity){ //将html命名实体转换为字符的方法
  var div=document.createElement('div');
  div.innerHTML=entity;
  var res=div.innerText||div.textContent;
  return res;
}
Vue.use(elementUI)
Vue.use(animated)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

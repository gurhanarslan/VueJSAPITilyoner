import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

Vue.http.options.root='https://api.iddaa.com.tr/SportsProgram/basic/1';

Vue.http.interceptors.push((request,next)=>{
  console.log(request.method);
})

new Vue({
  el: '#app',
  render: h => h(App)
})

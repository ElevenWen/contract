import axios from "axios";
import Vue from "vue";
import { LoadingPlugin  } from "vux";
Vue.use(LoadingPlugin);
let _vuex = new Vue(); //为了绑定vuex




// 自定义设置创建一个新的实例
var upload = axios.create({
  baseURL: process.env.businessLicensePort, 
   timeout: 11111 
});
upload.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=utf-8";

//添加一个请求拦截器
upload.interceptors.request.use(
  config => {
    //在请求发送之前做以下操作
    config.headers.Authorization = "APPCODE d941f350729443bfb8e1c6884d66dfab"; 
    document.body.style.overflow = 'hidden';
    _vuex.$vux.loading.show({
      text: '加载中'
     })
    return config;
  },
  function(error) {
    //当出现请求错误时做以下操作
    return Promise.reject(error);
  }
);

//添加一个返回拦截器
upload.interceptors.response.use(
  function(response) { 
    // alia response success
    if (response.data.success  ) {
      return response;
    } else {
      return Promise.reject(response);
    }
  },
  function(error) { 
    var reg = /(timeout)|(exceeded)/;
    //超时处理
    if (reg.test(error)) {
      //当 ajax请求超时, 则提示用户网络超时 重新刷新页面
      _vuex.$vux.toast.text("网络信号不稳定,链接超时", "middel");
    }
    //对返回的错误进行一些处理
    return Promise.reject(error);
  }
);

export default {
  fetch(type, url, params) {
    return new Promise((resolve, reject) => {
      switch (type) {
        case "post":
          upload
            .post(url, params)
            .then(res => {
              document.body.style.overflow = 'visible'; 
              _vuex.$vux.loading.hide()
              resolve(res.data);
            })
            .catch(error => {
               document.body.style.overflow = 'visible'; 
               _vuex.$vux.loading.hide()
              //此处做全局的 错误处理, 当success = false 提示弹框
              _vuex.$vux.toast.text('请传入清晰营业执照', "middel"); 
              reject(error);
            });
          break;
      }
    });
  }
};

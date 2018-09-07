import axios from "axios";

import Vue from "vue";
import { LoadingPlugin } from "vux";
Vue.use(LoadingPlugin);
let _vuex = new Vue(); //为了绑定vuex

// 自定义设置创建一个新的实例
var idCard = axios.create({
  baseURL: process.env.idCardPort,
  timeout: 11111
});

idCard.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=utf-8";
//添加一个请求拦截器
idCard.interceptors.request.use(
  config => {
    //在请求发送之前做以下操作
    config.headers.Authorization = "APPCODE 9f604f01b44a46b09c78a32a4242fc43";
    document.body.style.overflow = "hidden";
    _vuex.$vux.loading.show({
      text: "加载中"
    });
    return config;
  },
  function(error) {
    //当出现请求错误时做以下操作
    return Promise.reject(error);
  }
);

//添加一个返回拦截器
idCard.interceptors.response.use(
  function(response) { 
    // alia response success
    if (response.data.success) {
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
          idCard
            .post(url, params)
            .then(res => {
              document.body.style.overflow = "visible";
              _vuex.$vux.loading.hide();
              resolve(res.data);
            })
            .catch(error => {
              document.body.style.overflow = "visible";
              _vuex.$vux.loading.hide();
              //此处做全局的 错误处理, 当success = false 提示弹框
              _vuex.$vux.toast.text("请传入清晰身份证资料", "middel");
              // reject(error);
            });
          break;
      }
    });
  }
};

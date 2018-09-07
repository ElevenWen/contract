import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import unionBind from './unionBind/unionBind'
import signature from './signature/signature' 
import contractStateManagement from './contractStateManagement/contractStateManagement' 

import myPackage from './myPackage/myPackage' 

import getData from "@vuex/ajaxAPI/getData";
import axios from "axios";

import personalCenter from "./personalCenter/personalCenter"
import comfirmOrder from "./ComfirmOrder/comfirm-order"

Vue.use(Vuex);


const state = {
  weixinAuthData: {
    //微信关注和授权数据
    isFocus: false,
    openid: "",
    unionid: ""
  },
  WxData:{}, //微信数据
  WxIdData:{}, //微信ID
  loginData:{} //登陆数据
};

const mutations = {
  _weixinIsFocus(stata, success) {
    state.weixinAuthData.isFocus = success;
  },
  _weixinAuthOpenid(stata, { openid, unionid }) {
    state.weixinAuthData.openid = openid;
    state.weixinAuthData.unionid = unionid
  },
  _weixinBindCusAndRefCode(stata, data) {
    state.weixinAuthData.openid = data.success;
    state.weixinAuthData.unionid = data.unionId;
  },
  //获取微信信息
  _GetUserInfo(state,data){
    state.WxData = data
  },
  _BindCusAndRefCode(state,data){
    state.WxIdData = data
  },
  //登陆
  _Login(state,data){
    state.loginData = data
  }
};

const actions = {
  //是否关注
  weixinIsFocus({ state, commit }, data) {
    return getData.weixinIsFocus(data).then(res => {
      return commit("_weixinIsFocus", res.success);
    });
  },
  weixinAuthOpenid({ state, commit }, data) {
    return getData.weixinAuthOpenid(data).then(res => {
      return commit("_weixinAuthOpenid", res.data);
    }).catch((error)=>{
     return Promise.reject(error);
    });
  },
  weixinBindCusAndRefCode({ state, commit }, data) {
    return getData.weixinBindCusAndRefCode(data).then(res => {
      return commit("_weixinBindCusAndRefCode", res.data);
    });
  },
  BindCusAndRefCode({ state, commit },params){
    return getData.BindCusAndRefCode(params).then(res=>{
      return commit('_BindCusAndRefCode',res)
    })
  },

  //微信信息
  GetUserInfo({state,commit},data){
    return getData.getUserInfo(data).then(res=>{
       
      return commit('_GetUserInfo',res)
    })
  },
  //登陆
  Login({state,commit},data){
    return getData.Login(data).then(res=>{
     
      return commit('_Login',res)
    })
  } 
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    unionBind,
    signature,
    contractStateManagement,
    personalCenter,
    comfirmOrder,
    myPackage
  }
});

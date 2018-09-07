import api from "./globeAxios";
import businessLicense from "./businessLicense";
import idCard from "./idCard.js";

import tianyancha from "./tianyancha";


/*
*api.fech argument
* argument[0] :method
* argument[1] :url
* argument[2] :parmas
* return response.data
*/
export default {
  //------------------------------------------------------------ - home 文件夹
  // 获取各状态合同数量
  GetContractNumber(params) {
    return api.fetch('post', '/MerContract/GetContractNumber', params);
  },
  




  //------------------------------------------------------------ - signature 文件夹 
  
  GetCustomerSignatureById(params){//通过签章页面进入获取企业实名 或者是  个人实名详情   CompanyVertify.vue
    return api.fetch("post", "/MerContract/GetCustomerSignatureById",params); 
  },
  GetCustomerSignatureList(params){//获取企业用户名查询  可以从天严查查询 也可以从天严查和后台查询   CompanyVertify.vue
    return api.fetch("post", "/MerContract/GetCustomerSignatureList",params); 
  }, 

   NewGetCustomerSignatureList(params){//获取企业用户名查询  可以从天严查查询 也可以从天严查和后台查询   CompanyVertify.vue
    return api.fetch("post", "/MerContract/GetCusCompanyList",params); 
  }, 
  businessLicense(params){// Business license verification  from alipay   CompanyVertify.vue
    return businessLicense.fetch("post", "/rest/160601/ocr/ocr_business_license.json",params); 
  }, 
  idCard(params){ // identification  verification  from alipay  CompanyVertify.vue
    return idCard.fetch("post", "/rest/160601/ocr/ocr_idcard.json",params); 
  },  
  RealNameCertification(params){ // 提交实名认证  CompanyVertify.vue
    return api.fetch("post", "/MerContract/RealNameCertification",params); 
  },  
  Save(params){      //图片文件转net  https 地址
    return api.fetch("post", "/Upload/Save",params); 
  },
  //cart.vue
  getVerifyCode(params) {
    return api.fetch("post", "/Customer/SendMobileVerifyCode", params);
  },
  //微信授权 判断用户是否关注
  weixinIsFocus(params) {
    return api.fetch("get", "/Wx/IsFocus", params);
  },
  //微信授权  获取用户openid
  weixinAuthOpenid(params) {
    return api.fetch("get", "/Wx/get_openid", params);
  },
  //微信授权 微信新用户推荐信息记录 传递给后台数据保存
  weixinBindCusAndRefCode(params) {
    return api.fetch("get", "/Wx/BindCusAndRefCode", params);
  },
  //判断是否登录微企宝
  
  getUserInfo(params){
      return api.fetch('post','/Wx/GetUserInfo',params)
  },

  //微信新用户推荐信息记录
  BindCusAndRefCode(params){
    return api.fetch("post",'/Wx/BindCusAndRefCode',params)
  },
  //联合绑定
  BindMerchant(params){
    return api.fetch('post','/MerContract/BindMerchant',params)
  },
  //登陆
  Login(params){
    return api.fetch('post','/Customer/Login',params)
  },
  //人脸识别-发起认证请求
  GetVerifyToken(params){
    return api.fetch('post','/AliyunSdkRPH5BioOnly/GetVerifyToken',params)
  },
  //人脸识别-查询认证状态
  GetStatus(params){
    return api.fetch('post','/AliyunSdkRPH5BioOnly/GetVerifyToken',params)
  },
  //获取人脸识别认证资料
  GetMaterials(params){
    return api.fetch('post','/AliyunSdkRPH5BioOnly/GetMaterials',params)
  },

  //------------------------------------------------------------ - contractManagement 文件夹
  
  GetContractList(params) {
    //获取合同列表
    return api.fetch("get", "/MerContract/GetContractList", params);
  },
  xialaGetContractList(params) {
    //获取合同列表  上拉加载更多
    return api.fetch("get", "/MerContract/GetContractList", params);
  },
  GetContractInfo(params) {
    //获取合同详情 +  概览
    return api.fetch("post", "/MerContract/GetContractInfo", params);
  },
  SignContract(params){// 签署合同   签署状态（0.拒签 1.签署 2.撤回 3.催签）
    return api.fetch("post", "/MerContract/SignContract", params); 
  },
  SendECToEmail(params){// 签署合同   签署状态（0.拒签 1.签署 2.撤回 3.催签）
    return api.fetch("post", "/MerContract/SendECToEmail", params); 
  },

  

  //------------------------------------------------------------ - userCenter 文件夹
	//意见反馈
    feedback(params) {
        return api.fetch('post', '/MerContract/Suggestions', params)
    },
    // 用户信息
    GetUserInfo(params) {
        return api.fetch('post', '/MerContract/GetUserInfo', params);
    },
    // 修改手机号第一步
    VerifyMobile(params) {
        return api.fetch('post', '/MerContract/VerifyMobile', params);
    },
    // 修改手机号第二步
    EditMobile(params) {
        return api.fetch('post', '/MerContract/EditMobile', params);
    },
    // 绑定修改邮箱
    BindEmail(params) {
        return api.fetch('post', '/MerContract/EditEmail', params);
    },
    // 关于我们
    GetCompanyInfo() {
      return api.fetch('get', '/MerContract/GetCompanyInfo');
    },
    // 上传图片
    upNetImage(params) {
      return api.fetch("post", "/Upload/Save", params);
    },
    // 了解电子合同
    GetContractDesc() {
      return api.fetch("get", "/MerContract/GetContractDesc");
    },
    //获取验证码
    getVerifyCode(params) {
      return api.fetch("post", "/Customer/SendMobileVerifyCode", params);
    },
    //------------------------------------------------------------ - myPackage 文件夹
    // 余额支付
    BalancePay(params) {
      return api.fetch("post", "/Payment/BalancePay", params);
    },
    // 判断余额是否足够支付
    GetCusBalance(params) {
      return api.fetch("post", "/Payment/GetCusBalance", params);
    },
    // 获取套餐商品列表
    GetContractPack(params) {
      return api.fetch("get", "/MerContract/GetContractPack", params);
    },
    // 获取我的套餐列表
    GetMyPackageList(params) {
      return api.fetch("get", "/MerContract/GetMyPackageList", params);
    },
    // 购买套餐
    BuyECPackage(params) {
      return api.fetch("post", "/MerContract/BuyECPackage", params);
    },
    // 获取套餐详情
    GetECPackageInfo(params) {
      return api.fetch("post", "/MerContract/GetECPackageInfo", params);
    },
    GetOrderInfoByOrderId(params) {//找人代付 帮他付款
      return api.fetch("post", "/Order/GetOrderInfoByOrderId",params);
    },
  

 }

    


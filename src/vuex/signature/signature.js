import getData from "../ajaxAPI/getData";
import {setSession ,getSession} from '../../util/sessionStorage'
const state = {
  companyListData: { list: [], recordCount: 0 },
  businessData: {
    //营业执照信息
    name: "",
    reg_num: "",
    Img: "",
    files: "" //input 源文件
  },
  idCardData: {
    //身份证识别
    name: "",
    num: "",
    ImgFront: "",
    filesFront: "", //input 源文件
    filesFrontNet: "", //net 返回图片数据源
    ImgReverse: "",
    ImgReverseNet: "", //net 返回图片数据源
    filesReverse: "" //input 源文件
  },
  idCardPersonalData: {
    //身份证识别
    name: "",
    num: "",
    ImgFront: "",
    ImgFrontNet: "", //net 返回图片数据源
    filesFront: "", //input 源文件
    ImgReverse: "",
    ImgReverseNet: "", //net 返回图片数据源
    filesReverse: "", //input 源文件
    startTime: "", //开始时间
    endTime: "" //结束时间
  },
  SignatureList: {}, //签章列表
  personalInfo: {},
  aliDataOne:{}, //发起实人认证
  aliData:{},
  endSuccess:{},
  imgData:{}
};

const getters = {
  
};

const mutations = {
  _GetCustomerSignatureById(state, data) {
    
    //从个人页面跳转  获取企业实名认证数据
    state.businessData = {
      name: data.CompanyName,
      reg_num: data.SocialCreditCode,
      Img: data.BusinessLicensePic,
      files: ""
    };
    state.idCardData = {
      //身份证识别
      name: data.TrueName,
      num: data.IdCardNumber,
      ImgFront: data.IdCardPositive,
      filesFront: "", //input 源文件
      ImgReverse: data.IdCardOpposite,
      filesReverse: "" //input 源文件
    };

  },
  _GetCustomerSignatureListOther(state, data) {
    //  获取企业名称  --- 数据来源 天眼查
    state.businessData = {
      name: data.list[0].CompanyName,
      reg_num: data.list[0].SocialCreditCode,
      Img: "",
      files: ""
    };
  },
  _GetCustomerSignatureList_companyList(state, { list, recordCount }) {
    //  获取企业名称  --- 数据来源 数据库
    state.companyListData = Object.assign({}, { list, recordCount });

  },
  _businessLicense(state, data) {
    //营业执照信息
    state.businessData = {
      name: data.name,
      reg_num: data.reg_num,
      Img: data.getFileBase64.dataURL,
      files: data.getFileBase64.files
    };
    state.companyListData.list = [];
    state.companyListData.recordCount = 0;
    
  },
  _businessLicenseFiles(state, data) {
    //营业执照信息
    state.businessData.filesNet = data.storeResult.path;
  },
  _idCard(state, data) {
    console.log(data.getFileBase64)
    if(getSession('_tag') == "person"){
      if(data.getFileBase64.side == "face"){
        state.idCardPersonalData.name = data.name;
        state.idCardPersonalData.num = data.num;
        state.idCardPersonalData.ImgFront = data.getFileBase64.dataURL;
        state.idCardPersonalData.filesFront = data.getFileBase64.files;
      }else if(data.getFileBase64.side == "back"){
        state.idCardPersonalData.ImgReverse = data.getFileBase64.dataURL;
        state.idCardPersonalData.filesReverse = data.getFileBase64.files;
        state.idCardPersonalData.startTime = data.start_date;
        state.idCardPersonalData.endTime = data.end_date;
      }
    }else{
      if (data.getFileBase64.side == "face") {
        state.idCardData.name = data.name;
        state.idCardData.num = data.num;
        state.idCardData.ImgFront = data.getFileBase64.dataURL;
        state.idCardData.filesFront = data.getFileBase64.files;
      } else if (data.getFileBase64.side == "back") {
        state.idCardData.ImgReverse = data.getFileBase64.dataURL;
        state.idCardData.filesReverse = data.getFileBase64.files;
      }
    }
  },
  _idCardFiles(state, data) {
    //营业执照信息
    if (data.side == "face") {
      //face
      state.idCardData.filesFrontNet = data.storeResult.path;
    } else if (data.side == "back") {
      //back
      state.idCardData.filesReverseNet = data.storeResult.path;
    } else {
      state.idCardPersonalData.endTime = data.end_date; 
    }
  },
  _RealNameCertification(state, data) {
  },
  _getCustomerSignatureList(state, data) {
    state.SignatureList = data;
  },
  _clearData(state) { 
    //清空数据
    for (var p in state.businessData) {
      //营业执照信息
      state.businessData[p] = "";
    }
    for (var p in state.idCardData) {
      //身份证识别
      state.idCardData[p] = "";
    }
  },
  _getPersonalInfo(state,res){
    state.personalInfo = res
  },
  //人脸认证
  _GetVerifyToken(state,res){
    state.aliDataOne = res
  },
  _GetStatus(state,res){

  },
  _GetMaterials(state,res){
    state.aliData = res.data.AliData
  },
  //个人签章传后台
  _personalTo(state,res){
    state.endSuccess = res
  },
  _transition(state,res){
    state.imgData = res
  }
};

const actions = {
  GetCustomerSignatureById({ state, commit }, params) {
    return getData.GetCustomerSignatureById(params).then(res => {
      return commit("_GetCustomerSignatureById", res.data);
    });
  },
  // 获取企业名称
  GetCustomerSignatureListOther({ state, commit }, params) {
    // containTyc 	 1 数据库 2天眼查 3 数据库+天眼查 	 int 	 可
    return getData.NewGetCustomerSignatureList(params).then(res => {
      if (params.containTyc == 2) {
        // --- 数据来源 天眼查
        if (res.data.recordCount == 0) {
          // 企业名称查无数据, 手动清空原来数据资料
          return commit("_businessLicense", {
            name: params.Name,
            reg_num: "",
            getFileBase64: { dataURL: "" }
          });
          // 无数据手动抛出错误
          return Promise.reject("查无数据");
        } else { 
          return commit("_GetCustomerSignatureListOther", {
            params,
            ...res.data
          });
        }
      } else if (params.containTyc == 1) {
        // --- 数据来源  本地数据库
        return commit("_GetCustomerSignatureList_companyList", {
          params,
          ...res.data
        });
      } else {

        return commit("_GetCustomerSignatureList_companyList", {
          params,
          ...res.data
        });
      }
    });
  },
  // 获取阿里 营业执照验证
  businessLicenseFn({ state, commit }, getFileBase64) {
    let params = {
      image: getFileBase64._dataURL
    };
    return getData
      .businessLicense(params)
      .then(res => {
        return commit("_businessLicense", { getFileBase64, ...res });
      })
      .catch(error => {
        Promise.reject(error);
      });
  },
  
  Save({ state, commit }, _params) {
    let params = _params.data;
    return getData
      .Save(params)
      .then(res => {

        if (_params.type == "businessLicenseFiles") {
          return commit("_businessLicenseFiles", res.data);
        } else if (_params.type == "face") {
          res.data.side = "face";
          return commit("_idCardFiles", res.data);
        } else if (_params.type == "back") {
          res.data.side = "back";
          return commit("_idCardFiles", res.data);
        }
      })
      .catch(error => {
        Promise.reject(error);
      });
  },
  idCardFn({ state, commit }, getFileBase64) {
    // 个人身份证信息 数据传入 阿里
    let params = {
      image: getFileBase64._dataURL,
      configure: { side: getFileBase64.side } //身份证正反面类型:face/back
    };
    return getData.idCard(params).then(res => {
      // alert('成功')
      return commit("_idCard", { getFileBase64, ...res });
    }).catch(err=>{
      console.log('错误',err)
      // alert('错误',err)
    });
  },
  RealNameCertification({ state, commit }, params) {
    return getData
      .RealNameCertification(params)
      .then(res => {
        return commit("_RealNameCertification", res.data);
      })
      .catch(eee => {
        return Promise.reject(eee);
      });
  },
  //----------------------签章管理----------------------
  getCustomerSignatureList({ state, commit }, data) {
    return getData.GetCustomerSignatureList(data).then(res => {
      return commit("_getCustomerSignatureList", res);
    });
  },
  clearData({ state, commit }) {
    return commit("_clearData");
  },
  getPersonalInfo({state,commit},params){
    return getData.GetCustomerSignatureById(params).then(res=>{
      return commit('_getPersonalInfo',res)
    })
  },
  //----------人脸认证--------
  GetVerifyToken({state,commit},params){
    return getData.GetVerifyToken(params).then(res=>{
      return commit('_GetVerifyToken',res)
    })
  },
  //查询认证状态
  GetStatus({state,commit},params){
    return getData.GetStatus(params).then(res=>{
      return commit('_GetStatus',res)
    })
  },
  //获取认证资料
  GetMaterials({state,commit},params){
    return getData.GetMaterials(params).then(res=>{
      return commit('_GetMaterials',res)
    })
  },
  personalTo({state,commit},params){
    return getData.RealNameCertification(params).then(res=>{
      return commit('_personalTo',res)
    })
  },
  transition({state,commit},params){
    return getData.Save(params).then(res=>{
      return commit('_transition',res)
    }).catch(err=>{
    })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

import getD from '../ajaxAPI/getData'

const state = {
    meSign:"",
    heSign:"",
    isSigned:"",
    userInfo:{},
    telIsSucessFirst:false,
    telIsSucessTwo:false,
    emailIsSuccess:false,
    companyInfo:{},
    aboutContractName:"",
    aboutContractDes:"",
}

const getters = {
    _VerifyMobile_(state){
        return state.telIsSucessFirst
    },
    _EditMobile_(state){
        return state.telIsSucessTwo
    },
    _BindEmail_(state){
        return state.emailIsSuccess
    },
}

const mutations = {
    _GetContractNumber(state,data){ //获取各状态合同数量
        state.meSign = data.MeSign;
        state.heSign = data.HeSign;
        state.isSigned = data.SuccSign;
    },
    _GetUserInfo(state,data){ //用户信息
        state.userInfo = data;
    },
    _EditMobile(state,data){  //修改手机号第二步
        state.telIsSucessTwo = data.success;
    }, 
    _VerifyMobile(state,data){ //修改手机号第一步
        state.telIsSucessFirst = data.success;
    }, 
    _BindEmail(state,data){ //绑定修改邮箱
        state.emailIsSuccess = data.success;
    }, 
    _GetCompanyInfo(state,data){ //关于我们
        state.companyInfo = data;
    }, 
    _GetContractDesc(state,data){ //了解电子合同
        state.aboutContractName = data.Name;
        state.aboutContractDes = data.Describe;
    }, 
    
}

const actions = {
    GetContractNumber({state,commit},params){ //获取各状态合同数量
        return getD.GetContractNumber(params).then((res)=>{
            return commit('_GetContractNumber',res.data)
        })
    },
    GetUserInfo({state,commit},params){ //用户信息
        return getD.GetUserInfo(params).then((res)=>{
            return commit('_GetUserInfo',res.data)
        })
    },
    EditMobile({state,commit},params){ //修改手机号第二步
        return getD.EditMobile(params).then((res)=>{
            return commit('_EditMobile',res)
        })
    },
    VerifyMobile({state,commit},params){ //修改手机号第一步
        return getD.VerifyMobile(params).then((res)=>{
            return commit('_VerifyMobile',res)
        })
    },
    BindEmail({state,commit},params){ //绑定修改邮箱
        return getD.BindEmail(params).then((res)=>{
            return commit('_BindEmail',res)
        })
    },
    GetCompanyInfo({state,commit}){ //关于我们
        return getD.GetCompanyInfo().then((res)=>{
            return commit('_GetCompanyInfo',res.data)
        })
    },
    GetContractDesc({state,commit}){ //了解电子合同
        return getD.GetContractDesc().then((res)=>{
          
            return commit('_GetContractDesc',res.data)
        })
    },

}

export default{
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}

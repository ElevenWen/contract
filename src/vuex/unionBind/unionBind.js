import vue from 'vue'
import vuex from 'vuex'
import getD from '@vuex/ajaxAPI/getData.js'

const state = {
    code: '', //验证码
    info:{}
}

const mutations = {
    _getCodee(state,res){
        state.code = res
    },
    _BindMerchant(state,res){
        state.info = res
    }
}

const actions = {
    getCodee({state,commit},params){
        return getD.getVerifyCode(params).then(res=>{
            return commit('_getCodee',res)
        })
    },
    BindMerchant({state,commit},params){
        return getD.BindMerchant(params).then(res=>{
            return commit('_BindMerchant',res)
        })
    }
}

export default  {
    state,
    mutations,
    actions,
    namespaced:true
}
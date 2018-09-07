import getData from '@vuex/ajaxAPI/getData'
import Vue from 'vue'
import { ToastPlugin} from 'vux'
const state = {
    AmountData:'',
    orderInfo:{},
    balanceSuccess:"",
    userBanlance:-1,
    onlogin_data:{
        Message:'',
        OrderDetails:''
    },
    packageList:{
        list:[],
        recordCount:"",
    },
    myPackageList:{
        list:[],
        recordCount:"",
    },
    orderNumber:"",
    buyPackageSuccess:false,
    orderDetail:{},
}


const getters = {
    _AmountData(){
        return state.AmountData
    },
    _BalancePay_(state){
        return state.balanceSuccess
    },
    _GetCusBalance_(state){
        return state.userBanlance
    },
    _MessageData(){
        return state.onlogin_data.Message ;
    },
    _GetContractPack_(state){
        return state.packageList;
    },
    _GetMyPackageList_(state){
        return state.myPackageList;
    },
    _BuyECPackage_(state){
        return state.orderNumber;
    },
    buySuccess(state){
        return state.buyPackageSuccess;
    },
    _GetECPackageInfo_(state){
        return state.orderDetail;
    },
};

const mutations = {
    
    _BalancePay(state,res){
        state.balanceSuccess = res.success;
    },
    _GetCusBalance(state,res){
        state.userBanlance = res.Balance;
    },
    _GetOrderInfoByOrderId(state,res){ 
        // 价格
        state.AmountData = res.Amount;
        // 留言
        state.onlogin_data.Message  = res.OrderMessage;
        //订单详情
        state.onlogin_data.OrderDetails  = res.OrderDetails;
        //支付 状态
        state.onlogin_data.ProcessingState =  res.ProcessingState;
    },
    _GetContractPack(state,res){
        state.packageList.list = res.list;
        state.packageList.recordCount = res.recordCount;
    },
    _GetContractPackLoadMore(state,res){
        state.packageList.list.push(...res.list);
        state.packageList.recordCount = res.recordCount;
    },
    _GetMyPackageList(state,res){
        state.myPackageList.list = res.list;
        state.myPackageList.recordCount = res.recordCount;
    },
    _GetMyPackageListLoadMore(state,res){
        state.myPackageList.list.push(...res.list);
        state.myPackageList.recordCount = res.recordCount;
    },
    _BuyECPackage(state,res){
        state.orderNumber = res.data.out_trade_no;
        state.buyPackageSuccess = res.success;
    },
    _GetECPackageInfo(state,res){
        state.orderDetail = res;
    },
};


const actions = {
    //找人代付  FindFriendPay.vue 获取用户金额和其他信息
    GetOrderInfoByOrderId({state,commit},pramas){ 
       return getData.GetOrderInfoByOrderId(pramas).then((res)=>{
             return commit('_GetOrderInfoByOrderId',res.data) 
        })
    },
    // 余额支付
    BalancePay({state,commit},pramas){ 
        getData.BalancePay(pramas).then((res)=>{
             return commit('_BalancePay',res) 
        })
    },
    // 判断余额是否足够支付
    GetCusBalance({state,commit},pramas){ 
        getData.GetCusBalance(pramas).then((res)=>{
             return commit('_GetCusBalance',res.data) 
        })
    },
    // 获取套餐商品列表
    GetContractPack({state,commit},pramas){ 
      return  getData.GetContractPack(pramas).then((res)=>{
            return commit('_GetContractPack',res.data) 
        })
    },
    // 获取套餐商品列表加载更多
    GetContractPackLoadMore({state,commit},pramas){ 
        return  getData.GetContractPack(pramas).then((res)=>{
              return commit('_GetContractPackLoadMore',res.data) 
          })
    },
    // 获取我的套餐列表
    GetMyPackageList({state,commit},pramas){ 
        return  getData.GetMyPackageList(pramas).then((res)=>{
              return commit('_GetMyPackageList',res.data) 
          })
    },
    // 获取我的套餐列表加载更多
    GetMyPackageListLoadMore({state,commit},pramas){ 
        return  getData.GetMyPackageList(pramas).then((res)=>{
              return commit('_GetMyPackageListLoadMore',res.data) 
          })
    },
    // 购买套餐
    BuyECPackage({state,commit},pramas){ 
        return  getData.BuyECPackage(pramas).then((res)=>{
              return commit('_BuyECPackage',res) 
          })
    },
    // 获取套餐详情
    GetECPackageInfo({state,commit},pramas){ 
        return  getData.GetECPackageInfo(pramas).then((res)=>{
              return commit('_GetECPackageInfo',res.data) 
          })
    },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

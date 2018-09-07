import   getData  from '../ajaxAPI/getData';
import axios from 'axios'


const state = {
 comfirList: [],  
 bankArr:[],//银行列表
 payMethodsIndex:undefined,//支付方式索引
 currentIndex:undefined,//优惠券索引
 recentBill:{},//最近使用发票
 companyList:[],// goCompany.vue 里的公司列表 数据
 couponList:"",//初始化优惠券列表
 checkCouponPrice:"",//选择后的优惠券金额
 orderId:"",//最终生成订单
 msg:'',//后台返回订单msg
 balanceMoney:'0.00',//余额
 couponNum:0, //新优惠券数量
 cusInvoice:'', //新发票
 coin:'' , //记账币返回数据
 AccountBalance:0, //余额数
 IsisBalacne:false, //余额是否可用
 payS:'',   //记账币或余额支付成功
 REQUEST_DATA_MYORDER_ONLOGIN_DATA:'',//helpFriendPay 页面的 
 LEAVE_MESSAGE_DATA:'',//代付留言
 actPriceObj:'', //最后结算金额返回对象
 DFCoin:'',  //代付记账币返回的数据
};


const mutations = {
  //代付获取记账币
  GET_COIN_BYORDERNUM(state,data){
    state.DFCoin = data;
  },
  //确认订单-最后结算金额
  SETTLEMENT(state,data){
    state.actPriceObj = data;
  },
  //发票和优惠券总数-初始化
 CUSINVOICE_AND_COUPON(state,data){
   state.couponNum = data.CouponCount
   state.cusInvoice = data.InvoiceModel
 },
 GET_COIN(state,data){
   state.coin = data;
 },
 PAYMETHODS_GOCOMPANY(state,data){
      // 支付方式 余额数据
        // Indicator.close(); 
        data.list.forEach((item,index)=>{
          if(item.Type==3){ //3为余额
           state.AccountBalance = data.list[index].AccountBalance
           state.IsisBalacne = data.list[index].IsisBalacne
          }
        })
  },
  BLANCE_COIN(state,data){
   //余额支付和记账币完全支付
  //  console.log(data,'家长比月')
     // state.companyList = data;
     state.payS = data.success;
 },
 REQUEST_COMPANYDATA_GOCOMPANY(state,data){
      //初始化 goComanpy 数据
        // Indicator.close(); 
        state.companyList = data;
  },
 REQUEST_BANK_GOCOMPANY_TEST(state,date){
     //银行列表
      // Indicator.close(); 
      //console.log(date ,"银行列表==测试" )
      state.bankArr = date.list;
  },
  REQUEST_BANK_GOCOMPANY(state,date){
     //银行列表
      // Indicator.close(); 
     //  //console.log(date ,"银行列表-==正式" )
      state.bankArr =  date.list;

  },
 ADDOREDITE_BILLDATA_COMFIRMORDER(state,data){
      //用户新增或者修改提交最近一次发票记录 返回存储本地
       state.recentBill = data;
        // Indicator.close();
        // Toast({
        //    message: '已保存', 
        //    duration: 300
        //  });  
  },
  RECENTLY_BILLDATA(state,data){
       //初始化 最近使用发票 
       state.recentBill = data;
      // //console.log("vuex2最近使用发票", data )

  },
  CCOUPON_COMFIRMORDER(state,data){
      // 初始化优惠券 
       state.couponList = data;
  },
  // ORDBTNPAY_REQUEST_BALANCE
   ORDBTNPAY(state,data){
      // 立即下单  ===从购物车购买
        state.msg = data;
      //保存生成订单
      state.orderId = data.data;


  },
  IMIDIATEFN(state,data){
      // 立即下单===从商品详情页面  立即购买下单
     // console.log("从商品详情页面立即下单",data);
      //保存生成订单
      state.orderId = data;
  },
  REQUEST_DATA_MYORDER_ONLOGIN(state, data) {
    // 我订单 不用初始化
    //保存生成订单
    // console.log( 'datadatadata',data)
    state.REQUEST_DATA_MYORDER_ONLOGIN_DATA = data;
  },
  LEAVE_MESSAGE(state, data) { 
    //代付留言
    // console.log( 'datadatadata',data)
    state.LEAVE_MESSAGE_DATA = data;
  },
}
const actions = {
  //代付留言 
  LEAVE_MESSAGE({ state, commit },params ) { 
    return getData.LEAVE_MESSAGE(params).then((res) => {
     return commit(LEAVE_MESSAGE, res.data);
    })
  },
  //代付或取记账币
  getCoinByOrderNum({state,commit},params){
    return getData.getCoinByOrderId(params).then(res=>{
      return commit(GET_COIN_BYORDERNUM,res.data)
    })
  },
  //确认订单-最后结算金额
  getSettlement({state,commit},params){
    return getData.Settlement(params).then(res=>{
      return commit(SETTLEMENT,res)
    })
  },
  REQUEST_DATA_MYORDER_ONLOGIN({ state, commit },params ) {
    
    return getData.REQUEST_DATA_MYORDER_ONLOGIN(params).then((res) => { 
     return commit(REQUEST_DATA_MYORDER_ONLOGIN, res.data);
    }).catch((error)=>{ 
      
    })
  },
 //发票和优惠券总数
 GetCusInvoceAndCoupon({state,commit},params){
   return getData.GetCusInvoceAndCoupon(params).then((res)=>{
     return commit(CUSINVOICE_AND_COUPON,res.data)
   },(err)=>{
     console.log('初始化发票优惠券报错')
   })
 },
 //所需记账币
 getCoin({state,commit},params){
   return getData.GetCoin(params).then(res=>{
     return commit(GET_COIN,res.data)
   },err=>{
     console.log('获取记账币失败')
   })
 },
 // 获取余额或余额是否可用-也有支付方式获取
 payMethods_comfirmorder({state,commit},params){ 
   return getData.PAYMETHODS_GOCOMPANY(params).then( (res)=>{
       return  commit(PAYMETHODS_GOCOMPANY, res.data);
     })  
 },  
 //记账币或余额支付
 balanceAndCoin({state,commit},params){
   return getData.BalancePay(params).then( (res)=>{
     return  commit(BLANCE_COIN, res);
   }) 
 },
 // 银行列表
request_bank_gocompany_test ({state,commit}){
   return  getData.REQUESTBANK_GOCOMPANY_TEST('get') //测试环境
     .then(({data})=>{
       // //console.log("银行",data)
          return  commit(REQUEST_BANK_GOCOMPANY_TEST, data);
     },(error)=>{
       // //console.log(error,"银行");
     });
 },
   // 银行列表
 request_bank_gocompany ({state,commit}){
   return  getData.REQUESTBANK_GOCOMPANY('get') //正式环境
     .then(({data})=>{
       // //console.log("银行",data)
          return  commit(REQUEST_BANK_GOCOMPANY, data);
     },(error)=>{
       // //console.log(error,"银行");
     });
 },
 //初始化公司列表
 request_data_goCompany({ state, commit, rootState },params) {
    
    return getData.REQUEST_COMPANYDATA_GOCOMPANY().then( (res)=>{
       return  commit(REQUEST_COMPANYDATA_GOCOMPANY, res.data);
     })  
 },
  //新增或者修改发票
 addorEdite_billdata_comfirmorder({ state, commit, rootState },params) {
   //  //console.log("addorEdite_billdata_comfirmorder",params)
     let dataObj =  params ;
     // //console.log(getData.ADDOREDITE_BILLDATA_COMFIRMORDER,"xxxxxxxxxxxxxxxxxxxxxxxx")
    return getData.ADDOREDITE_BILLDATA_COMFIRMORDER(dataObj).then( (res)=>{
      
      // //console.log(res)
       return    commit(ADDOREDITE_BILLDATA_COMFIRMORDER, res.data);
     },(error)=>{ 
     })  
 },
 //最近使用发票
 recently_billData({ state, commit, rootState },params) {   
    // //console.log("vuex 最近使用发票 " ,params)
     return getData.RECENTLY_BILLDATA(params).then( (res)=>{ 
       return    commit(RECENTLY_BILLDATA, res.data);
     },(error)=>{
           // //console.log("vuex 最近使用发票 报错了!!!")
     }); 

 },
 //初始化优惠券
  coupon_comfirmorder({ state, commit, rootState },params) {
     var dataObj ={
          params:params
     }
    return getData.CCOUPON_COMFIRMORDER(dataObj).then( (res)=>{
       return    commit(CCOUPON_COMFIRMORDER, res.data);
     },(error)=>{
      // //console.log("优惠券错误")
     })  
 },
 getBalance_comfirmorder(state){//余额
      return getData.ORDBTNPAY_REQUEST_BALANCE().then( (res)=>{ 
                 if(res.data == null){//表示没有余额 
                   state.state.balanceMoney = "0.00";   
                 }else{
                   state.state.balanceMoney = res.data.Balance;  
                 } 
             },(error)=>{
             //  //console.log("余额余额余额错误")
             });
 }, 
 //立即下单 -- 从购物车购买
 ordBtnPay({ state, commit, rootState },params) {
     var dataObj ={
          params:params
     }
    //  //console.log("下单下单下单下单下单下单下单下单下单下单下单下单" )
    return getData.ORDBTNPAY_COMFIRMORDER(dataObj).then( (res)=>{
//         //console.log("------------------------------------", res)
       return    commit(ORDBTNPAY, res);
     },(error)=>{
       console.log("立即下单下单错误",error)
      //  Toast({
      //    message: error.data.msg,
      //    position: 'middle',
      //    duration: 500
      //  });
       var obj = {};
       obj.msg = error.data.msg;
       obj.data = null;
       return    commit(ORDBTNPAY, obj);
       //
     })  
 },
 // 生成订单 == 从商品详情页面  立即购买下单
 imidiateFn({ state, commit, rootState },params) {
     var dataObj ={
          params:params
     }
    // //console.log(" " )
    return getData.ORDBTNPAY_IMIDIATEFN_COMFIRMORDER(dataObj).then( (res)=>{
    // //console.log("------------------------------------", res.data)
       return    commit(IMIDIATEFN, res.data);
     })
     .catch((error)=>{
       //console.log("生成订单错误",error);
      //  Toast({
      //    message: error.data.msg,
      //    position: 'middle',
      //    duration: 500
      //  });
       // return    commit(IMIDIATEFN, error);
     
       
       
     })
 },
}





const getters = {
   hehe(){
     return 1
   },
   _balanceMoney :state =>{ 
     return  state.balanceMoney
   }

}



export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}

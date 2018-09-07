<style lang="less" scoped>
@import './MyPackage.less';
</style>
<template>
    <div>
        <div id="ConfirmOrder" class="routerView-44px">
            <headerCom :titleScoped="'确认订单'"></headerCom>
            <div class="outside">
                <!-- 详情 -->
                <div class="orderWrap">
                    <!-- .toFixed(2) -->
                    <!-- <div>{{_GetECPackageInfo_.Amount}}</div> -->
                    <div class="price"><span>¥</span>{{price}}</div>
                    <div class="orderOrder">
                        <span>订单编号：</span>
                        <span>{{orderNum}}</span>
                    </div>
                    <div class="orderDetail">
                        <span>商品信息：</span>
                        <span>{{arrInfo.Title}}</span>
                    </div>
                    <div class="orderNum">
                        <span>数量：</span>
                        <span>{{arrInfo.Num}}</span>
                    </div> 
                </div>
                <!-- 支付方式 -->
                <div class="paymentWrap">
                    <div class="payment">
                        <span></span>
                        <span>支付方式</span>
                    </div>
                    <div class="paymentMethod" v-for="(items,index) in methodsArr" :key="index" @click.stop.prevent="choseMethods(items,index)">
                        <i></i>
                        <span>{{items}}</span>
                        <!-- noEn:index == 1 -->
                        <span :class="{isSelect:index == currentTab,noSelect:!(index == currentTab),noEn:index == 1 && BalanceNoMoney }" id="select"></span>
                        <span class="noEnought" v-if="index == 1 && BalanceNoMoney">可用余额不足</span>
                    </div>
                </div>
                <!-- 支付按钮 -->
                <div class="payMoney" @click.stop.prevent = "submitMoney(payMethods)">使用{{payMethods}}¥{{price}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import getData from "@vuex/ajaxAPI/getData";
import { mapActions, mapGetters,mapState,mapMutations } from "vuex";
import {getSession} from '@util/sessionStorage.js'
import tool from "@util/tool";
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            methodsArr:["微信支付","账户余额支付","找人代付"],
            check:0,
            payMethods:"微信支付",
            currentTab : '0',
            BalanceNoMoney:false,
            balance:"",
            orderNum:"",
            arrInfo:[],
            price:"",
        }
    },
    mounted(){
        this.orderNum = this.$route.query.orderNo;
        this.price = this.$route.query.price
        // console.log("this.orderNum",this.orderNum);
        let data = {
            orderNum:this.orderNum
        }
        this.GetECPackageInfo(data).then(() => {    
            // console.log("_GetECPackageInfo_",this._GetECPackageInfo_)
            this.arrInfo = this._GetECPackageInfo_.OrderDetails[0];
            // console.log("this.arrInfo",this.arrInfo)
        })
        // 判断余额是否足够支付
        let params = {
            Id:getSession("_info").Id,
        }
        getData.GetCusBalance(params).then((res) => {
            this.balance = res.data.Balance;
            if(this.balance < "1200"){
                this.BalanceNoMoney = true;
            }

        })
    },
    computed: {
        ...mapState("myPackage", ["balanceSuccess","userBanlance"]),
        ...mapGetters("myPackage", ["_BalancePay_","_GetCusBalance_","_GetECPackageInfo_"]),
    },
    methods:{
        ...mapActions("myPackage", {
            BalancePay:"BalancePay",
            GetOrderInfoByOrderId:"GetOrderInfoByOrderId",
            GetCusBalance:"GetCusBalance",
            GetECPackageInfo:"GetECPackageInfo",
        }),
        ...mapMutations("myPackage", {
            _BalancePay: "_BalancePay",
            _GetCusBalance:"_GetCusBalance",
        }),
        choseMethods(val,i){
            if(this.BalanceNoMoney && i == 1){
                return;
            }else{
                this.payMethods = val;
            }
            this.currentTab = i;
        },
        submitMoney(val){
            // console.log(val);
            switch(val){
                case "微信支付":
                // let out_trade_no = "1532051193095377";
                window.location.href = `https://api.wqbol.com/Payment/ProductsJson?out_trade_no=${this.orderNum}`;
                break;
                case "账户余额支付":
                let params = {
                    // orderNo:"1531979974188515",
                    orderNo:this.orderNum,
                    // cid:"25AF8A58-8CA7-448D-854F-62C51A0DD1FE",
                }
                this.BalancePay(params).then((res) => {
                    // console.log("vue",this._BalancePay,this.balanceSuccess,this._BalancePay_);
                    if(this._BalancePay){
                        if(this.$route.query.value == "home"){
                            setTimeout(() => {
                                this.$router.push({path:"/myPackage/myPackage",query:{value:"home"}});
                            },1000)
                        }else if(this.$route.query.name == "user"){
                             setTimeout(() => {
                                this.$router.push({path:"/myPackage/myPackage",query:{name:"user"}});
                             },1000)
                           
                        }
                        this.$vux.toast.text('支付成功', 'middle');
                    }
                })  
                break;
                case "找人代付":
                    // console.log(this._GetECPackageInfo_)
                    this.$router.push({
                        "path":'/myPackage/FindFriendPay',
                        "query":{
                            "orderNum":this._GetECPackageInfo_.OrderNumber,
                        }
                    })
                break;
            }
        },
        closeWechatPay(){

        }
    },
    filters:{
        formatPrice(value) {
            return tool.formatPrice(value);
        },
        currency: value => {
            return tool.currency(value);
        },
        formatPriceX: value => {
            return tool.formatPriceX(value);
        },
    }
}
</script>

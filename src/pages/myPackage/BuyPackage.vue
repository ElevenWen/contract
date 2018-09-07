<style lang="less" scoped>
@import './MyPackage.less';
</style>
<template>
<div>
    <div id="BuyPackage">
        <headerCom :titleScoped="'购买套餐'"></headerCom>
        <!-- <div class="outside"> -->  
            <div class="wrapper" ref="wrapper" v-show="noPackage">
                <div class="content">
                    <div class="packageWrap" v-for="(items,index) in _GetContractPack_.list" :key="index" id="packageWrap"> 
                        <div class="transparent1"></div>
                        <div class="transparent2"></div>
                        <div class="package">
                            <div class="packageTitle">
                                <span>{{items.Title}}</span>
                                <span>¥{{items.Price | formatPrice}} <b style="marginLeft:-0.1rem;">{{items.Price | formatPriceX}}</b></span>
                            </div>
                            <div class="packageContent">
                                <div class="first">
                                    <span>文件份数</span>
                                    <span> {{items.UseFiles==0?"不限":items.Files+"份"}}</span>
                                </div>
                                <div class="second">
                                    <span>模板使用</span>
                                    <!-- <span>免费</span> -->
                                    <span>{{items.TemplateDec}}</span>
                                </div>
                                <div class="third">
                                    <span>有效期</span>
                                    <span>{{items.TermValidity==0?"长期有效":items.Days+"天"}}</span>
                                </div>
                            </div> 
                            <div class="buyNow" @click.stop.prevent="aaaa(items)">立即购买</div>
                        </div>
                    </div>
                    <!-- 没有更多套餐了 -->
                    <div class="noMore" v-show="hasData=='没有更多套餐了哦~'">{{hasData}}</div>
                </div>
            </div>
        <!-- </div> -->
        <!-- 没有套餐时 -->
        <div class="height100" v-show="!noPackage">
            <nothing-data :dataSoped = "buyPackageInfo"></nothing-data>
        </div>
    </div>
</div>
</template>
<script>
import BScroll from 'better-scroll';
import { mapActions, mapGetters,mapState,mapMutations } from "vuex";
import {getSession} from '@util/sessionStorage.js';
import getData from "@vuex/ajaxAPI/getData";
import tool from "@util/tool";
export default {
    data(){
        return {
            buyPackageInfo:{
                text:"暂时没有可购买套餐喔",
                img:require('../../assets/images/commonImage/vacancy@3x.png')
            },
            noPackage:true,
            pageIndex:1,
            pageSize:10,
            hasData:true,
        }
    },
    computed: {
        ...mapGetters("myPackage", ["_GetContractPack_","_BuyECPackage_","buySuccess"]),
    },
    mounted(){
        let params = {
            params:{
                pageIndex:1,
                pageSize:10
            }
        }
        this.GetContractPack(params).then(() => {
            // console.log("vue1",this._GetContractPack_);
            if(!this._GetContractPack_.list || this._GetContractPack_.list.length == 0 ){
                this.noPackage = false;
                return;
            }else if(this._GetContractPack_.list.length <= 3){
                this.hasData = "没有更多套餐了哦~";
            }else{
                 this.hasData = true;
            }
            this.$nextTick(() => {
                //$refs绑定元素
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.wrapper, {
                        //开启点击事件 默认为false
                        probeType: this.probeType,
                        click: true,
                        scrollX: this.scrollX,
                        pullUpLoad: {
                            //上拉加载 阀值
                            threshold: -20
                        },
                        pullDownRefresh: {
                            //下拉刷新 阀值
                            threshold: -20,
                            // stop: 10 
                        },
                    })
                    // console.log("++++++++++++++",this.scroll);
                    this.scroll.on('scroll', (pos) => {
                        // 下拉动作
                        if (pos.y > 0) {
                            // this.infinite();
                            let a =  document.getElementById("packageWrap");
                            a.className = "packageWrapper";
                            // console.log("a1",a)
                        }
                    })
                    this.scroll.on("pullingDown", () => {
                        // 下拉动作
                        setTimeout(() => {
                        this.infinite().then(() => {
                            this.scroll.refresh();
                            this.scroll.finishPullDown();
                            // this.$vux.toast.text("刷新成功", "middle");
                        });
                        }, 750);
                    });
                    this.scroll.on("pullingUp", () => {
                        //上拉加载 请求后台数据
                        if (this.hasData) {
                            this.timeId = setTimeout(() => {
                            this.infinite()
                            .then(() => {
                                this.scroll.finishPullUp();
                                this.scroll.refresh();
                            });
                            }, 500);
                        }else {
                            this.hasData = "没有更多套餐了哦~";
                            // this.hasData = false;
                            // this.$vux.toast.text("没有更多套餐了哦~", "middle");
                        }
                    });
                }else{
                this.scroll.refresh()
                }
            })
        })
    },
    methods:{
        ...mapActions("myPackage", {
            GetContractPack:"GetContractPack",
            GetContractPackLoadMore:"GetContractPackLoadMore",
            BuyECPackage:"BuyECPackage",
        }),
        aaaa(val){
            // console.log(val);
            let params = {
                id:val.Id,
                customerId:getSession("_info").Id,
                // customerId:"17f0ca06-05d9-44e8-bcb0-c3d514900d23",
                amount:val.Price,
                oldAmount:val.Price,
                payType:1,
                orderSource:1,
            }
            this.BuyECPackage(params).then(() => {
                // console.log(this._BuyECPackage_,this.buySuccess)
                if(this.buySuccess){
                    if(val.Price == 0 && val.ChargeStandard == 0){
                        this.$vux.toast.text("购买成功", "middel");
                        if(this.$route.query.value == "home"){
                            this.$router.push({path:"/myPackage/MyPackage",query:{value:"home"}});
                        }else if(this.$route.query.name == "user"){
                            this.$router.push({path:"/myPackage/MyPackage",query:{name:"user"}});
                        }
                        
                    }else{
                        if(this.$route.query.value == "home"){
                            this.$router.push({path:"/myPackage/ConfirmOrder",query:{orderNo:this._BuyECPackage_,price:val.Price,value:"home"}});
                        }else if(this.$route.query.name == "user"){
                            this.$router.push({path:"/myPackage/ConfirmOrder",query:{orderNo:this._BuyECPackage_,price:val.Price,name:"user"}});
                        }
                        
                    }   
                }
            })
        },
        infinite(){
            this.pageIndex =+ this.pageIndex + 1;
            // console.log("nowPage",this.pageIndex)
            let params = {
                params:{
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize,
                }
            }
            return this.GetContractPackLoadMore(params).then(() => {
                // console.log("vue2",this._GetContractPack_);
                if(this._GetContractPack_.list.length >= this._GetContractPack_.recordCount){
                    this.hasData = "没有更多套餐了哦~";
                    // this.hasData = false;
                    // this.$vux.toast.text("没有更多套餐了哦~", "middle");
                    // console.log("没有更多套餐了哦~");
                }else{
                    this.hasData = true;
                }
            })
        },
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

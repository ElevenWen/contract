<style lang="less" scoped>
@import './MyPackage.less';
// .routerView-44px{
// 	height: calc(100% - 1.32rem)!important;
// }
</style>
<template>
<div>
    <div id="MyPackage">
        <headerCom :titleScoped="'我的套餐'"></headerCom>
        <!-- <div class="outside" > -->
            <div class="wrapper" ref="wrapper" v-if="noPackage">
                <div class="content">
                    <div class="packageWrap" v-for="(items,index) in _GetMyPackageList_.list" :key="index" id="packageWrap"> 
                        <div class="transparent1"></div>
                        <div class="transparent2"></div>
                        <div class="package">
                            <div class="packageTitle">{{items.Title}}</div>
                            <span class="invaildImg" v-if="items.State == 0"></span>
                            <div class="packageContent">
                                <div class="first">
                                    <span>文件份数</span>
                                    <span v-if="items.UseFiles == 0">不限</span>
                                    <span v-else>剩 <span class="num">{{items.AvailableFiles}}</span> 份 / 共 {{items.Files}} 份</span>
                                </div>
                                <div class="second">
                                    <span>模板使用</span>
                                    <!-- <span>{{items.ChargeStandard==0?"免费":"收费"}}</span> -->
                                    <!-- <span>免费</span> -->
                                    <span>{{items.TemplateDec}}</span>
                                </div>
                                <div class="third">
                                    <span>有效期至</span>
                                    <!-- <span>{{"/Date(1532518515490)/".replace(/\D/g, "") | formatDateFn}}</span> -->
                                    <span>{{items.ExpireTime}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 没有更多套餐了 -->
                    <div class="noMore" v-show="hasData=='没有更多套餐了哦~'">{{hasData}}</div>
                </div>
            </div>
            <!-- 购买更多 -->
            <div class="buyMore" @click="buyMore">购买更多套餐</div>
        <!-- </div> -->
        <!-- 没有套餐时 -->
        <div class="height100" v-if="!noPackage">
            <nothing-data :dataSoped = "myPackageInfo"></nothing-data>
        </div>
    </div>
</div>
</template>
<script>
import BScroll from 'better-scroll';
import { mapActions, mapGetters,mapState,mapMutations } from "vuex";
import {getSession} from '@util/sessionStorage.js';
import tool from "@util/tool";
export default {
    data(){
        return {
            arr:[],
            myPackageInfo:{
                text:"暂时没有可购买套餐喔",
                img:require('../../assets/images/commonImage/vacancy@3x.png')
            },
            noPackage:true,
            pageIndex:1,
            pageSize:10,
            hasData:true,

        }
    },
    created(){
        let params = {
            params:{
                Id : getSession("_info").Id,
                // Id:"17f0ca06-05d9-44e8-bcb0-c3d514900d23",
                pageIndex:1,
                pageSize:10
            }
        }
        this.GetMyPackageList(params).then(() => {
            console.log("11111111111")
            if(!this._GetMyPackageList_.list || this._GetMyPackageList_.list.length == 0 ){
                this.noPackage = false;
                return;
            }else if(this._GetMyPackageList_.list.length <= 3){
                this.hasData = "没有更多套餐了哦~";
            }else{
                this.hasData = true;
                console.log("2222222")
            }
            // console.log("vue",this._GetMyPackageList_);
            this.$nextTick(() => {
                //$refs绑定元素
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.wrapper, {
                        //开启点击事件 默认为false
                        probeType: this.probeType,
                        click: this.click,
                        scrollX: this.scrollX,
                        pullDownRefresh: {
                            //下拉刷新 阀值
                            // threshold: -20,
                            threshold: 20,
                            // stop: 10 
                        },
                        pullUpLoad: {
                            //上拉加载 阀值
                            threshold: -20
                        }
                    })
                    // console.log(this.scroll);
                    this.scroll.on('scroll', (pos) => {
                        // 下拉动作
                        if (pos.y > 0 ) {
                            // this.infinite()
                            let a =  document.getElementById("packageWrap");
                            a.className = "packageWrapper";
                            // console.log("a1",a)
                        }
                    })
                    this.scroll.on("pullingDown", () => {
                        // 下拉动作
                        setTimeout(() => {
                        this.refresh()
                        // .then(() => {
                            this.scroll.refresh();
                            this.scroll.finishPullDown();
                            // this.$vux.toast.text("刷新成功", "middle");
                        // });
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
                        }
                    });
                }
                else{
                    this.scroll.refresh()
                }
            })
        })
    },
    computed: {
        ...mapGetters("myPackage", ["_GetMyPackageList_"]),
    },
    methods:{
        ...mapActions("myPackage", {
            GetMyPackageList:"GetMyPackageList",
            GetMyPackageListLoadMore:"GetMyPackageListLoadMore",
        }),
        refresh(){
            this.pageIndex = 1;
            console.log("this.pageIndex",this.pageIndex)
            let params = {
                params:{
                    Id : getSession("_info").Id,
                    // Id : "17f0ca06-05d9-44e8-bcb0-c3d514900d23",
                    pageIndex:1,
                    pageSize:this.pageSize
                }
            }
            return this.GetMyPackageList(params).then(() => {
                // console.log()
                if(this._GetMyPackageList_.list.length >= this._GetMyPackageList_.recordCount){
                    this.hasData = "没有更多套餐了哦~";
                }else{
                    this.hasData = true;
                }
            })
        },
        infinite(){
            this.pageIndex++;
            let params = {
                params:{
                    Id : getSession("_info").Id,
                    // Id : "17f0ca06-05d9-44e8-bcb0-c3d514900d23",
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize
                }
            }
            return this.GetMyPackageListLoadMore(params).then(() => {
                // console.log()
                if(this._GetMyPackageList_.list.length >= this._GetMyPackageList_.recordCount){
                    this.hasData = "没有更多套餐了哦~";
                }else{
                    this.hasData = true;
                }
            })
        },
       buyMore(){
           if(this.$route.query.value == "home"){
               this.$router.push({path:"/myPackage/BuyPackage",query:{value:"home"}});
           }else if(this.$route.query.name == "user"){
               this.$router.push({path:"/myPackage/BuyPackage",query:{name:"user"}});
           }
       },
    },
    filters: {
        formatDateFn(value) {
            return tool.formatDate(value, "yyyy-MM-dd");
        }
    }
}
</script>

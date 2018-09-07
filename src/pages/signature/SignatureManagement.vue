<template>
   <div>
        <div id="SignatureManagement" class="routerView-44px"> 
        <router-view  id="dddddddddddd"></router-view>
        <headerCom :titleScoped="'签章管理'" > 
            <div class="Signature"  slot="SignatureManagement">
                <div class="tab" > 
                    <ul>
                        <li v-for="(item,index) in TabList" :key="index" @click="getList(index,0)" :class="{active:index==indexTag}"><span>{{item}}</span></li>
                    </ul>
                </div> 
            </div>    
        </headerCom>
        <div class="Signature sig" ref="sig">
            <div class="container">
                <ul v-if="finalList.data != undefined && finalList.data.recordCount">
                    <li v-for="(item,index) in finalList.data.list" :key="index">
                        <div v-if="item.Type == 0">
                            <p class="personP">个人签章</p>
                            <h3>{{item.TrueName}}</h3>
                            <p class="personTag">
                                <span>个人</span>
                                <span v-if="item.ReviewState == 2" class="loseR" @click="openModel(item.ReviewFeedback)">失败原因<i><img src="../../assets/images/causeOfFailure@3x.png" alt=""></i></span>
                            </p>
                            <span class="modifyP" v-if="item.ReviewState == 2" @click="modifyP(item.Id)">修改</span>
                        </div>
                        <div v-if="item.Type == 1">
                            <p class="companyP">{{item.CompanyName}}</p>
                            <div class="imgBox">
                                <img src="../../assets/images/zhang@3x.png" alt="">
                            </div>
                            <p class="companyTag">
                                <span class="tag">企业</span>
                                <span v-if="item.ReviewState == 2" class="loseR companyR" @click="openModel(item.ReviewFeedback)">失败原因<i><img src="../../assets/images/causeOfFailure@3x.png" alt=""></i></span>
                                <span class="modify" v-if="item.ReviewState == 2 || item.ReviewState == 1" @click="modify(item.Id,item.ReviewState)">修改</span>
                            </p>
                        </div>
                    </li>
                    
                </ul>
                <div v-else  class="height100">
                    <NothingData :dataSoped="dataSoped"></NothingData>
                </div>
            </div>
        </div>
        <div class="bnt" @click="add">
            <span>
                添加签章
            </span>
        </div>
        <div class="loseModel" v-show="notice">
            <div>
                <h3>提示</h3>
                <p>
                    一个账户最多只能添加1个个人签章和5个企业签章
                </p>
                <span @click="closeNotice">知道了</span>
            </div>
        </div>
        <!-- 分界 -->
        <div class="loseModel" v-show="model">
            <div>
                <h3>失败详情</h3>
                <p>
                    {{text}}
                </p>
                <span @click="closeModel">知道了</span>
            </div>
        </div>
        <div class="choiceModel" v-show="choiceModel">
            <div>
                <div class="top">
                    <h4>请选择创建类型</h4>
                    <p @click="goCompany">创建企业签章</p>
                    <p @click="goPersonal">创建个人签章</p>
                </div>
                <div class="bottom" @click="closeChoice">
                    取消
                </div>
            </div>
        </div>
    </div>
   </div>
</template>

<script>
import {mapActions,mapState} from 'vuex';
import {getSession , setSession} from '../../util/sessionStorage.js'
    export default {
        data(){
            return{
                TabList:['可用签章','审核中','已驳回'],
                indexTag: 1, //tab切换index标志
                model: false, //失败详情弹窗
                choiceModel: false, //创建签章选择弹窗
                text: '', //失败原因
                dataIndex: 0, //请求数据的index
                addLength: 0, //可添加的数量
                arr1: [], //可添加的个人签章数
                arr2: [], //可添加的企业签章数
                notice: false, //签章提示
                dataSoped: { //传去空白页的数据
                    text:'',
                    img: require('../../assets/images/commonImage/vacancy@3x.png')
                }, 
                finalList: {
                    data: {
                        list: [],
                        recordCount: 0
                    }
                }, //最终渲染的列表
            }
        },
        computed:{
            ...mapState(
                'signature',['SignatureList']
            )
        },
        created(){
            // alert('shoudo手动返回')
            // console.log('版本',navigator.userAgent.toLowerCase().match(/cpu iphone os (\d+)\_(\d+) like/)[1])
            // let version = navigator.userAgent.toLowerCase().match(/cpu iphone os (\d+)\_(\d+) like/)[1]
            // if(version < 11){
            //     this.$refs.sig.setAttribute('padding-top', "140px")
            // }
            //从个人身份图片上传回当前页
            setSession('_idCard','')
            setSession('_face','')
            setSession('_back','')
            setSession('backImg','')
            setSession('faceImg','')
            setSession('_newTag','')
            // window.sessionStorage.removeItem("_tag1");
            // sessionStorage.removeItem("_tag2");
            setSession('_tag1','')
            setSession('_tag2','')
            if(window.location.href.indexOf("tag") != -1){
                this.$vux.toast.text('认证失败，请重新再试','middle')
                this.getList(2,0)
            }else if(window.location.href.indexOf("id") != -1){
                this.getList(1,1)
            }else if(window.location.href.indexOf("tt") != -1){
                this.getList(2,0)
            }
        },
        methods:{
            ...mapActions(
                'signature',{
                    'getCustomerSignatureList':'getCustomerSignatureList'
                }
            ),
            //签章列表
            getList(index,tag){ 
                if(tag){
                     this.indexTag = 0;
                     this.dataIndex = '';
                     this.dataSoped.text = '暂时没有可用的签章哦~'
                }else{
                    this.indexTag = index;
                    if(index == 0){
                        this.dataIndex = 1;
                        this.dataSoped.text = '暂时没有可用的签章哦~'
                    }else if(index == 1){
                        this.dataIndex = 0;
                        this.dataSoped.text = '暂时没有审核中的签章哦~'
                    }else if(index == 2){
                        this.dataIndex = 2;
                        this.dataSoped.text = '暂时没有已驳回的签章哦~'
                    }
                }
                let params = {
                     "Id": getSession('_info').Id,
                     "State": this.dataIndex
                }
                this.getCustomerSignatureList(params).then(res=>{
                    if(tag){
                        this.addLength = this.SignatureList.data.recordCount
                        let arr = this.SignatureList.data.list
                        for (let i = 0; i < arr.length; i++) {
                            if(arr[i].Type == 0){
                                this.arr1.length ++
                            }else if(arr[i].Type == 1){
                                this.arr2.length ++
                            }
                            if(arr[i].ReviewState == 1){
                                this.finalList.data.list.push(arr[i]) 
                            }
                            this.finalList.data.recordCount = this.finalList.data.list.length
                        }
                    }else{
                        this.finalList= this.SignatureList;
                    }
                })
            },
            //去企业签章页
            goCompany(){
                this.$router.push('/Signature/CompanyVertify')
                this.choiceModel = false;
            },
            //去个人签章页
            goPersonal(){
                this.$router.push('/Signature/PersonalVertify')
                this.choiceModel = false;
            },
            closeModel(){ //关闭弹窗
                this.model = false;
            },
            openModel(text){ //打开失败原因弹窗
                this.model = true;
                this.text = text;
            },
            closeChoice(){ //关选择签章弹窗
                this.choiceModel = false;
            },
            add(){ //添加签章
                if(this.addLength < 6 && this.arr2.length <5 && this.arr1.length == 0){
                    this.choiceModel = true;
                }else if(this.addLength < 6 && this.arr2.length <5 && this.arr1.length == 1){
                    this.$router.push('/Signature/CompanyVertify')
                }else if(this.addLength < 6 && this.arr2.length == 5 && this.arr1.length < 1){
                    this.$router.push('/Signature/PersonalVertify')
                }else if(this.addLength >= 6){
                    this.notice = true
                }
            },
            closeNotice(){ //关闭签章弹窗
                this.notice = false;
            },
            modify(id,state){
                this.$router.push(`/Signature/CompanyVertify?Id=${id}`)
                if(state == 2){
                    setSession('companyTag',true)
                }
            },
            modifyP(id){
                this.$router.push(`/Signature/PersonalVertify?Id=${id}`)
            }
        },
    }
</script>

<style lang="less" scoped>
    @import './Signature.less';

</style>


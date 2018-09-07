<!-- 合同 管理 集中区 -->
<template   >  
<div>
    <div id="ContractStateManagement" class="height100" > 
        <HeaderCom  :titleScoped="'合同管理'"   :from="from"> 
          <!-- <slot name="ContractStateManagement">  --> 
             <!-- 合同管理tab选项卡 -->
            <div class="tabStateWrap " slot="ContractStateManagement">
              <ul class="tabState">
                <li  @click="  tabStateClickFn(item)"  v-for='(item,index) in stateTabData' :key="index"> 
                  <span :class="{'active':changeTabComponent == item.name }">{{item.nameZH}}</span>
                </li>
              </ul>
            </div> 
          <!-- </slot> -->
        </HeaderCom>
  
       <!-- 合同管理tab内容 -->  
       
       <div class="fixedTop228T  fixedBottom"  >  
         
            <!-- <component   
              v-bind:is="currentTabComponent"
              class="wrapper"  
              :ref ="this.$route.query.Name"
              style="height:100%"
              :class="{  'contentNodataStyle':contentNodataStyle}"
              :pulldowntext="pulldowntext[this.$route.query.Name]"
              :pullUptext="pullUptext[this.$route.query.Name]"
            >  
            </component>  -->
 
          <div  class="ComponentWrap" v-show=" changeTabComponent  == 'WaitForMe'" style="height: 100%;">  
            <WaitForMe  
              class="wrapper"   
              ref ="WaitForMe"  
              style="height:100%"
              :class="{  'contentNodataStyle':contentNodataStyle}" 
              :pulldowntext="pulldowntext['WaitForMe']"
              :pullUptext="pullUptext['WaitForMe']"
             
            >
               待我签署
            </WaitForMe>
          </div>
            
          <div  class="ComponentWrap" v-show=" changeTabComponent  == 'WaitForThey'"  style="height: 100%;">
             <WaitForThey   
              class="wrapper"   
              ref ="WaitForThey"  
              style="height:100%"
              :class="{  'contentNodataStyle':contentNodataStyle}" 
              :pulldowntext="pulldowntext['WaitForThey']"
              :pullUptext="pullUptext['WaitForThey']"
              v-show=" changeTabComponent  == 'WaitForThey'"  
            >
              待我签署 
            </WaitForThey>
          </div>
          
          <div  class="ComponentWrap" v-show=" changeTabComponent  == 'CompleteContract'"   style="height: 100%;">
             <CompleteContract 
              class="wrapper"   
              ref ="CompleteContract"  
              style="height:100%"
              :class="{  'contentNodataStyle':contentNodataStyle}" 
              :pulldowntext="pulldowntext['CompleteContract']"
              :pullUptext="pullUptext['CompleteContract']"
              v-show=" changeTabComponent  == 'CompleteContract'"  
            >
              已完成
            </CompleteContract> 
          </div>

          <div  class="ComponentWrap" v-show=" changeTabComponent  == 'AllContract'"  style="height: 100%;">
              <AllContract 
              class="wrapper"   
              ref ="AllContract"  
              style="height:100%"
              :class="{  'contentNodataStyle':contentNodataStyle}" 
              :pulldowntext="pulldowntext['AllContract']"
              :pullUptext="pullUptext['AllContract']"
              v-show=" changeTabComponent  == 'AllContract'"   
            >全部
            </AllContract>  
          </div>
          
       </div> 
         
    </div>

    <!-- <div id="more" v-show="more">加载中...  {{xiala}}</div>  -->
    <footer-nav></footer-nav>

 </div>



</template>


<script>
import BScroll from "better-scroll";
import { getStyle } from "@util/tool.js";

import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { getSession, setSession } from "@util/storage";
import WaitForMe from "./WaitForMe.vue";
import WaitForThey from "./WaitForThey.vue";
import CompleteContract from "./CompleteContract.vue";
import AllContract from "./AllContract.vue";
import { setTimeout, clearTimeout } from "timers";

var timeId = null;
var pulldownTime = null;
export default {
  name: "ContractStateManagement",
  components: { WaitForMe, WaitForThey, CompleteContract, AllContract },
  data() {
    return {
      xiala:'',
      more:false,
      from: false, //来自 子组件WaitForMe  WaitForThey CompleteContract AllContract
      stateTabData: [
        //  签署状态（0.草稿、1.待签署、2.已完成、3.已拒签、4.已撤销
        {
          name: "WaitForMe",
          nameZH: "待我签",
          tabComponentName: "WaitForMeData",
          SignedState: "1"
        },
        {
          name: "WaitForThey",
          nameZH: "待他签",
          tabComponentName: "WaitForTheyData",
          SignedState: "1"
        },
        {
          name: "CompleteContract",
          nameZH: "已完成",
          tabComponentName: "CompleteContractData",
          SignedState: "2"
        },
        {
          name: "AllContract",
          nameZH: "全部",
          tabComponentName: "AllContractData",
          SignedState: ""
        }
      ],
      changeTabComponent: this.$route.query.Name || "WaitForMe",
      currentTabIndex: "0",
      pulldowntext: {
        WaitForMe: false,
        WaitForThey: false,
        CompleteContract: false,
        AllContract: false
      }, //下拉刷新
      pullUptext: {
        WaitForMe: false,
        WaitForThey: false,
        CompleteContract: false,
        AllContract: false
      }, // 上拉加载更多
      getinvoiceList: {
        list: ["1", "2"],
        recordCount: 2
      },
      hasData: true,
      pageIndex: {
        WaitForMe: 1,
        WaitForThey: 1,
        CompleteContract: 1,
        AllContract: 1
      }, //默认第一页
      scroll: {
        WaitForMe: "",
        WaitForThey: "",
        CompleteContract: "",
        AllContract: ""
      },
      tabStateClickDelay: true
    };
  },
  computed: {
    ...mapGetters("contractStateManagement", ["_AllContractData"]),
    ...mapState("contractStateManagement", [
      "GetContractListData",
      "childrenScopedStyle",
      "contentNodataStyle",
      'text'
    ]),
    //tab选项卡内容
    currentTabComponent() {
      return this.changeTabComponent;
    }
  },
  beforeRouteEnter(to, from, next) {
    // 判斷是否為iframe
    if (top.location.href != self.location.href) {
      top.location.href = location.href;
    }
    next(vm => {
      //进入该页面本地存储  以便后期go(-1)
      if (from.path == "/" || from.path == "/userCenter/UserCenter") {
        vm.from = from.path; //定向路由处理
        //本地
        setSession("go", from.path);
      } else {
        vm.from = getSession("go", from.path);
      }
    });
  },
  created() {
    //初始化数据
    let queryName = this.$route.query.Name;
    //his.formSigner 格式化数据   this.init初始化数据
    this.init(this.formSigner(), "").then(() => {
      this.initScroll(this.formSigner(), "")
       this.tabStateClickDelay = false;
    });
  },
  mounted() {},
  methods: {
    ...mapActions("contractStateManagement", [
      "GetContractList",
      "xialaGetContractList",
      
    ]),
    ...mapMutations("contractStateManagement", [
      "_clearGetContractListData",
      "_GetContractList"
    ]),
    formSigner(
      signer = this.$route.query.Name,
      classId = this.$route.query.Name
    ) {
      // 格式化数据
      var _SignedState = null;
      var _signer = null;
      if (signer == "WaitForMe") {
        _signer = "0";
        _SignedState = "1";
      } else if (signer == "WaitForThey") {
        _signer = "1";
        _SignedState = "1";
      } else if (signer == "CompleteContract") {
        _signer = "";
        _SignedState = "2";
      } else {
        //获取全部
        _SignedState = "";
        _signer = "";
      }
      return {
        signer: _signer,
        SignedState: _SignedState,
        classId: classId //切换的tab选项卡 以及better 的classId
      };
    },
    init(signer, flag) {
      /*
      * 此处需要动态获取 query的参数, 带联调
      * signer 表示路由参数
      * flag 表示是上拉加载还是下拉刷新
      * */

      let params = {
        params: {
          Id: getSession("_info").Id, // 用户Id 	 string 	 不可
          keyword: "", // 	 合同名称 	 string 	 可
          State: "", //  合同状态（0.未生效 1.有效 2.无效） 	 string 	 可
          SignedState: signer.SignedState, //  签署状态（0.草稿、1.待签署、2.已完成、3.已拒签、4.已撤销
          signer: signer.signer, //签署人（只用于待签署状态 0.待我签 1.待他签）
          pageIndex: this.pageIndex[signer.classId], //, 页数(不填默认查出所有） 	 int 	 可
          pageSize: 5
        }
      };
      console.log('inti',params)
      return this.GetContractList({ params, flag }); // vuex 数据交互
    },

    initScroll(signer, flag) {
      // signer better  scroll插件的id, flag 是否上拉加载
    console.log( signer , signer.classId)
      if (!this.scroll[signer.classId] && !this.$refs[signer.classId].$el) {
        return false;
      }
      this.scroll[signer.classId] = new BScroll(
        this.$refs[signer.classId].$el,
        {
          click: true,
          pullDownRefresh: {
            //下拉刷新 阀值
            threshold: 30,
            stop: 30
          },
          pullUpLoad: {
            //上拉加载 阀值
            threshold: -40
            //------------------------------------------------
          },
          // maxScrollY:-300,
          probeType: 3,
           
        }
      );
    
    
    //  this.scroll[signer.classId].on('scrollStart', (pos) => {
    //     // console.log('scrollStart' , pos)
    //        this.scroll[signer.classId].refresh();
    //                               this.scroll[signer.classId].finishPullUp()
    //                               this.scroll[signer.classId].finishPullDown();


    //   })


            var cc = null
   //滚动停止后
    this.scroll[signer.classId].on('scrollEnd', (pos) => {
       
          this.scroll[signer.classId].refresh();
          this.scroll[signer.classId].finishPullUp()
          this.scroll[signer.classId].finishPullDown();
      
        
    })



      this.scroll[signer.classId]["flagCount"] = false; //防抖
      this.scroll[signer.classId]["flagCountpullingDown"] = false; //防抖
      
      this.scroll[signer.classId].on("scroll", pos => {
         console.log(pos.y )
        //   (~,0) [ 0 , 30]  ( 30-50] REFLSE
        if (pos.y >= 30) {
         this.pulldowntext[signer.classId] = true;  //下拉刷新
        }
        if (pos.y <=  10) {
          //上拉加载
          // pulldowntext 上拉刷新 字
          //  pullUptext 没有更多字
          this.pulldowntext[signer.classId] = false;  //下拉刷新
          // this.pulldowntext[signer.classId] = this.text[signer.classId];
        } else if (pos.y > 0 && pos.y < 30) {
          // console.log( ' =============== 000000000' , this.scroll[signer.classId])
          // this.pulldowntext[signer.classId] = true;
          // this.pullUptext[signer.classId] = false; // // 没有更多数据了
        } else if (pos.y >= 100) {
          //this.scroll[signer.classId].refresh();
        }else if(isNaN(pos.y)  ){
          return
        }
        // if (pos.y >= 30 && !this.scroll[signer.classId].isInTransition) {
        //   this.pulldowntext[signer.classId] = true;
        //   this.pullUptext[signer.classId] = false; // // 没有更多数据了
        //   this.scroll[signer.classId].closePullUp(); //关闭上拉

        // }  else if (pos.y < 30) {
        //   this.pulldowntext[signer.classId] = false;
        // }
      });
      var c = null
 
      this.scroll[signer.classId].on("pullingDown", () => {
        // 下拉动作(下拉刷新)  -- 请求后台数据
        this.more = true
       // this.xiala = "下下下下下下下下下下下下下下下下下下下下下下下下下"
        
        this.scroll[signer.classId].closePullUp(); //关闭上拉
        this.pageIndex[signer.classId] = 1;
        this.pullUptext[signer.classId] = this.text[signer.classId]; // 没有更多数据了 下拉刷新不显示
        let SignedState = this.formSigner().SignedState;
        console.log("下拉动作", this.pullUptext[signer.classId]);
        // let params = {
        //   params: { ...this.formSigner() }
        // };
        // let data = {
        //   list: [],
        //   recordCount: 0
        // };
        // if (params.params.SignedState.trim() == "2") {
        //   // 合同管理下面 已完成 数据
        //   data.list = this.GetContractListData.CompleteContractData.list.slice(
        //     0,
        //     5
        //   );
        //   data.recordCount = data.list.length;
        // } else if (
        //   params.params.SignedState.trim() == "1" &&
        //   params.params.signer == "0"
        // ) {

        //   data.list = this.GetContractListData.WaitForMeData.list.slice(0, 5);
        //   data.recordCount = data.list.length;
        // } else if (
        //   params.params.SignedState.trim() == "1" &&
        //   params.params.signer == "1"
        // ) {
        //   // 代他签
        //   data.list = this.GetContractListData.WaitForTheyData.list.slice(0, 5);
        //   data.recordCount = data.list.length;
        // } else if (params.params.SignedState.trim() == "") {
        //   // 合同管理下面 全部 数据
        //   data.list = this.GetContractListData.AllContractData.list.slice(0, 5);
        //   data.recordCount = data.list.length;
        // }

        //vuex -- mutations 直接交互
        // this._GetContractList({ params, data }); //防止空白页面情况
        
        if(this.scroll[signer.classId]["flagCountpullingDown"]  == false){
           
              this.scroll[signer.classId]["flagCountpullingDown"] =  true // 节流
              this.scroll[signer.classId]["flagCount"] =  true;
               //-------------------------------
              this.init(this.formSigner(), "").then(() => {
                // alert(1)
                 this.pulldowntext[signer.classId] = false;
                this.more = false;
                this.scroll[signer.classId].finishPullUp()
                this.scroll[signer.classId].finishPullDown();
                this.scroll[signer.classId].openPullUp();
                this.scroll[signer.classId].refresh();
                this.scroll[signer.classId]["flagCountpullingDown"] =  false
                this.scroll[signer.classId]["flagCount"] =  false
               
                // console.log('//-------------------------------')
                // console.log(this.pulldowntext[signer.classId])
              }).catch(()=>{
                 this.scroll[signer.classId]["flagCount"] =  false
               
                  this.more = false;
                  this.pulldowntext[signer.classId] = false;
                this.scroll[signer.classId]["flagCountpullingDown"] =  false
                alert('刷新报错,请重新刷新页面')
              });

        } 
       
      });
 
 
      var b = null
      this.scroll[signer.classId].on("pullingUp", () => {
        //上拉加载 请求后台数据
          console.log("上拉加载" ,
          this.text   , 
          
           );
  // this.xiala = "上上上上上上上上上上上上上上上上上上上上上上上"
           
                    this.more = true
         
            this.scroll[signer.classId].closePullDown();
      //       clearTimeout(b);
      //  b = setTimeout(()=>{
      //       this.scroll[signer.classId].refresh();
      //         this.scroll[signer.classId].finishPullUp()
      //         this.scroll[signer.classId].finishPullDown();
      //         this.scroll[signer.classId].openPullUp();
      //   },600)
        if(this.scroll[signer.classId]["flagCount"]  == false){
             this.more = false
              this.scroll[signer.classId]["flagCountpullingDown"] =  true // 节流
              this.scroll[signer.classId]["flagCount"] =  true // 节流
              console.log('true 说明 已经没有更多数据了 ',this.text[signer.classId])
              if (this.text[signer.classId]) {  // true 说明 已经没有更多数据了 
                  this.scroll[signer.classId].finishPullUp();
                  this.scroll[signer.classId].refresh();
            this.scroll[signer.classId].openPullDown();
                  
                this.pullUptext[signer.classId] = this.text[signer.classId]; // // 没有更多数据了
                return false;
              } else {
                // false 说明有数据
                this.pageIndex[signer.classId]++;
                this.init(this.formSigner(), "shangla").then(() => {
                  //请求后台数据 
                  this.scroll[signer.classId].finishPullUp();
            this.scroll[signer.classId].openPullDown();
                  this.scroll[signer.classId].refresh();
                  this.scroll[signer.classId]["flagCount"] = false;
                   this.scroll[signer.classId]["flagCountpullingDown"] =  false // 节流
                  this.pulldowntext[signer.classId] = false;
                   
                    this.more = false
                  this.pullUptext[signer.classId] = this.text[signer.classId] // // 没有更多数据了
                }).catch(()=>{
                   this.more = false
                alert('加载更多报错,请重新刷新页面')
                   this.pulldowntext[signer.classId] = false;
                  this.scroll[signer.classId]["flagCount"] =  false
                   this.scroll[signer.classId]["flagCountpullingDown"] =  false // 节流
                  
                }); 
              } 
        }  

        
      });
    },

    tabStateClickFn(item) {
      // 重新初始化页码
      console.log(this.tabStateClickDelay)
      if (this.tabStateClickDelay) {
        // 防抖
        return false;
      }

      console.log( '1', item.name,  this.GetContractListData)

      this.oldChangeTabComponent = this.changeTabComponent;
      this.tabStateClickDelay = true;
      this.changeTabComponent = item.name;

      if (
        item.name == "WaitForMe" &&
        this.GetContractListData.WaitForMeData.list.length == 0
      ) {
        
         this.more = true
        this.init(this.formSigner(item.name, item.name), "").then(() => {
           this.more = false
          //初始化没有数据tab选项卡
          this.initScroll(this.formSigner(item.name, item.name), "");
          this.tabStateClickDelay = false;
        });
      } else if (
        item.name == "WaitForThey" &&
        this.GetContractListData.WaitForTheyData.list.length == 0
      ) {
        this.more = true
        this.init(this.formSigner(item.name, item.name), "").then(() => {
           this.more = false
          this.initScroll(this.formSigner(item.name, item.name), "");
          this.tabStateClickDelay = false;
        });
      } else if (
        item.name == "CompleteContract" &&
        this.GetContractListData.CompleteContractData.list.length == 0
      ) {
           this.more = true
        this.init(this.formSigner(item.name, item.name), "").then(() => {
           this.more = false
          
          this.initScroll(this.formSigner(item.name, item.name), "");
          this.tabStateClickDelay = false;
        });
      } else if (
        item.name == "AllContract" &&
        this.GetContractListData.AllContractData.list.length == 0
      ) {
           this.more = true
        
        this.init(this.formSigner(item.name, item.name), "").then(() => {
           this.more = false
          
          this.initScroll(this.formSigner(item.name, item.name), "");
          this.tabStateClickDelay = false;
        });
      } else {
        this.tabStateClickDelay = false; //防抖
      }

      setTimeout(() => {
        if (this.scroll[item.name]) {
          this.scroll[item.name].refresh(); //必须延迟
        }
      }, 300);
      this.$router.replace({
        path: "/ContractStateManagement",
        query: { Name: item.name }
      });
    },

    fatherGetPropsFn() {
      //接收子组件发送的信息
    }
  },
  beforeDestroy() {
    //清空数据
    this._clearGetContractListData();
    for (var p in this.scroll) {
      if (this.scroll[p] != "") {
        this.scroll[p].finishPullUp();
        this.scroll[p].finishPullDown();
      }
    }
    document.body.style.overflow = "visible";
  },
  watch: {
    $route: function(newValue, oldValue) {}
  }
};
</script>

 


<style  lang="less" scoped>
@import "./ContractStateManagement.less";
#AllContract {
  background: #ebebeb;
}
.wrapper {
  overflow: hidden;
}
.tabStateWrap {
  position: relative;
  left: 0;
  right: 0;
  top: 2px;
  z-index: 999;
  height: 1.2rem;
  line-height: 1.2rem;
  background: #fff;
  font-size: 0.4rem;
}
.tabState {
  li {
    .fl;
    width: 25%;
    text-align: center;
  }
  span {
    display: inline-block;
    position: relative;
    height: 1.18rem;
    &.active {
      .c(#0096ff);
      &:after {
        display: block;
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        border-bottom: 3px solid #0096ff;
        content: " ";
      }
    }
  }
}
#more{
  position:fixed;
  top:50%;
    font-size:50px;
}
</style>

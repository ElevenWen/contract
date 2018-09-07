<!--  tab  选项卡: 全部-->

<template   >  
<div> 
        
        <div id="AllContract" class="content" ref=" ">    
            <div v-show="$attrs.pulldowntext"  class=" defaultRefreshStyle ">下拉刷新</div> 
            <div  class="dataWrap   " v-if="_AllContractData.recordCount != 0">
                  <div  class="pulldowntext" v-if='false'>{{pulldowntext}}</div>
                  <div class="data">
                    <div v-for="(items,index) in _AllContractData.list" :key="index" class="iteratorItems"> 
                            <div>
                                  <div class="invoiceListWrap" @click="toDetail(items)">
                                      <div class="firstRow">
                                          <!-- Status 	 状态（0.待开票，1.已开票） -->
                                          <span></span>
                                          <span>{{items.Name}}</span>
                                          <!-- <span v-if="true">用来展示新旧的预留</span> -->
                                      </div>
                                      <div class="seconedRow">
                                          <span>发起人 </span>
                                          <span>{{items.CreateCustomerName}}</span>
                                      </div>
                                      <div class="thirdRow">
                                          <span>状态</span> 
                                          <span class='defaultStyle'   
                                            :class="{
                                              RejectedStyle:items.changeSignedState=='已驳回',
                                              WaitForMeStyle:items.changeSignedState=='待我签',
                                              RevocationStyle:items.changeSignedState=='已撤销',
                                              DraftStyle:items.changeSignedState=='草稿中', 
                                              CompleteStyle:items.changeSignedState=='已完成',
                                              WaitForTheyStyle:items.changeSignedState=='待他签',
                                              }">
                                            {{items.changeSignedState}}
                                          </span>
                                      </div>
                                  </div>         
                            </div>                
                    </div>
                  </div>  
            </div> 
            <!-- 发票列表==没有发票时 --> 
            <!-- <div class="noInvoice"  v-if="_AllContractData.recordCount == 0"> -->
            <div class="noInvoice"  v-else> 
                <NothingDataContract  :dataSoped="{img:require('../../assets/images/vacancy@3x.png'),  text :'您还没有电子合同喔'} "></NothingDataContract>  
            </div>
            <!-- {{_AllContractData.recordCount != 0 }}==== {{ $attrs.pullUptext}} -->
            <div class="pullUptext" v-show="_AllContractData.recordCount != 0 && $attrs.pullUptext">没有更多了...</div>  
     

        </div> 
</div>
 


 
</template>


<script>
import BScroll from 'better-scroll'
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { getSession } from "@util/storage";
import { EAGAIN } from 'constants';
export default {
  name: "AllContract",
  components: {}, 
  data() {
    return {
      obj: {
        name: 2
      },
      stateTabData: ["待我签", "待他签", "已完成", "全部"],
      currentTabIndex: "0", 
      getinvoiceList: {
        list: ["1", "2"],
        recordCount: 2
      },
      hasData: true
    };
  },
 
  computed: {
    //   数据来源
    ...mapGetters("contractStateManagement", ["_AllContractData"]),
    // pulldowntext(){
    //   console.log(Boolean(this._AllContractData.recordCount))
    //   return Boolean(this._AllContractData.recordCount)
    // }
  },

  methods: {
    toDetail({ Id, changeSignedState,from }) { 
    // toDetail(dd) { 
    //   console.log(dd)
      this.$router.push({
        name: "ContractContent",
        query: { Id: Id,From:from}
      });
    }
  }
};
</script>







<style  lang="less" scoped>
@import "./ContractStateManagement.less";

</style>

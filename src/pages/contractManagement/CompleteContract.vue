<!--  tab  选项卡: 已完成-->
<template   >  
<div>  
            <div  id="CompleteContract" class="content"  >  
              <div v-show="$attrs.pulldowntext"  class=" defaultRefreshStyle ">下拉刷新</div> 
              <div  class="dataWrap  " v-if="_CompleteContractData.recordCount != 0">
                    <div  class="pulldowntext" v-if='false'>{{pulldowntext}}</div>
                    <div class="data">
                      <div v-for="(items,index) in _CompleteContractData.list" :key="index" class="iteratorItems"> 
                              <div>
                                            <div class="invoiceListWrap" @click="toDetail(items)">
                                                <div class="firstRow">
                                                    <!-- Status 	 状态（0.待开票，1.已开票） -->
                                                    <span></span>
                                                      <span>{{items.Name}}</span>
                                                    <span v-if="!items.IsSee"></span>
                                                </div>
                                                <div class="seconedRow">
                                                    <span>发起人</span>
                                                    <span>{{items.CreateCustomerName}}</span>
                                                </div>
                                                <div class="thirdRow">
                                                    <span>状态</span>
                                                    <span class='defaultStyle'>{{items.changeSignedState}}</span>
                                                </div>
                                            </div>         
                              </div>                
                      </div>
                      <div class="pulldowntext" v-show="hasData=='没有更多了'">{{hasData}}</div> 
                    </div> 
              </div>
              
              <!-- 发票列表==没有发票时 -->
              <div class="noInvoice"  v-else>
                  <NothingDataContract  :dataSoped="{img:require('../../assets/images/vacancy@3x.png'),  text :'您还没有电子合同喔'} "></NothingDataContract>  
              </div>
              <div class="pullUptext" v-show="_CompleteContractData.recordCount != 0 && $attrs.pullUptext">没有更多了...</div>  
            </div>
            
              <!-- you can put some other DOMs here, it won't affect the scrolling --> 
</div> 
 
</template>


<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { getSession } from "@util/storage";
export default {
  name: "CompleteContract",
  components: {},
  data() {
    return {
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
    //  _AllContractData 数据来源
    ...mapGetters("contractStateManagement", ["_CompleteContractData"])
  },
  created() {},
  methods: {
    toDetail({ Id, SignedState, from }) {
      this.$router.push({
        name: "ContractContent",
        query: { Id: Id, From: "CompleteContract" }
      });
    }
  }
};
</script>







<style  lang="less" scoped>
@import "./ContractStateManagement.less";
</style>


<!-- 此页面作为数据空白时候单独组件 -->
<template> 
    <div  id="nothingData">
      <div class="nothingImgWrap">
        <!-- <img src="../assets/images/vacancy@3x.png" alt=""> -->
         <img  class="nothingImg"  :src="dataSoped.img" alt="">
         <p class="textCenter">{{dataSoped.text}}</p>
      </div>
      
     </div>
 
</template>

<script> 
// import tool from "@util/tool.js";
// import { getSession } from "@util/storage";
export default {
  data() {
    return {
       
    };
  },
  props:{
    dataSoped: {
      text:'',
      img:''
    }
  },
  created(){
    // console.log(this.dataSoped)
  },
  mounted(){
    
  },
  components: {
    
  },
  methods: {
  }
};
</script>

<style  >
</style>


<style lang="less" type="stylesheet/css" scoped>
#nothingData{
  height: 100%;
  background: #ebebeb;
}
.nothingImgWrap{
   padding-top:3.466667rem; 
}
.nothingImg{
  display: block;
  margin: 0  auto 0 auto; 
  width:1.466667rem;
  height:1.466667rem ;
}
.textCenter{
  text-align: center;
  padding-top:0.4rem;
  .c(#666666);
  font-size: 0.4rem;
}
</style>

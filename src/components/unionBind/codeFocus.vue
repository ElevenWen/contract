
<!-- 此页面作为数据联动单独组件 -->
<template>
  <div> 
      <div id="Bar"> 
            <!-- 二维码弹框 -->   
            <div v-transfer-dom>
            <x-dialog v-model="showHideOnBlur" :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
                <div id="comone">
                  
                     <img src="../../../static/img/gongzhonghaoLogo.jpg"  /> 
                </div>
            </x-dialog>
            </div> 
      </div>
   </div>
</template>




 
<script> 
export default {
  data() {
    return {
      showHideOnBlur: true
    }
  },
   beforeRouteEnter(to,from,next){ 
      if(to.path !== location.pathname  ){ 
         
        top.location.href =   location.origin+to.fullPath  

      }
      next()
		}
};
</script>

 


<style lang="less" type="stylesheet/css" scoped>
#Bar /deep/ .weui-dialog {
  position: fixed;
  display: table;
  z-index: 5000;
  width: auto;
  height: auto;
  top: 50%;
  right: 0;
  bottom: 0;
  left: 0%;
  background-color: #ffffff;
  text-align: center;
  border-radius: 3px;
  overflow: hidden;
  margin: -25% 0 0 0;
}
#comone {
  position: relative;
  height: 100%;
  width: 100%;
  margin-top: 10%;
  img {
    margin: 0 auto;
    width: 6.666667rem;
    height: 6.666667rem;
  }
}
</style>

<template>
  <div id="app"  >   
        <router-view id="routerView" />
  </div>
</template>

<script>
// import { Icon } from "vux";

export default {
  name: "App",

  data() {
    return {};
  },
  computed: { 
  },
  created() {},
  methods: {
    
  }
};
</script>
 

<style lang="less" scoped >
#app {
  height: 100%; 
}


#routerView {
  padding-top: 0.1px;
  height: 100%;
}
// 全局样式切勿改动!!!
#app /deep/ #routerView  > div:nth-of-type(1) { 
  padding-top: 0.1px;  
}
</style>

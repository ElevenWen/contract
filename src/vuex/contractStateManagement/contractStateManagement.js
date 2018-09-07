import getData from "../ajaxAPI/getData";

// 过滤文字
function setChangeSignedState(_value, value) {
  // console.log(_value.toString(), value);
  // 过滤签署状态   （0.草稿、1.待签署、2.已完成、3.已拒签(已驳回)、4.已撤销）
  switch (_value.toString()) {
    case "0":
      value.changeSignedState = "草稿中";
      value.changeState = "0";
      value.from = "Draft";
      break;
    case "1":
      if (value.signer == "-1") {
        //双方未签订状态
        value.changeSignedState = "待我签";
        value.changeState = "11";
        value.from = "WaitForMe";
      } else if (value.signer == "1") {
        value.changeSignedState = "待他签";
        value.changeState = "12";
        value.from = "WaitForThey";
      } else if (value.signer == "0") {
        value.changeSignedState = "待我签";
        value.changeState = "11";
        value.from = "WaitForMe";
      }
      break;
    case "2":
      value.changeSignedState = "已完成";
      value.changeState = "2";
      value.from = "CompleteContract";
      break;
    case "3":
      value.changeSignedState = "已驳回";
      value.changeState = "3";
      value.from = "Rejected";

      console.log("====3", value.changeSignedState);
      break;
    default:
      value.changeSignedState = "已撤销";
      value.changeState = "4";
      value.from = "Revocation";
      break;
  }
}

// 过滤文字(专门用来下拉刷新的)
function setChangeSignedState_sepecial(_value, value) {
  // console.log(_value.toString(), value);
  // 过滤签署状态   （0.草稿、1.待签署、2.已完成、3.已拒签(已驳回)、4.已撤销）
  switch (_value.toString()) {
    case "0":
      value.changeSignedState = "草稿中";
      value.changeState = "0";
      value.from = "Draft";
      break;
    case "1":
      if (value.signer == "-1") {
        //双方未签订状态
        value.changeSignedState = "待我签";
        value.changeState = "11";
        value.from = "WaitForMe";
      } else if (value.signer == "1") {
        value.changeSignedState = "待他签";
        value.changeState = "12";
        value.from = "WaitForThey";
      } else if (value.signer == "0") {
        value.changeSignedState = "待我签";
        value.changeState = "11";
        value.from = "WaitForMe";
      }
      break;
    case "2":
      value.changeSignedState = "已完成";
      value.changeState = "2";
      value.from = "CompleteContract";
      break;
    case "3":
      value.changeSignedState = "已驳回";
      value.changeState = "3";
      value.from = "Rejected";

      console.log("====3", value.changeSignedState);
      break;
    default:
      value.changeSignedState = "已撤销";
      value.changeState = "4";
      value.from = "Revocation";
      break;
  }
}
const state = {
  // childrenScopedStyle: false, //下拉刷新 上拉加载 父容器样式
  SignContract: false, //签署合同   签署状态（0.拒签 1.签署 2.撤回 3.催签）
  companyList: {
    list: [],
    recordCount: 0
  },
  GetContractListData: {
    // 分别对应待我签署 待我签署 已完成 全部
    WaitForMeData: {
      list:[]
    },
    WaitForTheyData: {
      list:[]
    },
    CompleteContractData:{
      list:[]
    },
    AllContractData: {
      list:[]
    },
    AllContractDataPullUptext: false,
    WaitForTheyDataPullUptext: false,
    WaitForMeDataPullUptext: false,
    CompleteContractDataPullUptext: false
  },
  text:{
    AllContract:false,
    WaitForThey:false,
    WaitForMe:false, 
    CompleteContract:false,
  },
  GetContractInfoData: {
    //获取合同详情 +  概览
  },
  contentNodataStyle: false, //改变父组件contractStateManagement.vue样式
  ThirdPlatformContract: "" //合同签署后 返回的法大大第三方模版
};

const getters = {
  _WaitForMeData(state) {
    if (state.GetContractListData.WaitForMeData.list.length == 0) {
      state.contentNodataStyle = true;
    }
    return state.GetContractListData.WaitForMeData;
  },
  _WaitForTheyData(state) {
    if (state.GetContractListData.WaitForTheyData.list.length == 0) {
      state.contentNodataStyle = true;
    }

    return state.GetContractListData.WaitForTheyData;
  },
  _CompleteContractData(state) {
    if (state.GetContractListData.CompleteContractData.list.length == 0) {
      state.contentNodataStyle = true;
    }
    return state.GetContractListData.CompleteContractData;
  },
  _AllContractData(state) {
    if (state.GetContractListData.AllContractData.list.length == 0) {
      state.contentNodataStyle = true;
    }
    return state.GetContractListData.AllContractData;
  },
  _GetContractInfoData(state) {
    return state.GetContractInfoData;
  },
  _ThirdPlatformContract(state) {
    return state.ThirdPlatformContract;
  }
};

const mutations = {
  _clearGetContractListData(state, data) {
    //清空数据
    state.GetContractListData = {
      WaitForMeData: { list:[]},
      WaitForTheyData:  { list:[]},
      CompleteContractData:  { list:[]},
      AllContractData: { list:[]},
    };
  },
  _SendECToEmail(state, data) {},
  _GetContractList(state, { params, data }) {
    //  获取合同列表
    //  console.log( params ,'-------------')
    //  签署合同   签署状态（0.拒签 1.签署 2.撤回 3.催签）
    //data.list= [{SignedState}]
    console.log(params, data);
    if (data.recordCount) {
      data.list.forEach(value => {
        setChangeSignedState(value.SignedState, value);
      });
    }
    console.log(2 , params.params.SignedState);
    // data.list = [] data.recordCount = 0

    
    if (params.params.SignedState.trim() == "2") {
      // 合同管理下面 已完成 数据
      state.GetContractListData.CompleteContractData = data;
      state.childrenScopedStyle = !Boolean(Number(data.recordCount));
      state.text.CompleteContract =false
       
    } else if (
      params.params.SignedState.trim() == "1" &&
      params.params.signer == "0"
    ) {
      // 代我签
      state.GetContractListData.WaitForMeData = data;
      state.childrenScopedStyle = !Boolean(Number(data.recordCount));
      state.text.WaitForMe =false
    } else if (
      params.params.SignedState.trim() == "1" &&
      params.params.signer == "1"
    ) {
      // 代他签
      state.GetContractListData.WaitForTheyData = data;
      state.childrenScopedStyle = !Boolean(Number(data.recordCount));
      state.text.WaitForThey =false
    } else if (params.params.SignedState.trim() == "") {
      // 合同管理下面 全部 数据
      state.GetContractListData.AllContractData = data;
      state.childrenScopedStyle = !Boolean(Number(data.recordCount));
      state.text.AllContract =false
    }
  },
  _shanglaGetContractList(state, { params, data }) {
    data.list.forEach(value => {
      setChangeSignedState(value.SignedState, value);
    });
    // 在ContractStateManagement 调用了 mutations 谨慎修改
    if (params.params.SignedState.trim() == "2") {
      // 合同管理下面 已完成 数据
      state.GetContractListData.CompleteContractData.list.push(...data.list);
      var currentDataLen =
        state.GetContractListData.CompleteContractData.list.length;
      var recordCount =
        state.GetContractListData.CompleteContractData.recordCount;
      console.log(currentDataLen, recordCount ,'下拉');
      state.text.CompleteContract  =
      currentDataLen >= recordCount;
    } else if (
      params.params.SignedState.trim() == "1" &&
      params.params.signer == "0"
    ) {
      // 代我签
      state.GetContractListData.WaitForMeData.list.push(...data.list);
      var currentDataLen = state.GetContractListData.WaitForMeData.list.length;
      var recordCount = state.GetContractListData.WaitForMeData.recordCount;

      state.text.WaitForMe  =
        currentDataLen >= recordCount;
    } else if (
      params.params.SignedState.trim() == "1" &&
      params.params.signer == "1"
    ) {
      // 代他签
      state.GetContractListData.WaitForTheyData.list.push(...data.list);

      var currentDataLen =
        state.GetContractListData.WaitForTheyData.list.length;
      var recordCount = state.GetContractListData.WaitForTheyData.recordCount;
      state.text.WaitForThey  =
      currentDataLen >= recordCount;
    } else if (params.params.SignedState.trim() == "") {
      // 合同管理下面 全部 数据
      state.GetContractListData.AllContractData.list.push(...data.list);

      var currentDataLen =
        state.GetContractListData.AllContractData.list.length;
      var recordCount = state.GetContractListData.AllContractData.recordCount;
      state.text.AllContract  =
      currentDataLen >= recordCount;
    }
  },
  _GetContractInfo(state, data) {
    //获取合同详情 +  概览
    // 过滤签署状态   （0.草稿、1.待签署、2.已完成、3.已拒签(已驳回)、4.已撤销）
    setChangeSignedState(data.SignedState, data);

    state.GetContractInfoData = data;
  },
  _SignContract(state, data) {
    // console.log(data);
    state.SignContract = true;
    state.ThirdPlatformContract = data.link;
    // console.log(" 签署状态（0.拒签 1.签署 2.撤回 3.催签）");
  }
};

const actions = {
  SendECToEmail({ state, commit }, params) {
    //发送到邮箱
    return getData.SendECToEmail(params).then(res => {
      return commit("_SendECToEmail", {
        params,
        ...res
      });
    });
  },
  // 获取企业合同列表 初次  --- 数据来源 天眼查
  GetContractList({ state, commit }, _params) {
    console.log('---',_params)
    let params = _params.params;
    if (_params.flag == "shangla") {
      return getData.GetContractList(params).then(res => {
        // 上拉更多
        return commit("_shanglaGetContractList", {
          params,
          ...res
        });
      });
    } else {
      //下拉刷新

      return getData.GetContractList(params).then(res => {
        return commit("_GetContractList", {
          params,
          ...res
        });
      });
    }
  },
  xialaGetContractList({ state, commit }, params) {
    // 获取企业合同列表 下拉加载更多  --- 数据来源 天眼查
    return getData.GetContractList(params).then(res => {
      return commit("_xialaGetContractList", {
        params,
        ...res
      });
    });
  },
  GetContractInfo({ state, commit }, params) {
    //获取合同详情 +  概览
    return getData.GetContractInfo(params).then(res => {
      return commit("_GetContractInfo", res.data);
    });
  },
  SignContract({ state, commit }, params) {
    //签署合同   签署状态（0.拒签 1.签署 2.撤回 3.催签）
    return getData
      .SignContract(params)
      .then(res => {
        return commit("_SignContract", res.data);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

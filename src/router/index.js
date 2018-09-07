import Vue from "vue";
import Router from "vue-router";
import { getSession } from "@util/storage";

const Home = () =>
  import(/* webpackChunkName: "group-Home" */ "@pages/Home/Home");

//签章管理
const SignatureManagement = () =>
  import("@pages/signature/SignatureManagement");
const CompanyVertify = () => import("@pages/signature/CompanyVertify");
const PersonalVertify = () => import("@pages/signature/PersonalVertify");
const IdInfo = () => import("@pages/signature/IdInfo");
const FaceSuccess = () => import("@pages/signature/FaceSuccess");
const Face = () => import("@pages/signature/Face");
const SignatureChoiced = () =>
  import(/* webpackChunkName: "SignatureChoiced" */ "@pages/signature/SignatureChoiced.vue");

//合同管理
const ContractStateManagement = () =>
  import(/* webpackChunkName: "ContractStateManagement" */ "@pages/contractManagement/ContractStateManagement.vue");
const ContractContent = () =>
  import(/* webpackChunkName: "ContractStateManagement" */ "@pages/contractManagement/ContractContent.vue");
const OverviewContract = () =>
  import(/* webpackChunkName: "ContractStateManagement" */ "@pages/contractManagement/OverviewContract.vue");
const RejectDetail = () =>
  import(/* webpackChunkName: "ContractStateManagement" */ "@pages/contractManagement/RejectDetail.vue");
const ThirdPlatformContract = () =>
  import(/* webpackChunkName: "ContractStateManagement" */ "@pages/contractManagement/ThirdPlatformContract.vue");

// 用户中心
const UserCenter = () =>
  import(/* webpackChunkName: "UserCenter" */ "@pages/userCenter/UserCenter");
const ChangeTelFirst = () =>
  import(/* webpackChunkName: "UserCenter" */ "@pages/userCenter/ChangeTelFirst");
const ChangeTelSecond = () =>
  import(/* webpackChunkName: "UserCenter" */ "@pages/userCenter/ChangeTelSecond");
const ChangeEmailFisrt = () =>
  import(/* webpackChunkName: "UserCenter" */ "@pages/userCenter/ChangeEmailFisrt");
const ChangeEmailSecond = () =>
  import(/* webpackChunkName: "UserCenter" */ "@pages/userCenter/ChangeEmailSecond");
const AccountSet = () =>
  import(/* webpackChunkName: "UserCenter" */ "@pages/userCenter/AccountSet");
const Feedback = () =>
  import(/* webpackChunkName: "UserCenter" */ "@pages/userCenter/Feedback");
const AboutUs = () =>
  import(/* webpackChunkName: "UserCenter" */ "@pages/userCenter/AboutUs");
const KnowContract = () =>
  import(/* webpackChunkName: "UserCenter" */ "@pages/userCenter/KnowContract");

// 我的套餐
const MyPackage = () =>
  import(/* webpackChunkName: "MyPackage" */ "@pages/myPackage/MyPackage");
const BuyPackage = () =>
  import(/* webpackChunkName: "MyPackage" */ "@pages/myPackage/BuyPackage");
const ConfirmOrder = () =>
  import(/* webpackChunkName: "MyPackage" */ "@pages/myPackage/ConfirmOrder");
const FindFriendPay = () =>
  import(/* webpackChunkName: "MyPackage" */ "@pages/myPackage/FindFriendPay");
const HelpFriendPay = () =>
  import(/* webpackChunkName: "MyPackage" */ "@pages/myPackage/HelpFriendPay");

// 公用组件---微信授权
const IsWeixinAuth = resolve =>
  require(["@components/unionBind/IsWeixinAuth"], resolve);

//联合绑定
const UnionBind = resolve =>
  require(["@components/unionBind/UnionBind"], resolve);
const agreement = resolve =>
  require(["@components/unionBind/agreement"], resolve);

const codeFocus = resolve =>
  require(["@components/unionBind/codeFocus"], resolve);  

//首页

Vue.use(Router);



var router = new Router({
  mode: "history",
  routes: [
   
    {
      path: "/codeFocus",
      name: "codeFocus",
      component: codeFocus,
      meta: { requireAuth: false },
    },
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { requireAuth: true },
      children: [
        {
          path: "IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/home",
      name: "home2",
      component: Home,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/IsWeixinAuth/IsWeixinAuth",
      name: "IsWeixinAuth",
      component: IsWeixinAuth,
      meta: { requireAuth: false }
    },
    {
      path: "/unionBind/agreement",
      name: "agreement",
      component: agreement,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
      
    },
    {
      path: "/unionBind/UnionBind",
      name: "UnionBind",
      component: UnionBind,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },

    {
      // 此路由不进行鉴权
      path: "/unionBind",
      name: "UnionBind",
      component: UnionBind,
      meta: { requireAuth: false }
    },

    //--------------------------------------------------签章管理
    {
      path: "/Signature/SignatureManagement/:tag",
      name: "SignatureManagement",
      component: SignatureManagement,
      meta: { requireAuth: false },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/Signature/SignatureChoiced",
      name: "SignatureChoiced",
      component: SignatureChoiced,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/Signature/CompanyVertify",
      name: "CompanyVertify",
      component: CompanyVertify,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/Signature/PersonalVertify",
      name: "PersonalVertify",
      component: PersonalVertify,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/Signature/IdInfo",
      name: "IdInfo",
      component: IdInfo,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/Signature/FaceSuccess/:id",
      name: "FaceSuccess",
      component: FaceSuccess,
      meta: { requireAuth: false }
    },
    {
      path: "/Signature/Face",
      name: "Face",
      component: Face,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    //---------------------------------------------------合同管理
    {
      path: "/ContractStateManagement",
      name: "ContractStateManagement",
      component: ContractStateManagement,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/ContractStateManagement/ContractContent",
      name: "ContractContent",
      component: ContractContent,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/ContractStateManagement/OverviewContract",
      name: "OverviewContract",
      component: OverviewContract,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/ContractStateManagement/RejectDetail",
      name: "RejectDetail",
      component: RejectDetail,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/ContractStateManagement/ThirdPlatformContract",
      name: "ThirdPlatformContract",
      component: ThirdPlatformContract,
      meta: { requireAuth: false }
    },
    //---------------------------------------------------用户中心
    {
      path: "/userCenter/UserCenter",
      name: "UserCenter",
      component: UserCenter,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/userCenter/ChangeTelFirst",
      name: "ChangeTelFirst",
      component: ChangeTelFirst,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/userCenter/ChangeTelSecond",
      name: "ChangeTelSecond",
      component: ChangeTelSecond,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/userCenter/ChangeEmailFisrt",
      name: "ChangeEmailFisrt",
      component: ChangeEmailFisrt,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/userCenter/ChangeEmailSecond",
      name: "ChangeEmailSecond",
      component: ChangeEmailSecond,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/userCenter/AccountSet",
      name: "AccountSet",
      component: AccountSet,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/userCenter/Feedback",
      name: "Feedback",
      component: Feedback,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/userCenter/AboutUs",
      name: "AboutUs",
      component: AboutUs,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/userCenter/KnowContract",
      name: "KnowContract",
      component: KnowContract,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    //---------------------------------------------------我的套餐
    {
      path: "/myPackage/MyPackage",
      name: "MyPackage",
      component: MyPackage,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/myPackage/BuyPackage",
      name: "BuyPackage",
      component: BuyPackage,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/myPackage/ConfirmOrder",
      name: "ConfirmOrder",
      component: ConfirmOrder,
      meta: { requireAuth: true },
      children: [
        {
          path: "/IsWeixinAuth",
          component: IsWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },

    {
      path: "/myPackage/FindFriendPay",
      name: "FindFriendPay",
      component: FindFriendPay,
      meta: { requireAuth: false }
    },
    {
      path: "/myPackage/HelpFriendPay",
      name: "HelpFriendPay",
      component: HelpFriendPay,
      meta: { requireAuth: false }
    }
  ]
});


router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = document.body.scrollTop = "0px";
  // 路由进入下一个路由对象前，判断是否需要登陆
// alert(1)
  // 在路由meta对象中由个requireAuth字段，只要此字段为true，必须做鉴权处理
  
  next();
      return;
  if (to.meta.requireAuth) {
    // next();
    //   return;
    // userData为存储在本地的一些用户信息 若是无值表示没有获取到微信授权
    let userData = getSession("_info");
    // 未登录和已经登录的处理
    // getSession方法处理后如果userData.token没有值就是undefined，下面直接判断
    //本地存储信息后 不用再次授权 
    if (userData != undefined || userData != null) {
      next();
      return;
    } else if (to.query.code) {
      //防止页面多次刷新
      next();
      return;
    } else if (to.query.tag == "bind") {
      //进入联合绑定页面 进行判断 且跳转
      next({
        path: "/unionBind",
        query: {
          beforeRedirect: to.path, //需要手动history.replaceState的网址
          redirect: to.name == "/" ? "home" : to.name,
          tag: "bind"
        }
      });
      history.replaceState(null, null, to.path);
      return false;
    }
    //1 没有id 手动进入 /IsWeixinAuth子窗口 ( 不需要用授权  进入 else 判断)  ==> 进入IsWeixinAuth  code 手动添加为0
    //2 此时/IsWeixinAuth子窗口 一定么有code  所以 会触发window.open 再次进入router index.js 此时获取到code  code 从后台获取到 不在为0 
    //3 IsWeixinAuth子窗口 ( 不需要用授权  进入 else 判断)  ==> 进入/IsWeixinAuth/IsWeixinAuth 本质还是/IsWeixinAuth.vue 页面此时携带后台给的code
    //4 /IsWeixinAuth.vue (携带code )  ==>进入是否关注 判断, 联合绑定分支 重复1234 
    // 
    //手动调整页面进入 /IsWeixinAuth子窗口
    let path = to.path == "/" ? "/home" : `${to.path + "/IsWeixinAuth"}`;

    // 未授权 统一进入微信授权组件进行授权

    next({
      path: path,
      query: {
        beforeRedirect: to.path, //需要手动history.replaceState的网址
        redirect: to.name == "/" ? "home" : to.name
      }
    });
    console.log(path)

    console.log(to.path)
    history.replaceState(null, null, to.path);
    return false;
  } else {
    if(to.path == '/codeFocus'){ //解决IOS 不能成嗯识别 bug
      next();
      return false;
    }
    //----------------------------------------------------------------不用鉴权
    // 微信授权页面IsWeixinAuth
    if (to.path == "/IsWeixinAuth/IsWeixinAuth") {
      //执行第二步子
      next();
      return false;
    } else if (to.path == "/unionBind") {
      // 手动引导进入  /unionBind 页面 （此页面不鉴权）
      next();
      history.replaceState(null, null, to.path);
      return false;
    } else {
      if (to.path.toLowerCase().indexOf("/isweixinauth") != -1) {
        // 第一步  先定向到这里 /scanInvoice/IsWeixinAuth  然后执行第二步子
        let replacePath = to.path.substring(
          0,
          to.path.toLowerCase().indexOf("/isweixinauth")
        );
        if (replacePath == "") {
          replacePath = "/";
        }
        let len = replacePath.match(/(\/[0-9a-zA-Z]*$)/gi).length;
        var filterLastRouter = replacePath.match(/(\/[0-9a-zA-Z]*$)/gi)[
          len - 1
        ];

        if (
          filterLastRouter != null &&
          (filterLastRouter == "" || filterLastRouter == "/")
        ) {
          history.replaceState(null, null, "/");
          filterLastRouter = "home";
        } else {
          history.replaceState(null, null, replacePath);
          filterLastRouter = filterLastRouter.substr(1);
        }

        
        // 路由历史记录覆盖
        //防止进入/IsWeixinAuth  所以用了/IsWeixinAuth/IsWeixinAuth
        next({
          path: "/IsWeixinAuth/IsWeixinAuth",
          query: {
            // 告诉后台 需要回调的 路由地址 相当于 state
            redirect: filterLastRouter,
            beforeRedirect: replacePath, //需要手动history.replaceState的网址
            //加入code 防止微信授权页面不能进入后台回调 跳转
            //和后台获取code 交换unionId
            code: Boolean(to.query.code) ? to.query.code : 0
          }
        });
        return false;
      } else {
        next();
        return false;
      }
    }
  }
});

export default router;

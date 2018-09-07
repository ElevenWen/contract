<template>
    <div>
        <div id="Face">
           <router-view  id="dddddddddddd"></router-view>
            <headerCom :titleScoped="'人脸认证'"/>
            <div class="container">
                <p>请左右摇头</p>
            </div>
        </div>
    </div>
</template>

<style lang="less">
#routerView{
    height: 100%;
}
    #Face{
        height: 100%;
        background: #fff;
        .container{
            padding-top: 1.173333rem;
            text-align: center;
            >p{
                margin-top: 1.066667rem;
                font-size: 0.453333rem;
            }
        }
    }
</style>



/**
* 作者: jsziconfont 阿里巴巴矢量图标库
* 日期: 2018-11-08
* 描述:
*/
<template>
    <div>
      <x-header style='text-align: center;background:rgb(17, 160, 0);line-height: 50px;color: #fff'>七彩宝</x-header>
      <div style='margin-top: 20px;padding: 0 30px'>
        <div style='border: 1px solid #ccc;padding: 20px 10px;box-shadow:0 0 10px #ccc '>
          <div style='display: inline-block'>
            <span style=''>欢迎来到 <span style='font-size: 18px;color: rgb(17, 160, 0)'>七彩宝</span></span>
            <br/>
            <span style=''>账号：</span>
            <span style=''>{{account}}</span>
          </div>
        </div>
        <!--<div style='border: 1px solid #ccc'>-->
          <!--<group>-->
            <!--&lt;!&ndash;<cell is-link title="我的资料" icon-class='iconfont icon-yanzhengma' link="/myInfo">&ndash;&gt;-->
              <!--&lt;!&ndash;<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/myinfo.png">&ndash;&gt;-->
            <!--&lt;!&ndash;</cell>&ndash;&gt;-->
            <!--<cell is-link title="申请记录 " link='/applicationRecord'>-->
              <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/applicationRecord.png">-->
            <!--</cell>-->
            <!--<cell is-link title="账单查询 " link="/recordQuery">-->
              <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/billQuery.png">-->
            <!--</cell>-->
            <!--<cell is-link title="修改密码 " link="/resetpass">-->
              <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/editpass1.png">-->
            <!--</cell>-->
            <!--<cell is-link title="退出登录 " @click.native="loginoutFun"  >-->
              <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/outlogin.png">-->

            <!--</cell>-->
          <!--</group>-->
        <!--</div>-->
        <div >

            <router-link class='router_li' :to='{path: "/basicInfo"}'>基本资料</router-link>
            <router-link class='router_li' :to='{path: "/bankInfo"}'>银行账户</router-link>
            <router-link class='router_li' :to='{path: "/adressInfo"}'>地址</router-link>
            <router-link class='router_li' :to='{path: "/applicationRecord"}'>申请记录</router-link>
            <router-link class='router_li' :to='{path: "/resetpass"}'>修改密码</router-link>
            <span class='router_li' @click="loginoutFun">退出登录</span>

        </div>
      </div>
      <footerCom></footerCom>
      <div v-transfer-dom>
        <loading :show="show2" text=""></loading>
      </div>
      <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask text="" position="middle">{{popmsg}}</toast>
    </div>
</template>

<script>
  import {Group,XHeader,Cell,Tabbar,TabbarItem,Toast ,Loading, TransferDomDirective as TransferDom,XButton } from 'vux'
  import footerCom from '../info/footerCom'
    export default {
        name: "userMain",
        components: {
          Group,
          XHeader,
          Cell,
          Tabbar,
          TabbarItem,
          Toast,
          Loading,
          footerCom,
          XButton
        },
        props: [],
      directives: {
        TransferDom
      },
        data() {
            return {
              account:"",
              userId:"",
              showPositionValue:false,
              popmsg:"",
              show2:false
            }
        },
        mounted() {
          let vm=this;
          this.$vux.loading.show({
            text: '正在加载中..'
          })
          this.$api.get("api/user/info","",function ({data}) {
            // console.log(res);
            vm.$vux.loading.hide();
            if(data.code==20){

              vm.userId=data.data.id;
              vm.account=data.data.tel;
            }else {
              vm.showPositionValue=true;
              vm.popmsg=data.message
            }
          });
          // vm.account=vm.$router.
        },
        methods: {
          loginoutFun(){
            let vm=this;
            console.log(1);
            vm.$api.post("api/system/logout","",function ({data}) {
              if(data.code==20){
                sessionStorage.clear();
                vm.showPositionValue=true;
                  vm.popmsg="退出登录成功"
                vm.$router.push({
                  path:"/",
                })
              }
            })
          },
          showLoading () {
            this.$vux.loading.show({
              text: 'Loading'
            })
            setTimeout(() => {
              this.$vux.loading.hide()
            }, 4000)
          },
        }
    }
</script>

<style scoped lang='less'>
.router_li{
  color: #fff;
  background: #3dd2c4;
  width: 100%;
  display: inline-block;
  margin-top: 10px;
  border-radius: 5px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
</style>

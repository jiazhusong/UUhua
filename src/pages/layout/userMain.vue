/**
* 作者: jsziconfont 阿里巴巴矢量图标库
* 日期: 2018-11-08
* 描述:
*/
<template>
    <div>
      <x-header style='text-align: center;background: #ff9000;line-height: 50px;color: #fff'>用户主页</x-header>
      <div style='margin-top: 20px;padding: 0 30px'>
        <div style='border: 1px solid #ccc;padding: 20px 10px;box-shadow:0 0 10px #ccc '>
          <img height='50' src="../../../static/user.png" alt="">
          <span style='vertical-align: top'>欢迎：</span>
          <span style='vertical-align: top'>{{account}}</span>
        </div>
        <div style='border: 1px solid #ccc'>
          <group>
            <cell is-link title="我的资料" icon-class='iconfont icon-yanzhengma' link="/myInfo">
              <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/myinfo.png">
            </cell>
            <cell is-link title="申请记录 " link='/applicationRecord'>
              <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/applicationRecord.png">
            </cell>
            <cell is-link title="账单查询 " link="/recordQuery">
              <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/billQuery.png">
            </cell>
            <cell is-link title="修改密码 " link="/resetpass">
              <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/editpass1.png">
            </cell>
            <cell is-link title="退出登录 " @click.native="loginoutFun"  >
              <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/outlogin.png">

            </cell>
          </group>
        </div>
      </div>
      <tabbar>
        <tabbar-item link="/layout">
          <i slot="icon" class='iconfont icon-yemian-copy'></i>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item selected link="/userlayout">
          <i slot="icon" class='iconfont icon-wodedangxuan'></i>
          <span slot="label">我的</span>
        </tabbar-item>

      </tabbar>
      <div v-transfer-dom>
        <loading :show="show2" text=""></loading>
      </div>
      <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask text="" position="middle">{{popmsg}}</toast>
    </div>
</template>

<script>
  import {Group,XHeader,Cell,Tabbar,TabbarItem,Toast ,Loading, TransferDomDirective as TransferDom } from 'vux'
    export default {
        name: "userMain",
        components: {
          Group,
          XHeader,
          Cell,
          Tabbar,
          TabbarItem,
          Toast,
          Loading
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

</style>

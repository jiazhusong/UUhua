/**
* 作者: jsz
* 日期: 2019-01-15
* 描述:
*/
<template>
    <div>
      <div>
        <x-header style='text-align: center;background: rgb(17, 160, 0);line-height: 50px;color: #fff'>资料认证</x-header>
        <div  style='margin-bottom: 60px; '>
          <div  :style='{"max-height": maxHei}' style='overflow: auto'>
            <group>
              <x-input label-width='100' title='银行：'  required  ref='bank' placeholder="请输入开户银行" v-model="bankObj.bank">
              </x-input>
              <x-input label-width='100' title='银行账号：'  required ref='bankAccount' placeholder="请输入银行账号" v-model="bankObj.bankAccount">
              </x-input>
              <x-input label-width='100' title='分行信息：'  required ref='fhxx' placeholder="请输入分行信息" v-model="bankObj.fhxx">
              </x-input>
              <x-input label-width='100' title='支付宝账号：' required ref='zfbzh' placeholder="请输入支付宝账号" v-model="bankObj.zfbzh">
              </x-input>
              <!--<x-input label-width='100' title='支付宝密码：'  required ref='zfbmm' placeholder="请输入支付宝密码" v-model="bankObj.zfbmm">-->
              <!--</x-input>-->
              <x-input label-width='100' title='淘宝账号：'  required ref='tbzh' placeholder="请输入淘宝账号" v-model="bankObj.tbzh">
              </x-input>
              <!--<x-input label-width='100' title='淘宝密码：' required ref='tbmm'  placeholder="请输入淘宝密码" v-model="bankObj.tbmm">-->
              <!--</x-input>-->
              <div style='height:1px;background: #D9D9D9; '></div>
              <x-button style='margin-top: 20px;' type="primary" @click.native='bankSubmit'>保存</x-button>
            </group>
          </div>
        </div>
        <div v-transfer-dom>
          <alert v-model="show"  @on-show="onShow" @on-hide="onHide"> {{msg}}</alert>
        </div>
        <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask  position="middle">{{popMsg}}</toast>
        <!--<tabbar style='position: fixed'>-->
        <!--<tabbar-item  link="/layout">-->
        <!--<i slot="icon" class='iconfont icon-yemian-copy'></i>-->
        <!--<span slot="label">首页</span>-->
        <!--</tabbar-item>-->
        <!--<tabbar-item link="/myinfo">-->
        <!--<i slot="icon" class='iconfont icon-zhangdan'></i>-->
        <!--<span slot="label">资料认证</span>-->
        <!--</tabbar-item>-->
        <!--<tabbar-item selected link="/userlayout">-->
        <!--<i slot="icon" class='iconfont icon-wodedangxuan'></i>-->
        <!--<span slot="label">我的</span>-->
        <!--</tabbar-item>-->

        <!--</tabbar>-->
        <footerCom></footerCom>
        <div v-transfer-dom>
          <loading :show="show2" text=""></loading>
        </div>
      </div>
    </div>
</template>

<script>
  import { XInput,Group,XButton,XHeader,Cell,Tabbar,TabbarItem,ButtonTab, ButtonTabItem ,Radio,Alert,Loading , TransferDomDirective as TransferDom ,Toast   } from 'vux'
  // import Uploader from 'vux-uploader'
  import footerCom from '../info/footerCom'
    export default {
        name: "bankInfo",
      directives: {
        TransferDom
      },
      components: {
        XInput,
        Group,
        XButton,
        XHeader,
        Cell,
        Tabbar,
        TabbarItem,
        ButtonTab,
        ButtonTabItem,
        Radio,
        // Uploader,
        Alert,
        Toast,
        Loading,
        footerCom
      },
        props: [],
        data() {
            return {
              images:[],
              show2:false,
              popMsg:"",
              showNum:0,
              list: [{key: '1', value: '男'}, {key: '2', value: '女'}],
              sex:"1",
              age:"",
              show:false,
              maxHei:"",
              showPositionValue:false,
              msg:"",
              basicObj:{
                fqdh: "",
                fqxm: "",
                idCart: "",
                mqdh: "",
                mqxm: "",
                qq: "",
                realName: "",
                txdh: "",
                txxm: "",
                wechat: "",
                xxwmm: "",
                xxwzh: "",
                yysmm: ""
              },
              bankObj:{
                bankAccount: "",
                fhxx: "",
                // tbmm: "",
                tbzh: "",
                // zfbmm: "",
                zfbzh: "",
                bank:""
              },
              workObj:{
                familyAddress: "",
                workAddress: "",
                workUnit: ""
              },
              uploadUrl:"sdsddsd/dsd",
              uploadObj:{
                images:[{
                  url:"http://pic.58pic.com/58pic/15/63/07/42Q58PIC42U_1024.jpg"
                }],

                params:{}
              },
              userId:""
            }
        },
        mounted() {
          let vm=this;
          this.$vux.loading.show({
            text: '正在加载中...'
          })
          vm.maxHei=window.screen.height-110+"px";
          vm.$api.get("api/user/info","",function ({data}) {
            vm.$vux.loading.hide();
            if(data.code==20){
              vm.userId=data.data.id
            }
          });
          vm.$api.get("api/user/bank","",function ({data}) {
            if(data.code==20){
              vm.bankObj=data.data
              delete vm.bankObj.zfbmm;
              delete vm.bankObj.tbmm;
            }else {

            }
          });
        },
        methods: {
          bankSubmit(){
            let vm=this;
            let zhengshu=/^\d+$/;
            console.log(vm.bankObj);
            for(let key in vm.bankObj){
              if(key!="userId"&&!vm.$refs[key].valid){
                vm.showPositionValue=true;
                vm.popMsg="请把信息填写完整";
                return false
              }
            }
            if(!zhengshu.test(vm.bankObj.bankAccount)){
              vm.showPositionValue=true;
              vm.popMsg="请正确的银行账号";
              return false
            }
            vm.bankObj.userId=vm.userId;
            vm.$api.post("api/user/bank",vm.bankObj,function ({data}) {
                if(data.code==20){
                  vm.showPositionValue=true;
                  vm.popMsg="操作成功";
                }else if(data.code==401){
                  sessionStorage.clear();
                  vm.$router.push({
                    path:"/"
                  })

                }else {
                  vm.show=true;
                  vm.msg=data.message
                }
              }
            )
          },
          onHide () {
          },
          onShow () {
          },
        }
    }
</script>

<style scoped lang='less'>
  .vux-button-group > a.vux-button-tab-item-first{
    border-top-left-radius:0;
    border-bottom-left-radius:0;
    &:after{
      border-top-left-radius:0;
      border-bottom-left-radius:0;
    }
  }
  .vux-button-group > a.vux-button-tab-item-last{
    border-top-right-radius:0;
    border-bottom-right-radius:0;
    &:after{
      border-top-right-radius:0;
      border-bottom-right-radius:0;
    }
  }
  /deep/.weui-input{
    text-align: right !important;
    color: rgb(26, 173, 25);
    font-size: 16px;
    font-family: "楷体";
  }
</style>

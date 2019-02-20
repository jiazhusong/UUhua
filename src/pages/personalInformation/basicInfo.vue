/**
* 作者: jsz
* 日期: 2019-01-15
* 描述:
*/
<template>
    <div>
      <x-header style='text-align: center;background: rgb(17, 160, 0);line-height: 50px;color: #fff'>资料认证</x-header>
      <div  style='margin-bottom: 60px; '>
        <div  :style='{"max-height": maxHei}' style='overflow: auto'>
          <group ref='groups'>
            <x-input label-width='100' title='姓名：' required  ref='realName'  placeholder="请输入真实姓名" v-model="basicObj.realName">
            </x-input>
            <x-input label-width='100' title='身份证号码：' required  ref='idCart'  placeholder="请输入身份证号码" v-model="basicObj.idCart">
            </x-input>
            <x-input label-width='100' title='QQ号码：' required  ref='qq'  placeholder="请输入QQ号码" v-model="basicObj.qq">
            </x-input>
            <x-input label-width='100' title='微信号码：' required ref='wechat'  placeholder="请输入微信号码" v-model="basicObj.wechat">
            </x-input>
            <x-input label-width='100' title='学信网账号：' required ref='xxwzh'  placeholder="请输入学信网账号" v-model="basicObj.xxwzh">
            </x-input>
            <x-input label-width='100' title='学信网密码：' required  ref='xxwmm' placeholder="请输入学信网密码" v-model="basicObj.xxwmm">
            </x-input>
            <x-input label-width='100' title='运营商密码：' required  ref='yysmm' placeholder="请输入运营商密码" v-model="basicObj.yysmm">
            </x-input>
            <x-input label-width='100' title='父亲姓名：' required ref='fqxm'  placeholder="请输入父亲姓名" v-model="basicObj.fqxm">
            </x-input>
            <x-input label-width='100' title='父亲电话：' required ref='fqdh'  placeholder="请输入父亲电话" v-model="basicObj.fqdh">
            </x-input>

            <x-input label-width='100' title='母亲姓名：'  required ref='mqxm' placeholder="请输入母亲姓名" v-model="basicObj.mqxm">
            </x-input>
            <x-input label-width='100' title='母亲电话：' required ref='mqdh' placeholder="请输入母亲电话" v-model="basicObj.mqdh">
            </x-input>
            <x-input label-width='100' title='同学姓名：' required ref='txxm' placeholder="请输入同学姓名" v-model="basicObj.txxm">
            </x-input>
            <x-input label-width='100' title='同学电话：' required ref='txdh' placeholder="请输入同学电话" v-model="basicObj.txdh">
            </x-input>
            <div style='height:1px;background: #D9D9D9; '></div>
            <x-button style='margin-top: 20px;' @click.native='basicSubmit' type="primary" >保存</x-button>
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
</template>

<script>
  import { XInput,Group,XButton,XHeader,Cell,Tabbar,TabbarItem,ButtonTab, ButtonTabItem ,Radio,Alert,Loading , TransferDomDirective as TransferDom ,Toast   } from 'vux'
  // import Uploader from 'vux-uploader'
  import footerCom from '../info/footerCom'
    export default {
        name: "basicInfo",
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
                tbmm: "",
                tbzh: "",
                zfbmm: "",
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
          vm.$api.get("api/user/basic","",function ({data}) {
            if(data.code==20){
              vm.basicObj=data.data
            }else {

            }
          });
        },
        methods: {
          basicSubmit(){
            let vm=this;
            let testREX=/^[\u4e00-\u9fa5]{0,}$/;
            let phoneREX=/^1[34578]\d{9}$/;
            let idCardREX=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            for(let key in vm.basicObj){
              if(key!="userId"&&!vm.$refs[key].valid){
                vm.showPositionValue=true;
                vm.popMsg="请把信息填写完整";
                return false
              }

            }
            if(!testREX.test(vm.basicObj.realName)){
              vm.showPositionValue=true;
              vm.popMsg="请填写真实中文姓名";
              return false
            }
            if(!idCardREX.test(vm.basicObj.idCart)){
              vm.showPositionValue=true;
              vm.popMsg="请填写18位正确的身份证号";
              return false
            }
            if(!testREX.test(vm.basicObj.fqxm)){
              vm.showPositionValue=true;
              vm.popMsg="请填写父亲中文姓名";
              return false
            }
            if(!phoneREX.test(vm.basicObj.fqdh)){
              vm.showPositionValue=true;
              vm.popMsg="请填写11位父亲电话";
              return false
            }
            if(!testREX.test(vm.basicObj.mqxm)){
              vm.showPositionValue=true;
              vm.popMsg="请填写母亲中文姓名";
              return false
            }
            if(!phoneREX.test(vm.basicObj.mqdh)){
              vm.showPositionValue=true;
              vm.popMsg="请填写11位母亲电话";
              return false
            }
            if(!testREX.test(vm.basicObj.txxm)){
              vm.showPositionValue=true;
              vm.popMsg="请填写同学中文姓名";
              return false
            }
            if(!phoneREX.test(vm.basicObj.txdh)){
              vm.showPositionValue=true;
              vm.popMsg="请填写11位同学电话";
              return false
            }

            vm.basicObj.userId=vm.userId;
            vm.$api.post("api/user/basic",vm.basicObj,function ({data}) {
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
            })
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

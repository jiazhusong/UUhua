/**
* 作者: jsz
* 日期: 2018-11-08
* 描述:
*/
<template>
    <div >
      <x-header style='text-align: center;background: #ff9000;line-height: 50px;color: #fff'>我的资料</x-header>
      <div  style='margin-bottom: 60px; '>
        <div>
          <tab>
            <tab-item selected @on-item-click="onItemClick">基本信息</tab-item>
            <tab-item @on-item-click="onItemClick">银行卡信息</tab-item>
            <tab-item @on-item-click="onItemClick">工作信息</tab-item>
          </tab>
        </div>
        <div v-show='showNum==0' :style='{"max-height": maxHei}' style='overflow: auto'>
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
            <!--<div style='padding-left: 15px;'>-->
              <!--<span>身份证正面照</span>-->
              <!--<input  type='file' >-->
              <!--<uploader-->
                <!--style='display: inline-block'-->
                <!--:images="uploadObj.images"-->
                <!--:handle-click="true"-->
                <!--:show-header="false"-->
                <!--:readonly="true"-->
                <!--:upload-url="uploadObj.uploadUrl"-->
                <!--name="img"-->
                <!--:params="uploadObj.params"-->
                <!--size="small"-->
                <!--@add-image="addImageMethod"-->
              <!--&gt;-->
                <!--上传-->
              <!--</uploader>-->
            <!--</div>-->

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
            <!--<div style='display: flex;border-top: 1px solid #D9D9D9;'>-->
            <!--<spans style='width: 100px;margin-left: 15px;'>性别：</spans>-->
            <!--<div style='flex: 1'>-->
            <!--<radio v-model='sex' :selected-label-style="{color: '#1AAD19'}"    :options="list" @on-change="change"></radio>-->
            <!--</div>-->
            <!--</div>-->

            <!--<x-input  placeholder='年龄' v-model="age">-->
            <!--<i slot="label" style="padding-right:10px;display:block;width: 24px;height:24px"   class="iconfont icon-yanzhengma"  ></i>-->
            <!--<img slot="right-full-height" src="https://ws1.sinaimg.cn/large/663d3650gy1fq684go3glj203m01hmwy.jpg">-->
            <!--</x-input>-->
            <!--@remove-image="removeImageMethod"-->
            <div style='height:1px;background: #D9D9D9; '></div>
            <!--<uploader-->
              <!--:images="images"-->
              <!--:handle-click="true"-->
              <!--:show-header="false"-->
              <!--:upload-url="uploadUrl"-->
              <!--name="img"-->
              <!--size="small"-->
              <!--@add-image="addImageMethod"-->

            <!--&gt;</uploader>-->
            <x-button style='margin-top: 20px;' @click.native='basicSubmit' type="primary" >保存</x-button>
          </group>
        </div>
        <div v-show='showNum==1' :style='{"max-height": maxHei}' style='overflow: auto'>
          <group>
            <x-input label-width='100' title='银行：'  required  ref='bank' placeholder="请输入开户银行" v-model="bankObj.bank">
            </x-input>
            <x-input label-width='100' title='银行账号：'  required ref='bankAccount' placeholder="请输入银行账号" v-model="bankObj.bankAccount">
            </x-input>
            <x-input label-width='100' title='分行信息：'  required ref='fhxx' placeholder="请输入分行信息" v-model="bankObj.fhxx">
            </x-input>
            <x-input label-width='100' title='支付宝账号：' required ref='zfbzh' placeholder="请输入支付宝账号" v-model="bankObj.zfbzh">
            </x-input>
            <x-input label-width='100' title='支付宝密码：'  required ref='zfbmm' placeholder="请输入支付宝密码" v-model="bankObj.zfbmm">
            </x-input>
            <x-input label-width='100' title='淘宝账号：'  required ref='tbzh' placeholder="请输入淘宝账号" v-model="bankObj.tbzh">
            </x-input>
            <x-input label-width='100' title='淘宝密码：' required ref='tbmm'  placeholder="请输入淘宝密码" v-model="bankObj.tbmm">
            </x-input>
            <div style='height:1px;background: #D9D9D9; '></div>
            <x-button style='margin-top: 20px;' type="primary" @click.native='bankSubmit'>保存</x-button>
          </group>
        </div>
        <div v-show='showNum==2' :style='{"max-height": maxHei}' style='overflow: auto'>
          <group>
            <x-input title='工作单位：'  placeholder="请输入工作单位" ref='workUnit' required v-model="workObj.workUnit">
            </x-input>
            <x-input title='单位地址：'  placeholder="请输入单位地址" ref='workAddress' required v-model="workObj.workAddress">
            </x-input>
            <x-input title='家庭地址：'  placeholder="请输入家庭地址" ref='familyAddress' required v-model="workObj.familyAddress">
            </x-input>

            <div style='height:1px;background: #D9D9D9; '></div>
            <x-button style='margin-top: 20px;' type="primary" @click.native='workSubmit'>保存</x-button>
          </group>
        </div>
      </div>
      <div v-transfer-dom>
        <alert v-model="show"  @on-show="onShow" @on-hide="onHide"> {{msg}}</alert>
      </div>
      <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask  position="middle">{{popMsg}}</toast>
      <tabbar style='position: fixed'>
        <tabbar-item  link="/layout">
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
    </div>
</template>

<script>
  import { XInput,Group,XButton,XHeader,Cell,Tabbar,TabbarItem,Tab,TabItem ,Radio,Alert,Loading , TransferDomDirective as TransferDom ,Toast   } from 'vux'
  // import Uploader from 'vux-uploader'

    export default {
        name: "myInfo",
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
          Tab,
          TabItem,
          Radio,
          // Uploader,
          Alert,
          Toast,
          Loading
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
          vm.maxHei=window.screen.height-160+"px";
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
          vm.$api.get("api/user/bank","",function ({data}) {
            if(data.code==20){
              vm.bankObj=data.data
            }else {

            }
         });
          vm.$api.get("api/user/work","",function ({data}) {
            if(data.code==20){
              vm.workObj=data.data
            }else {

            }
         })
        },
        methods: {
          onItemClick(value){
            this.showNum=value;
          },

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
          addImageMethod(){
          },
          bankSubmit(){
            let vm=this;
            let zhengshu=/^\d+$/;
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
          workSubmit(){
            let vm=this;
            for(let key in vm.workObj){
              if(key!="userId"&&!vm.$refs[key].valid){
                vm.showPositionValue=true;
                vm.popMsg="请把信息填写完整";
                return false
              }
            }
            vm.workObj.userId=vm.userId;
            vm.$api.post("api/user/work",vm.workObj,function ({data}) {
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

</style>

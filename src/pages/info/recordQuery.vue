/**
* 作者: jsz
* 日期: 2018-11-08
* 描述:
*/
<template>
    <div>
      <x-header style='text-align: center;background: rgb(17, 160, 0);line-height: 50px;color: #fff'>账单查询</x-header>
      <!--<div>逾期滞纳金：<span style='color: rgb(232, 48, 48)'>{{datas.length>0?datas[0].penalty:0}}</span></div>-->
      <div :style='{"height":maxHei}' style='overflow: auto' >

        <!--<form-preview v-if='list.length>0' header-label="申请金额" header-value="¥1500" :body-items="list" :footer-buttons="buttonsArr" name="demo"></form-preview>-->
        <div  v-if='list.bill!=""'>
          <div style='border-bottom: 1px solid #0BB20C;border-top:1px solid #0BB20C;line-height: 50px;padding-left: 10px;margin-top: 20px;'>滞纳金:<span style='color: rgb(26, 173, 25);font-size: 18px'>￥{{list.penalty==""?0:list.penalty}}</span></div>
          <div style='display: flex;justify-content: space-around;line-height: 30px;border-bottom: 1px solid #0BB20C;'>

            <div style='width: 48%;padding: 20px 5px'>
              <div>申请时间:<span>{{list.submitDate}}</span></div>
              <div>还款时间:<span>{{list.billRepaymentTime}}</span></div>
              <div>状态:<span style='color: rgb(26, 173, 25);'>{{list.status}}</span></div>
            </div>
            <!--<div style='width: 1px;background: #0BB20C;'></div>-->
            <div style='width: 48%;text-align: center;padding: 20px 5px'>
              <div style='color:#1AAD19;font-size: 22px;display: flex;justify-content: space-between;line-height: 60px;'><span style='font-size: 26px'>￥1500 </span><span>7天</span></div>
              <!--<x-button type='primary' @click.native='showTipFun'>还款</x-button>-->
            </div>
          </div>
        </div>
        <div v-if='list.bill!=""' style='font-size: 12px;color: #999;line-height: 20px;padding-left: 15px;margin-top: 20px;'>注：还款的最后时间为还款日20:00，逾期将产生逾期滞纳金，请按时还款。</div>
        <p style='text-align: center' v-if='list.bill==""'>暂无数据</p>
      </div>
      <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask text="" position="middle">{{popmsg}}</toast>
      <footerCom></footerCom>
      <div v-transfer-dom>
        <loading :show="show2" text=""></loading>
      </div>
      <div v-transfer-dom>
        <alert v-model="show" >
          <div style='line-height: 24px'>
            <div >还款账号已复制</div>
            <div>请自行还款到公司企业账户</div>
            <div>支付宝：（杜业武）<span style='color: red'>18771186061</span></div>
            <div>还款时间截止账单日20:00，还款时请添加备注<span style='color: red'>“姓名+手机号”</span>，系统会在一小时内自动处理</div>

          </div>
        </alert>
      </div>
    </div>
</template>

<script>
  import {XHeader,Tabbar,TabbarItem ,XTable ,Toast,Loading,TransferDomDirective as TransferDom ,Alert,XButton,FormPreview,Cell} from 'vux'
  import footerCom from './footerCom'
    export default {
        name: "recordQuery",
      directives: {
        TransferDom
      },
        components: {
          XHeader,
          Tabbar,
          TabbarItem,
          XTable,
          Toast,
          Loading,
          Alert,
          XButton,
          footerCom,
          FormPreview,
          Cell
        },
        props: [],
      filters:{
        statusFun(value){
          if(value=="PENDING"){
            return "待审核"
          }else if(value=="PASS"){
            return "审核通过"
          }else {
            return "结束"
          }
        }
      },
        data() {
            return {
              maxHei:"",
              tipshow:false,
              datas:[],
              showPositionValue:false,
              popmsg:"",
              show2:false,
              show:false,
              msg:"",
              infoShow:false,
              list:{
                submitDate:"",
                billRepaymentTime:"",
                status:"",
                penalty:"",
                bill:"",
                loanDay:"",
              },

            }
        },
        mounted() {
          let vm=this;
          this.$vux.loading.show({
            text: '正在加载中...'
          })
          vm.maxHei=window.screen.height-100+"px";
          // vm.$api.get("api/bill/loan/check",{
          //   page:0,
          //   size:50,
          // },function ({data}) {
          //   vm.$vux.loading.hide();
          //   console.log(1);
          //   console.log(data.code);
          //
          //   if(data.code==20){
          //     vm.tipshow=true;
          //       vm.list=[{
          //         label: '申请时间',
          //         value: data.data.submitDate.slice(0,10)
          //       },{
          //         label: '还款时间',
          //         value: data.data.billRepaymentTime?v.billRepaymentTime.substr(0,10):""
          //       },{
          //         label: '状态',
          //         value: vm.statusFilters(data.data.status)
          //       },{
          //         label: '逾期滞纳金',
          //         value: data.data.penalty?data.data.penalty:0
          //       }]
          //
          //   }else if(data.code==401){
          //     sessionStorage.clear();
          //     vm.$router.push({
          //       path:"/"
          //     })
          //
          //   }else {
          //     vm.popmsg=data.message;
          //     vm.showPositionValue=true;
          //   }
          // })
          vm.$api.get("api/bill/loan/check",{
            // page:0,
            // size:50,
          },function (res) {
            let data=res.data;
            vm.$vux.loading.hide();
            if(data.code==20){
              vm.tipshow=true;
              vm.list={
                  submitDate:data.data.submitDate.slice(0,10),
                  billRepaymentTime:data.data.billRepaymentTime?data.data.billRepaymentTime.substr(0,10):"",
                  status:vm.statusFilters(data.data.status),
                  penalty:data.data.penalty?data.data.penalty:0,
                  bill:data.data.bill,
                  loanDay:data.data.loanDay,
              }
            }else if(data.code==401){
              sessionStorage.clear();
              vm.$router.push({
                path:"/"
              })

            }else {
              vm.popmsg=data.message;
              vm.showPositionValue=true;
            }
          })
        },
        methods: {
          showTipFun(){
            let vm=this;
            // vm.infoShow=true;
            vm.show=true;
            vm.msg="如需延期，请联系管理员审核"
            vm.Copy(18771186061)
          },
          statusFilters(value){
            if(value=="PENDING"){
              return "待审核"
            }else if(value=="PASS"){
              return "审核通过"
            }else {
              return "结束"
            }
          },
         Copy(str){
            var save = function(e){
              e.clipboardData.setData('text/plain', str);
              e.preventDefault();
            }
            document.addEventListener('copy', save);
            document.execCommand('copy');
            document.removeEventListener('copy',save);
          }
        }
    }
</script>

<style scoped lang='less'>

  .weui-form-preview__btn_primary{
    color: #dc0b0b!important;
  }
</style>

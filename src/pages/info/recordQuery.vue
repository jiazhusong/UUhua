/**
* 作者: jsz
* 日期: 2018-11-08
* 描述:
*/
<template>
    <div>
      <x-header style='text-align: center;background: rgb(94, 35, 237);line-height: 50px;color: #fff'>账单查询</x-header>
      <!--<div>逾期滞纳金：<span style='color: rgb(232, 48, 48)'>{{datas.length>0?datas[0].penalty:0}}</span></div>-->
      <div :style='{"height":maxHei}' style='overflow: auto' >
        <!--<div style='text-align: right'><x-button @click.native='showTipFun' type="primary" style='width: 100px;margin-right: 0;margin:5px;' :mini=true>账单延期</x-button></div>-->
        <!--<x-table  :cell-bordered="false" style="background-color:#fff;">-->
          <!--<thead>-->
          <!--<tr>-->
            <!--<th>周期</th>-->
            <!--<th>申请时间</th>-->
            <!--<th>还款时间</th>-->
            <!--<th>状态</th>-->
            <!--<th>申请额度</th>-->
          <!--</tr>-->
          <!--</thead>-->
          <!--<tbody>-->
          <!--<tr v-for='item in datas'>-->
            <!--<td>{{item.loanDay}}天</td>-->
            <!--<td>{{item.submitDate.slice(0,10)}}</td>-->
            <!--<td>{{item.billRepaymentTime?item.billRepaymentTime.substr(0,10):""}}</td>-->
            <!--<td>{{item.status|statusFun}}</td>-->
            <!--<td style='color: rgb(63, 33, 222)'>{{item.bill}}</td>-->
          <!--</tr>-->
          <!--</tbody>-->
        <!--</x-table>-->
        <!--<div style='display: flex;border: 1px solid #ccc;box-shadow: 0 0 10px #ccc;padding-left: 10px;margin-top: 5px;' v-for='item in arr'>-->

          <!--<div style='width: 50%;'>-->
            <!--<span>申请时间：<span>2016-11-1</span></span>-->
            <!--<br>-->
            <!--&lt;!&ndash;<span>状态<br><span>未审核</span></span>&ndash;&gt;-->
            <!--<span>还款时间：<span>2016-11-7</span></span>-->
            <!--<br>-->
            <!--<span>状态：<span style='color: #dc0b0b'>未审核</span></span>-->
            <!--<br>-->
            <!--<span>逾期滞纳金：<span >12121</span></span>-->
          <!--</div>-->
          <!--<div style='width: 50%;padding-left: 10px;'>-->
            <!--<span>申请金额：<span style='color: #dc0b0b'>1200元</span></span>-->
            <!--<br>-->
            <!--<span>周期：<span>6天</span></span>-->
            <!--<br>-->
            <!--<x-button type="primary" style='width: 100px;margin-right: 0;margin:5px;' :mini=true>账单分解</x-button>-->
          <!--</div>-->

        <!--</div>-->
        <div>
          <flow>
            <flow-state state="1" title="未审核" is-done></flow-state>
            <flow-line is-done></flow-line>

            <flow-state state="2" is-done>
              <span slot="title">审核通过</span>
            </flow-state>
            <flow-line tip="进行中"></flow-line>

            <flow-state state="3" title="结束"></flow-state>

            <!--<flow-state state="4" title="$t('Done')"></flow-state>-->
          </flow>
        </div>
        <div class='blueBg'>
          <div style='display: flex;justify-content: space-between'>
            <span>申请时间</span>
            <span>{{list.submitDate}}</span>
          </div>
          <div style='display: flex;justify-content: space-between'>
            <span>还款时间</span>
            <span>{{list.billRepaymentTime}}</span>
          </div>
         <div style='display: flex;justify-content: space-around;line-height: 40px;'>
           <div style='color: #d009ca;font-size: 24px'>
              <span >￥1500</span>
             <br>
             申请金额
           </div>
           <div style='color: #d009ca;font-size: 24px'>
             <span >￥{{list.penalty}}</span>
             <br>
             滞纳金
           </div>
         </div>
          <div>
            <div @click='showTipFun'  class="btn" data-clipboard-text="13477524242" data-clipboard-action="copy" style='text-align: center;color:#FFF;line-height: 50px;background: #1d0da7;'>还款</div>
          </div>
        </div>

        <!--<input type="text" id="taokouling" value='18771186061' hidden>-->
        <p style='text-align: center' v-if='list.submitDate==""'>暂无数据</p>
        <div v-if='list.submitDate!=""' style='font-size: 12px;color: #999;line-height: 40px;padding-left: 15px;'>注：还款的最后时间为还款日18:00，逾期将产生逾期滞纳金</div>
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
            <div>请自行还款到</div>
            <div>支付宝：（吕培培）<span style='color: #0014ff'>13477524242</span></div>
            <div>还款时间截止账单日18:00，还款时请添加备注<span style='color: #0014ff'>“姓名+手机号”</span>，逾期将产生滞纳金。</div>

          </div>
        </alert>
      </div>
    </div>
</template>

<script>
  import {XHeader,Tabbar,TabbarItem ,XTable ,Toast,Loading,TransferDomDirective as TransferDom ,Alert,XButton,FormPreview,Cell,Flow, FlowState, FlowLine} from 'vux'
  import footerCom from './footerCom'
  import Clipboard from 'clipboard';
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
          Cell,
          Flow,
          FlowState,
          FlowLine
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
                penalty:"",
              },
              // buttonsArr:[
              //   {
              //     style: 'primary',
              //     text: "还款",
              //     onButtonClick: (name) => {
              //       this.showTipFun();
              //     }
              //   }
              // ]
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
              vm.list.submitDate=data.data.submitDate.slice(0,10);
              vm.list.billRepaymentTime=data.data.billRepaymentTime?data.data.billRepaymentTime.substr(0,10):"";
              vm.list.penalty=data.data.penalty?data.data.penalty:0;
              // vm.list=[{
              //   label: '申请时间',
              //   value: data.data.submitDate.slice(0,10)
              // },{
              //   label: '还款时间',
              //   value: data.data.billRepaymentTime?data.data.billRepaymentTime.substr(0,10):""
              // },{
              //   label: '状态',
              //   value: vm.statusFilters(data.data.status)
              // },{
              //   label: '逾期滞纳金',
              //   value: data.data.penalty?data.data.penalty:0
              // }]
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
            // vm.msg="如需延期，请联系管理员审核"
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
            // var save = function(event){
            //   let e=event||window.event
            //   e.clipboardData.setData('text/plain', str);
            //   e.preventDefault();
            // }
            // document.addEventListener('copy', save);
            // document.execCommand('copy');
            // document.removeEventListener('copy',save);
           var clipboard = new Clipboard('.btn');
           clipboard.on('success', function(e){
             console.log(e);
             // document.getElementById('copyCode').innerHTML = '复制成功';
           });
           clipboard.on('error', function(e){
             // document.getElementById('copyCode').innerHTML = '复制失败，请长按复制';
           });
          }
        }
    }
</script>

<style scoped lang='less'>

  .weui-form-preview__btn_primary{
    color: #dc0b0b!important;
  }
  .blueBg{
    height: 200px;
    color: #fff;
    background: url("../../../static/bluebg.jpg");
    line-height: 40px;
  }
</style>

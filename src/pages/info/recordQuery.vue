/**
* 作者: jsz
* 日期: 2018-11-08
* 描述:
*/
<template>
    <div>
      <x-header style='text-align: center;background: rgb(237, 72, 35);line-height: 50px;color: #fff'>账单查询</x-header>
      <!--<div>逾期滞纳金：<span style='color: rgb(232, 48, 48)'>{{datas.length>0?datas[0].penalty:0}}</span></div>-->
      <div :style='{"height":maxHei}' style='overflow: auto'>
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
        <div style='display: flex;border: 1px solid #ccc;box-shadow: 0 0 10px #ccc;padding-left: 10px;margin-top: 5px;' v-for='item in arr'>

          <div style='width: 50%;'>
            <span>申请时间：<span>2016-11-1</span></span>
            <br>
            <!--<span>状态<br><span>未审核</span></span>-->
            <span>还款时间：<span>2016-11-7</span></span>
            <br>
            <span>状态：<span style='color: #dc0b0b'>未审核</span></span>
            <br>
            <span>逾期滞纳金：<span >12121</span></span>
          </div>
          <div style='width: 50%;padding-left: 10px;'>
            <span>申请金额：<span style='color: #dc0b0b'>1200元</span></span>
            <br>
            <span>周期：<span>6天</span></span>
            <br>
            <x-button type="primary" style='width: 100px;margin-right: 0;margin:5px;' :mini=true>账单分解</x-button>
          </div>

        </div>

        <!--<p style='text-align: center' v-if='datas.length==0&&tipshow==true'>暂无数据</p>-->
      </div>
      <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask text="" position="middle">{{popmsg}}</toast>
      <footerCom></footerCom>
      <div v-transfer-dom>
        <loading :show="show2" text=""></loading>
      </div>
      <div v-transfer-dom>
        <alert v-model="show" > {{msg}}</alert>
      </div>
    </div>
</template>

<script>
  import {XHeader,Tabbar,TabbarItem ,XTable ,Toast,Loading,TransferDomDirective as TransferDom ,Alert,XButton} from 'vux'
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
          footerCom
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
              arr:[1,2,3,4,5,6,7,8,9,10]
            }
        },
        mounted() {
          let vm=this;
          this.$vux.loading.show({
            text: '正在加载中...'
          })
          vm.maxHei=window.screen.height-100+"px";
          vm.$api.get("api/bill/loan/check",{
            page:0,
            size:50,
          },function ({data}) {
            vm.$vux.loading.hide();
            if(data.code==20){
              vm.tipshow=true;
              vm.datas=data.data.list
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
            vm.show=true;
            vm.msg="如需延期，请联系管理员审核"
          }
        }
    }
</script>

<style scoped lang='less'>

</style>

/**
* 作者: jsz
* 日期: 2018-11-08
* 描述:
*/
<template>
  <div>
    <x-header style='text-align: center;background: rgb(17, 160, 0);line-height: 50px;color: #fff'>申请记录</x-header>
    <div :style='{"height":maxHei}' style='overflow: auto;margin-bottom: 60px; '>
      <div style='display: flex;border: 1px solid #ccc;box-shadow: 0 0 10px #ccc;padding-left: 10px;margin-top: 5px;' v-for='item in datas'>
        <div style='display: flex;justify-content: space-between'>
          <div>
            <img v-if='item.status=="PENDING"' src="../../../static/1.jpg" alt="">
            <img v-if='item.status=="PASS"' src="../../../static/2.jpg" alt="">
            <img v-if='item.status=="END"' src="../../../static/3.jpg" alt="">
          </div>
        </div>
        <div style='width: 80%;'>
          <div style='text-align: center;display: flex;justify-content: space-around'>
            <div >
              <div>申请时间</div>
              <div>{{item.submitDate.slice(0,10)}}</div>
              <div>申请金额</div>
              <div style='color:rgb(55, 228, 12)'>{{item.bill}}元</div>
            </div>
            <div>
              <div>还款时间</div>
              <div>{{item.billRepaymentTime?item.billRepaymentTime.substr(0,10):""}}</div>
              <div>申请周期</div>
              <div style='color: rgb(55, 228, 12)'>{{item.loanDay}}天</div>
            </div>
            <!--<span>状态<br><span>未审核</span></span>-->
            <!--<span>状态：<span style='color: #dc0b0b'>{{item.status|statusFun}}</span></span>-->
          </div>
          <div style='text-align: center'><span style='color: #dc0b0b'>{{item.status|statusFun}}</span></div>
        </div>

      <!--<div style='width: 50%;padding-left: 10px;'>-->
      <!--<span>申请金额：<span style='color: #dc0b0b'>{{item.bill}}</span></span>-->
      <!--<br>-->
      <!--<span>周期：<span>{{item.loanDay}}天</span></span>-->
      <!--<br>-->
      <!--&lt;!&ndash;<x-button type="primary" style='width: 100px;margin-right: 0;margin:5px;' :mini=true>账单分解</x-button>&ndash;&gt;-->
      <!--</div>-->

      </div>
      <p style='text-align: center' v-if='datas.length==0&&tipshow==true'>暂无数据</p>
    </div>
    <footerCom ></footerCom>
    <div v-transfer-dom>
      <loading :show="show2" text=""></loading>
    </div>
    <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask text="" position="middle">{{popmsg}}</toast>

  </div>

</template>

<script>
  import {XHeader,Tabbar,TabbarItem ,XTable,Loading,TransferDomDirective as TransferDom,Toast   } from 'vux'
  import footerCom from './footerCom'
  export default {
        name: "applicationRecord",
    directives: {
      TransferDom
    },
        components: {
          XHeader,
          Tabbar,
          TabbarItem,
          XTable,
          Loading,
          Toast,
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
              datas:[],
              tipshow:false,
              show2:false,
              showPositionValue:false,
              popmsg:"",
              arr:[1,2,3,5,6,7,8]
            }
        },
        mounted() {
          let vm=this;
          vm.maxHei=window.screen.height-100+"px";
          this.$vux.loading.show({
            text: '正在加载中...'
          })
          vm.$api.get("api/bill/loan/history",{
            page:0,
            size:50,
          },function ({data}) {
            vm.$vux.loading.hide();
            if(data.code==20){
              vm.tipshow=true;
              vm.datas=data.data.list
            }else if(data.code==401||data.code==404){
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

        }
    }
</script>

<style scoped lang='less'>

</style>

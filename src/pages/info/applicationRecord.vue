/**
* 作者: jsz
* 日期: 2018-11-08
* 描述:
*/
<template>
  <div>
    <x-header style='text-align: center;background: #ff9000;line-height: 50px;color: #fff'>申请记录</x-header>
    <div :style='{"height":maxHei}' style='overflow: auto;margin-bottom: 60px; '>


      <x-table :cell-bordered="false"  style="background-color:#fff;">
        <thead>
        <tr>
          <th>申请周期</th>
          <th>申请时间</th>
          <th>状态</th>
          <th>申请额度</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='item in datas'>
          <td>{{item.loanDay}}天</td>
          <td>{{item.submitDate}}</td>
          <td>{{item.status|statusFun}}</td>
          <td style='color: rgb(255, 144, 0)'>{{item.bill}}</td>
        </tr>

        </tbody>
      </x-table>
      <p style='text-align: center' v-if='datas.length==0&&tipshow==true'>暂无数据</p>
    </div>
    <tabbar style='position: fixed'>
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
  import {XHeader,Tabbar,TabbarItem ,XTable,Loading,TransferDomDirective as TransferDom,Toast   } from 'vux'

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
          Toast

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
              popmsg:""
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

        }
    }
</script>

<style scoped lang='less'>

</style>

/**
* 作者: jsz
* 日期: 2018-11-08
* 描述:
*/
<template>
    <div>
      <x-header style='text-align: center;background: rgb(237, 72, 35);line-height: 50px;color: #fff'>账单查询</x-header>
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
        <div style='font-size: 12px;color: #999;line-height: 40px;padding-left: 15px;'>注：还款的最后时间为还款日22:00，逾期将产生逾期滞纳金</div>
        <form-preview header-label="申请金额" header-value="¥1500" :body-items="list" :footer-buttons="buttonsArr" name="demo"></form-preview>

        <p style='text-align: center' v-if='datas.length==0&&tipshow==true'>暂无数据</p>
        <div v-if='infoShow'>
          <div style='text-align: center'>收款人信息</div>
          <cell title="收款人姓名" value="杜亮" ></cell>
          <cell title="支付宝账号"   value="2948515@qq.com"></cell>
          <cell title="微信账号"   value="121212121"></cell>
          <cell title="管理员电话"   value="121212121"></cell>
        </div>
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
            <div>支付宝：<span style='color: red'>232323@qq.com</span></div>
            <div>还款时间截止账单日22:00，还款时请添加备注<span style='color: red'>“姓名+手机号”</span>，系统会在一小时内自动处理</div>

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
              arr:[1,2,3,4,5,6,7,8,9,10],
              list:[{
                label: '申请时间',
                value: '2012.12.12'
              }, {
                label: '标题标题',
                value: '名字名字名字'
              }, {
                label: '标题标题',
                value: '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字'
              }],
              buttonsArr:[
                {
                  style: 'primary',
                  text: "还款",
                  onButtonClick: (name) => {
                    this.showTipFun();
                  }
                }
              ]
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
              data.data.list.forEach((v)=>{
                vm.datas.push([{
                  label: '申请时间',
                  value: v.submitDate.slice(0,10)
                },{
                  label: '还款时间',
                  value: v.billRepaymentTime?v.billRepaymentTime.substr(0,10):""
                },{
                  label: '状态',
                  value: vm.statusFilters(v.status)
                },{
                  label: '逾期滞纳金',
                  value: v.penalty?v.penalty:0
                },])
              })
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
            // vm.infoShow=true;
            vm.show=true;
            vm.msg="如需延期，请联系管理员审核"
            vm.Copy("23232322")
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

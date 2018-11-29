import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/pages/login/login'
// import register from '@/pages/login/register'
// import resetpass from '@/pages/login/resetPassword'
// import userLayout from "@/pages/layout/userMain"
// import layout from "@/pages/layout/layout"
// import myInfo from "@/pages/info/myInfo"
// import applicationRecord from "@/pages/info/applicationRecord"
// import recordQuery from "@/pages/info/recordQuery"
const login = r => require.ensure([],() => r(require('@/pages/login/login')),'login');
const register = r => require.ensure([],() => r(require('@/pages/login/register')),'register');
const resetpass = r => require.ensure([],() => r(require('@/pages/login/resetPassword')),'resetpass');
const userLayout = r => require.ensure([],() => r(require('@/pages/layout/userMain')),'userLayout');
const layout = r => require.ensure([],() => r(require('@/pages/layout/layout')),'layout');
const myInfo = r => require.ensure([],() => r(require('@/pages/info/myInfo')),'myInfo');
const applicationRecord = r => require.ensure([],() => r(require('@/pages/info/applicationRecord')),'applicationRecord');
const recordQuery = r => require.ensure([],() => r(require('@/pages/info/recordQuery')),'recordQuery');
Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path:'/resetpass',
      name: 'resetpass',
      component: resetpass
    },
    {
      path:'/userLayout',
      name: 'userLayout',
      component: userLayout,
      meta: {
        requireAuth: true
      },
    },
    {
      path:'/layout',
      name: 'layout',
      component: layout,
      meta: {
        requireAuth: true
      },
    },
    {
      path:'/myInfo',
      name: 'myInfo',
      component: myInfo,
      meta: {
        requireAuth: true
      },
    },
    {
      path:'/applicationRecord',
      name: 'applicationRecord',
      component: applicationRecord,
      meta: {
        requireAuth: true
      },
    },
    {
      path:'/recordQuery',
      name: 'recordQuery',
      component: recordQuery,
      meta: {
        requireAuth: true
      },
    }

  ]
})
//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
     if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
         if (sessionStorage.getItem('username')) {// 判断是否登录
             next()
          } else {// 没登录则跳转到登录界面
           next({
              path: '/',
               query: {redirect: to.fullPath}
            })
          }
      } else {
         next()
       }
   })
export default router

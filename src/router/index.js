import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    meta: {
      title: '登录'
    },
    hidden: true,
  },
  {
    path: '/register',
    component: () => import("@/views/register/index"),
    meta: {
      title: '注册'
    },
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "总览", icon: "dashboard" },
      },
    ],
  },

  // 数据集
  {
    path: "/dataset",
    component: Layout,
    redirect: "/dataset/length-sequnce",
    name: "dataset",
    meta: { title: "数据集", icon: "el-icon-s-help" },
    children: [
      {
        path: "length-sequnce",
        name: "length-sequnce",
        component: () => import("@/views/dataset/length_seq"),
        meta: { title: "长度序列数据", icon: "table" },
      },
      {
        path: "pcap",
        name: "Pcap原数据",
        component: () => import("@/views/dataset/pcap"),
        meta: { title: "Pcap数据", icon: "table" },
      },
      {
        path: "show-pcap-feature",
        name: "Pcap统计特征",
        hidden: true,
        component: () => import("@/views/dataset/show_pcap_feature"),
        meta: { title: "Pcap统计特征", icon: "table" },
      },
    ],
  },

  // 模型
  {
    path: "/model",
    component: Layout,
    redirect: "/model/application-classify",
    name: "model",
    meta: { title: "模型", icon: "tree" },
    children: [
      {
        path: "application-classify",
        name: "application-classify",
        component: () => import("@/views/model/app_classify"),
        meta: { title: "应用分类模型", icon: "eye-open" },
      },
      {
        path: "show-result",
        name: "show-result",
        hidden: true,
        component: () => import("@/views/model/show_result"),
        meta: { title: "分类结果", icon: "eye-open" },
      },
      {
        path: "show-compair-result",
        name: "show-compair-result",
        hidden: true,
        component: () => import("@/views/model/show_compair_result"),
        meta: { title: "对比分类结果", icon: "eye-open" },
      },
    ],
  },

  {
    path: "/example",
    component: Layout,
    redirect: "/example/table",
    name: "Example",
    hidden: false,
    meta: { title: "Example", icon: "el-icon-s-help" },
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/table/index"),
        meta: { title: "Table", icon: "table" },
      },
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/tree/index"),
        meta: { title: "Tree", icon: "tree" },
      },
    ],
  },

  {
    path: "/form",
    hidden: false,
    component: Layout,
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/index"),
        meta: { title: "Form", icon: "form" },
      },
    ],
  },

  // 404 page must be placed at the end !!! 如果放在constantRouterMap一同声明了404，后面的所有页面都会被拦截到404
  { path: "*", redirect: "/404", hidden: true },
];

//异步挂载的路由
//动态需要根据权限加载的路由表
//实例化vue的时候只挂载constantRouter

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

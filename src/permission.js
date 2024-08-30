import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // 导入 nprogress
import "nprogress/nprogress.css"; // 导入样式，否则看不到效果
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: true }); //  // 显示右上角螺旋加载提示

const whiteList = ["/login", "/register"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  // NProgress.start(); // 开启进度条

  // // set page title
  document.title = getPageTitle(to.meta.title);

  // // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    // console.log("hasToken--Debug Permission");
    if (to.path === "/login" || to.path === "/register") {
      // console.log("to dashboard");
      // if is logged in, redirect to the home page
      next({ path: "/" }); // '/'重定向至'dashboard'
      NProgress.done(); // 关闭进度条
    } else {
      next();
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      //  在免登录白名单，直接进入
      next();
    } else {
      // 否则全部重定向到登录页 params 保存 重定向页面路径
      next(`/login?redirect=${to.path}`);
      // NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

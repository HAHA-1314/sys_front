import request from "@/utils/request";

export function login(data) {
  return request({
    url: "http://47.121.210.228:8080/user/doLogin", //vue-admin-template/user/login
    method: "post", //http://36.141.24.254:8087
    data,
  });
}

export function getInfo(token) {
  //本地mock API
  return request({
    url: "/vue-admin-template/user/info",
    method: "get",
    params: { token },
  });
}

export function register(data) {
  return request({
    url: "http://47.121.210.228:8080/user/register",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "http://47.121.210.228:8080/user/logout",
    method: "get", // post mock
  });
}

import axios from "axios";
import qs from "qs";

const axiosInstance = axios.create({
  baseURL: "http://api-dev.ebanjia.cn",
  timeout: 10000,
  responseType: "json",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});

//POST传参序列化(添加请求拦截器)
axiosInstance.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // 序列化
      config.data = qs.stringify( {
        ...config.data
      })
    }

    // // 若是有做鉴权token , 就给头部带上token
    // if (localStorage.token) {
    //   config.headers.Authorization = localStorage.token;
    // }
    return config;
  },
  error => {
    return error;
  }
);

//返回状态判断(添加响应拦截器)
axiosInstance.interceptors.response.use(
  res => {
    console.log(res)
    //对响应数据做些事
    if (res.data.code !== 0) {
      return Promise.reject(res.data);
    }
    return res;
  },
  error => {
    console.error(error)

    // 返回 response 里的错误信息
    return Promise.reject( error);
  }
);


export function Get(url, params) {
  return new Promise((resolve, reject) => {
    axiosInstance.get(url, params).then(function (response) {
      resolve(response.data)
    })
    .catch(function (err) {
      reject(err)
    })
  })
}

export function Post(url, params) {
  return new Promise((resolve, reject) => {
    axiosInstance.post(url, params).then(function (response) {
      resolve(response.data)
    })
    .catch(function (err) {
      reject(err)
    })
  })
}

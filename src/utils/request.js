/*
 * @Author: Bill
 * @Date: 2020-12-29 15:33:34
 * @Last Modified by: Bill
 * @Last Modified time: 2021-01-09 19:23:36
 */
//配置axios
import axios from 'axios';
import qs from 'qs';
// axios.defaults.baseURL = 'http://47.94.40.67:8001';
axios.defaults.baseURL = 'http://47.102.216.240:8001';

// axios.defaults.headers.common["Authorization"] = sessionStorage.getItem('token')
// axios.defaults.headers.common.name =
//请求拦截器
// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJPVGc9Iiwic3ViIjoiMTIzNDUiLCJpc3MiOiIwOThmNmJjZDQ2MjFkMzczY2FkZTRlODMyNjI3YjRmNiIsImlhdCI6MTYxMDE1NTczMiwiYXVkIjoicmVzdGFwaXVzZXIiLCJleHAiOjE2MTAzMjg1MzIsIm5iZiI6MTYxMDE1NTczMn0.TDYkmO_laaql1wpZ99gC-8pnGYbbsXOskswj-E-aVEw'
axios.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        Authorization: sessionStorage.getItem('token'),
        // Authorization: token
    };
    // console.log(config);
    // console.log(config.data, config.method);
    //post需要转成查询字符串
    if ((config.method == 'post') && (config.url !== '/user/login')) {
        config.data = qs.stringify(config.data);




    }
    // Do something before request is sent
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});
//响应拦截器
axios.interceptors.response.use(response => {

    // Do something before response is sent
    let res = {
        ...response,
        data: response.data.data,
        status: response.data.status,
        statusText: response.data.message,
        timestamp: response.data.timestamp
    }
    return res;
}, error => {
    // Do something with response error
    return Promise.reject(error);
});
// axios.defaults.baseURL = 'http://47.93.206.13:5588';
export default axios;
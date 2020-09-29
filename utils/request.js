import axios from 'axios'
import cookie from 'js-cookie'
// 创建axios实例
const service = axios.create({
    // baseURL: 'http://115.29.202.70:8123', // api的base_url
    baseURL: 'http://localhost:8080', // api的base_url
    timeout: 20000 // 请求超时时间
})

function post(url, data) {
    new Promise((resolve, reject) => {
        axios.post(url, data).then(val => {
            resolve(val)
        }).catch(err => {
            reject(err)
        })
    })
}

function postmore(url, data) {
    new Promise((resolve, reject) => {
        axios.post(url, { data }).then(val => {
            resolve(val)
        }).catch(err => {
            reject(err)
        })
    })
}

function get(url) {
    new Promise((resolve, reject) => {
        axios.get(url).then(val => {
            resolve(val)
        }).catch(err => {
            reject(err)
        })
    })
}





service.interceptors.request.use(
    config => {
        //判断cookie中是否有token数据
        if (cookie.get("token")) {
            //把获取出来的值放到header中去
            config.headers['token'] = cookie.get('token');
        }
        if (cookie.get("userInfo") == null && window.location.pathname != "/") {
            console.log(window.location.pathname);
            console.log("xxxxxxxxxxxxxxxxxxxx");
            window.location.href = "/";
        }
        return config
    },
    err => {
        return Promise.reject(err);
    }
)

// http response 拦截器
service.interceptors.response.use(
    response => {
        
        return response;
    },
    error => {
        return Promise.reject(error.response)   // 返回接口返回的错误信息
    });

// service.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     if (cookie.get("userInfo") == null && this.$route.path != "/") {
//         console.log("xxxxxxxxxxxxxxxxxxxx");
//         window.location.href = "/";
//     }
//     return config
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error)
// });



export default service
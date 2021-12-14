import axios from 'axios'
import qs from 'qs'
import { config } from "./config"
let baseURL = config.baseUrl;
// axios实例
axios.defaults.timeout = 120 * 1000;

/**
 * get 请求数据进行修改  默认以对象形式传参
 */
function getDataConfig(data = {}) {
    if (typeof data !== 'object') return data
    const arr = []
    for (let key in data) {
        let res = `${key}=${data[key]}`
        arr.push(res)
    }
    const str = arr.join('&')
    return str
}
/**
 * 请求数据拦截
 */

axios.interceptors.request.use(config => {
    if (localStorage.getItem("pwUserData")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        let pwUserData = JSON.parse(localStorage.getItem("pwUserData"))
        config.headers['Authorization'] = "Bearer " + pwUserData.userToken;
    }
    return config
}, error => {
    return Promise.reject(error)
})
/**
 * 响应数据拦截
 */
axios.interceptors.response.use(response => {
    return response.data
}, error => {
    // console.log('err='+error)
    return Promise.reject(error)
})
const fetch = {
    post(url, datas) {
        let data = qs.stringify(datas)
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: baseURL + url,
                data: data,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(response => {
                resolve(response)
                // if (response && response.resultCode === status) {

                // } else {
                //     reject(response )
                // }
            }).catch(error => {
                //错误
                reject(JSON.stringify(error))
            })
        })
    },
    postFormData(url, datas) {
        return new Promise((resolve, reject) => {
            let config = {
                //添加请求头
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            };
            axios.post(baseURL + url, datas, config).then(response => {
                resolve(response)
            }).catch(error => {
                //错误
                reject(JSON.stringify(error))
            })
        })
    },
    get(url, request) {
        const data = getDataConfig(request)
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: baseURL + url + '?' + data,
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            }).then(response => {
                resolve(response)
                // if (response && response.resultCode === status) {

                // } else {
                //     reject(response)
                // }
            }).catch(error => {
                reject(JSON.stringify(error))
            })
        })
    },
    getUrl(url, request, status = '0000') {
        const data = getDataConfig(request);
        let URL = !!data ? url + '?' + data : url;
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: URL,
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(JSON.stringify(error))
            })
        })
    },
}
export default fetch

/**
 * Created by Administrator on 2018/11/7.
 */
import axios from 'axios'
import qs from 'qs'
import  {
    baseUrl,
    FileUrl
} from './env'
// axios.defaults.timeout = 7000
axios.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    let token=window.sessionStorage.getItem('token')
    if (config.method === 'post') {
        if (token) {
            // console.log(token)
            config.data['token'] = token
        }
        config.data = qs.stringify({
            ...config.data
        })
    }
    return config;
})
export const post = (url, data = {})=> {
    return new Promise((resolve, reject)=> {
        axios.post(baseUrl + url, data).then(res=> {
            resolve(res)
        }).catch(err=> {
            reject(err)
        })
    })
}
export const GET = (url='',fileUrl='', data = {})=> {
    return new Promise((resolve, reject) => {
        // console.log(fileUrl)
        let BaseUrl = fileUrl ? FileUrl : baseUrl
        axios.get(BaseUrl+url, {
            params: data
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}




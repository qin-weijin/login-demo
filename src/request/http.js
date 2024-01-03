import axios from 'axios'
axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';
axios.interceptors.request.use(
    config => {
        config.data = JSON.stringify(config.data);
        config.headers = { 'Content-Type': 'application/x-www-form-orlencoded' };
        return config
    },
    error => { return Promise.reject(err); }
)
axios.interceptors.response.use(
    response => {
        if(response.data.errCode == 2){
            router.push({
                path: "/login",
                querry: { redirect: router.correntRoute.fullPath }
            })
        }
        return response;
    },
    error => { return Promise.reject(error) }
)
export function get(url, params){
    return new Promise((resolve,reject) => {
        axios.get(url, { params: params })
        .then(response => {resolve(response.data);})
        .catch(err => {reject(err)})
    })
}
export function post(url, data = {}){
    return new Promise((resolve, reject) => {
        axios.post(url, data)
        .then( 
            response => { resolve(response.data); },
            err => {reject(err)
        })
    })
}
export async function getAwait(url, params = {}){
    let res = await axios.get(url, { params: params })
    res = res.data
    return res
}
export async function postAwait(url, data = {}){
    let res = await axios.post(url, data)
    res = res.data
    return res
}
// api
import { get, getAwait } from './http'
export function getLogin(username, password){
    return get('/getLogin', username, password)
}
export function getUserInfo(param){
    return getAwait('/getUser', param)
}
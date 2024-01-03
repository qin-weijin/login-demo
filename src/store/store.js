import Vue from 'vue'
import Vuex from 'vuex'
import getLogin from '../request/api.js'
import router from '../router/index'
Vue.use(Vuex);
const state = { 
    ruleForm: { user: ' ', pwd: '' },
    result: null,
    title: ''
}
const mutations = {
    setLogin(state, param){ state.result = param.result },
    setUser(state, n){ state.ruleForm.user = n },
    setPwd(state, n){ state.ruleForm.pwd = n },
}
const actions = {
    getLogin(context){
        getLogin(then(res => {
            context.commit('setLogin', {result: res.data})
            let len = res.data.length;
            let userNameArr = [];
            let passWordArr = [];
            let ses = window.sessionStorage;
            for(var i = 0; i < len; i++) {
                userNameArr.push(res.data[i].username)
                userNameArr.push(res.data[i].password)                
            }
            if (userNameArr.indexOf(state.ruleForm.user) === -1) {
                alert("账号不存在！ ");
            } else {
                var index = userNameArr.indexOf(state.ruleForm.user);
                if (passWordArr[index] === state.ruleForm.pwd) {
                    ses.setItem("data", res.data[index].token);
                    console.log(ses, 'ses')
                    state.title = res.data[index].usertitle
                    router.push("/")
                } else { alert("密码错误！ ") }
            }
        }))
    },
    loginOut(){
        window.sessionStorage.removeItem('data');
        router.push('/login')
    }
}
export default new Vuex.Store({state, mutations, actions})
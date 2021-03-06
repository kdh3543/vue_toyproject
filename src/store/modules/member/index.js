import axios from "axios"
import { useCookies } from "vue3-cookies"
const member = 'http://localhost:3000'
export default {
  namespaced: true,
  state: {
    user: '',
  },
  mutations:{
    signIn(state,data){
      if(data==undefined){
        state.user = ''
      }else{
        state.user = data.id
        useCookies().cookies.set('token',data.id,'3d')
        const cookies = useCookies().cookies.get('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies}`
      } 
    },
    logout(state){
      state.user = ''
      useCookies().cookies.remove('token')
      axios.defaults.headers.common['Authorization'] = null
    },
  },
  actions: {
    async signUp({commit},data){
      return await axios.post(`${member}/member`,{
        id: data.id,
        pw: data.pw,
        name: data.name
      })
    },
    async idExist({commit},data){
      return await axios.get(`${member}/member?id=`+data)
    },
    async signIn({commit},data){
      return await axios.get(`${member}/member?id=${data.id}&pw=${data.pw}`).then((res)=>{ 
        commit('signIn',data)
      })
    },
    async logout({commit},data){
      commit('logout')
    },
  },
  getters: {

  }
}
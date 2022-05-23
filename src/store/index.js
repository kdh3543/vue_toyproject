import { createStore } from "vuex";
import axios from 'axios'
import { useCookies } from 'vue3-cookies'
import createPersistedState from 'vuex-persistedstate'

const member = 'http://localhost:3000'

export default createStore({
  state: {
    user: '',
  },
  mutations: {
    signIn(state,data){
      
      if(data==undefined){
        state.user = ''
      }else{
        state.user = data.id
        useCookies().cookies.set('test',data.id)
        const cookies = useCookies().cookies.get('test')
        console.log(cookies)
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookies}`
        console.log(axios.defaults.headers)
      } 
    },
    logout(state){
      state.user = ''
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
    async register({commit},data){
      console.log(data)
      
      return await axios.post(`${member}/boardList`,{
        userId: data.userId,
        title: data.title,
        contents: data.contents,
        updatedAt: data.updatedAt, 
        views: 0
      })
    },
    async getBoardList({commit},data){
      console.log(data)
      return await axios.get(`${member}/boardList?_sort=id&_order=${data.order}&_page=${data.page}&_limit=${data.limit}`)
    },
    async plusViews({commit},data){
      console.log(await axios.get(`${member}/boardList?id=`+data.id))
      await axios.patch(`${member}/boardList/${data.id}`,
        {
          views: data.views+1
        }
      )
      return 
    },
    async modify({commit},data){
      console.log(data)
      return await axios.patch(`${member}/boardList/${data.id}`,{
        title: data.title,
        contents: data.contents
      })
    },
    async getBoardInfor({commit},data){
      return await axios.get(`${member}/boardList?id=${data}`)
    },
    async logout({commit},data){
      commit('logout')
    },
    async reserve({commit},data){
      return await axios.put(`${member}/reservation/${data.id}`,{
        date: data.date,
        name: data.name,
        seatState: 'reserved'
      })
    },
    async updateSeat({commit},data){
      return await axios.post(`${member}/reservation`,{
        seatState: 'empty',
        name: '',
        date: ''
      })
    },
    async getSeatList({commit},data){
      return await axios.get(`${member}/reservation`)
    }
  },
  modules: {

  },
  plugins: [createPersistedState()]
})
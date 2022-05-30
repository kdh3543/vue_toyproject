import axios from "axios"
const member = 'http://localhost:3000'
export default {
  namespaced: true,
  state: {

  },
  mutations:{
    
  },
  actions: {
    async register({commit},data){
      return await axios.post(`${member}/boardList`,{
        userId: data.userId,
        title: data.title,
        contents: data.contents,
        updatedAt: data.updatedAt, 
        views: 0
      })
    },
    async getBoardList({commit},data){
      console.log('들어온 값은?')
      console.log(data)
      return await axios.get(`${member}/boardList?_sort=id&_order=${data.order}&_page=${data.page}&_limit=${data.limit}`)
    },
    async plusViews({commit},data){
      await axios.patch(`${member}/boardList/${data.id}`,
        {
          views: data.views+1
        }
      )
      return 
    },
    async modify({commit},data){
      return await axios.patch(`${member}/boardList/${data.id}`,{
        title: data.title,
        contents: data.contents
      })
    },
    async getBoardInfor({commit},data){
      return await axios.get(`${member}/boardList?id=${data}`)
    },
    async deleteBoard({commit},data){
      return await axios.delete(`${member}/boardList/${data}`)
    },
    async comment({commit},data){
      return await axios.post(`${member}/comment`,{
        userId: data.userId,
        boardId: data.id,
        comment: data.comment,
        time: data.time
      })
    },
    async getComment({commit},data){
      return await axios.get(`${member}/comment?boardId=${data}`)
    }
  },
  getters: {
    
  }
}
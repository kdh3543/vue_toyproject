import axios from "axios"
const member = 'http://localhost:3000'
export default {
  namespaced: true,
  state: {

  },
  mutations:{

  },
  actions: {
    async reserve({commit},data){
      // console.log(this.state.user)
      return await axios.put(`${member}/reservation/${data.id}`,{
        date: data.date,
        name: data.name,
        seatState: 'reserved',
        memberId: this.state.member.user,
      })
    },
    async updateSeat({commit},data){
      return await axios.post(`${member}/reservation`,{
        seatState: 'empty',
        name: '',
        date: '',
        memberId: '',
      })
    },
    async getSeatList({commit},data){
      console.log('here')
      return await axios.get(`${member}/reservation`)
    },
    async getReservedList({commit},data){
      return await axios.get(`${member}/reservation?id=${data}`)
    },
    async cancelReserve({commit},data){
      console.log(data)
      return await axios.put(`${member}/reservation/${data}`,{
        date: '',
        name: '',
        seatState: 'empty',
        memberId: '',
      })
    },
  },
  getters: {
    
  }
}
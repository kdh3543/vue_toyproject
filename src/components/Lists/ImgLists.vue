<template>
  <section class="py-5">
      
      <div class="container px-4 px-lg-5 mt-5">
        <div>
					<button class="btn btn-outline-dark" @click="register">register</button>
        </div>
        <hr>
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
						<div class="col-3 mb-3 text-center list" v-for="(list,index) in seats" :key="index">
							<button class="btn btn" @click="openReserveModal(index,list.id)">
								<div class="card"> 
									<div class="card-img-top state" :style="list.seatState=='empty' ? 'background-color:salmon' : 'background-color:green'">
										{{list.seatState}}
									</div>
									<div class="card-body">
										<div class="text-center">
											<h5 class="fw-bolder">{{list.id}}</h5>
										</div>
									</div>
								</div>
							</button>
						</div>
          </div>
          
      </div>
      <teleport to="#modal">
        <ReserveModal v-if="reserve" class="reserveModal" @closeReserve="closeReserve" @reserveSuccess="reserveSuccess" :sendId="sendId" :index="sendIndex"/>
        
      </teleport>
      <teleport to="#modal">
        <ReservedListModal class="reserveModal" v-if="reserveList" :reserveList="reservedInfor" @closeList="closeList" @reserveCancel="reserveCancel">
					<template #head>
						RESERVE LIST
					</template>
					<template #body="slotProps">
						<div class="input-group">
							<span class="input-group-text">Seat Num: </span>
							<input type="text" class="date form-control" disabled :value="slotProps.id">
						</div>
						<div class="mt-2 input-group">
							<span class="input-group-text">Date: </span>
							<input type="date" class="date form-control" disabled :value="slotProps.date">
						</div>
						<div class="mt-2 input-group">
							<span class="input-group-text">Name: </span>
							<input type="text" class="form-control name" disabled :value="slotProps.reserveName">
						</div>
					</template>
					<template #foot="slotProps">
						<div class="mt-2" v-if="slotProps.memberId==$store.state.member.user">
							<button class="btn btn-sm reserveBtn" @click="reserveCancel(slotProps.id)">RESERVE CANCEL</button>
						</div>
					</template>
        </ReservedListModal>
      </teleport>
  </section>
</template>

<script>
import ReserveModal from '@/components/Modal/Reserve/ReserveModal.vue'
import ReservedListModal from '@/components/Modal/Reserve/ReservedListModal.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        ReserveModal,
        ReservedListModal
    },
    setup(){
        const reserve = ref(false)
        const reserveList = ref(false)
        const store = useStore()
        const sendIndex = ref(null)
        const sendId = ref(null)
        const seats = ref([])
        const reservedInfor = ref([])
        const openReserveModal = async (index,id) => {
            console.log(id)
            if(seats.value[index].seatState=='empty'){
                reserve.value = true
                reserveList.value = false
            }else{
                await store.dispatch('reserve/getReservedList',id).then((res)=>{
                    console.log(res.data[0])
                    reservedInfor.value = res.data[0]
                })
                reserve.value = false
                reserveList.value = true
            }
            sendIndex.value = index+1
            sendId.value = id
        }
        const closeReserve = () => {
            reserve.value = false
        }
        const reserveSuccess = (data) => {
            console.log('들어온 data')
            console.log(data)
            store.dispatch('reserve/reserve',data).then((res)=>{
                
                reserve.value = false
                getList()
            }).catch((err)=>{
                console.log(err)
            })
        }
        const register = () => {
            store.dispatch('reserve/updateSeat').then((res)=>{
                getList()
            })
        }
        const getList = () => {
            store.dispatch('reserve/getSeatList').then((res)=>{
                seats.value = res.data
            })
        }
        const closeList = () => {
            reserveList.value = false
        }
        const reserveCancel = (data) => {
            store.dispatch('reserve/cancelReserve',data).then((res)=>{
                reserveList.value = false
                getList()
            }).catch((err)=>{
                console.log(err)
            })
        }
        getList()
        return {
            openReserveModal,
            reserve,
            closeReserve,
            reserveSuccess,
            sendIndex,
            register,
            seats,
            getList,
            reserveList,
            reservedInfor,
            closeList,
            reserveCancel,
            sendId
        }
    }
}
</script>

<style >
.reserveModal {
	position: fixed;
	text-align: center;
	padding-top: 200px;
	top: 0px;
	right: 0;
	width: 100%;
	height: 100%;
	background-color: rgb(128, 128, 128, 0.5);
	z-index: 3;
}
.state {
	width: 100px;
	height: 50px;
	border-bottom: 1px solid black;
}
.reserveBtn {
  background-color: rgb(138, 43, 226, 0.3);
}
.reserveBtn:hover {
  background-color: rgb(138, 43, 226);
}
.date {
  background: none;
}
.name {
  background: none;
}
.input-group-text {
  background-color: rgb(0, 0, 0, 0.5);
  color: white;
}
@media screen and (max-width:767px) {
  .list {
		width: 50%;
  }
}
@media screen and (min-width:768px) and (max-width:1023px) {

}
@media screen and (min-width: 1024px) {
  
}
</style>
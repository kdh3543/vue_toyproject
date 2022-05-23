<template>
  <section class="py-5">
      
      <div class="container px-4 px-lg-5 mt-5">
        <div>
            <button class="btn btn-outline-dark" @click="register">register</button>
        </div>
        <hr>
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              <div class="col-3 mb-3 text-center list" v-for="(list,index) in seats" :key="index">
                  <button class="btn btn" @click="openReserveModal(list.id)">
                    <div class="card"> 
                        <div class="card-img-top state">
                            {{list.seatState}}
                        </div>
                        <div class="card-body">
                            <div class="text-center">
                                <h5 class="fw-bolder">{{list.id}}</h5>
                            </div>
                        </div>
                        <!-- <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div> -->
                    </div>
                  </button>
              </div>
          </div>
          
      </div>
      <teleport to="#modal">
        <ReserveModal v-if="reserve" class="reserveModal" @closeReserve="closeReserve" @reserveSuccess="reserveSuccess" :index="sendIndex"/>
      </teleport>
      
  </section>
</template>

<script>
import ReserveModal from '@/components/Modal/ReserveModal.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        ReserveModal,
    },
    setup(){
        const reserve = ref(false)
        const store = useStore()
        const sendIndex = ref(null)
        const seats = ref([])
        const openReserveModal = (index) => {
            reserve.value = true
            sendIndex.value = index
        }
        const closeReserve = () => {
            reserve.value = false
        }
        
        const reserveSuccess = (data) => {
            store.dispatch('reserve',data).then((res)=>{
                seats.value[data.id-1].seatState = res.data.seatState
                reserve.value = false
            }).catch((err)=>{
                console.log(err)
            })
        }
        const register = () => {
            store.dispatch('updateSeat').then((res)=>{
                getList()
            })
        }
        const getList = () => {
            store.dispatch('getSeatList').then((res)=>{
                seats.value = res.data
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
            getList
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
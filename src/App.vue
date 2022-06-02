<template>
  <div>
    <NavBar
      @sign-up="SignUp"
      @sign-in="SignIn"
      @logout="logout"
    />
    <SignUpModal
      v-if="openSignUp"
      class="signModal"
      @close-sign-up="closeSignUp"
      @on-sign-up="onSignUp"
    />  
    <SignInModal
      v-if="openSignIn"
      class="signModal"
      @close-sign-in="closeSignIn"
      @on-sign-in="onSignIn"
    />
    <LogoutModal
      v-if="openLogout"
      class="signModal"
      @close-logout="closeLogout"
      @on-logout="onLogout"
    />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue'
import SignUpModal from '@/components/Modal/Member/SignUpModal.vue'
import SignInModal from '@/components/Modal/Member/SignInModal.vue'
import LogoutModal from '@/components/Modal/Member/LogoutModal.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  components: {
    NavBar,
    SignUpModal,
    SignInModal,
    LogoutModal
  },
  setup(){
    const store = useStore()
    const openSignUp = ref(false)
    const openSignIn = ref(false)
    const openLogout = ref(false)
    const router = useRouter()
    const SignUp = () => {
      openSignUp.value = true
    }
    const closeSignUp = () => {
      openSignUp.value = false
    }
    const onSignUp = (data) => {
      store.dispatch('member/signUp',data).then((res)=>{
        alert(res.data.id+'님 가입이 완료되었습니다.')
        openSignUp.value = false
      })
    }
    const SignIn = () => {
      openSignIn.value = true
    }
    const closeSignIn = () => {
      openSignIn.value = false
    }
    const onSignIn = (data) => {
      store.dispatch('member/signIn',data).then(()=>{
        if(store.state.member.user==''){
          alert('잘못 입력하셨습니다.')
          return false
        }else{
          openSignIn.value = false
        }
      }).catch((err)=>{
        alert(err)
      })
    }
    const onLogout = () => {
      store.dispatch('member/logout').then(()=>{
        if(store.state.member.user==''){
          openLogout.value = false
          router.push({
            name: 'Home'
          })
        }
      })
    }
    const logout = () => {
      openLogout.value = true
    }
    const closeLogout = () => {
      openLogout.value = false
    }
    return {
      openSignUp,
      SignUp,
      closeSignUp,
      onSignUp,
      openSignIn,
      SignIn,
      closeSignIn,
      onSignIn,
      openLogout,
      logout,
      closeLogout,
      onLogout
    }
  }
}
</script>

<style>
.signModal {
  padding-top: 150px;
  position: fixed;
  top: -10px;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(128, 128, 128, 0.5);
  z-index: 100;
}
</style>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container px-4 px-lg-5">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
          <router-link
            class="nav-link logo"
            :to="{name: 'Home'}"
          >
            LOGO
          </router-link>
        </ul>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div
          id="navbarSupportedContent"
          class="collapse navbar-collapse"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{name: 'Home'}"
              >
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{name: 'Board'}"
              >
                Board
              </router-link>
            </li>
            <li
              v-if="$store.state.member.user"
              class="nav-item"
            >
              <button
                class="btns nav-link"
                @click="openLogoutModal"
              >
                Logout
              </button>
            </li>
            <li
              v-if="!$store.state.member.user"
              class="nav-item"
            >
              <button
                class="btns nav-link"
                @click="openSignUpModal"
              >
                SignUp
              </button>
            </li>
            <li
              v-if="!$store.state.member.user"
              class="nav-item"
            >
              <button
                class="btns nav-link"
                @click="openSignInModal"
              >
                Login
              </button>
            </li>
            <li
              v-if="$store.state.member.user"
              class="nav-item"
            >
              <span class="nav-link active">{{ $store.state.member.user }}님</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'
import { useCookies } from 'vue3-cookies'
export default {
  emits:['sign-up','sign-in','logout'],
  setup(props,{emit}){
    const cookies = useCookies().cookies.get('test')
    axios.defaults.headers.common['Authorization'] = `Bearer ${cookies}`
    const openSignUpModal = () => {
      emit('sign-up')
    }
    const openSignInModal = () => {
      emit('sign-in')
    }
    const openLogoutModal = () => {
      emit('logout')
    }
    const toBoard = () => {
      alert('please Login')
    }
    return {
      openSignUpModal,
      openSignInModal,
      openLogoutModal,
      toBoard
    }
  }
  
}
</script>

<style>
.btns {
  border: none;
  background: none;
}
.logo {
  color: black;
}
</style>
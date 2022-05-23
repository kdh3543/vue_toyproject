<template>
  <div>
    <HeadImg class="headImg"/>
    <ImgLists />
    <Footer />
  </div>
</template>

<script>
import HeadImg from '@/components/Head/HeadImg.vue'
import ImgLists from '@/components/Lists/ImgLists.vue'
import Footer from '@/components/Footer/Footer.vue'

export default {
  components: {
    HeadImg,
    ImgLists,
    Footer,
  },
}
</script>

<style scoped>
@media screen and (max-width:767px) {
  
}
@media screen and (min-width:768px) and (max-width:1023px) {
  
}
@media screen and (min-width: 1024px) {
  
}
</style>

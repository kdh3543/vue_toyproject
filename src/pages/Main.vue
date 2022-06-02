<template>
  <div>
    <HeadImg class="headImg" />
    <ImgLists />
    <div class="container">
      <div class="row">
        <div class="col-6">
          test1
        </div>
        <div class="col-6">
          <MiniBoard />
        </div>
      </div>
    </div>
    <Footer class="mt-5" />
  </div>
</template>

<script>
import HeadImg from '@/components/Head/HeadImg.vue'
import ImgLists from '@/components/Lists/ImgLists.vue'
import Footer from '@/components/Footer/Footer.vue'
import MiniBoard from '@/components/Main/miniBoard.vue'

export default {
  components: {
    HeadImg,
    ImgLists,
    Footer,
    MiniBoard
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

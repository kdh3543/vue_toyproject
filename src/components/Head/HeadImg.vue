<template>
  <header class="bg-dark py-5">
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="1" class="d-block w-100" >
        </div>
        <div class="carousel-item">
          <img src="1" class="d-block w-100" >
        </div>
        <div class="carousel-item">
          <img src="1" class="d-block w-100" >
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style scoped>
  img {
    width: 800px;
    height: 200px;
  }
</style>
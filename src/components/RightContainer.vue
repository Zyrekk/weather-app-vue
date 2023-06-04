<template>
  <div class="RightContainer" :class="{'Right':(!weatherData||!cityInput)}">

  </div>
</template>

<script>
export default {
  name: "RightContainer",
  props:['weatherData','cityInput'],
}
</script>

<style scoped>
.RightContainer{
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 70vh;
  right: 0;
  transform: translate(0);
  /*border:2px solid red;*/
  color: rgba(255, 255, 255, 0.76);
  transition: transform .3s;
}
.RightContainer.Right{
  transform: translate(100%);
}

</style>
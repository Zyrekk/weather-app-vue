<template>
  <div class="BottomContainer" :class="{'Bottom':(!weatherData||!cityInput)}">
  </div>
</template>

<script>
export default {
  name: "BottomContainer",
  props:['weatherData','cityInput']
}
</script>

<style scoped>
.BottomContainer {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 30vh;
  bottom: 0;
  transform: translateY(0);
  /*border:2px solid #11ff00;*/
  transition: transform .3s;
}

.BottomContainer.Bottom {
  transform: translateY(100%);
}

</style>
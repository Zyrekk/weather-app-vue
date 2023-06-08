<template>
  <div class="BottomContainer" :class="{'Bottom':(!weatherData||!cityInput)}">
    <div class="SingleWeatherTile"></div>
    <div class="SingleWeatherTile"></div>
    <div class="SingleWeatherTile"></div>
    <div class="SingleWeatherTile"></div>
    <div class="SingleWeatherTile"></div>
    <div class="SingleWeatherTile"></div>
    <div class="SingleWeatherTile"></div>
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
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;

  bottom: 0;
  transform: translateY(0);
  /*border:2px solid #11ff00;*/
  transition: transform .3s;
  padding: 1rem;
}

.BottomContainer.Bottom {
  transform: translateY(100%);
}

.SingleWeatherTile{
  width: 10rem;
  height: 10rem;
  /*background: purple;*/
}

@media screen and (max-width: 1300px) {
  .BottomContainer {
    position: unset;
  }
  .BottomContainer.Bottom {
    transform: unset;
  }
}

</style>
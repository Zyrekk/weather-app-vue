<template>
  <div class="BottomContainer" :class="{'Bottom':(!weatherDataForecast||!cityInput)}">
    <div class="SingleWeatherTile" v-for="(weather,key) in weatherDataForecast" :key="key">
      <span class="Day" v-if="weatherDataForecast">{{weather.day}}</span>
      <div class="TemperatureTile" v-if="weatherDataForecast">
<!--        <img src="../assets/icons/01d.png" alt="day temperature icon">-->
        <img :src="require(`../assets/icons/${weather.dayIcon}.png`)" alt="weather icon">
        <span>{{weather.max}}°C</span>
      </div>
      <div class="TemperatureTile" v-if="weatherDataForecast">
        <img src="../assets/icons/01n.png" alt="night temperature icon">
        <span>{{weather.min}}°C</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomContainer",
  props: ['weatherDataForecast', 'cityInput']
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
  transition: transform .3s;
  padding: 1rem;
}

.BottomContainer.Bottom {
  transform: translateY(100%);
}

.SingleWeatherTile {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  width: 10rem;
  height: 10rem;
}
.TemperatureTile{
  display: flex;
  justify-content: center;
  align-items: center;
}

.Day{
  font-size: 1.1rem;
  padding: 1rem 0;
}

img{
  width: 40px;
}

@media screen and (max-width: 1300px) {
  .BottomContainer {
    position: unset;
    margin-top: 2rem;
    gap: 4rem;
    flex-wrap: wrap;
  }

  .BottomContainer.Bottom {
    transform: unset;
  }
}

</style>
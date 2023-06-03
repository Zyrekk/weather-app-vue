<template>
  <div class="WeatherPage" v-if="weatherData">
        {{weatherData.main.temp}}
  </div>
</template>

<script>
import {ref, watch,} from "vue";

export default {
  name: "WeatherPage",
  props: ['coords'],
  async setup(props) {
    const weatherData = ref(null);
    watch(props.coords,async ()=>{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${props.coords.lat}&lon=${props.coords.lon}&units=metric&appid=${process.env.VUE_APP_WEATHER_KEY}`);
      weatherData.value = await response.json();
    })
    return {weatherData};
  }
}
</script>

<style scoped>
.WeatherPage {
  display: flex;
  width: 100%;
  height: 500px;
  background: purple;
}
</style>

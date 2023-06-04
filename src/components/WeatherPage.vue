<template>
  <div class="WeatherPage" v-if="weatherData">
        {{weatherData.main.temp}}
    <font-awesome-icon :icon="['fas', 'cloud']" />
  </div>
</template>

<script>
import {ref, watch,} from "vue";
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCloud } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCloud)

export default {
  name: "WeatherPage",
  props: ['coords'],
  components:{
    FontAwesomeIcon
  },
  async setup(props) {
    const weatherData = ref(null);
    watch(props.coords,async ()=>{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${props.coords.lat}&lon=${props.coords.lon}&units=metric&appid=${process.env.VUE_APP_WEATHER_KEY}`);
      weatherData.value = await response.json();
      // console.log(weatherData.value)
      weatherData.value.main.temp=Math.round(weatherData.value.main.temp)
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
}
</style>

<template>
  <div class="LeftContainer" :class="{'Left':(!weatherData||!cityInput)}">
    <div class="Icon">
      <font-awesome-icon v-if="weatherData" :icon="['fas', `${weatherTranslate(weatherData.weather[0])}`]" />
    </div>
    <div class="WeatherName" v-if="weatherData">{{weatherData.weather[0].description}}</div>
    <div class="CityName" v-if="selectData">{{selectData.name}}, {{selectData.state}}</div>
    <div class="Temperature" v-if="weatherData">{{weatherData.main.temp}}°C</div>
    <button><font-awesome-icon :icon="['fas', 'location-dot']" /> Change Location</button>

  </div>
</template>

<script>
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCloud,faCloudShowersHeavy,faLocationDot,faSun,faThunderstorm,faSnowflake,faTornado,faWind,faSmog,faCloudSun} from '@fortawesome/free-solid-svg-icons'
import {weatherTranslate} from "@/functions/weatherTranslate";

/* add icons to the library */
library.add(faCloud,faCloudShowersHeavy,faLocationDot,faSun,faThunderstorm,faSnowflake,faTornado,faWind,faSmog,faCloudSun)
export default {
  name: "LeftContainer",
  methods: {weatherTranslate},
  props:['weatherData','cityInput','selectData'],
  components:{
    FontAwesomeIcon
  },
}
</script>

<style scoped>
.LeftContainer{
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 70vh;
  left: 0;
  transform: translate(0);
  color: rgba(255, 255, 255, 0.76);
  transition: transform .3s;
}
.LeftContainer.Left{
  transform: translate(-100%);

}
.Icon{
  font-size: 3rem;
  display: flex;
  justify-content: flex-start;
  padding: 3rem 0 0 2rem;
  align-items: center;
  width: 100%;
}
.WeatherName{
  font-size: 1.6rem;
  padding:1rem 0 0 2rem;
}
.CityName{
  font-size: 1rem;
  padding:0.2rem 0 0 2rem;
}
.Temperature{
  font-size: 2rem;
  padding:1rem 0 0 2rem;
  font-weight: 600;
}
button{
  all: unset;
  cursor: pointer;
  font-size: 0.7rem;
  margin:1rem 0 0 2rem;
  width: fit-content;
  font-weight: 600;
}

</style>
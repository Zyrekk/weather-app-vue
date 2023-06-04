<template>
  <div class="LeftContainer" :class="{'Left':(!weatherData||!cityInput)}">
    <div class="Icon">
<!--      <font-awesome-icon :icon="['fas', 'cloud']" />-->
      <font-awesome-icon :icon="['fas', 'cloud-showers-heavy']" />
    </div>
    <div class="WeatherName">Fog</div>
    <div class="CityName" v-if="weatherData">{{weatherData.name}}</div>
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
import { faCloud,faCloudShowersHeavy,faLocationDot } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCloud,faCloudShowersHeavy,faLocationDot)
export default {
  name: "LeftContainer",
  props:['weatherData','cityInput'],
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
  /*border:2px solid red;*/
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
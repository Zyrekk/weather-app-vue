<template>
  <Suspense>
    <template #default>
      <div class="Container">
        <div class="TopContent">
          <LeftContainer :cityInput="cityInput" :weatherData="weatherData"/>
          <SearchBar @city-updated="handleCityUpdated" :cityInput="cityInput" @city-object-updated="handleCityObjectUpdated"/>
          <RightContainer :cityInput="cityInput" :weatherData="weatherData"/>
        </div>
        <BottomContainer :weatherData="weatherData" :cityInput="cityInput"/>
      </div>
    </template>
    <template #fallback>
      loading
    </template>
  </Suspense>
</template>
<script>
import SearchBar from './SearchBar.vue';
// import WeatherPage from "@/components/WeatherPage.vue";
import LeftContainer from "@/components/LeftContainer.vue";
import RightContainer from "@/components/RightContainer.vue";
import BottomContainer from "@/components/BottomContainer.vue";
import {ref, watch} from 'vue';

export default {
  name: 'MainPage',
  components: {
    SearchBar,
    // WeatherPage,
    LeftContainer,
    RightContainer,
    BottomContainer
  },
  setup() {
    const selectData=ref('')

    const cityInput=ref('')

    const weatherData = ref(null);
    watch(selectData,async ()=>{
      if(selectData.value!==''&&selectData.value!==''){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${selectData.value.lat}&lon=${selectData.value.lon}&units=metric&appid=${process.env.VUE_APP_WEATHER_KEY}`);
        weatherData.value = await response.json();
        weatherData.value.main.temp=Math.round(weatherData.value.main.temp)
        console.log(weatherData.value)
      }
    })

    const handleCityUpdated=(newCity)=>{
      cityInput.value=newCity.value
    }

    const handleCityObjectUpdated=(cityObject)=>{
      selectData.value=cityObject.value
    }

    watch(cityInput,()=>{
      if (cityInput.value===''){
        weatherData.value=null
        selectData.value=''
      }
    })
    return {cityInput,selectData,weatherData,handleCityObjectUpdated,handleCityUpdated}
  }
}
</script>
<style scoped>
.Container {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
}

.TopContent{
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

</style>
<template>
  <Suspense>
    <template #default>
      <div class="Container">
        <div class="TopContent">
          <SearchBar @search-input-updated="handleSearchInputUpdated" :cityInput="cityInput" @city-object-updated="handleCityObjectUpdated"/>
          <LeftContainer :image="image" :selectData="selectData" :cityInput="cityInput" :weatherData="weatherData"/>
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
import LeftContainer from "@/components/LeftContainer.vue";
import RightContainer from "@/components/RightContainer.vue";
import BottomContainer from "@/components/BottomContainer.vue";
import {weatherTranslate} from "@/functions/weatherTranslate";
import {ref, watch} from 'vue';

export default {
  name: 'MainPage',
  components: {
    SearchBar,
    LeftContainer,
    RightContainer,
    BottomContainer
  },
  setup() {
    const image=ref('../../public/icons/01.d.png')
    const selectData=ref('')

    const cityInput=ref('')

    const weatherData = ref(null);
    const weatherDataForecast = ref(null);
    watch(selectData,async ()=>{
      if(selectData.value!==''&&selectData.value!==''){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${selectData.value.lat}&lon=${selectData.value.lon}&units=metric&appid=${process.env.VUE_APP_WEATHER_KEY}`);
        weatherData.value = await response.json();
        weatherData.value.main.temp=Math.round(weatherData.value.main.temp)
        weatherData.value.main.feels_like=Math.round(weatherData.value.main.feels_like)
        console.log(weatherData.value)
        const sunrise = new Date(weatherData.value.sys.sunrise * 1000); // Convert seconds to milliseconds
        const sunset = new Date(weatherData.value.sys.sunset * 1000); // Convert seconds to milliseconds
        const currentDate = new Date();
        if(currentDate>sunrise&&currentDate<sunset){
          image.value=`${weatherTranslate(weatherData.value.weather[0],'d')}`
        }
        else{
          image.value=`${weatherTranslate(weatherData.value.weather[0],'n')}`
        }
        const responseForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${selectData.value.lat}&lon=${selectData.value.lon}&units=metric&appid=${process.env.VUE_APP_WEATHER_KEY}`);
        weatherDataForecast.value = await responseForecast.json();
      }
    })

    const handleSearchInputUpdated=(searchInputUpdated)=>{
      cityInput.value=searchInputUpdated.value
    }

    const handleCityObjectUpdated=(cityObject)=>{
      selectData.value=cityObject.value
    }

    watch(cityInput,()=>{
      if (cityInput.value===''){
        // weatherData.value=null
        // selectData.value=''
      }
    })
    return {cityInput,selectData,weatherData,image,handleCityObjectUpdated,handleSearchInputUpdated}
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
  background: rgba(0, 0, 0, 0.4);
  min-height: 100vh;
}

.TopContent{
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

@media screen and (max-width: 1300px) {
  .TopContent {
    flex-direction: column;
    height: unset;
  }
}

</style>
<template>
  <div class="Container">
    <div class="TopContent">
      <SearchBar @search-input-updated="handleSearchInputUpdated" :cityInput="cityInput"
                 @city-object-updated="handleCityObjectUpdated"/>
      <LeftContainer :selectData="selectData" :cityInput="cityInput" :weatherData="weatherData"/>
      <RightContainer :cityInput="cityInput" :weatherData="weatherData"/>
    </div>
    <BottomContainer :weatherDataForecast="weatherDataForecast" :cityInput="cityInput"/>
  </div>
</template>
<script>
import SearchBar from './SearchBar.vue';
import LeftContainer from "@/components/LeftContainer.vue";
import RightContainer from "@/components/RightContainer.vue";
import BottomContainer from "@/components/BottomContainer.vue";
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
    const selectData = ref('')
    const cityInput = ref('')
    const weatherData = ref(null);
    const weatherDataForecast = ref(null);
    watch(selectData, async () => {
      if (selectData.value !== '' && selectData.value !== '') {
        const dayArray = []

        //CURRENT WEATHER API CALL
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${selectData.value.lat}&lon=${selectData.value.lon}&units=metric&appid=${process.env.VUE_APP_WEATHER_KEY}`);
        weatherData.value = await response.json();
        //CURRENT WEATHER ACTIONS
        weatherData.value.main.temp = Math.round(weatherData.value.main.temp)
        weatherData.value.main.feels_like = Math.round(weatherData.value.main.feels_like)
        weatherData.value.wind.speed = Math.round(weatherData.value.wind.speed * 3.6)

        //FORECAST WEATHER API CALL
        const responseForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${selectData.value.lat}&lon=${selectData.value.lon}&units=metric&appid=${process.env.VUE_APP_WEATHER_KEY}`);
        weatherDataForecast.value = await responseForecast.json();


        //FORECAST ACTIONS
        const currentDate = new Date().toISOString().slice(0, 10);
        weatherDataForecast.value.list.forEach((data) => {
          const date = data.dt_txt.split(" ")[0];
          if (!dayArray[date]) {
            const nameDay = new Date(date).toLocaleDateString('en-US', {weekday: 'long'});
            dayArray[date] = {
              day: nameDay,
              dayIcon:data.weather[0].icon,
              max: Math.round(data.main.temp_max),
              min: Math.round(data.main.temp_min),
            }
          } else {
            dayArray[date].dayIcon = data.main.temp_max > dayArray[date].max ? data.weather[0].icon : dayArray[date].dayIcon
            dayArray[date].max = data.main.temp_max > dayArray[date].max ? Math.round(data.main.temp_max) : dayArray[date].max
            dayArray[date].min = data.main.temp_min < dayArray[date].min ? Math.round(data.main.temp_min) : dayArray[date].min
          }
        })
        delete dayArray[currentDate]
        weatherDataForecast.value=[]
        for (const date in dayArray) {
          weatherDataForecast.value.push({date, ...dayArray[date]});
        }
      }
    })

    const handleSearchInputUpdated = (searchInputUpdated) => {
      cityInput.value = searchInputUpdated.value
    }

    const handleCityObjectUpdated = (cityObject) => {
      selectData.value = cityObject.value
    }
    return {cityInput, selectData, weatherData, weatherDataForecast, handleCityObjectUpdated, handleSearchInputUpdated}
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
  transition: .3s;
}

.TopContent {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  transition: .3s;
}

@media screen and (max-width: 1300px) {
  .TopContent {
    flex-direction: column;
    height: unset;
    gap: 1rem;
  }
}

</style>
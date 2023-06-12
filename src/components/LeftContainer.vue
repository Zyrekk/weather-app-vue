<template>
  <div class="LeftContainer" :class="{'Left':(!weatherData||!cityInput)}">
      <div class="Icon" v-if="weatherData">
        <img :src="require(`../assets/icons/${weatherData.weather[0].icon}.png`)" alt="weather icon">
      </div>
    <div class="Info">
      <span class="CityName" v-if="selectData">{{ selectData.city }}</span>
      <span class="WeatherName" v-if="weatherData">{{ weatherData.weather[0].description }}</span>
      <span class="Temperature" v-if="weatherData">{{ weatherData.main.temp }}°C</span>
      <span class="WeatherName" v-if="weatherData">Feels Like {{ weatherData.main.feels_like}}°C</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftContainer",
  props: ['weatherData', 'cityInput', 'selectData', 'image'],
}
</script>

<style scoped>
.LeftContainer {
  letter-spacing: 1px;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 70vh;
  left: 0;
  transform: translate(0);
  transition: transform .3s;
}

.LeftContainer.Left {
  transform: translate(-100%);

}

.Info{
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0 0 3rem;
}

.Icon {
  font-size: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 3rem 0 0 2.5rem;
}

img {
  width: 100px;
}

.CityName {
  font-size: 1.6rem;
}

.WeatherName {
  font-size: 1rem;
  padding: 0.2rem 0 0 0;
}

.Temperature {
  font-size: 2rem;
  padding: 1rem 0 0 0;
  font-weight: 700;
}


@media screen and (max-width: 1300px) {
  .LeftContainer {
    position: unset;
    height: unset;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .Icon {
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem 0 0 0;
  }

  .Info{
    width: fit-content;
    display: flex;
    flex-direction: column;
    padding: unset;
  }

  .CityName {
    text-align: center;
    padding: unset;
    justify-content: center;
  }

  .WeatherName {
    text-align: center;
    padding: unset;
  }

  .Temperature {
    text-align: center;
    padding: unset;
  }

  .LeftContainer.Left {
    transform: unset;

  }
}

</style>
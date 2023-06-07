<template>
  <div class="LeftContainer" :class="{'Left':(!weatherData||!cityInput)}">
      <div class="Icon" v-if="weatherData">
        <img :src="require(`../assets/icons/${image}`)" alt="weather icon">
      </div>
    <div class="CityName" v-if="selectData">{{ selectData.name }}</div>
    <div class="WeatherName" v-if="weatherData">{{ weatherData.weather[0].description }}</div>
    <div class="Temperature" v-if="weatherData">{{ weatherData.main.temp }}°C</div>
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

.Icon {
  font-size: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 4rem 0 0 3rem;
}

img {
  width: 100px;
}

.CityName {
  font-size: 1.6rem;
  padding: 0 0 0 3rem;
}

.WeatherName {
  font-size: 1rem;
  padding: 0.2rem 0 0 3rem;
}

.Temperature {
  font-size: 2rem;
  padding: 1rem 0 0 3rem;
  font-weight: 700;
}


@media screen and (max-width: 1300px) {
  .LeftContainer {
    position: unset;
  }

  .LeftContainer.Left {
    transform: unset;

  }
}

</style>
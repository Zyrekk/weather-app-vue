<template>
  <div class="RightContainer" :class="{'Right':(!weatherData||!cityInput)}">
    <div class="Detail" v-if="weatherData">
      <div class="Icon">
        <img src="../assets/icons/humidity.png" alt="Humidity icon">
      </div>
      <div class="Description">
        <span class="Name">Humidity</span>
        <span class="Content">{{weatherData.main.humidity}}%</span>
      </div>
    </div>
    <div class="Detail" v-if="weatherData">
      <div class="Icon">
        <img src="../assets/icons/wind.png" alt="Humidity icon">
      </div>
      <div class="Description">
        <span class="Name">Wind Speed</span>
        <span class="Content">{{weatherData.wind.speed}} km/h</span>
      </div>
    </div>
    <div class="Detail" v-if="weatherData">
      <div class="Icon">
        <img src="../assets/icons/pressure.png" alt="Humidity icon">
      </div>
      <div class="Description">
        <span class="Name">Air Pressure</span>
        <span class="Content">{{weatherData.main.pressure}} hPa</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "RightContainer",
  props: ['weatherData', 'cityInput'],
}
</script>

<style scoped>
.RightContainer {
  letter-spacing: 1px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 20%;
  height: 70vh;
  right: 0;
  transform: translate(0);
  transition: transform .3s;
}

.RightContainer.Right {
  transform: translate(100%);
}

.Detail {
  width: 11rem;
  font-size: 1.3rem;
  display: flex;
  padding: 4rem 2.5rem 0 0;
  gap: 5px;
}

.Content {
  font-weight: 700;
}

.Name {
  font-size: 1.2rem;
}

.Icon {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.Icon img {
  width: 20px;
}

.Description {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}

@media screen and (max-width: 1300px) {
  .RightContainer {
    position: unset;
  }

  .RightContainer.Right {
    transform: unset;
  }
}

</style>
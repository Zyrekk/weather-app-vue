<template>
  <div class="Container">
    <SearchBar :city='state.city' :handleCityChanged="handleCityChanged" @city-object-updated="handleCityObjectUpdated"/>
    <Suspense>
      <template #default>
        <WeatherPage :coords='state.coords'/>
      </template>
      <template #fallback>
        loading
      </template>
    </Suspense>
  </div>
</template>
<script>
import SearchBar from './SearchBar.vue';
import WeatherPage from "@/components/WeatherPage.vue";
import {reactive, watch} from 'vue';

export default {
  name: 'MainPage',
  components: {
    SearchBar,
    WeatherPage
  },
  setup() {
    const state = reactive({
      city: '',
      coords:{
        lat:54.35205,
        lon:18.64637
      }
    })
    const handleCityChanged=(newCity)=>{
      state.city=newCity
    }

    const handleCityObjectUpdated=(cityObject)=>{
      state.coords.lat=cityObject.lat
      state.coords.lon=cityObject.lon
    }

    watch(state,()=>{
      console.log(state.coords)
    })
    return {state,handleCityChanged,handleCityObjectUpdated}
  }
}
</script>
<style scoped>
.Container {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
}

</style>
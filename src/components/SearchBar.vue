<template>
  <div class="SearchContainer">
    <div class="InputDiv" :class="{'focused': isFocused}">
      <input class="InputContent" :class="{'focused': isFocused}" spellcheck="false" maxlength="25" type="text"
             v-model="newCity"
             v-on:focus="handleFocusChanged(true)" v-on:blur="handleFocusChanged(false)">
    </div>
    <select name="" id="" v-on:change="handleSelect">
      <option></option>
      <option :key="index"  v-for="(response,index) in responseCityData">{{response.name}} {{voivodeshipTranslator(response.state)}}</option>
    </select>
  </div>
</template>

<script>
import {ref, watch} from "vue";
import debounce from "lodash.debounce"
import axios from "axios";
import {voivodeshipTranslator} from "@/functions/voivodeshipTranslator";

const API = 'http://api.openweathermap.org/geo/1.0/direct?q='

export default {
  name: 'SearchBar',
  methods: {voivodeshipTranslator},
  props: ['handleCityChanged'],
  setup(props, {emit}) {
    const newCity = ref('');
    const isFocused = ref(false);
    const responseCityData=ref('')
    const selected=ref(0)
    const weatherObject=ref()

    const handleSelect=(e)=>{
      selected.value=e.target.selectedIndex
    }
    watch(selected,()=>{
      weatherObject.value=responseCityData.value[selected.value-1]
      emit('city-object-updated', weatherObject);
    })
    const handleFocusChanged = (value) => {
      isFocused.value = value;
    };

    const handleNewCityChanged = () => {
      emit('city-updated', newCity);
    };

    const update = debounce(() => {
      if (newCity.value !== '') {
        axios.get(`${API}${newCity.value}&limit=5&appid=${process.env.VUE_APP_WEATHER_KEY}`)
            .then((response) => {
              responseCityData.value=response.data
            })
            .catch((error) => {
              console.log(error, "nie znaleziono")
            })
      }
    }, 700)

    watch(newCity, () => {
      emit('city-updated',newCity)
      responseCityData.value=null
      update()
    })

    return {
      newCity,
      isFocused,
      responseCityData,
      handleFocusChanged,
      handleNewCityChanged,
      handleSelect
    };
  },
};
</script>

<style scoped>
.SearchContainer {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  width: 60%;
  height: 70vh;
  position: relative;
}


.InputDiv {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: fit-content;
}

.InputDiv::after {
  content: "";
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translate(-50%, 50%);
  transition: .3s ease;
}

.InputContent {
  padding: 0 5px;
  background: transparent;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.3rem;
  text-align: center;
  transition: .3s ease;
}

.InputContent.focused {
  color: rgba(255, 255, 255, 0.88);
}

.InputDiv.focused::after {
  background-color: rgba(255, 255, 255, 0.88);
}

@media screen and (max-width: 1300px) {
  .SearchContainer {
    width: 40%;
  }

  .InputContent {
    font-size: 1.2rem;
  }
}

@media screen and (max-width: 500px) {
  .SearchContainer {
    width: 60%;
  }

  .InputContent {
    font-size: 1.2rem;
  }
}


</style>
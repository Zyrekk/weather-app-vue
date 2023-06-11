<template>
  <div class="SearchContainer">
    <div class="InputDiv" :class="{'focused': isFocused}">
      <input class="InputContent" :class="{'focused': isFocused}" placeholder="City" spellcheck="false" maxlength="25"
             type="text"
             v-model="searchInput"
             v-on:focus="handleFocusChanged(true)" v-on:blur="handleFocusChanged(false)">
    </div>
    <div class="OptionBox" :class="{'visible':responseCityData}">
      <span class="SingleOption" @click="handleSelect(index)" :key="index" v-for="(response,index) in responseCityData">
        {{ response.formatted }}</span>

    </div>
  </div>
</template>

<script>
import {ref, watch} from "vue";
import debounce from "lodash.debounce"
import axios from "axios";

// const API = 'http://api.openweathermap.org/geo/1.0/direct?q='
const GEOPIFY_API='https://api.geoapify.com/v1/geocode/autocomplete?text='

export default {
  name: 'SearchBar',
  props: ['handleCityChanged'],
  setup(props, {emit}) {
    const searchInput = ref('');
    const isFocused = ref(false);
    const responseCityData = ref([])
    const selected = ref(null)
    const weatherObject = ref()

    const handleSelect = (index) => {
      selected.value = index + 1
    }
    watch(selected, () => {
      if (selected.value !== null) {
        weatherObject.value = responseCityData.value[selected.value - 1]
        emit('city-object-updated', weatherObject);
      }
    })
    const handleFocusChanged = (value) => {
      isFocused.value = value;
    };

    const handleSearchInputChanged = () => {
      emit('search-input-updated', searchInput);
    };

    const update = debounce(() => {
      if (searchInput.value !== '') {
        // responseCityData.value = null
        // selected.value = null
        axios.get(`${GEOPIFY_API}${searchInput.value}&format=json&apiKey=${process.env.VUE_APP_AUTOCOMPLETE_KEY}`)
            .then((response)=>{
              const cities =[]
              response.data.results.forEach((data)=>{
                if(data.city){
                  cities.push(data)
                }
              })
              responseCityData.value=cities
              console.log(cities)
              // responseCityData.value=response.data.results
            })
            .catch((error) => {
              console.log(error, "nie znaleziono")
            })
      }
    }, 600)

    watch(searchInput, () => {
      handleSearchInputChanged()
      responseCityData.value = null
      update()
    })

    return {
      searchInput,
      isFocused,
      responseCityData,
      handleFocusChanged,
      handleSearchInputChanged,
      handleSelect
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.SearchContainer {
  font-family: 'Montserrat', sans-serif;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 25vh;
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
  background-color: rgba(229, 227, 227, 0.63);
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translate(-50%, 50%);
  transition: .3s ease;
}

.InputContent {
  font-family: 'Montserrat', sans-serif;
  padding: 0 5px;
  background: transparent;
  letter-spacing: 1px;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  color: rgba(229, 227, 227, 0.63);
  font-size: 1.3rem;
  text-align: center;
  transition: .3s ease;
}

.InputContent::placeholder {
  color: rgba(229, 227, 227, 0.63);
}

.InputContent.focused {
  color: #fff;
}

.InputContent.focused::placeholder {
  color: #fff;
}

.InputDiv.focused::after {
  background: #fff;
}

.OptionBox {
  box-sizing: border-box;
  margin-top: 2rem;;
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: fit-content;
  opacity: 0;
  transition: .5s;
}

.OptionBox.visible {
  opacity: 1;
}

.SingleOption {
  position: relative;
  width: 100%;
  font-size: 0.8rem;
  text-align: center;
  padding: .6rem 0;
  background: rgba(0, 0, 0, 0.24);
  letter-spacing: 1px;
  cursor: pointer;
  transition: .5s;
}

.SingleOption:after {
  content: '';
  width: 100%;
  height: 3px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.SingleOption:first-child {
  border-radius: 10px 10px 0 0;
}

.SingleOption:last-child {
  border-radius: 0 0 10px 10px;
}

.SingleOption:last-child:after {
  display: none;
}

.SingleOption:hover {
  background: rgba(0, 0, 0, 0.55)
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
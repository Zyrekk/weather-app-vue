<template>
  <div class="SearchContainer" :class="{'focused': isFocused}">
    <input class="InputContent" :class="{'focused': isFocused}" maxlength="25" type="text" v-model="newCity"
           v-on:focus="handleFocusChanged(true)" v-on:blur="handleFocusChanged(false)">
  </div>
</template>

<script>
import {reactive, ref, watch} from "vue";
import debounce from "lodash.debounce"
import axios from "axios";

const API = 'https://api.geoapify.com/v1/geocode/autocomplete?text='

export default {
  name: 'SearchBar',
  props: ['city', 'handleCityChanged'],
  setup(props, {emit}) {
    const newCity = ref('');
    const isFocused = ref(false);
    const cityObject = reactive({
      lat:'',
      lon:''
    })
    const handleFocusChanged = (value) => {
      isFocused.value = value;
    };

    const handleNewCityChanged = (value) => {
      newCity.value = value;
    };

    const update = debounce(() => {
      axios.get(`${API}${newCity.value}&apiKey=${process.env.VUE_APP_AUTOCOMPLETE_KEY}`)
          .then((response) => {
            cityObject.lon=response.data.features[0].geometry.coordinates[0]
            cityObject.lat=response.data.features[0].geometry.coordinates[1]
            emit('city-object-updated', cityObject);
          })
          .catch((error) => {
            console.log(error)
          })
    }, 500)

    watch(newCity, () => {
      update()
    })

    return {
      newCity,
      isFocused,
      cityObject,
      handleFocusChanged,
      handleNewCityChanged
    };
  },
};
</script>

<style scoped>
.SearchContainer {
  display: flex;
  box-sizing: border-box;
  margin-top: 4rem;
  width: 25%;
  height: 3rem;
  position: relative;
}

.SearchContainer::after {
  content: "";
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  bottom: 0;
  left: 0;
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

.SearchContainer.focused::after {
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
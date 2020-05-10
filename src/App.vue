<template>
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 20 ? 'warm' : typeof weather.main != 'undefined' && weather.main.temp <= 20 ? 'cold': ''">
    <main class="wheather" >
      <div class="wheather__search">
        <h1 class="wheather__search--title">Wheather App</h1>
        <input 
          type="text" 
          class="wheather__search--input" 
          placeholder="Ingresar una ciudad"
          v-model="input"
          @keypress.enter="fetchWeather"
        />
      </div>

      <div class="wheather__city-information" v-if="typeof weather.main != 'undefined'">

        <div class="wheather__city-information--general">
        <!-- TODO: IMPROVE IMAGE QUALITY -->
          <img id="wicon" :src="`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`" alt="Weather icon">
          <div class="general__location">{{ weather.name }}, {{ weather.sys.country }}</div>
          <div class="general__date">{{ dateFormat() }}</div>
        </div>

        <div class="wheather__city-information--wheather">
          <div class="wheather__temp" >

            <div class="wheather__box wheather__temp--principal">
                <h2>Temperatura</h2>
              <h1>
                {{ Math.round(weather.main.temp) }} °c
              </h1>
            </div>

            <div class="wheather__temp--extremes">
              <div class="wheather__box">
                <h3>Temperatura máxima</h3>
                <h2>
                  {{ Math.round(weather.main.temp_max) }} °c
                </h2>
              </div>
              <div class="wheather__box">
                <h3>Temperatura mínima</h3>
                <h2>
                  {{ Math.round(weather.main.temp_min) }} °c
                </h2>
              </div>
            </div>
          </div>
          <divc class="wheather__others">
            <div class="wheather__box">
              <h3>Humedad:</h3>
              <h2>
                {{ Math.round(weather.main.humidity) }} %
              </h2>
            </div>
            <div class="wheather__box">
              <h3>Presion:</h3>
              <h2>
                {{ Math.round(weather.main.pressure) }} hPa
              </h2>
            </div>
            <div class="wheather__box">
              <h3>Velocidad de Viento:</h3>
              <h2>
                {{ Math.round(weather.wind.speed) }} km/h
              </h2>
            </div>
          </divc>


        </div>
      </div>

      <div v-else class="wheather__no-information">
        <img src="/img/map.png" width="140px" alt srcset />
        <p>Ingrese una ciudad para brindarle informacion</p>
      </div>
    </main>
  </div>
</template>

<script>

const WHEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const WHEATHER_KEY = process.env.VUE_APP_WHEATHER_KEY;
const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DAYS = ["Sabado", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Domingo"];

export default {
  name: 'app',
  data () {
    return {
      loading: false,
      input: '',
      weather: {}
    }
  },
  methods: {
    /**
    * @summary Get city's wheather information.
    * @description When the user press enter and the information on input match with any city, 
    * Whether Api return the information of city selected.
    */ 
    fetchWeather() {
        fetch(`${WHEATHER_BASE_URL}weather?q=${this.input}&units=metric&APPID=${WHEATHER_KEY}`)
          .then(res => {
            return res.json();
          }).then(results =>{
            this.weather = results;
          });
    },
    /**
    * @summary Custom spanish date format.
    * @description Transform the date in spanish custom format.
    */ 
    dateFormat () {
      let today = new Date(); 
      let day = DAYS[today.getDay()];
      let date = today.getDate();
      let month = MONTHS[today.getMonth()];
      let year = today.getFullYear();
      return `${day} ${date} de ${month} ${year}`;
    }
  }
}

</script>

<style lang="scss">
@import "./src/assets/sass/_variables.scss";

*,
*::before,
*::after{
  box-sizing: border-box;
}

body {
  background-color: $clr-light;
  font-family: $ff-primary;
  color: $clr-dark;
  font-size: var(--fs-body);
  line-height: 1.5;
  max-width: 100%;
  margin: 0;
  background-image: linear-gradient(to bottom, rgba(249, 249, 249, 0.25), rgba(198, 164, 252, 0.872));
}

  .warm{
    background-image: $clr-bg-warm;
  }

  .cold{
    background-image: $clr-bg-cold;
  }

h1,
h2,
h3{
    line-height: 1.1;
    margin: 0;
}

h1{ font-size: var(--fs-h1) }
h2{ font-size: var(--fs-h2) }
h3{ font-size: var(--fs-h3) }

.wheather {

  display: flex;
  flex-direction: column;
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  padding: 1.2rem 35px;

    &__search{
      width: 100%;
      // margin-bottom: 2.0rem; 

      &--title{
        text-align: center;
        text-transform: uppercase;
        margin: 2.0rem 0;
        text-shadow: $bs;
      }

      &--input{
        display: block;
        width: 100%;
        padding: 1.2rem;
        font-size: 1.2rem;
        color: $clr-gray;

        appearance: none;
        border:none;
        outline: none;
        background: none;

        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 16px;
        transition: 0.4s;

        &:focus {
          box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
          background-color: rgba(255, 255, 255, 0.75);
        }
      }
    }


    &__no-information{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      img{
          width: 220px;
          height: 220px;
          align-self: center;
        }
    }
    &__city-information{
      
      &--general{
        display: flex;
        justify-content: center;
        flex-direction: column;
        img{
          width: 150px;
          height: 150px;
          align-self: center;
        }
        .general__location{
          font-weight: $fw-reg;
          text-align: center;
          text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
          font-size: 2em;
          margin-top: -40px;
        }

        

        .general__date{
          font-weight: $fw-reg;
          font-style: italic;
          text-align: center;
          font-size: 1.2em;

        }
      }
      &--wheather{
        display: flex;
        flex-direction: column;
        text-align: center;
        @media ( min-width: 800px) {
          flex-direction: row;
        }
        
        .wheather__temp{
          @media ( min-width: 800px) {
            display: flex;
            }
          &--principal{
            display: flex;
            flex-direction: column;
            @media ( min-width: 800px) {
              margin-right: 20px;
              justify-content: center;
              align-items: center;
            }
          }

          &--extremes{
            display: flex;
            justify-content: space-between;
            div{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              flex: 1;
            }
            div + div{
              margin-left: 20px;
            }
            @media ( min-width: 800px) {
              margin-left: 20px;
              flex-direction: column;
              div + div{
              margin-left: 0px;
            }
            }
          }
        }

        .wheather__others{
          flex: 1;
          display: flex;
          flex-direction: column;
          @media ( min-width: 800px) {
          margin-left: 40px;
          }
        }
        
        .wheather__box{
          padding: 1.2rem 1.2rem;

          background-color: $clr-bg-gray;
          border-radius: 16px;
          margin: 10px 0px;
          box-shadow: $bs;

          h3{
            margin-bottom: 1.2rem;
            color: $clr-gray;
          }
        }

        
      }
    }

}

</style>

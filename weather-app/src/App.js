import React, { useState, useEffect } from 'react';
import './App.css';
import Heading from './components/heading.js';
import Search from './components/search.js';
import CurrentWeather from './components/current-weather';
import API from './api.js';
import SevenDayForecast from './components/seven-day-forecast';



function App(){
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null)
  const [cityName, setCityName] = useState(null);
  const [countryName, setCountryName] = useState(null);

  const handleOnSearchChange = async (searchData) => {


    const { countryName, cityName, latitude, longitude } = searchData;

    setCityName(cityName);
    setCountryName(countryName);


    try {
      const response = await fetch(`${API.weatherURLBase}forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timeformat=unixtime&timezone=Africa%2FCairo`);
      const weatherDataResponse = await response.json();


      setCurrentWeather(weatherDataResponse.current_weather);
      setForecast(weatherDataResponse.daily);

    } catch (error) {
      console.error(error);
    }

  }


  return(
    <div className="container">
      <Heading/>
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data = {{currentWeather,cityName,countryName}}/>}
      {forecast && <SevenDayForecast forecast = {forecast}/>}

    </div>

  )

}

export default App;

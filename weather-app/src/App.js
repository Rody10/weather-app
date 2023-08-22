import React, { useState, useEffect } from 'react';
import './App.css';

const api = {
  key: "9867cd159c59148c6c54425ba8bd22e1",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <WeatherAppMainComponent />
      </header>
    </div>
  );
}

function metersPerSecondToKilometersPerHour(mps) {
  return (mps * 3.6).toFixed(1);
}

function OneDayForecast(props) {
  const { day, date, month, maxTemp, minTemp, condition } = props;

  return (
    <div>
      <p style={{ fontWeight: 'bold' }}>{day} {date}, {month}</p>
      <p>{minTemp}°C/{maxTemp}°C</p>
      <p>{condition}</p>
    </div>
  );
}

function SevenDayForecast(props) {
  const { sevenDayWeatherForecast } = props;

  function getDayDateMonthFromTimestamp(unixTimestamp) {
    const timestampInMilliseconds = unixTimestamp * 1000;
    const dateObject = new Date(timestampInMilliseconds);

    const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    const day = days[dateObject.getUTCDay()];

    const date = dateObject.getUTCDate();

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const month = months[dateObject.getUTCMonth()];

    return {
      day,
      date,
      month
    };


  }

  // for all the daily weather prediction data in the sevenDayWeatherForcast array (excluding the first day because its the current day),
  // obtain the day, date, month min, max temp and the condition.
  const forecastComponents = sevenDayWeatherForecast.slice(1).map((forecast, index) => {
    const convertedCombinedTime = getDayDateMonthFromTimestamp(forecast.dt);
    return (
      <div key={index}>
        <OneDayForecast
          day={convertedCombinedTime.day}
          date={convertedCombinedTime.date}
          month={convertedCombinedTime.month}
          minTemp={forecast.temp.min}
          maxTemp={forecast.temp.max}
          condition={forecast.weather[0].description}
        />
      </div>
    );
  });

  return (
    <div>
      <h3>7-day forecast</h3>
      <div className="flex-container">{forecastComponents}</div>
    </div>)


}

function CurrentWeather(props) {

  function degreesToCardinal(degrees) {
    // Ensure degrees are within the range [0, 360)
    degrees %= 360;
    if (degrees < 0) {
      degrees += 360;
    }

    // Define cardinal directions and their corresponding degree ranges
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    const degreeRanges = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5, 360];

    // Find the index of the first range that the degree falls into
    for (let i = 0; i < directions.length; i++) {
      if (degrees < degreeRanges[i]) {
        return directions[i];
      }
    }
  };

  const { cityName, countryName, weatherData } = props;

  if (!weatherData || !weatherData.current) {
    return <p>Waiting for location name...</p>;
  }

  const currentTemp = weatherData.current.temp;
  const weatherCondition = weatherData.current.weather[0].description;
  const windSpeed = weatherData.current.wind_speed;
  const windDirection = weatherData.current.wind_deg;

  return (
    <div id="currentWeather">
      <p style={{ fontSize: '30px'}}>{cityName}, {countryName}</p>
      <p style={{ fontSize: '50px', fontWeight: 'bold' } }>{currentTemp.toFixed(1)}°C</p>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Weather condition: <span style={{ fontWeight: 'normal' }}>{weatherCondition}</span></p>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Wind speed: <span style={{ fontWeight: 'normal' }}>{metersPerSecondToKilometersPerHour(windSpeed)} km/h</span></p>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Wind direction: <span style={{ fontWeight: 'normal' }}>{degreesToCardinal(windDirection)} ({windDirection})°</span></p>
    </div>
  );

}

function WeatherInfo(props) {
  const { cityName, countryName, weatherData } = props;

  return (
    <div>
      <CurrentWeather cityName={cityName} countryName={countryName} weatherData={weatherData} />
      {weatherData && weatherData.daily ? (
        <SevenDayForecast sevenDayWeatherForecast={weatherData.daily} />
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

function SearchBar() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");

  const getDataFor7Days = async (lat, lon) => {
    const weatherUrl = `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`;
    const forecastUrl = `${api.base}onecall?lat=${lat}&lon=${lon}&exclude=hourly&units=metric&appid=${api.key}`;
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl),
      ]);

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setCityName(weatherData.name);
      setCountryName(weatherData.sys.country);
      setWeatherData(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };


  const getData = async (e) => {
    e.preventDefault(); // prevent default form submission behavior so that pressing enter can work
    try {
      const url = `${api.base}weather?q=${city}&APPID=${api.key}`;
      const response = await fetch(url);
      const data = await response.json();
      setCityName(data.name);
      setCountryName(data.sys.country);
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      getDataFor7Days(lat, lon);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  // when opening the app for the first time, Harare's weather is displayed
  useEffect(() => {
    getDataFor7Days(-17.8292, 31.0522);
  }, []);

  return (
    <div>
      <form onSubmit={getData}>
        <input
          type="text"
          placeholder="Enter location name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <WeatherInfo cityName={cityName} countryName={countryName} weatherData={weatherData} />
    </div>
  );
}

function WeatherAppMainComponent() {
  return (
    <div>
      <SearchBar />
    </div>
  );
}

export default App;

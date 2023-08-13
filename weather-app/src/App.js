import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
    </div>
  );
}

function OneDayForecast({OneDayForecast}){
  return(
    1
  );
}


function SevenDayForecast({SevenDayForecast}){
  return(
    <tr>
      <th colSpan="7">
        <OneDayForecast/>
      </th>
    </tr>
  );
}

function CurrentWeather({CurrentWeather}){
  return(
    1
  );
}

function WeatherInfo({weatherData}) {
  return(
    <div>
      <CurrentWeather/>
      <SevenDayForecast/>
    </div>

  );
}


function SearchBar() {
  return (

    <input type="text" placeholder="Enter location name" />
    );
}



function WeatherAppMainComponent({weatherData}){
  return(
    <div>
      <SearchBar/>
      <WeatherInfo/>
    </div>
  );
}

export default App;

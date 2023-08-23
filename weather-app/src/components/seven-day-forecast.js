import React from "react";
import OneDayForecast from "./one-day-forecast";

function SevenDayForecast(forecast) {

    const weatherData = [];

    for (let i = 0; i < forecast.forecast.time.length; i++) {
        const unixTime = forecast.forecast.time[i];
        const maxTemp = forecast.forecast.temperature_2m_max[i];
        const minTemp = forecast.forecast.temperature_2m_min[i];
        const weatherCode = forecast.forecast.weathercode[i];

        weatherData.push(

            <div  key={i}>
                < OneDayForecast
                    unixTime = {unixTime}
                    maxTemp = {maxTemp}
                    minTemp = {minTemp}
                    weatherCode = {weatherCode}
                />
            </div>
            );
        }
        return (
            <div>
              <h3>7-day forecast</h3>
              <div className="flex-container">{weatherData}</div>
            </div>)

}

export default SevenDayForecast;

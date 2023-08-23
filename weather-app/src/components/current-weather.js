import getWeatherCondition from "./convert-weather-code-to-condition";

const CurrentWeather = ({data}) => {

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

    return (
        <div className = "current-weather">
            <p style={{ fontSize: '30px'}}>{data.cityName}, {data.countryName}</p>
            <p style={{ fontSize: '50px', fontWeight: 'bold' } }>{data.currentWeather.temperature.toFixed(1)}°C</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Weather condition: <span style={{ fontWeight: 'normal' }}>{getWeatherCondition(data.currentWeather.weathercode)}</span></p>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Wind speed: <span style={{ fontWeight: 'normal' }}>{data.currentWeather.windspeed} km/h</span></p>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Wind direction: <span style={{ fontWeight: 'normal' }}>{degreesToCardinal(data.currentWeather.winddirection)} ({data.currentWeather.winddirection})°</span></p>
        </div>
    )

}

export default CurrentWeather;

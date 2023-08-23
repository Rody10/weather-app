import getWeatherCondition from "./convert-weather-code-to-condition";

function OneDayForecast(forecast) {
    const { unixTime, maxTemp, minTemp, weatherCode} = forecast;

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
      const convertedCombinedTime = getDayDateMonthFromTimestamp(unixTime);
      const condition = getWeatherCondition(weatherCode);
      const day = convertedCombinedTime.day;
      const date = convertedCombinedTime.date;
      const month = convertedCombinedTime.month;


    return (
      <div>
        <p style={{ fontWeight: 'bold' }}>{day} {date}, {month}</p>
        <p>{minTemp}°C/{maxTemp}°C</p>
        <p>{condition}</p>
      </div>
    );
  }

export default OneDayForecast;

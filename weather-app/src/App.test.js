import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrentWeather from './components/current-weather';



describe('CurrentWeather Component', () => {
  const testData = {
    cityName: 'City',
    countryName: 'Country',
    currentWeather: {
      temperature: 20,
      weathercode: 800,
      windspeed: 10,
      winddirection: 45,
    },
  };

  it('renders weather data correctly', () => {
    const { getByText } = render(<CurrentWeather data={testData} />);

    expect(getByText('City, Country')).toBeInTheDocument();
    expect(getByText('20.0°C')).toBeInTheDocument();
    expect(getByText('Weather condition:')).toBeInTheDocument();
    expect(getByText('Wind speed:')).toBeInTheDocument();
    expect(getByText('Wind direction:')).toBeInTheDocument();
  });
});


import { useState, useEffect } from "react";



const WeatherCard = ({ dailyForecast }) => {

  const [renderedForecast, setRenderedForecast] =  useState({})

  const convertForecast = () => {
    let hourlyTemps = dailyForecast.map((object) =>
      Math.round(object.temp)
    );

    let minTemp = Math.min(...hourlyTemps);
    let maxTemp = Math.max(...hourlyTemps);
    let sum = hourlyTemps.reduce((a, b) => a + b);
    let averageTemp = Math.round(sum / hourlyTemps.length);

    let date = new Date(dailyForecast[0].timestamp_local);
    let dateString = date.toDateString();
    dateString = dateString.substring(0, dateString.lastIndexOf(" "))

    // Takes icon of mid element in array
    let icon = dailyForecast[Math.round(dailyForecast.length / 2)].weather.icon;
    let iconUrl = `${process.env.PUBLIC_URL}/weather_icons/${icon}.png`;
    
    let description = dailyForecast[Math.round(dailyForecast.length / 2)].weather.description

    return {
      minTemp,
      maxTemp,
      averageTemp,
      description,
      dateString,
      iconUrl,
    };
  };

  useEffect(() => {
    if(Object.entries(dailyForecast).length > 0) {
      setRenderedForecast(convertForecast())
    }
  }, [dailyForecast])

  return (
    <div className="card">
      <img src={renderedForecast.iconUrl} alt="Icon" />
      <div className="card-body">
      <p>{renderedForecast.description}</p>
        <h4>
          <b>{renderedForecast.dateString}</b>
        </h4>
        <h3>{renderedForecast.averageTemp}&#176;</h3>
      </div>
    </div>
  );
};

const WeatherForecastView = ({ location }) => {
  const [forecast, setForecast] = useState([]);

  const api = {
    base: "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?",
    headers: {
      "x-rapidapi-key": "adcf43fa4bmsh46df9a8c48ff624p19b60ejsnecb79d168666",
      "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
    },
  };

  // Sort response data to daily forecast (5 days) instead of 3 hour intervals.
  const sortHourlyToDaily = (data) => {
    let sortedForecast = [];
    if (data.length > 0) {
      let initialDate = new Date(data[0].timestamp_utc + "Z");

      sortedForecast.push([]);
      data.forEach((value, index) => {
        let currDate = new Date(value.timestamp_utc + "Z");

        if (initialDate.getUTCDate() === currDate.getUTCDate()) {
          sortedForecast[sortedForecast.length - 1].push(value);
        } else {
          initialDate = new Date(data[index].timestamp_utc + "Z");
          sortedForecast.push([value]);
        }
      });
    }

    return sortedForecast;
  };

  //Fetch 5 day forecast for location.
  useEffect(() => {
    if (location.length > 0 ) {
      // handleLoading();
      setTimeout(() => {
        fetch(`${api.base}lat=${location[1]}&lon=${location[0]}`, {
          method: "GET",
          headers: api.headers,
        })
          .then((response) => response.json())
          .then((data) => {
            setForecast(sortHourlyToDaily(data.data));
            // handleLoading();
          })
          .catch((err) => {
            setForecast([]);
            // handleLoading();
            // #TODO: Implement proper error handling
            console.error(err);
          });
      }, 2000);
    }
  }, [location]);

  //Set forecast for render
  useEffect(() => {
    if (forecast.length > 0) {
      console.log(forecast);
      forecast.forEach((value) => {});
    }
  }, [forecast]);

  const weatherCards = forecast.map((obj, i) => {
    return <WeatherCard dailyForecast={obj} key={i} />;
  });

  return (
    <>
      {forecast && (
        <div className="container">
          <div className="cards">{weatherCards}</div>
        </div>
      )}
    </>
  );
};

export default WeatherForecastView;

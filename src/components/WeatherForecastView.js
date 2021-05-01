import { useState, useEffect } from "react";

const WeatherCard = ({ dailyForecast }) => {
  return (
    <div className="card">
      <img src="" alt="Avatar" style={{ width: "28em" }} />
      <div className="card-body">
        <h4>
          <b>{dailyForecast[0].datetime}</b>
        </h4>
        <p>{dailyForecast[0].app_temp}</p>
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
    if (location.length > 0) {
      setTimeout(() => {
        fetch(`${api.base}lat=${location[0]}&lon=${location[1]}`, {
          method: "GET",
          headers: api.headers,
        })
          .then((response) => response.json())
          .then((data) => {
            setForecast(sortHourlyToDaily(data.data));
          })
          .catch((err) => {
            setForecast([]);
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
      // forecast.forEach((value) => {});
    }
  }, [forecast]);

  const weatherCards =   forecast.map((obj, i) => {
    return <WeatherCard dailyForecast={obj} key={i} />;
  });


  return (
    <>{forecast && <div className="forecast-container">{weatherCards}</div>}</>
  );
};

export default WeatherForecastView;

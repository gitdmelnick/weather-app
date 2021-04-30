import { useState,useEffect } from "react";
import WeatherCard from './WeatherCard'

const WeatherForecastView = ({ location }) => {
  const [forecast, setForecast] = useState([]);

  const api = {
    base: "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?",
    headers: {
			"x-rapidapi-key": "adcf43fa4bmsh46df9a8c48ff624p19b60ejsnecb79d168666",
			"x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
    },
  };

  const sortHourlyToDaily = (data, index) => {
    let sortedForecast = []
    if(data.length > 0) {
      let initialDate = new Date(data[0].timestamp_utc+'Z')
      
      sortedForecast.push([]) 
      data.forEach((value, index) => {
        let currDate = new Date(value.timestamp_utc+'Z')

        if (initialDate.getUTCDate() === currDate.getUTCDate()) {
          sortedForecast[sortedForecast.length-1].push(value)
        }
        else {
          initialDate = new Date(data[index].timestamp_utc+'Z')
          sortedForecast.push([value])
        }
      })
    }

    return sortedForecast
  }

  useEffect(() => {
    console.log("Location is ", location)
    console.log("location keys", Object.entries(location))

    // if(Object.entries(location).length > 0) {
    //   setTimeout(()=>{
    //     fetch(
    //     `${api.base}lat=${location.latitude}&lon=${location.longitude}`,
    //     {
    //       method: "GET",
    //       headers: api.headers
    //     }
    //   )
    //     .then((response) => response.json())
    //     .then((data) => {
          
    //       setForecast(data.data)
    //     })
    //     .catch((err) => {
    //       setForecast([])
    //       // #TODO: Implement proper error handling
    //       console.error(err);
    //     });}, 2000)
    // }
    
  },[location])
  
  const createCards = () => {
    return forecast.map((obj, i) => {
      return <WeatherCard dailyForecast={obj} key={i} />;
    });
  }

  return (
    <div className='container'>
      {forecast && (
        createCards
      )}
    </div>
  );
};

export default WeatherForecastView;
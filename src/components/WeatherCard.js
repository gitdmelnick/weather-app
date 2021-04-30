 

const WeatherCard = ({ dailyForecast }) => {
  return (
    <>
      <div className="card">
        <img src="" alt="Avatar" style={{width:'28em'}} />
        <div class="card-body">
          <h4>
            <b>{dailyForecast.datetime}</b>
          </h4>
          <p>{dailyForecast.app_temp}</p>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;

import CitySearchView from './components/CitySearchView'
import WeatherForecastView from './components/WeatherForecastView'
import {useState} from 'react'

function App() {

  //Contains coordinates of chosen city, location (i.e latitude, longitude).
  // #TODO: Replace with better solution. 
  const [location, setLocation] = useState([])

  return (
    <div className="App">
      <CitySearchView setLocation={setLocation}></CitySearchView>
      <WeatherForecastView location={location}></WeatherForecastView>
    </div>
  );
}

export default App;

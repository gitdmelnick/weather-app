import CitySearchView from "./components/CitySearchView";
import WeatherForecastView from "./components/WeatherForecastView";
import { useState, createRef } from "react";
import logo from "./logo.svg";

function App() {
  //Contains coordinates of chosen city, location (i.e latitude, longitude).
  // #TODO: Replace with better solution.
  const [location, setLocation] = useState([]);
  const wrapperRef = createRef();

  const handleLoading = () => {
    wrapperRef.current.toggle("is-loading");
  };

  // #TODO: Add loading animation on forecast fetch.
  return (
    <div className="App">
      <div className="app-header">
        <div ref={wrapperRef} className="wrapper">
          <img src={logo} className="app-logo" alt="logo" />
        </div>
        <h5 className="app-title">WEATHER APP</h5>
      </div>
      <CitySearchView setLocation={setLocation}></CitySearchView>
      <WeatherForecastView
        location={location}
      ></WeatherForecastView>
    </div>
  );
}

export default App;

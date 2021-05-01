import { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";


const CitySearchView = ({setLocation}) => {

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const api = {
    base: " https://api.mapbox.com/geocoding/v5/mapbox.places/",
    key: "pk.eyJ1IjoiamRldjEwNCIsImEiOiJja280aHBsMTcwOGZqMnZzNnh0cTZiZzE5In0.TEdlkA38fYyfqZ7H3U0WCQ"
  };

  const onChange = (event, {newValue}) => {
    setQuery(newValue);
  };
  
 
  const inputProps = {
    placeholder: "Enter a city",
    value: query,
    onChange: onChange,
  };
  
  //Sends request for city search each time input value is changed. 
  //Search result may contain 'duplicate' values (e.g. "Kyiv, Ukraine", "Київ, Kyiv, Ukraine") due to nature of api.
  //Autocomple results can be changed with addition/removal of values from 'types' parameter .
  const onSuggestionsFetchRequested = ({ value }) => {
    if(value.match(/^([a-z0-9]{2,})$/)) {
      fetch(
        `${api.base}${value}.json?access_token=${api.key}&types=country,region,district,place&autocomplete=true`,
        {
          method: "GET",
          headers: api.headers
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.features)
          setSuggestions(data.features)
        })
        .catch((err) => {
          setSuggestions([])
          // #TODO: Implement proper error handling
          console.error(err);
        });
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, {suggestion}) => {
    setLocation(suggestion.center)
    console.log("Suggestion", suggestion.center)
  }

  const getSuggestionValue = suggestion => `${suggestion.place_name}`;

  const renderSuggestion = suggestion => (
    <span>
      {`${suggestion.place_name}`}
    </span>
  );

  return (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </>
  );
};

export default CitySearchView;

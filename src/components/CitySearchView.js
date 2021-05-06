import { useState } from "react";
import Autosuggest from "react-autosuggest";

const CitySearchView = ({ setLocation }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const api = {
    base: " https://api.mapbox.com/geocoding/v5/mapbox.places/",
    key:
      "pk.eyJ1IjoiamRldjEwNCIsImEiOiJja280aHBsMTcwOGZqMnZzNnh0cTZiZzE5In0.TEdlkA38fYyfqZ7H3U0WCQ",
  };

  const onChange = (event, { newValue }) => {
    setQuery(newValue);
  };

  const inputProps = {
    placeholder: "Enter a city",
    value: query,
    onChange: onChange,
  };

  //Sends request for city search each time input value is changed.
  //Autocomple results can be changed with addition/removal of values from 'types' parameter .
  const onSuggestionsFetchRequested = ({ value }) => {
    if (value.match(/^([a-z0-9]{2,})$/)) {
      fetch(
        `${api.base}${value}.json?access_token=${api.key}&types=place&autocomplete=true`,
        {
          method: "GET",
          headers: api.headers,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.features);
        })
        .catch((err) => {
          setSuggestions([]);
          // #TODO: Implement proper error handling
          console.error(err);
        });
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setLocation(suggestion.center);
  };

  const getSuggestionValue = (suggestion) => `${suggestion.place_name}`;

  const renderSuggestion = (suggestion) => (
    <span>{`${suggestion.place_name}`}</span>
  );

  return (
    <div className="container">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};

export default CitySearchView;

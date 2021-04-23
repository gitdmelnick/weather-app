import { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";


const CitySearchView = () => {

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const citiesApi = {
    base: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?",
    headers: {
      "x-rapidapi-key": "adcf43fa4bmsh46df9a8c48ff624p19b60ejsnecb79d168666",
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
  };

  const inputProps = {
    placeholder: "Enter city",
    value: query,
    onChange: onChange,
  };
  
  const onSuggestionsFetchRequested = ({ value }) => {
    if(value.match(/^([a-z0-9]{1,})$/)) {
      fetch(
        `${citiesApi.base}namePrefix=${value}`,
        {
          method: "GET",
          headers: citiesApi.headers
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.data)
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
      console.log(`latitude=${suggestion.latitude}, longitude=${suggestion.longitude}`)
  }

  const getSuggestionValue = suggestion => `${suggestion.name}, ${suggestion.region}, ${suggestion.country}`;

  const renderSuggestion = suggestion => (
    <span>
      {`${suggestion.name}, ${suggestion.region}, ${suggestion.country}`}
    </span>
  );

  const onChange = (event, {newValue}) => {
    setQuery(newValue);
  };
  
  useEffect(() => {
    
  }, [query,suggestions])

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

import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const CountryInfo = ({ name, languages, flag, capital, area, latlng}) => {
    const languagesArray = Object.values(languages);
    const api_key = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState({});    
    let apiCallURL;
    
    if(!capital){
        apiCallURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}`;
        capital = [name];
    }else {
        apiCallURL = `https://api.openweathermap.org/data/2.5/weather?q=${capital[0]}&units=metric&appid=${api_key}`;
    }

    useEffect(() => {
        axios
          .get(apiCallURL)
          .then(response => {            
            setWeather(response.data);
          });
      }, []);    
      
    return (        
        <>
            <h2>{name}</h2>            
            {capital.map(element => <p key={element}>capital: {element}</p>)}
            <p>area: {area} km<sup>2</sup></p>
            <h4>Languages:</h4>
            <ul>
                {languagesArray.map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={`${flag}`} alt={`${name} flag`}/> 
            {!(weather.main === undefined) && 
            <>
                <h3>Weather in {capital[0]}</h3>
                <p>temperature: {weather.main.temp} celcius</p> 
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon'/>
                <p>wind: {weather.wind.speed} m/s</p>         
            </>    
            }
            
        </>
    );
};

export default CountryInfo;
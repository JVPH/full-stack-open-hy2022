import { useEffect, useState } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Countries from './components/Countries';


const App = () => {  

  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  


  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        console.log('fulfilled');
        setCountries(response.data);        
      });      
  }, []);  

  const handleFilterChange = (e) => {
    if(e.target.value.match(/^\s*$/) === null){

      const result = countries.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
      setCountriesToShow(result);   
    }  
  };

  
  
  return (
    <div>
      <Filter onChange={handleFilterChange}/>
      <Countries countriesToShow={countriesToShow} />
    </div>
  );

};


export default App;
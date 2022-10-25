import { useState } from "react";
import CountryInfo from "./CountryInfo";
const Country = ({countryInfo}) => {   
    const [showInfo, setShowInfo] = useState(false);    

    if(showInfo){
        return (

            <div>
                <CountryInfo name={countryInfo.name.common} languages={countryInfo.languages} flag={countryInfo.flags.png} capital={countryInfo.capital} area={countryInfo.area} latlng={countryInfo.latlng}/>
                <button onClick={()=>setShowInfo(!showInfo)}>show</button>
            </div>            
        ); 
    }else {
        return (
            <div>
                <p>{countryInfo.name.common} <button onClick={()=>setShowInfo(!showInfo)}> show </button></p>
                
            </div>
        );
    };    
      
};

export default Country;
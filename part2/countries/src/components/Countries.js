import Country from "./Country";
import CountryInfo from "./CountryInfo";

const Countries = ({ countriesToShow }) => {
    
    if(countriesToShow.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    }else if(countriesToShow.length > 1 && countriesToShow.length <= 10){
        return (
            <div>
                {countriesToShow.map(country => 
                
                    <Country  key={country.name.official} countryInfo={country} /> 
                
                )}
            </div>
        );
    }else if(countriesToShow.length === 1) {                
        return (
            <>
                <CountryInfo name={countriesToShow[0].name.common} languages={countriesToShow[0].languages} flag={countriesToShow[0].flags.png} capital={countriesToShow[0].capital} area={countriesToShow[0].area} latlng={countriesToShow[0].latlng} />
            </>
        );
    }
};

export default Countries;
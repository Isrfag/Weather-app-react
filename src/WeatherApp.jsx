import { useState } from "react"

const geoUrl ='http://api.openweathermap.org/geo/1.0/direct'
const mainUrl = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = '71a5af0525e2e6830bf0fe5e6721fa28'

export const WeatherApp = () => {

    const [city,setCity] = useState ('')
    const [weatherData,setWeatherData] = useState (null)

    const fetchClimate = async () => {

        fetch(`${geoUrl}?q=${city}&appid=${api_key}`)
            .then(response => response.json())
            .then(geoCoord => { //No hace falta un estado para hacer esto
                    let lat = geoCoord[0].lat
                    console.log(lat)
                    let lon = geoCoord[0].lon

                    fetch (`${mainUrl}?lat=${lat}&lon=${lon}&appid=${api_key}`)
                        .then (finalres => finalres.json())
                        .then(weather => setWeatherData(weather))
            })
    }

    const handleChangeCity = (event) =>{
        setCity(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(city.length > 0) fetchClimate()
    }

    return (
        <>
            <div className="container">
                <h1>Wheater App</h1>

                <form onSubmit={handleSubmit}>
                    <input type="text" value={city} onChange={ handleChangeCity } placeholder="Search city/village"></input>
                    <button type="submit"> Search </button>
                </form>

                {
                    weatherData && (
                        <div>
                            <h2>{weatherData.name}</h2>
                            <h3>{weatherData.sys.country}</h3>
                            <p>Temperature: {parseInt(weatherData.main.temp)-273}ºC</p>
                            <p>Humidity: {weatherData.main.humidity}</p>
                            <p>Description: {weatherData.weather[0].description}</p>
                            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
                        </div>
                    )
                    
                }

            </div>
        
        
        </>
    )
}

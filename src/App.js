import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Forecast from './components/Forecast';

function App() {

  const api_key = process.env.REACT_APP_API_KEY;
  const api_url = `https://api.openweathermap.org/data/2.5/`;
  
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState([]); 
  
     useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    //    
      const getData = () => {
        axios.get(`http://${api_url}weather?lat=${lat}&lon=${long}&units=metric&appid=${api_key}`)
        .then(res => {
          setData(res.data);  
      })}
      getData();
      console.log("latitude is:", lat)
      console.log("longitude is:",long)
      },[lat, long]);

  const search = (event) => {
     axios.get(`http://${api_url}weather?q=${query}&units=metric&appid=${api_key}`)
    .then(res => {
      setData(res.data);
      console.log(res.data);
    }
  )
  }

 
  return (
    <div className="App">
      <main>
        <div>
          {data.main && (
            <div className={data.main.temp > 20?'weather-box':'weather-box-cold'}>
              <div className="search-box">
                <input type="text" placeholder="search..."
                onChange={e =>setQuery(e.target.value)}
                value={query}
                onKeyPress={(e) => {if(e.key === 'Enter') search()}} />
              <button onClick={search}>search</button>
            </div>
                  <div className=''>{data.name}, {data.sys.country}</div>            
                  <div> Temp:<div>{data.main.temp}°C</div></div>
                  <div> Humidity: {data.main.humidity}%</div>
                  <div> Pressure:{data.main.pressure} kPa </div>
                  <div> Wind:{data.wind.speed} km/h </div> 
                  <div> Description:{data.weather[0].description} </div>   
                  <div> Sunrise:{new Date(data.sys.sunrise * 1000).toLocaleTimeString()} </div>
            </div>)}
        </div>
        <Forecast lat={lat} long={long}/>
      </main>
    </div>
  );
 }

export default App;



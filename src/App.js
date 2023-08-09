import axios from "axios";
import WeatherInfo from "./components/WeatherInfo";
import { useState } from "react";
import Search from "./components/Search";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./components/api";

function App() {

  const [data, setData] = useState({});
  const [foreData, setForeData] = useState({});
  const [cityName, setCityName] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = (searchData) => {
    const lat = searchData.value.split(" ")[0];
    const lon = searchData.value.split(" ")[1];
    axios.get(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
      .then(res => {
        setData(res.data);
        setCityName(searchData.label);
      })
      .catch(err => setError(err))

    axios.get(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
      .then(res => {
        setForeData(res.data);
        setCityName(searchData.label);
      })
      .catch(err => setError(err))
  }

  const handleOnSearchChange = (searchData) => {
    getWeather(searchData);
  }

  const errorAlert = (err) => alert(err);
  return (
    <div className="app">
      <Search onSearchChange={handleOnSearchChange} />
      <WeatherInfo data={data} cityName={cityName} forecast={foreData} />
      { error && errorAlert }
    </div>
  );
}

export default App;

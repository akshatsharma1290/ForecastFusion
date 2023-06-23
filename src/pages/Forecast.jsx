import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { extractTime, simplifyDateFormat } from "../functions/formatDate";
import ForecastSlider from "../components/ForecastSlider";
import NextForecast from "../components/NextForecast";
import PreLoader from "../components/PreLoader";

export default function Forecast({ apiKey }) {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
     try {
       // Fetching The Forecast Data based on the active Location.
      const location = localStorage.getItem("activeLocation")
      const api = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=10&aqi=no&alerts=no
        `;
      const response = await fetch(api);
      const data = await response.json();
      setForecastData(data);
     } catch (error) {
       alert("Internet Connection Error.")
     }
    };
    fetchData();
  }, [apiKey]);

  return (
    <>
      <h1 className="text-center text-slate-100 font-rubik text-2xl mt-5 mb-8">
        Forecast Report
      </h1>
      {forecastData.forecast ? (
        <>
          <ForecastSlider
            data={forecastData.forecast.forecastday[0].hour}
            // Passing the Current Time in A single Digit. So it can be used for indexing.
            currentTime={Number(extractTime(forecastData.location.localtime))}
            todayDate={simplifyDateFormat(
              forecastData.forecast.forecastday[0].date,
              "simplified"
            )}
          />
          <h2 className="text-slate-100 px-5 text-xl font-medium mb-4">
            Next Forecast
          </h2>
          <NextForecast forecastData={forecastData} />
        </>
      ) : <PreLoader/>}
    </>
  );
}

Forecast.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

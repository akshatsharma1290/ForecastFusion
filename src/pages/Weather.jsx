import { PropTypes } from "prop-types";
import { useEffect, useReducer } from "react";
import { extractTime } from "../functions/formatDate";
import { initialState, reducer } from "../reducers/weatherReducer";
import ForecastSlider from "../components/ForecastSlider";
import WeatherIntro from "../components/WeatherIntro";
import ForecastMode from "../components/ForecastMode";
import AirQualityMode from "../components/AirQualityMode";
import PreLoader from "../components/PreLoader";

export default function Weather({ apiKey }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching Forecast and air quality data based on active Location.
        const location = localStorage.getItem("activeLocation");
        const response =
          await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=yes&alerts=no

              `);
        const weatherData = await response.json();
        dispatch({ type: "SET_DATA", payload: weatherData });
        dispatch({ type: "SET_FETCHED", payload: true });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [apiKey]);

  const { data, fetched, activeMode } = state;

  return (
    <>
      <section
        className="weather font-montserrat flex flex-col items-center mt-5 mb-16"
        id="weather"
      >

        {fetched ? (
          <>
            <WeatherIntro
              data={data}
              activeMode={activeMode}
              dispatch={dispatch}
            />

            <div className="flex flex-wrap gap-y-4 gap-x-4 justify-center">
              {activeMode === "forecast" ? (
                <ForecastMode data={data} />
              ) : (
                <AirQualityMode data={data} />
              )}
            </div>
            <ForecastSlider
              data={data.forecast.forecastday[0].hour}
              currentTime={Number(extractTime(data.location.localtime))}
            />
          </>
        ) : <PreLoader/>}
      </section>
    </>
  );
}

Weather.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

import React from "react";
import { PropTypes } from "prop-types";

// This array contains the heading , keys and extension of the forecast property.
const forecastMode = [
  ["Temp", "temp_c", "<sup>o</sup>"],
  ["Wind", "wind_kph", "km/h"],
  ["Humidity", "humidity", "%"],
  ["Pressure", "pressure_mb", "mb"],
  ["Cloud Cover", "cloud", "%"],
  ["Wind Gust", "gust_kph", "km/h"],
];

export default function ForecastMode({ data }) {
  return (
    <>
      {forecastMode.map((item) => {
        return (
          <React.Fragment key={item[0]}>
            <div className="w-28 flex flex-col font-medium items-center">
              <p className="text-slate-300 text-lg font-rubik">{item[0]}</p>
              <p className="text-slate-100 text-lg flex items-center">
                {data.current[item[1]]}
                <span
                  className="ml-1"
                  dangerouslySetInnerHTML={{ __html: item[2] }} // By Using this html in a string will be considered as a html not a string.
                ></span>{" "}
              </p>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}

ForecastMode.propTypes = {
  data: PropTypes.object.isRequired,
};

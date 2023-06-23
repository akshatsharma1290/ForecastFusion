import React from "react";
import { PropTypes } from "prop-types";

// Array containing the headings/keys of air quality mode. They will be used ot extract data and also shown as heading in screen.
const air_qualityMode = [
  "co",
  "o3",
  "no2",
  "so2",
  "pm2_5",
  "pm10",
  "us-epa-index",
  "gb-defra-index",
];

export default function AirQualityMode({ data }) {
  return (
    <>
      {air_qualityMode.map((item) => {
        return (
          <React.Fragment key={item}>
            <div
              className={`${
                item.length < 7 ? "w-24" : "w-fit"
              } flex flex-col font-medium items-center`}
            >
              <p className="text-slate-300 text-lg font-rubik text-center">
                {item.toUpperCase()}
              </p>
              <p className="text-slate-100 text-lg flex items-center">
                {/* .toFixed(2) it is used to round up the number to "2" decimals. */}
                {data.current.air_quality[item].toFixed(2)}
              </p>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}

AirQualityMode.propTypes = {
  data: PropTypes.object.isRequired,
};

import React from "react";
import { PropTypes } from "prop-types";
import { simplifyDateFormat } from "../functions/formatDate";

export default function NextForecast({ forecastData }) {
  return (
    <>
      <section className="px-5 font-montserrat space-y-5 mb-20">
        {forecastData.forecast.forecastday.map((item, index) => {
          if (index > 0) {
            return (
              <React.Fragment key={item.date_epoch}>
                <div className="bg-slate-20 h-24 rounded-xl font-rubik flex items-center p-4 justify-between">
                  <div>
                    <p className="text-slate-100">
                      {/* Extracting the day from the date string.*/}
                      {simplifyDateFormat(item.date, "day")}
                    </p>
                    {/* Extracting the date and month from the date string.*/}
                    <p className="text-slate-300">
                      {simplifyDateFormat(item.date, "dateandmonth")}
                    </p>
                  </div>
                  <p className="text-slate-100 text-3xl">
                    {item.day.maxtemp_c}
                    <sup className="text-2xl ">
                      <sup className="text-xs">o</sup>c
                    </sup>
                  </p>
                  <img
                    className="h-20"
                    src={item.day.condition.icon}
                    alt={item.day.condition.text}
                  />
                </div>
              </React.Fragment>
            );
          }
        })}
      </section>
    </>
  );
}

NextForecast.propTypes = {
  forecastData: PropTypes.object.isRequired,
};

import { simplifyDateFormat } from "../functions/formatDate";
import { PropTypes } from "prop-types";

export default function WeatherIntro({ data, activeMode, dispatch }) {
  return (
    <>
      <h2 className="text-3xl font-semibold text-slate-100">
        {data.location.name}
      </h2>
      <p className="text-slate-300 text-base mt-2">
        {simplifyDateFormat(data.location.localtime, "simplified")}
      </p>
      <div className="mt-5 font-rubik tracking-wider flex text-slate-100 gap-2">
        <div
          className={`${
            activeMode === "forecast" ? "bg-blue-10" : "bg-slate-20"
          } px-6 py-2 rounded-xl cursor-pointer`}
          onClick={() => {
            dispatch({ type: "SET_ACTIVEMODE", payload: "forecast" });
          }}
        >
          Forecast
        </div>
        <div
          className={`${
            activeMode === "air_quality" ? "bg-blue-10" : "bg-slate-20"
          } px-6 py-2 rounded-xl cursor-pointer`}
          onClick={() => {
            dispatch({ type: "SET_ACTIVEMODE", payload: "air_quality" });
          }}
        >
          Air Quality
        </div>
      </div>
      <img
        className="h-28"
        src={data.current.condition.icon}
        alt="weather-condition-icon"
      />
    </>
  );
}

WeatherIntro.propTypes = {
  data: PropTypes.object.isRequired,
  activeMode: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

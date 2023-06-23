import { PropTypes } from "prop-types";
import { useEffect, useRef, useReducer } from "react";
import { extractTime } from "../functions/formatDate";
import { NavLink, useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { initialState, reducer } from "../reducers/SliderReducer";

export default function ForecastSlider({ data, currentTime, todayDate }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { forecastData, transformsX, rightRemainingItems, leftRemainingItems } =
    state;
  const location = useLocation();
  const sliderContainerRef = useRef(null);
  const sliderRef = useRef(null);
  const totalItems = useRef(null);
  const visibleItems = useRef(null);

  useEffect(() => {
    let filteredData = [];
    // Filtering The Data based on current Time so only the current and next hours of forecast will show.
    data.map((value) => {
      let index = data.indexOf(value);
      index >= currentTime ? filteredData.push(value) : null;
    });

    dispatch({ type: "SET_FORECAST_DATA", payload: filteredData });
    totalItems.current = filteredData.length;
  }, [data, currentTime]);

  useEffect(() => {
    const getVisibleItems = () => {
      const containerWidth = sliderContainerRef.current.offsetWidth;
      const itemWidth = 164; // Width of each forecast item(144) + gap between them(20) is 164px
      // Getting the Numbers Of items that can be visible to the user on every slide.
      visibleItems.current = Math.floor(containerWidth / itemWidth);
      // Setting the value of right remaining items by decreasing the value of visible items fromt total items.
      dispatch({
        type: "SET_RIGHT_REMAINING_ITEMS",
        payload: totalItems.current - visibleItems.current,
      });
      // If the device resolution change then transformX will be reseted. Hence carousel will come to its first position.
      dispatch({ type: "SET_TRANSFORMS_X", payload: [0] });
      sliderRef.current.style.transform = `translateX(0)`;
    };
    //This function will run on the first render and then when the screen resolution changes.
    getVisibleItems();

    window.addEventListener("resize", getVisibleItems);

    return () => {
      window.removeEventListener("resize", getVisibleItems);
    };
  }, []);

  const getPrevTransform = (direction) => {
    // Getting the current translateX value applied on the slider .
    const translateX = parseFloat(
      sliderRef.current.style.transform.replace(
        /.*translateX\((.*)px\).*/,
        "$1"
      )
    );

    // If the sliders is at its initial Position this condition will run
    if (isNaN(translateX)) {
      return 0;
    }

    if (direction === "right") {
      //Mapping throught the transformX and returning the value that matches the current TranslateX value
      const matchingItem = transformsX.find((item) => item === -translateX);
      return matchingItem || 0;
    } else if (direction === "left") {
      // Making a clone of transformsX and then reversing it bcz we have to return the least difference value than the current transformX . Without reversing it will return 0 that will reset the slider to intial position.
      const matchingItem = transformsX
        .slice()
        .reverse()
        .find((item) => item < -translateX);
      return matchingItem || 0;
    }

    return 0;
  };

  const handleLeftOffset = () => {
    if (leftRemainingItems > 0) {
      // Getting the Previous TransformX value
      const translateX = getPrevTransform("left");
      // Reversing the transformX property of slider to the previous one so it moves back.
      sliderRef.current.style.transform = `translateX(-${translateX}px)`;
      // Decrementing The Value Of Left Remaining Items
      dispatch({
        type: "SET_LEFT_REMAINING_ITEMS",
        payload: leftRemainingItems - visibleItems.current,
      });
      // Incrementing The Value Of Right Remaining Items
      dispatch({
        type: "SET_RIGHT_REMAINING_ITEMS",
        payload: rightRemainingItems + visibleItems.current,
      });
    }
  };

  const handleRightOffset = () => {
    if (rightRemainingItems > 0) {
      // Getting Previous TransformX value
      const previousTransform = getPrevTransform("right");
      // Calculating the width of the width of the items that can be visible in the next slide and then adding the previous transform value to them. So the total transform property moves the slider to the next slide.
      let translateX = visibleItems.current * 164 + previousTransform;
      sliderRef.current.style.transform = `translateX(-${translateX}px)`;
      // Adding the Each transformX proprty to the array. So It can be retreived by left offset so the slide can move backwards.
      dispatch({
        type: "SET_TRANSFORMS_X",
        payload: [...transformsX, translateX],
      });
      dispatch({
        type: "SET_RIGHT_REMAINING_ITEMS",
        payload: rightRemainingItems - visibleItems.current,
      });
      dispatch({
        type: "SET_LEFT_REMAINING_ITEMS",
        payload: leftRemainingItems + visibleItems.current,
      });
    }
  };

  return (
    <>
      <section
        className="forecastSlider my-5 flex flex-col items-center sm:relative"
        id="forecastSlider"
      >
        <div className="w-screen px-5 sm:px-10 flex justify-between font-montserrat">
          <p className="text-slate-100 text-xl font-medium">Today</p>
          {location.pathname === "/" ? (
            <NavLink
              className="text-blue-400 text-base cursor-pointer hover:text-blue-500"
              to={"/forecast"}
            >
              View Full Report
            </NavLink>
          ) : (
            <p className="text-slate-400">{todayDate}</p>
          )}
        </div>
        <section
          ref={sliderContainerRef}
          className={`forecastItems w-screen overflow-x-auto mt-3 px-5 sm:px-10 ${
            totalItems.current < visibleItems.current &&
            "sm:justify-center sm:flex"
          }`}
        >
          <div
            className="flex gap-5 w-fit transition duration-500"
            ref={sliderRef}
          >
            {forecastData.map((item, index) => {
              return (
                <div
                  key={item.time_epoch}
                  className={`flex justify-evenly ${
                    index === 0 ? "bg-blue-10" : "bg-slate-20"
                  } w-36 h-20 rounded-2xl text-white items-center font-rubik text-lg select-none`}
                >
                  <div>
                    <img
                      className="h-16"
                      src={item.condition.icon}
                      alt={item.condition.text}
                    />
                  </div>
                  <div>
                    <p>{extractTime(item.time)}:00</p>
                    <p>
                      {item.temp_c}
                      <sup>
                        <sup className="text-[0.60rem]">o</sup>c
                      </sup>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* These spans will only be visible to the device > 640px and they will only appear when there is more than one slide.  */}
        <span
          className={`hidden absolute ${
            totalItems.current > visibleItems.current ? "sm:grid" : ""
          } w-7 h-16 text-black text-2xl bg-slate-400 top-12 left-2 place-content-center cursor-pointer p-2 rounded-lg`}
          onClick={handleLeftOffset}
        >
          <FaChevronLeft />
        </span>
        <span
          className={`hidden absolute ${
            totalItems.current > visibleItems.current ? "sm:grid" : ""
          } w-7 h-16 text-black text-2xl bg-slate-400 top-12 right-2 grid place-content-center cursor-pointer p-2 rounded-lg`}
          onClick={handleRightOffset}
        >
          <FaChevronRight />
        </span>
      </section>
    </>
  );
}

ForecastSlider.propTypes = {
  data: PropTypes.array.isRequired,
  currentTime: PropTypes.number.isRequired,
  todayDate: PropTypes.string,
};

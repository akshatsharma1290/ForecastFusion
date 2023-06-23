import { useState } from "react";
import { GoLocation } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { PropTypes } from "prop-types";
import { getUserLocation } from "../functions/getLocation";
import AllLocationsPreview from "./AllLocationsPreview";

export default function UserLocation({ apiKey }) {
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [locationModified, setLocationModified] = useState(0);

  const getAutocomplete = async (str) => {
    try {
      // Fetching the data based on the str(input Value).
      const api = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${str}`;
      const response = await fetch(api);
      const data = await response.json();
      setAutocompleteData(data);
    } catch (error) {
      alert("Internet Connection Error");
    }
  };

  const handleInputChange = (event) => {
    // Adding the Value typed to the input
    const value = event.target.value;
    setInputValue(value);
    // Fetching the autocompletion of that value if input has a value. Otherwise Removing the autocompeletion.
    value.length > 0 ? getAutocomplete(value) : setAutocompleteData([]);
  };

  const detectUserLocation = async () => {
    // Fetching the Location Of the User and then getting data based on it.
    const userLocation = await getUserLocation();
    setInputValue(userLocation);
    userLocation.length > 0 && getAutocomplete(userLocation);
  };

  const addLocation = (addLocation) => {
    // Emptying the autocompletion value and input value when an location is added.
    setInputValue("");
    setAutocompleteData([]);

    // Getting the Previous Location available in Local Storage.
    const prevLocations = JSON.parse(localStorage.getItem("allLocations"));
    let locationExists = false;

    prevLocations.forEach((location) => {
      // If the new Location selection by the user exists in the previous locations then making that location active. Otherwise exiting the loop.
      if (location === addLocation) {
        localStorage.setItem("activeLocation", addLocation);
        locationExists = true;
        return; // Exit the loop if location is found
      }
    });

    if (!locationExists) {
      // Adding the location to the array and updating the local storage if it doesn't exists.
      const allLocations = JSON.stringify(prevLocations.concat(addLocation));
      localStorage.setItem("allLocations", allLocations);
    }
    // Updating its value so the compoent re-renders and the changes reflect in the Locations.
    setLocationModified(locationModified + 1);
  };

  return (
    <>
      <section className="flex justify-center gap-3">
        <div className="flex w-2/3 relative">
          <span className="bg-slate-20 h-12 text-white w-12 flex justify-center items-center text-xl px-2 rounded-l-lg">
            <FiSearch />
          </span>
          <input
            className="bg-slate-20 w-full h-12 text-slate-100 font-montserrat rounded-r-lg outline-none"
            type="text"
            name="location"
            id="location"
            placeholder="Search"
            autoComplete="off"
            value={inputValue}
            onChange={handleInputChange}
          />
          <section className="automcomplete absolute bg-slate-20 top-14 left-0 w-full">
            {autocompleteData.map((location, index) => {
              return (
                <div
                  className=" text-slate-100 font-montserrat font-medium flex items-center px-4 h-12 border-2 border-slate-500 cursor-pointer"
                  key={location.name + index}
                  onClick={() => {
                    addLocation(location.name);
                  }}
                >
                  <p>{location.name}</p>
                </div>
              );
            })}
          </section>
        </div>
        <span
          className="bg-slate-20 h-12 text-white w-14 flex justify-center items-center text-xl rounded-lg"
          onClick={detectUserLocation}
        >
          <GoLocation />
        </span>
      </section>
      <AllLocationsPreview locationModified={locationModified} />
    </>
  );
}

UserLocation.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

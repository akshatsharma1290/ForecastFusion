import { useState, useEffect } from "react";
import BottomBar from "./components/BottomBar";
import Weather from "./pages/Weather";
import Forecast from "./pages/Forecast";
import Search from "./pages/Search";
import { Routes, Route } from "react-router-dom";

function App() {
  // This state will contains the location which user has choosed to see the weather data.
  const [location, setLocation] = useState(null);

  // Importing the weather api key 
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    // If local storage don't have the active Location than it will be set to default Location
    if (!Object.prototype.hasOwnProperty.call(localStorage, "activeLocation")) {
      // Setting Default Locations
      localStorage.setItem("activeLocation", "New Delhi");
      // This array contains all the locations user have chosen in past and present.
      localStorage.setItem(
        "allLocations",
        JSON.stringify(["New Delhi", "London"])
      );
      // Updating the locatiion state to the default location.
      setLocation("New Delhi");
    } else {
      // Getting the active Location from local storage and then updating the location state.
      const activeLocation = localStorage.getItem("activeLocation");
      setLocation(activeLocation);
    }
  }, []);

  return (
    <>
      <BottomBar />
      {location && (
        <Routes>
          <Route exact path="/" element={<Weather apiKey={apiKey} />} />
          <Route exact path="/search" element={<Search apiKey={apiKey} />} />
          <Route
            exact
            path="/forecast"
            element={<Forecast apiKey={apiKey} />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Call the reverse geocoding API
          reverseGeocode(latitude, longitude)
            .then((state) => resolve(state))
            .catch((error) => reject(error));
        },
        (error) => reject(error)
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

function reverseGeocode(latitude, longitude) {
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  // Send a GET request to the Nominatim API
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.address) {
        const state = data.address.state || "";
        return state;
      } else {
        throw new Error("Reverse geocoding failed.");
      }
    })
    .catch((error) => {
      throw new Error("An error occurred during reverse geocoding: " + error);
    });
}

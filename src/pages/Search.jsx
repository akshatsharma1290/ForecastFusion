import UserLocation from "../components/UserLocation";
import { PropTypes } from "prop-types";

export default function Search({ apiKey }) {
  return (
    <>
      <header className="text-center font-rubik mt-5 mb-8">
        <h1 className="text-slate-100 text-2xl">Pick Location</h1>
        <p className="text-slate-400 text-base px-4 mt-2">
          Find the area or city that you want to know the detailed weather info
          at this time.
        </p>
      </header>
      <main className="mb-24">
        <UserLocation apiKey={apiKey} />
      </main>
    </>
  );
}

Search.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

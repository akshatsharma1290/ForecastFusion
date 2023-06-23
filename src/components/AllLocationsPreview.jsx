import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { FaBars } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function AllLocationsPreview({ locationModified }) {
  const [data, setData] = useState([]);
  const [activeLocation, setActiveLocation] = useState(null);

  useEffect(() => {
    // When the page renders or the location gets modified then the value of data and activelocation will be parsed from local storage. Hence they will get updated.
    setData(JSON.parse(localStorage.getItem("allLocations")));
    setActiveLocation(localStorage.getItem("activeLocation"));
  }, [locationModified]);

  const handleDragEnd = (result) => {
    if (!result.destination) return; // Drop outside the droppable area
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem); // Reordering the items when an item is dragged
    //Updating the localStorage so it contains the reordered locations
    localStorage.setItem("allLocations", JSON.stringify(items));
    // Also updating the data so the change reflects.
    setData(items);
  };

  const changeActiveLocation = (location) => {
    // When An Item is Clicked the value of activeLocation in local Storage will update. So In Other pages it fetches the data based on the new active location.
    localStorage.setItem("activeLocation", location);
    // Also changing the state so that activeClasses gets applied on
    setActiveLocation(localStorage.getItem("activeLocation"));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="locations">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="AllLocations mt-8 space-y-4 px-7"
          >
            {data.map((location, index) => (
              <Draggable
                key={index}
                draggableId={`location-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    onClick={() => {
                      changeActiveLocation(location);
                    }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`${
                      location === activeLocation ? "bg-blue-10" : "bg-slate-20"
                    } h-12 text-slate-100 font-montserrat rounded-lg text-lg flex items-center justify-between px-5 cursor-pointer`}
                  >
                    <p>{location}</p>
                    <span
                      className="text-3xl h-full flex items-center justify-center"
                      {...provided.dragHandleProps}
                    >
                      <FaBars />
                    </span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

AllLocationsPreview.propTypes = {
  locationModified: PropTypes.number.isRequired,
};

import React, { useState, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const PlacesAutocomplete = ({ dropoff, setDropOff }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null); // Ref for input field

  const handlePlaceSelect = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setDropOff(place?.formatted_address || ""); // Address update in state
    }
  };

  return (
    <>
      <div className="Flights-Tab-input-group-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
        >
          <path
            d="M16.4656 1.45264C16.4656 1.04814 16.1376 0.720215 15.7332 0.720215H10.8503C10.4458 0.720215 10.1179 1.04814 10.1179 1.45264V2.67334H16.4656V1.45264Z"
            fill="#353978"
          />
        </svg>
      </div>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" libraries={["places"]}>
        <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceSelect}>
          <div className="form__group field">
            <input
              ref={inputRef} // Attach ref to input
              type="text"
              className="form__field"
              placeholder="Drop Off"
              required
              value={dropoff}
              onChange={(e) => setDropOff(e.target.value)}
            />
            <label htmlFor="dropoff" className="form__label">
              Drop Off
            </label>
          </div>
        </Autocomplete>
      </LoadScript>
    </>
  );
};

export default PlacesAutocomplete;

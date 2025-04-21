import React from "react";
import { GoogleMap, LoadScript, OverlayView } from "@react-google-maps/api";

const hotels = [
  {
    id: 1,
    name: "Hotel One",
    currency: "$",
    price: "200",
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: 2,
    name: "Hotel Two",
    currency: "EUR",
    price: "300",
    lat: 37.7849,
    lng: -122.4094,
  },
];

const containerStyle = {
  width: "100%",
  height: "60vh",
};

const markerStyle = {
  backgroundColor: "black",
  color: "white",
  padding: "5px 10px",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: "bold",
  textAlign: "center",
  whiteSpace: "nowrap",
  position: "relative",
  left: "-33px",
  width: "90px",
  boxShadow: "0px 2px 6px rgba(0,0,0,0.5)",
};

const markerPointerStyle = {
  width: 0,
  height: 0,
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent",
  borderTop: "8px solid black",
  position: "absolute",
  left: "50%",
  bottom: "-8px",
  transform: "translateX(-50%)",
};

function Map({ hotelData, centerLoc }) {
  const center = {
    lat: centerLoc ? centerLoc.latitude : 37.7749,
    lng: centerLoc ? centerLoc.longitude : -122.4194,
  };

  return (
    <LoadScript googleMapsApiKey="GOOGLE_MAP_API_KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {hotelData?.map((hotel, index) => (
          <OverlayView
            key={index}
            position={{
              lat: hotel?.hotel?.latitude,
              lng: hotel?.hotel?.longitude,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div style={{ position: "relative", textAlign: "center" }}>
              <div style={markerStyle}>
                {hotel?.offers?.length > 0
                  ? hotel?.offers[0]?.price?.currency
                  : "£"}{" "}
                {hotel?.offers?.length > 0
                  ? hotel?.offers[0]?.price?.total
                  : 35}
              </div>
              <div style={markerPointerStyle}></div>
            </div>
          </OverlayView>
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;

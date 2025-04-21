import { configureStore } from "@reduxjs/toolkit";
import userDetailReducer from "./Features/UserDetailSlice";
import destinationsReducer from "./Features/DestinationSlice";
import toursReducer from "./Features/ToursSlice";
import customerReducer from "./Features/CustomerSlice";
import orderReducer from "./Features/addOrderSlice";
import contactReducer from "./Features/ContactUsSlice";

export const store = configureStore({
  reducer: {
    userDetail: userDetailReducer,
    tours: toursReducer,
    destinations: destinationsReducer,
    order: orderReducer,
    customer: customerReducer,
    contact: contactReducer,
  },
});

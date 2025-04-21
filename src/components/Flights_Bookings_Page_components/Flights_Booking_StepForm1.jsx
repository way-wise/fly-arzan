// import React from 'react'

// const Flights_Booking_StepForm1 = () => {

//   return (
//    <section className='Flights_Booking_Sec'>
//     <div className="container">
//       <div className="Flights_Booking_main">
//         <div className="tabs">
//           <button>Booking</button>
//           <button>E-Ticket</button>
//         </div>
//       </div>
//     </div>
//    </section>
//   )
// }

// export default Flights_Booking_StepForm1; 



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import react-tabs CSS
import Booking_Flights from "./Booking_Flights";


const Flights_Booking_StepForm1 = () => {


  return (
    <>
      <div className="booking--Pages">
        <div className="Select-Departing-Tab">
          <Tabs>
            <div className="Select-Departing-Tab-head">
              <TabList>
                <Tab> <span>01</span> Booking</Tab>
                <Tab> <span>02</span>E-Ticket</Tab>

              </TabList>
            </div>


            <div className="Select-Departing-Tab-body">
              <TabPanel>
                <Booking_Flights />
              </TabPanel>
            </div>

          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Flights_Booking_StepForm1;

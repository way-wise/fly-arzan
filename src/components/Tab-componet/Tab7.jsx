import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import react-tabs CSS
import SelectDepartingFlight from "../Inner_page_Sec_2_componets/SelectDepartingFlight";


const Tab7 = () => {


  return (
    <>
      <div className="Select-Departing-Tab">
        <Tabs>
          <div className="Select-Departing-Tab-head">
            {/* <TabList>
              <Tab> <span>01</span> Select Departing Flight (DXB - LDN)</Tab>
              <Tab> <span>02</span>Select Returning Flight (DXB - LDN)</Tab>

            </TabList> */}
          </div>


          <div className="Select-Departing-Tab-body">
           
              <SelectDepartingFlight />
           
          </div>

        </Tabs>
      </div>
    </>
  );
};

export default Tab7;

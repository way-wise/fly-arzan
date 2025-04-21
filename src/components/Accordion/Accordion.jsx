import React, { useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from "react-i18next";

function CustomAccordion() {
  const { t } = useTranslation();
  
  const categories = [
    {
      key: "traditional",
      options: ["hotels", "motels", "guesthouses", "bedAndBreakfasts"]
    },
    {
      key: "luxuryStays",
      options: ["resorts", "villas", "boutiqueHotels"]
    },
    {
      key: "budgetFriendly",
      options: ["hostels", "capsuleHotels"]
    },
    {
      key: "extendedStays",
      options: ["apartments", "servicedApartments"]
    },
    {
      key: "uniqueExperiences",
      options: ["cottages", "farmStays", "holidayHomes", "campingAndGlamping"]
    },
    // {
    //   label: "Room Features",
    //   options: ["Air Conditioning", "Heating", "Private Balcony", "Kitchen/Kitchenette", "Coffee/Tea Maker", "Flat-Screen TV", "In-Room Safe", "Work Desk", "Premium Bedding"]
    // },
    // {
    //   label: "Hotel Services",
    //   options: ["24-Hour Front Desk", "Concierge Service", "Room Service", "Daily Housekeeping", "Laundry Service", "Luggage Storage", "Wake-Up Call Service"]
    // },
    // {
    //   label: "Food & Beverage",
    //   options: ["Complimentary Breakfast", "On-Site Restaurant", "Bar/Lounge", "Coffee Shop", "Mini-Bar"]
    // },
    // {
    //   label: "Recreational Facilities",
    //   options: ["Swimming Pool (Indoor/Outdoor)", "Fitness Center", "Spa/Wellness Center", "Kids' Play Area", "Game Room"]
    // },
    // {
    //   label: "Business Facilities",
    //   options: ["Conference Rooms", "Business Center", "Free Wi-Fi", "Meeting Rooms"]
    // },
    // {
    //   label: "Accessibility",
    //   options: ["Wheelchair Accessible", "Elevator/Lift", "Accessible Parking", "Hearing/Visual Accessibility Features"]
    // },
    // {
    //   label: "Parking & Transportation",
    //   options: ["Free Parking", "Valet Parking", "Shuttle Service (Airport/Local)", "EV Charging Stations"]
    // },
    // {
    //   label: "Pet Policies",
    //   options: ["Pet-Friendly", "Pet-Free Rooms Available"]
    // },
    // {
    //   label: "Eco-Friendly Features",
    //   options: ["Energy-Efficient Lighting", "Recycling Facilities", "Sustainable Products"]
    // }
  ];

  const [isHeaderChecked, setIsHeaderChecked] = useState(Array(categories.length).fill(false));
  const [individualChecks, setIndividualChecks] = useState(
    Array(categories.length).fill().map(() => Array(5).fill(false))
  );

  // Handle header checkbox change (select/deselect all)
  const handleHeaderCheckboxChange = (accordionIndex) => {
    const newState = !isHeaderChecked[accordionIndex];
    const updatedIsHeaderChecked = [...isHeaderChecked];
    updatedIsHeaderChecked[accordionIndex] = newState;

    const updatedIndividualChecks = individualChecks.map((checks, index) =>
      index === accordionIndex ? checks.map(() => newState) : checks
    );

    setIsHeaderChecked(updatedIsHeaderChecked);
    setIndividualChecks(updatedIndividualChecks);
  };

  // Handle individual checkbox change
  const handleIndividualCheckboxChange = (accordionIndex, index) => {
    const updatedChecks = [...individualChecks[accordionIndex]];
    updatedChecks[index] = !updatedChecks[index];
    const updatedIndividualChecks = [...individualChecks];
    updatedIndividualChecks[accordionIndex] = updatedChecks;
    setIndividualChecks(updatedIndividualChecks);
  };

  return (
    <Accordion>
      {categories.map((category, accordionIndex) => (
        <Accordion.Item eventKey={accordionIndex.toString()} key={accordionIndex}>
          <Accordion.Header>
            <Form.Check
              type="checkbox"
              label={t(`HotelfilterSections.categories.${category.key}.label`)}
              checked={isHeaderChecked[accordionIndex]}
              onChange={() => handleHeaderCheckboxChange(accordionIndex)}
            />
          </Accordion.Header>
          <Accordion.Body>
            <Form>
              {category.options.map((option, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={t(`HotelfilterSections.categories.${category.key}.options.${option}`)}
                  checked={individualChecks[accordionIndex][index]}
                  onChange={() => handleIndividualCheckboxChange(accordionIndex, index)}
                />
              ))}
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default CustomAccordion;

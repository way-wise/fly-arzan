import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function AccordionAmenities() {
  const { t } = useTranslation();
  
  const categories = [
    {
      key: "roomFeatures",
      options: [
        "airConditioning",
        "heating",
        "privateBalcony",
        "kitchenKitchenette",
        "coffeeTeaMaker",
        "flatScreenTv",
        "inRoomSafe",
        "workDesk",
        "premiumBedding"
      ]
    },
    {
      key: "hotelServices",
      options: [
        "twentyFourHourFrontDesk",
        "conciergeService",
        "roomService",
        "dailyHousekeeping",
        "laundryService",
        "luggageStorage",
        "wakeUpCallService"
      ]
    },
    
     
    {
      key: "businessFacilities",
      options: [
        "conferenceRooms",
        "businessCenter",
        "freeWiFi",
        "meetingRooms"
      ]
    },
    
    {
      key: "parkingAndTransportation",
      options: [
        "freeParking",
        "valetParking",
        "shuttleService",
        "evChargingStations"
      ]
    },
    {
      key: "petPolicies",
      options: [
        "petFriendly",
        "petFreeRooms"
      ]
    },
    {
      key: "ecoFriendlyFeatures",
      options: [
        "energyEfficientLighting",
        "recyclingFacilities",
        "sustainableProducts"
      ]
    }
  ];

  const [isHeaderChecked, setIsHeaderChecked] = useState(
    Array(categories.length).fill(false)
  );
  const [individualChecks, setIndividualChecks] = useState(
    Array(categories.length)
      .fill()
      .map(() => Array(5).fill(false))
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
      {categories?.map((category, accordionIndex) => (
        <Accordion.Item
          eventKey={accordionIndex.toString()}
          key={accordionIndex}
        >
          <Accordion.Header>
            <Form.Check
              type="checkbox"
              label={t(`HotelfilterSections.amenities.${category.key}.label`)}
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
                  label={t(`HotelfilterSections.amenities.${category.key}.options.${option}`)}
                  checked={individualChecks[accordionIndex][index]}
                  onChange={() =>
                    handleIndividualCheckboxChange(accordionIndex, index)
                  }
                />
              ))}
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default AccordionAmenities;

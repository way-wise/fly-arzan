import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function AccordionPolicies() {
  const categories = [
    {
      label: "Insurance  ",
      options: ["Collision Damage Waiver (CDW)", "Theft Protection", "Third-Party Liability", ]
    },
    {
      label: "Fuel",
      options: ["Full-to-Full ", "Pre-Paid Fuel", ]
    },

    {
      label: "Mileage Options",
      options: [" Unlimited Mileage ", "Limited Mileage (e.g., 100 miles/day)", ]
    },

    
    {
      label: "Driver Requirements",
      options: [" Age Requirement (21-75 years) ", "Valid Driving License", ]
    },


       
    {
      label: "Cancellation",
      options: [" Free Cancellation (48 hrs) ", "Late Cancellation Fee", ]
    },
    {
      label: "Return Policies",
      options: [" Late Return Fee ", "Clean Car Return", ]
    },

    {
      label: "Car features",
      options: ["  Air Conditioning ", "Automatic Transmission","Bluetooth Connectivity","GPS Navigation","Leather Seats","Cruise Control","Rearview Camera ","Bluetooth Hands-Free Calling","Child Safety Seats","Sunroof"," Moonroof","Heated Seats"," Keyless Entry & Push-Button Start","Parking Sensors","Towing Capacity","Four-Wheel Drive (4WD)","All-Wheel Drive (AWD)","Bluetooth Audio Streaming"," Lane Departure Warning System","Collision Avoidance System","Roof Railing","Foldable Rear Seats","Adjustable Steering Wheel"," Climate Control", ]
    },




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
              label={category.label}
              checked={isHeaderChecked[accordionIndex]}
              onChange={() => handleHeaderCheckboxChange(accordionIndex)}
            />
          </Accordion.Header>
          <Accordion.Body>
            <Form>
              {category.options.map((item, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={item}
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

export default AccordionPolicies;

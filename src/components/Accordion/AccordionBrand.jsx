import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function AccordionBrand() {
  const categories = [
    {
      label: "Toyota",
      options: ["Toyota Corolla", "Toyota Camry", "Toyota Yaris", "Toyota Prius", "Toyota Highlander", "Toyota RAV4", "Toyota Land Cruiser",]
    },
    {
      label: "Ford",
      options: [" Ford Fiesta", "Ford Focus", "Ford Mustang", "Ford Explorer", " Ford Edge"]
    },

    {
      label: "Volkswagen",
      options: ["Volkswagen Golf", "Volkswagen Passat", "Volkswagen Tiguan", "Volkswagen Polo", "Volkswagen Jetta"]
    },
    {
      label: "Nissan",
      options: ["Nissan Altima", "Nissan Sentra", "Nissan Rogue", "Nissan Pathfinder"]
    },
    {
      label: "BMW",
      options: ["BMW 3 Series", "BMW 5 Series", "BMW X1", "BMW X3"]
    },
    {
      label: "Hyundai",
      options: ["Hyundai Elantra", " Hyundai Tucson", "Hyundai Santa Fe"]
    },
    {
      label: "Chevrolet",
      options: ["Chevrolet Spark", "Chevrolet Malibu", "Chevrolet Equinox", "Chevrolet Traverse"]
    },
    {
      label: "Mercedes-Benz ",
      options: ["Mercedes-Benz A-Class", "Mercedes-Benz E-Class", "Mercedes-Benz GLC", "Mercedes-Benz GLE"]
    },

    {
      label: "Audi",
      options: ["Audi A3", " Audi A4", "Audi Q3", "Audi Q5"]
    },
    {
      label: "Jeep",
      options: ["Jeep Wrangler", "Jeep Grand Cherokee", " Jeep Cherokee"]
    },
    {
      label: "Kia",
      options: [" Kia Optima", "Kia Sorento", "Kia Sportage"]
    },
    {
      label: "Honda",
      options: ["Honda Civic", "Honda Accord", "Honda CR-V", "Honda HR-V"]
    },
    {
      label: "Renault",
      options: ["Renault Clio", "Renault Captur", "Renault Megane"]
    },

    {
      label: "Peugeot",
      options: ["Peugeot 208  ", " Peugeot 308", "Peugeot 3008"]
    },

    {
      label: "Land Rover",
      options: ["Land Rover Discovery", "Land Rover Defender  ", "Range Rover",]
    },

    {
      label: "Mazda",
      options: ["Mazda 3", "Mazda CX-5", "Mazda MX-5"]
    },


    
    {
      label: "Porsche",
      options: ["Porsche 911", "Porsche Cayenne", "Porsche Macan"]
    },

    
    {
      label: "Tesla",
      options: ["Tesla Model 3", "Tesla Model S", "Tesla Model X"]
    },


    
    {
      label: "Volvo",
      options: ["Volvo XC60", "Volvo XC90", "Volvo V90"]
    },

        
    {
      label: "Fiat",
      options: ["Fiat 500", "Fiat Panda", "Fiat 500L"]
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

export default AccordionBrand;

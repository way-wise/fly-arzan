import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function AccordionSeats() {
  const { t } = useTranslation();
  
  const categories = [
    {
      label: t("CarfilterSections.seatsAndBags.seats.label"),
      options: Object.values(t("CarfilterSections.seatsAndBags.seats.options", { returnObjects: true }))
    },
    {
      label: t("CarfilterSections.seatsAndBags.bags.label"),
      options: Object.values(t("CarfilterSections.seatsAndBags.bags.options", { returnObjects: true }))
    }
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

export default AccordionSeats;

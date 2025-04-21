import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function DropMoreFilter({ setIsOpen, open }) {
  const filterRef = useRef(null); // useRef to track filter panel
  const { t } = useTranslation();

  const [expandedSections, setExpandedSections] = useState({
    suppliers: false,
    policies: false,
    carFeatures: false,
    brands: false,
  });

  const Suppliers = [
    "Hertz",
    "Avis",
    "Enterprise",
    "Sixt",
    "Europcar",
    "Budget",
    "Alamo",
    "National Car Rental",
    "Thrifty",
    "Dollar Rent",
    "Green Motion",
    "Fox Rent",
    "Turo",
    "Rentcars.com",
    "Ride-Sharing Services",
  ];
  const Policies = [
    {
      title: "Insurance",
      cat: [
        "Collision Damage Waiver (CDW)",
        "Theft Protection",
        "Third Party Liability",
      ],
    },

    {
      title: "Fuel",
      cat: ["Full-to-Full", "Pre-Paid Fuel"],
    },

    {
      title: "Mileage Options",
      cat: ["Unlimited Mileage", "Limited Mileage (e.g., 100 miles/day)"],
    },
    {
      title: "Driver Requirements",
      cat: ["Age Requirement (21-75 years)", "Valid Driving License"],
    },
    {
      title: "Cancellation",
      cat: ["Free Cancellation (48 hrs)", "Late Cancellation Fee"],
    },
    {
      title: "Return Policies",
      cat: ["Late Return Fee", "Clean Car Return"],
    },
  ];
  const Carfeatures = [
    "Air Conditioning",
    "Automatic Transmission",
    "Bluetooth Connectivity",
    "GPS Navigation",
    "Leather Seats",
    "Cruise Control",
    "Rearview Camera",
    "Bluetooth Hands-Free Calling",
    "Child Safety Seats",
    "Sunroof",
    "Moonroof",
    "Heated Seats",
    "Keyless Entry & Push-Button Start",
    "Parking Sensors",
    "Towing Capacity",
    "Four-Wheel Drive (4WD)",
    "All-Wheel Drive (AWD)",
    "Bluetooth Audio Streaming",
    "Lane Departure Warning System",
    "Collision Avoidance System",
    "Roof Railing",
    "Foldable Rear Seats",
    "Adjustable Steering Wheel",
    "Climate Control",
  ];
  const Brand = [
    {
      title: "Toyota",
      cat: [
        "Toyota Corolla",
        "Toyota Camry",
        "Toyota Yaris",
        "Toyota Prius",
        "Toyota Highlander",
        "Toyota RAV4",
        "Toyota Land Cruiser",
      ],
    },
    {
      title: "Ford",
      cat: [
        "Ford Fiesta",
        "Ford Focus",
        "Ford Mustang",
        "Ford Explorer",
        "Ford Edge",
      ],
    },
    {
      title: "Volkswagen",
      cat: [
        "Volkswagen Golf",
        "Volkswagen Passat",
        "Volkswagen Tiguan",
        "Volkswagen Polo",
        "Volkswagen Jetta",
      ],
    },
    {
      title: "Nissan",
      cat: [
        "Nissan Altima",
        "Nissan Sentra",
        "Nissan Rogue",
        "Nissan Pathfinder",
      ],
    },
    {
      title: "BMW",
      cat: ["BMW 3 Series", "BMW 5 Series", "BMW X1", "BMW X3"],
    },
    {
      title: "Hyundai",
      cat: ["Hyundai Elantra", "Hyundai Tucson", "Hyundai Santa Fe"],
    },
    {
      title: "Chevrolet",
      cat: [
        "Chevrolet Spark",
        "Chevrolet Malibu",
        "Chevrolet Equinox",
        "Chevrolet Traverse",
      ],
    },
    {
      title: "Mercedes-Benz",
      cat: [
        "Mercedes-Benz A-Class",
        "Mercedes-Benz E-Class",
        "Mercedes-Benz GLC",
        "Mercedes-Benz GLE",
      ],
    },
    {
      title: "Audi",
      cat: ["Audi A3", "Audi A4", "Audi Q3", "Audi Q5"],
    },
    {
      title: "Jeep",
      cat: ["Jeep Wrangler", "Jeep Grand Cherokee", "Jeep Cherokee"],
    },
    {
      title: "Kia",
      cat: ["Kia Optima", "Kia Sorento", "Kia Sportage"],
    },
    {
      title: "Honda",
      cat: ["Honda Civic", "Honda Accord", "Honda CR-V", "Honda HR-V"],
    },
    {
      title: "Renault",
      cat: ["Renault Clio", "Renault Captur", "Renault Megane"],
    },
    {
      title: "Peugeot",
      cat: ["Peugeot 208", "Peugeot 308", "Peugeot 3008"],
    },
    {
      title: "Land Rover",
      cat: ["Land Rover Discovery", "Land Rover Defender", "Range Rover"],
    },
    {
      title: "Mazda",
      cat: ["Mazda 3", "Mazda CX-5", "Mazda MX-5"],
    },
    {
      title: "Porsche",
      cat: ["Porsche 911", "Porsche Cayenne", "Porsche Macan"],
    },
    {
      title: "Tesla",
      cat: ["Tesla Model 3", "Tesla Model S", "Tesla Model X"],
    },
    {
      title: "Volvo",
      cat: ["Volvo XC60", "Volvo XC90", "Volvo V90"],
    },
    {
      title: "Fiat",
      cat: ["Fiat 500", "Fiat Panda", "Fiat 500L"],
    },
  ];
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (filterRef.current && !filterRef.current.contains(event.target)) {
  //       console.log("Clicked outside, closing filter - Current state:", moreFil);
  //       setIsOpen((prev) => {
  //         if (!prev) return prev; // Avoid unnecessary updates
  //         console.log("Updating state to false");
  //         return false;
  //       });
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [setIsOpen]);

  const handleApply = () => {
    setIsOpen(false);
  };
  const handleToggle = (section) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  return (
    <div
      className="allfilter-main-div"
      ref={filterRef}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="allfilter-div">
        <h4>{t("HotelsInnerlabel.All_Filters")}</h4>

        <div>
          <h5 onClick={() => handleToggle("suppliers")}>
            {t("HotelfilterSections.carFilters.suppliers.title")}
            <span
              className={`arrow ${expandedSections.suppliers ? "up" : "down"}`}
            >
              {expandedSections.suppliers ? (
                <IoIosArrowUp size={20} />
              ) : (
                <IoIosArrowDown size={20} />
              )}
            </span>
          </h5>
          {expandedSections.suppliers && (
            <div className="suppliers-filter-section">
              {Object.entries(
                t("HotelfilterSections.carFilters.suppliers.options", {
                  returnObjects: true,
                })
              ).map(([key, value]) => (
                <div key={key} className="inp-type">
                  <input type="checkbox" name="sortOption" readOnly />
                  <p>{value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h5 onClick={() => handleToggle("policies")}>
            {t("HotelfilterSections.carFilters.policies.title")}
            <span
              className={`arrow ${expandedSections.policies ? "up" : "down"}`}
            >
              {expandedSections.policies ? (
                <IoIosArrowUp size={20} />
              ) : (
                <IoIosArrowDown size={20} />
              )}
            </span>
          </h5>
          {expandedSections.policies && (
            <div className="suppliers-filter-section">
              {Object.entries(
                t("HotelfilterSections.carFilters.policies.categories", {
                  returnObjects: true,
                })
              ).map(([categoryKey, category]) => (
                <div key={categoryKey}>
                  <h6 className="title">{category.title}</h6>
                  {Object.entries(category.options).map(
                    ([optionKey, optionValue]) => (
                      <div key={optionKey} className="inp-type">
                        <input type="checkbox" name="sortOption" readOnly />
                        <p>{optionValue}</p>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h5 onClick={() => handleToggle("carFeatures")}>
            {t("HotelfilterSections.carFilters.carFeatures.title")}
            <span
              className={`arrow ${
                expandedSections.carFeatures ? "up" : "down"
              }`}
            > {expandedSections.carFeatures ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}</span>
          </h5>
          {expandedSections.carFeatures && (
            <div className="suppliers-filter-section">
              {Object.entries(
                t("HotelfilterSections.carFilters.carFeatures.options", {
                  returnObjects: true,
                })
              ).map(([key, value]) => (
                <div key={key} className="inp-type">
                  <input type="checkbox" name="sortOption" readOnly />
                  <p>{value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h5 onClick={() => handleToggle("brands")}>
            {t("HotelfilterSections.carFilters.brands.title")}
            <span
              className={`arrow ${expandedSections.brands ? "up" : "down"}`}
            >{expandedSections.brands ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}</span>
          </h5>
          {expandedSections.brands && (
            <div className="suppliers-filter-section">
              {Object.entries(
                t("HotelfilterSections.carFilters.brands.categories", {
                  returnObjects: true,
                })
              ).map(([brandKey, brand]) => (
                <div key={brandKey}>
                  <h6 className="title">{brand.title}</h6>
                  {Object.entries(brand.options).map(
                    ([optionKey, optionValue]) => (
                      <div key={optionKey} className="inp-type">
                        <input type="checkbox" name="sortOption" readOnly />
                        <p>{optionValue}</p>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="action-btns">
        <button onClick={()=>setIsOpen(false)} className="clear-btn">
          {t("HotelfilterSections.carFilters.buttons.reset")}
        </button>
        <button onClick={handleApply} className="apply-btn">
          {t("HotelfilterSections.carFilters.buttons.apply")}
        </button>
      </div>
    </div>
  );
}

export default DropMoreFilter;

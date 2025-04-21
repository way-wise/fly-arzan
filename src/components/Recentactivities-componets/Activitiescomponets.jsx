import React from "react";

const Activitiescomponets = () => {
  // Sample data for the cards
  const cardsData = [
    {
      title: "Lorem ipsum",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit aptent.",
    },
    {
      title: "Dolor sit amet",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Lorem ipsum",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit aptent.",
    },
    {
      title: "Dolor sit amet",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Lorem ipsum",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit aptent.",
    },
    {
      title: "Dolor sit amet",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    
    // Add more card data as needed
  ];

  return (
    <>
      <section className="Activitiescomponets-sec">
        {cardsData.map((card, index) => (
          <div key={index} className="Activitiescomponets-card">
            <div className="Activitiescomponets-icon">
              {/* Static SVG icon for all cards */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22.2349 10.7498C21.8209 10.7498 21.4849 10.4138 21.4849 9.99982C21.4849 7.12781 20.367 4.42883 18.3369 2.39783C18.0439 2.10486 18.0439 1.62988 18.3369 1.33691C18.6299 1.04395 19.1049 1.04395 19.398 1.33691C21.711 3.65082 22.9849 6.72791 22.9849 9.99982C22.9849 10.4138 22.6489 10.7498 22.2349 10.7498Z" fill="black" />
                <path d="M1.73438 10.7489C1.32037 10.7489 0.984375 10.4129 0.984375 9.9989C0.984375 6.72699 2.25842 3.6499 4.57233 1.33691C4.8653 1.04395 5.34045 1.04395 5.63342 1.33691C5.92639 1.62988 5.92639 2.10504 5.63342 2.39801C3.60242 4.42792 2.48438 7.12689 2.48438 9.9989C2.48438 10.4129 2.14838 10.7489 1.73438 10.7489Z" fill="black" />
                <path d="M11.9844 24C9.91638 24 8.23438 22.318 8.23438 20.25C8.23438 19.836 8.57037 19.5 8.98438 19.5C9.39838 19.5 9.73438 19.836 9.73438 20.25C9.73438 21.4911 10.7433 22.5 11.9844 22.5C13.2253 22.5 14.2344 21.4911 14.2344 20.25C14.2344 19.836 14.5704 19.5 14.9844 19.5C15.3984 19.5 15.7344 19.836 15.7344 20.25C15.7344 22.318 14.0524 24 11.9844 24Z" fill="black" />
                <path d="M20.2345 21H3.7345C2.76935 21 1.98438 20.215 1.98438 19.2501C1.98438 18.7379 2.2074 18.2531 2.5965 17.92C4.11737 16.6349 4.98438 14.7671 4.98438 12.7881V9.99994C4.98438 6.14008 8.12445 3 11.9845 3C15.8444 3 18.9844 6.14008 18.9844 9.99994V12.7881C18.9844 14.7671 19.8514 16.6349 21.3624 17.913C21.7614 18.2531 21.9844 18.7379 21.9844 19.2501C21.9844 20.215 21.1995 21 20.2345 21ZM11.9845 4.5C8.95135 4.5 6.48438 6.96698 6.48438 9.99994V12.7881C6.48438 15.2089 5.42346 17.495 3.57446 19.058C3.53949 19.088 3.48438 19.1501 3.48438 19.2501C3.48438 19.3859 3.59845 19.5 3.7345 19.5H20.2345C20.3704 19.5 20.4844 19.3859 20.4844 19.2501C20.4844 19.1501 20.4295 19.088 20.3964 19.06C18.5453 17.495 17.4844 15.2089 17.4844 12.7881V9.99994C17.4844 6.96698 15.0175 4.5 11.9845 4.5Z" fill="black" />
              </svg>
            </div>
            <div className="Activitiescomponets-tital">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Activitiescomponets;

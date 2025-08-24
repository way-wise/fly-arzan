import Footer from "@/header-footer/Footer";
import Header from "@/header-footer/Header";
import { ChevronLeft, Dot } from "lucide-react";
import { Link } from "react-router-dom";
import { RiStarFill, RiStarLine } from "react-icons/ri";

const FlightDetailsPage = () => {
  const ticketList = [
    {
      id: 1,
      airline: "AGEAN AIRLINES",
      totalRating: 556,
      avgRating: 4,
      price: "$241",
      totalPrice: "$482",
    },
    {
      id: 2,
      airline: "FLYDUBAI",
      totalRating: 738,
      avgRating: 3,
      price: "$242",
      totalPrice: "$482",
    },
    {
      id: 3,
      airline: "EXPEDIA",
      totalRating: 274,
      avgRating: 4,
      price: "$249",
      totalPrice: "$482",
    },
    {
      id: 4,
      airline: "BUDGETAIR",
      totalRating: 185,
      avgRating: 5,
      price: "$249",
      totalPrice: "$482",
    },
    {
      id: 5,
      airline: "EDREAMS",
      totalRating: 798,
      avgRating: 4,
      price: "$250",
      totalPrice: "$482",
    },
    {
      id: 6,
      airline: "GOTOGATE",
      totalRating: 423,
      avgRating: 5,
      price: "$251",
      totalPrice: "$482",
    },
    {
      id: 7,
      airline: "FLIGHTNETWORK",
      totalRating: 154,
      avgRating: 2,
      price: "$252",
      totalPrice: "$482",
    },
    {
      id: 8,
      airline: "PRICELINE",
      totalRating: 647,
      avgRating: 5,
      price: "$243",
      totalPrice: "$482",
    },
    {
      id: 9,
      airline: "SKY-TOURS",
      totalRating: 583,
      avgRating: 5,
      price: "$246",
      totalPrice: "$482",
    },
  ];

  const renderStars = (avgRating) => {
    const stars = [];
    const fullStars = Math.floor(avgRating);

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <RiStarFill key={`full-${i}`} size={20} className="tw:text-[#E1574A]" />
      );
    }

    // Render empty stars to complete the 5-star rating
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <RiStarLine
          key={`empty-${i}`}
          size={20}
          className="tw:text-secondary"
        />
      );
    }

    return stars;
  };

  return (
    <>
      <Header />
      <div className="tw:flex tw:flex-col tw:min-h-screen">
        <div className="tw:py-6 tw:bg-[#F2FAFF]">
          <div className="container tw:flex tw:flex-col tw:gap-5">
            <Link className="tw:flex tw:!text-secondary tw:gap-1 tw:!no-underline">
              <ChevronLeft />
              <span>Back to My Orders</span>
            </Link>
            <h1 className="tw:!text-[32px] tw:font-semibold tw:text-[#00000B]">
              Heathrow
            </h1>
            <div className="tw:flex tw:items-center">
              <span>1 Traveler</span>
              <Dot size={48} className="tw:text-secondary" />
              <span>One way</span>
              <Dot size={48} className="tw:text-secondary" />
              <span>Economy class</span>
            </div>
          </div>
        </div>

        <div className="tw:bg-[#EFF3F8] tw:py-10 tw:grow">
          <div className="container">
            <h2 className="tw:!text-2xl tw:font-semibold tw:!mb-5">
              Book your tickets
            </h2>

            <div className="tw:flex tw:items-center tw:gap-[30px]">
              {/* List */}
              <div className="tw:flex tw:flex-col tw:gap-6 tw:grow">
                {/* Tags */}
                <div className="tw:flex tw:items-center tw:gap-2">
                  <button className="tw:bg-white tw:!text-sm tw:!rounded-md tw:border tw:border-muted tw:py-[10px] tw:px-4">
                    Extra Services
                  </button>
                  <button className="tw:bg-white tw:!text-sm tw:!rounded-md tw:border tw:border-muted tw:py-[10px] tw:px-4">
                    Saver
                  </button>
                  <button className="tw:bg-white tw:!text-sm tw:!rounded-md tw:border tw:border-muted tw:py-[10px] tw:px-4">
                    Standard
                  </button>
                  <button className="tw:bg-white tw:!text-sm tw:!rounded-md tw:border tw:border-muted tw:py-[10px] tw:px-4">
                    Premium
                  </button>
                </div>

                {/* Ticket List */}
                <div className="tw:flex tw:flex-col tw:gap-6">
                  {ticketList.map((data) => (
                    <div
                      key={data.id}
                      className="tw:flex tw:items-center tw:justify-between tw:px-[30px] tw:py-4 tw:bg-white tw:shadow tw:rounded-md"
                    >
                      <div className="tw:w-full tw:flex tw:flex-col tw:gap-[11px] ">
                        <h4 className="tw:text-xl">{data.airline}</h4>
                        <div className="tw:flex tw:items-center tw:gap-2">
                          {renderStars(data.avgRating)}
                          <span className="tw:border tw:border-muted tw:px-1.5 tw:rounded-md tw:bg-[#F2F2F2] tw:text-sm">
                            {data.totalRating}
                          </span>
                        </div>
                      </div>

                      <div className="tw:px-6 tw:py-5 tw:bg-[#F2FAFF] tw:flex tw:items-center tw:rounded-xl tw:gap-3">
                        <div className="tw:flex tw:flex-col tw:items-center tw:gap-1">
                          <span className="tw:font-medium tw:text-xl tw:text-primary">
                            {data.price}
                          </span>
                          <span className="tw:text-sm tw:text-secondary">
                            {data.totalPrice}
                          </span>
                        </div>
                        <button className="tw:bg-[#50ADD8] tw:!text-white tw:!rounded-full tw:px-[30px] tw:py-2 tw:text-sm">
                          Select
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="tw:w-[468px]"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FlightDetailsPage;

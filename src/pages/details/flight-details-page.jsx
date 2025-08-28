import Footer from "@/header-footer/Footer";
import Header from "@/header-footer/Header";
import { ArrowRight, ChevronLeft, Dot } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { RiPlaneLine, RiStarFill, RiStarLine } from "react-icons/ri";
import { FaqCollapsible } from "@/components/ui/faq-collapsible";

const FlightDetailsPage = () => {
  const navigate = useNavigate();

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
      <div className="tw:flex tw:flex-col tw:min-h-screen tw:mt-16 tw:md:mt-[92px]">
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
            <div className="tw:flex tw:flex-col tw:lg:flex-row tw:gap-[30px]">
              {/* List */}
              <div className="tw:flex tw:flex-col tw:gap-6 tw:grow tw:order-2 tw:lg:order-1">
                <h2 className="tw:!text-2xl tw:font-semibold tw:text-center tw:sm:text-left">
                  Book your tickets
                </h2>

                {/* FAQ */}
                <FaqCollapsible title="How can I find the best flight deals?">
                  <p>
                    For the best flight deals, book in advance and be flexible
                    with your travel dates and destinations. Use our flexible
                    search tools to compare prices across different airlines and
                    find deals by searching for an entire month rather than
                    specific days.
                  </p>
                </FaqCollapsible>

                {/* Tags */}
                <div className="tw:flex tw:items-center tw:flex-wrap tw:justify-center tw:sm:justify-start tw:gap-2">
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
                      className="tw:flex tw:flex-col tw:gap-4 tw:sm:gap-0 tw:sm:flex-row tw:items-center tw:justify-between tw:px-[30px] tw:py-4 tw:bg-white tw:shadow tw:rounded-md"
                    >
                      <div className="tw:w-full tw:flex tw:flex-col tw:gap-[11px] ">
                        <h4 className="tw:text-xl">{data.airline}</h4>
                        <div className="tw:flex tw:items-center tw:gap-2">
                          {renderStars(data.avgRating)}
                          <span className="tw:border tw:border-muted tw:px-1.5 tw:rounded-md tw:bg-[#F2F2F2] tw:text-sm">
                            {data.totalRating}
                          </span>
                        </div>
                        <p className="tw:text-[#939393] tw:text-[12px]">
                          24/7 live chat & telephone support
                        </p>
                      </div>

                      <div className="tw:w-full tw:justify-between tw:sm:w-fit tw:px-6 tw:py-5 tw:bg-[#F2FAFF] tw:flex tw:items-center tw:rounded-xl tw:gap-3">
                        <div className="tw:flex tw:flex-col tw:items-center tw:gap-1">
                          <span className="tw:font-medium tw:text-xl tw:text-primary">
                            {data.price}
                          </span>
                          <span className="tw:text-sm tw:text-secondary">
                            {data.totalPrice}
                          </span>
                        </div>
                        <button
                          className="tw:bg-[#50ADD8] tw:!text-white tw:!rounded-full tw:px-[30px] tw:py-2 tw:text-sm"
                          onClick={() => navigate("/loader")}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  ))}

                  <button className="tw:flex tw:!mx-auto tw:items-center tw:gap-1.5 tw:hover:bg-primary/90 tw:px-[40px] tw:h-[56px] tw:!text-white tw:font-semibold tw:!rounded-[40px] tw:bg-primary">
                    <span>Explore More</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="tw:w-full tw:lg:w-[468px] tw:order-1 tw:lg:order-2 tw:shrink-0">
                <div className="tw:flex tw:items-end tw:justify-between tw:gap-2 tw:mb-6 tw:~text-[#5D586C]">
                  <div className="tw:flex tw:flex-col tw:gap-2">
                    <h4 className="tw:text-xl tw:font-medium">
                      Flight Details
                    </h4>
                    <p>
                      <span className=" tw:font-medium mr-1">Outbound</span>
                      <span>Wed, 3 Sep 2025</span>
                    </p>
                  </div>
                  <span className="tw:text-sm tw:text-secondary">
                    All times are local
                  </span>
                </div>
                <div className="tw:bg-white tw:p-6 tw:rounded-xl tw:shadow">
                  {/* Format 1 */}
                  <div className="tw:flex tw:items-center tw:justify-between tw:flex-col tw:gap-4 tw:md:gap-0 tw:md:flex-row">
                    {/* Airline Logo, Code */}
                    <div className="tw:flex tw:flex-col tw:justify-center tw:items-center tw:gap-0.5 tw:text-center">
                      <img
                        src="/images/airlines/flyDubai.png"
                        alt="fdlydubai"
                        className="tw:w-[120px] tw:object-contain"
                      />
                      <span className="tw:text-sm tw:text-secondary">
                        fdlydubai
                      </span>
                      <span className="tw:text-sm tw:text-secondary">
                        FDB - 1982
                      </span>
                    </div>

                    {/* Time, Stop, Airline */}
                    <div className="tw:flex tw:items-center tw:gap-6 tw:grow tw:justify-center">
                      {/* Depart */}
                      <div className="tw:flex tw:flex-col tw:gap-1 tw:text-right">
                        <span className="tw:font-semibold tw:text-[20px]">
                          18:35
                        </span>
                        <span className="tw:text-sm tw:text-[#5D586C]">
                          IST
                        </span>
                      </div>
                      {/* Duration & Stop */}
                      <div className="tw:flex tw:items-center tw:gap-2">
                        <div className="tw:flex tw:flex-col tw:text-center tw:gap-1">
                          <span className="tw:text-sm tw:font-semibold">
                            4h 30
                          </span>
                          <span className="tw:h-px tw:w-[82px] tw:bg-secondary" />
                          <span className="tw:text-sm tw:text-primary">
                            Direct
                          </span>
                        </div>
                        <RiPlaneLine
                          size={24}
                          className="tw:text-secondary tw:rotate-90"
                        />
                      </div>
                      {/* Arrival */}
                      <div className="tw:flex tw:flex-col tw:gap-1 tw:text-left">
                        <span className="tw:font-semibold tw:text-[20px]">
                          00:05
                        </span>
                        <span className="tw:text-sm tw:text-[#5D586C]">
                          DBX
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Format 2 */}
                  <hr className="tw:h-px tw:w-full tw:my-6 tw:bg-[#B3B3B3]" />
                  <div className="tw:flex tw:flex-col">
                    <div className="tw:flex tw:items-center tw:gap-4 tw:text-center">
                      <img
                        src="/images/airlines/flyDubai.png"
                        alt="fdlydubai"
                        className="tw:w-[82px] tw:object-contain"
                      />
                      <div className="tw:space-x-2">
                        <span className="tw:text-sm tw:text-secondary">
                          fdlydubai
                        </span>
                        <span className="tw:text-sm tw:text-secondary">
                          FDB - 1982
                        </span>
                      </div>
                    </div>
                    <div className="tw:px-4 tw:border-l tw:flex tw:flex-col tw:gap-3 tw:justify-between tw:border-[#B3B3B3]">
                      <h6 className="tw:text-sm tw:space-x-[19px] tw:!mb-0">
                        <span>18:35</span>
                        <span>IST Istanbul</span>
                      </h6>
                      <div className="tw:px-[10px] tw:py-2 tw:rounded-md tw:flex tw:flex-col tw:items-center tw:bg-[#F2F2F2] tw:w-fit">
                        <span className="tw:font-semibold tw:font-sm">
                          4h 30
                        </span>
                        <span className="tw:text-[12px] tw:text-primary">
                          Direct
                        </span>
                      </div>
                      <h6 className="tw:text-sm tw:space-x-[19px] tw:!mb-0">
                        <span>00:05</span>
                        <span>DXB Dubai</span>
                      </h6>
                    </div>
                  </div>

                  {/* Read friendly Time, Duration description */}
                  <p className="tw:text-sm tw:text-[#A5A2AD] tw:!mt-4">
                    <span>Arrives: Thu, 4 Sep 2025 |</span>
                    <span> Journey duration: 4 hours 30 minutes</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FlightDetailsPage;

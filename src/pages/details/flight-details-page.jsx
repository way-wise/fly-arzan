import Header from "@/header-footer/Header";
import { ChevronLeft, Dot } from "lucide-react";
import { Link } from "react-router-dom";

const FlightDetailsPage = () => {
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
      </div>
    </>
  );
};

export default FlightDetailsPage;

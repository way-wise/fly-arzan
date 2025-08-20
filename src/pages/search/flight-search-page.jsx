import OneWayForm from "@/components/ui/hero-search-filter/flights/one-way-form";

const FlightSearchPage = () => {
  return (
    <div className="tw:py-6 tw:bg-[#F2FAFF]">
      <div className="tw:container">
        <h1 className="tw:!text-[18px] tw:font-semibold tw:text-[#00000B] tw:!mb-5">
          Istanbul (IST) - Dubai (DXB) - 2 Travellers, Economy
        </h1>
        <div className="tw:rounded-xl tw:bg-white tw:shadow tw:!p-5">
          <OneWayForm />
        </div>
      </div>
    </div>
  );
};

export default FlightSearchPage;

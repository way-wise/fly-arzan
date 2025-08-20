import OneWayForm from "@/components/ui/hero-search-filter/flights/one-way-form";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { CalendarDays } from "lucide-react";

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

        {/* Flexible Dates */}
        <div className="tw:my-10 tw:flex tw:items-center tw:gap-[10px]">
          <RadioGroup className="tw:rounded-xl tw:flex tw:items-center tw:grow tw:bg-white tw:shadow tw:divide-x tw:divide-muted">
            <div className="tw:flex tw:flex-col tw:gap-1 tw:!py-[24px] tw:!px-[20px] tw:h-[93px] has-data-[state=checked]:tw:bg-primary has-data-[state=checked]:tw:text-white has-data-[state=checked]:tw:border-primary has-data-[state=checked]:tw:border-[1px] has-data-[state=checked]:tw:shadow-none has-data-[state=checked]:tw:ring-0 has-data-[state=checked]:tw:ring-offset-0">
              <RadioGroupItem value="1" />
              <span className="tw:text-[14px] tw:font-medium tw:text-secondary">
                31 Aug
              </span>
              <span className="tw:text-[20px] tw:font-semibold tw:text-primary">
                $122
              </span>
            </div>
          </RadioGroup>
          <div className="tw:rounded-xl tw:bg-white tw:shadow tw:flex tw:flex-col tw:items-center tw:gap-2 tw:!py-[24px] tw:!px-[20px] tw:h-[93px]">
            <CalendarDays size={20} className="tw:text-secondary tw:shrink-0" />
            <p className="tw:text-[14px] tw:font-medium">Flexible Dates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchPage;

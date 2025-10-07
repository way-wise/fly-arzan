import { RiBriefcaseLine, RiSuitcase2Line } from "react-icons/ri";
import { IoTicketOutline } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PropTypes from "prop-types";

const BaggageIcons = ({ travelerPricings }) => {
  // Extract baggage info from travelerPricings
  const fareDetails = travelerPricings?.[0]?.fareDetailsBySegment || [];

  const hasCheckedBagInfo = fareDetails.some(
    (segment) => segment.includedCheckedBags
  );
  const hasCabinBagInfo = fareDetails.some(
    (segment) => segment.includedCabinBags
  );

  const hasCheckedBaggage = fareDetails.some(
    (segment) => segment.includedCheckedBags?.quantity > 0
  );
  const hasCabinBaggage = fareDetails.some(
    (segment) => segment.includedCabinBags?.quantity > 0
  );

  // Tooltip text: "Included", "Not available", or "Info unavailable"
  const getCabinBagInfo = () => {
    if (!hasCabinBagInfo) return "Info unavailable";
    return hasCabinBaggage ? "Included" : "Not Included";
  };

  const getCheckedBagInfo = () => {
    if (!hasCheckedBagInfo) return "Info unavailable";
    return hasCheckedBaggage ? "Included" : "Not Included";
  };

  const cabinBagInfo = getCabinBagInfo();
  const checkedBagInfo = getCheckedBagInfo();

  return (
    <div className="tw:flex tw:items-center tw:gap-3 tw:justify-center">
      {/* Cabin Bag */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`tw:flex tw:items-center tw:justify-center tw:size-8 tw:bg-white tw:rounded-full tw:border tw:border-muted ${
              hasCabinBaggage ? "tw:text-emerald-600" : "tw:text-gray-400"
            }`}
          >
            <RiBriefcaseLine size={18} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="tw:font-medium">Cabin bag</p>
          <p className="tw:text-xs tw:text-gray-500">{cabinBagInfo}</p>
        </TooltipContent>
      </Tooltip>

      {/* Checked Bag */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`tw:flex tw:items-center tw:justify-center tw:size-8 tw:bg-white tw:rounded-full tw:border tw:border-muted ${
              hasCheckedBaggage ? "tw:text-emerald-600" : "tw:text-gray-400"
            }`}
          >
            <RiSuitcase2Line size={18} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="tw:font-medium">Checked bag</p>
          <p className="tw:text-xs tw:text-gray-500">{checkedBagInfo}</p>
        </TooltipContent>
      </Tooltip>

      {/* Ticket Change - Always disabled */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="tw:flex tw:items-center tw:justify-center tw:w-8 tw:h-8 tw:rounded-full tw:bg-white tw:border tw:border-muted tw:text-gray-400">
            <IoTicketOutline size={18} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="tw:font-medium">Ticket change</p>
          <p className="tw:text-xs tw:text-gray-500">Info unavailable</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

BaggageIcons.propTypes = {
  travelerPricings: PropTypes.array,
};

export default BaggageIcons;

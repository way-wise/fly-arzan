import { RiLuggageDepositLine, RiBriefcaseLine, RiCloseCircleLine } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PropTypes from "prop-types";

const BaggageIcons = ({ baggageDetails, hasCabinBaggage, hasCheckedBaggage }) => {
  // Format baggage details for tooltip
  const formatBaggageInfo = (details) => {
    if (!details || details.length === 0) return "Not included";

    const info = details[0]; // Taking first segment's info as representative
    const parts = [];

    if (info.quantity > 0) {
      parts.push(`${info.quantity} piece${info.quantity > 1 ? 's' : ''}`);
    }

    if (info.weight > 0) {
      parts.push(`${info.weight}${info.weightUnit || 'kg'}`);
    }

    return parts.length > 0 ? parts.join(', ') : "Included";
  };

  const cabinBagInfo = formatBaggageInfo(baggageDetails?.cabin);
  const checkedBagInfo = formatBaggageInfo(baggageDetails?.checked);

  return (
    <div className="tw:flex tw:items-center tw:gap-2 tw:justify-center">
      <TooltipProvider delayDuration={200}>
        {/* Cabin Bag */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`tw:flex tw:items-center tw:justify-center tw:w-8 tw:h-8 tw:rounded-full ${
                hasCabinBaggage
                  ? "tw:bg-green-100 tw:text-green-600"
                  : "tw:bg-gray-100 tw:text-gray-400"
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
              className={`tw:flex tw:items-center tw:justify-center tw:w-8 tw:h-8 tw:rounded-full ${
                hasCheckedBaggage
                  ? "tw:bg-green-100 tw:text-green-600"
                  : "tw:bg-gray-100 tw:text-gray-400"
              }`}
            >
              <RiLuggageDepositLine size={18} />
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
            <div className="tw:flex tw:items-center tw:justify-center tw:w-8 tw:h-8 tw:rounded-full tw:bg-gray-100 tw:text-gray-400">
              <RiCloseCircleLine size={18} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="tw:font-medium">Ticket change</p>
            <p className="tw:text-xs tw:text-gray-500">Not available</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

BaggageIcons.propTypes = {
  baggageDetails: PropTypes.shape({
    cabin: PropTypes.arrayOf(
      PropTypes.shape({
        weight: PropTypes.number,
        weightUnit: PropTypes.string,
        quantity: PropTypes.number,
      })
    ),
    checked: PropTypes.arrayOf(
      PropTypes.shape({
        weight: PropTypes.number,
        weightUnit: PropTypes.string,
        quantity: PropTypes.number,
      })
    ),
  }),
  hasCabinBaggage: PropTypes.bool,
  hasCheckedBaggage: PropTypes.bool,
};

export default BaggageIcons;

const SearchFilterSidebar = () => {
  return (
    <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:h-7">
      <h4 className="tw:text-[15px] tw:font-medium">Filter</h4>
      <button className="tw:bg-dark-purple tw:!text-white tw:!rounded tw:text-[13px] tw:font-medium tw:py-1.5 tw:!px-[14px]">
        Reset Now
      </button>
    </div>
  );
};

export default SearchFilterSidebar;

import PropTypes from "prop-types";

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="tw:flex tw:items-center tw:justify-between tw:px-6 tw:py-4 tw:bg-white tw:shadow-md">
      <div className="tw:flex tw:items-center">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="tw:text-gray-500 tw:focus:outline-none tw:lg:hidden"
        >
          <svg
            className="tw:h-6 tw:w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
};

export default Header;

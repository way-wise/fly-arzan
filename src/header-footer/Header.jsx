import { HiMenuAlt3 } from "react-icons/hi";
import { TfiWorld } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="tw:!py-0 tw:!sticky tw:top-0 tw:z-50">
      {/* Top Bar */}
      <div className="tw:h-[48px] tw:flex tw:items-center tw:bg-dark-purple">
        <div className="container">
          <div className="tw:flex tw:items-center tw:justify-between">
            <div className="tw:flex tw:items-center tw:gap-4">
              <Link to="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="/icons/dribbble.svg"
                  alt="Dribbble"
                  className="tw:size-5"
                />
              </Link>
              <Link to="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="/icons/youtube.svg"
                  alt="Youtube"
                  className="tw:size-5"
                />
              </Link>
              <Link to="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  className="tw:size-5"
                />
              </Link>
            </div>
            <Link
              to="mailto:flyarzan@mail.com"
              className="tw:flex tw:items-center tw:gap-2 tw:!no-underline tw:!text-white"
            >
              <img src="/icons/sms.svg" alt="Mail" className="tw:!size-5" />
              <p>flyarzan@mail.com</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="tw:h-[92px] tw:bg-white tw:flex tw:items-center tw:shadow">
        <div className="container">
          <div className="tw:flex tw:items-center tw:justify-between">
            <img src="/logo.png" className="tw:w-[195px]" />
            <div className="tw:flex tw:justify-between tw:items-center tw:gap-6">
              <button className="tw:flex tw:gap-2 tw:text-xl tw:font-medium">
                <TfiWorld size={25} />
                <span>EN - £</span>
              </button>
              <button className="tw:bg-primary tw:hover:bg-primary/90 tw:shadow-[0_2px_4px_0_rgba(165,163,174,0.30)] tw:py-[10px] tw:px-5 tw:!text-white tw:!rounded-md">
                Register / Login
              </button>
              <button className="tw:flex tw:gap-2 tw:text-xl tw:font-medium">
                <HiMenuAlt3 size={25} />
                <span>Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

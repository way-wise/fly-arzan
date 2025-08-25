import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { TfiWorld } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)", {
    initializeWithValue: false,
  });

  const siteNavigation = [
    {
      id: 1,
      heading: "Pages",
      list: [
        { id: 1, title: "Home", link: "#" },
        { id: 2, title: "About", link: "#" },
        { id: 3, title: "FAQ", link: "#" },
        { id: 4, title: "Contact", link: "#" },
      ],
    },
    {
      id: 2,
      heading: "Flights",
      list: [
        { id: 1, title: "Main Deals", link: "#" },
        { id: 2, title: "Articles", link: "#" },
        { id: 3, title: "Frequently Asked Questions", link: "#" },
        { id: 4, title: "Begin Your Journey Today", link: "#" },
      ],
    },
    {
      id: 3,
      heading: "Hotel",
      list: [
        { id: 1, title: "Main Deals", link: "#" },
        { id: 2, title: "Articles", link: "#" },
        { id: 3, title: "Frequently Asked Questions", link: "#" },
        { id: 4, title: "Extended Hotel Options", link: "#" },
      ],
    },
    {
      id: 4,
      heading: "Car",
      list: [
        { id: 1, title: "Main Deals", link: "#" },
        { id: 2, title: "Articles", link: "#" },
        { id: 3, title: "Frequently Asked Questions", link: "#" },
        { id: 4, title: "Begin Your Toad Trip Journey", link: "#" },
      ],
    },
    {
      id: 5,
      heading: "Activity",
      list: [
        { id: 1, title: "Visa requirements", link: "#" },
        { id: 2, title: "Nearest airport details", link: "#" },
        { id: 3, title: "Article", link: "#" },
      ],
    },
  ];

  return (
    <>
      <header className="tw:!py-0 tw:!sticky tw:top-0 tw:z-50">
        {/* Top Bar */}
        <div className="tw:h-[48px] tw:flex tw:items-center tw:bg-[#353978]">
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
              <Link to="/">
                <img src="/logo.png" className="tw:w-[195px]" />
              </Link>
              <div className="tw:flex tw:justify-between tw:items-center tw:gap-6">
                <button className="tw:flex tw:gap-2 tw:text-xl tw:font-medium">
                  <TfiWorld size={25} />
                  <span>EN - £</span>
                </button>
                <button className="tw:bg-primary tw:hover:bg-primary/90 tw:shadow-[0_2px_4px_0_rgba(165,163,174,0.30)] tw:py-[10px] tw:px-5 tw:!text-white tw:!rounded-md">
                  Register / Login
                </button>
                <button
                  className="tw:flex tw:gap-2 tw:text-xl tw:font-medium"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <HiMenuAlt3 size={25} />
                  <span>Menu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Drawer */}
      <Drawer
        open={openMenu}
        onOpenChange={setOpenMenu}
        direction={isMobile ? "right" : "top"}
      >
        <DrawerContent side={isMobile ? "right" : "top"}>
          <DrawerHeader>
            <div className="flex flex-col">
              <DrawerTitle className="text-xl font-medium sr-only">
                Brand Logo
              </DrawerTitle>
              <img src="/logo.png" className="tw:w-[140px]" />
              <DrawerDescription className="sr-only">
                Mobile sidebar navigation
              </DrawerDescription>
            </div>
            <DrawerClose>
              <X />
            </DrawerClose>
          </DrawerHeader>
          <div className="tw:p-6 tw:lg:p-14 tw:overflow-y-auto">
            <div className="tw:flex tw:justify-around tw:flex-col tw:lg:flex-row tw:gap-6 tw:lg:gap-10">
              {siteNavigation.map(({ id, heading, list }) => (
                <div className="tw:flex tw:flex-col" key={id}>
                  <h5 className="tw:!text-3xl tw:font-semibold tw:mb-4">
                    {heading}
                  </h5>
                  <div className="tw:flex tw:flex-col tw:gap-3">
                    {list.map(({ id, title, link }) => (
                      <Link
                        to={link}
                        key={id}
                        className="tw:text-xl tw:!no-underline tw:!text-gray-700"
                      >
                        {title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;

import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Modal } from "@/components/ui/modal";
import { DialogTitle } from "@headlessui/react";
import { LucideX, X } from "lucide-react";
import { useState } from "react";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { HiMenuAlt3 } from "react-icons/hi";
import { TfiWorld } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

const Header = () => {
  const [openAuthModal, setAuthModal] = useState(false);
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
        <div className="tw:h-16 tw:md:h-[92px] tw:bg-white tw:flex tw:items-center tw:shadow">
          <div className="container">
            <div className="tw:flex tw:items-center tw:justify-between">
              <Link to="/">
                <img src="/logo.png" className="tw:w-[120px] tw:md:w-[195px]" />
              </Link>
              <div className="tw:flex tw:justify-between tw:items-center tw:gap-3 tw:md:gap-6">
                <button className="tw:md:flex tw:md:gap-2 tw:text-xl tw:font-medium">
                  <TfiWorld className="tw:size-5 md:tw:size-6" />
                  <span className="tw:hidden tw:md:block">EN - £</span>
                </button>
                <button
                  onClick={() => setAuthModal(true)}
                  className="tw:inline-flex tw:items-center tw:gap-1 tw:bg-primary tw:hover:bg-primary/90 tw:shadow-[0_2px_4px_0_rgba(165,163,174,0.30)] tw:py-2.5 tw:md:py-[10px] tw:md:px-5 tw:px-3 tw:!text-sm tw:!text-white tw:!rounded-md"
                >
                  <span className="tw:hidden tw:md:block">Register /</span>
                  Login
                </button>
                <button
                  className="tw:flex tw:gap-2 tw:text-xl tw:font-medium"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <HiMenuAlt3 size={25} />
                  <span className="tw:hidden tw:md:block">Menu</span>
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
        <DrawerContent
          side={isMobile ? "right" : "top"}
          className="tw:bg-[#f2faffe0] tw:backdrop-blur-xs"
        >
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
                  <h5 className="tw:!text-2xl tw:lg:!text-3xl tw:font-semibold tw:!text-dark-purple tw:mb-4">
                    {heading}
                  </h5>
                  <div className="tw:flex tw:flex-col tw:gap-3">
                    {list.map(({ id, title, link }) => (
                      <Link
                        to={link}
                        key={id}
                        className="tw:text-xl tw:!no-underline tw:!text-dark-purple"
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

      {/* Auth Modal */}
      <Modal isOpen={openAuthModal} onClose={setAuthModal}>
        <div className="tw:flex tw:justify-between tw:items-start tw:text-secondary tw:mb-4">
          <img src="/logo.png" className="tw:w-[150px]" />
          <button onClick={() => setAuthModal(false)}>
            <LucideX />
          </button>
        </div>
        <div className="tw:mb-4">
          <DialogTitle className="tw:text-lg tw:!text-dark-purple tw:font-medium tw:!mb-2">
            Sign in
          </DialogTitle>
          <p className="tw:text-secondary">Enter your information</p>
        </div>
        <form>
          <fieldset className="tw:flex tw:flex-col tw:gap-2">
            <div className="tw:flex tw:flex-col">
              <label className="tw:font-medium">Email</label>
              <input
                name="email"
                placeholder="Enter your email"
                className="input"
              />
            </div>
            <div className="tw:flex tw:flex-col tw:mb-3">
              <label className="tw:font-medium">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="input"
              />
            </div>

            <div className="tw:flex tw:items-center tw:gap-2 tw:justify-between">
              <div className="tw:flex tw:gap-2 tw:items-center">
                <Checkbox className="tw:!mb-0.5" id="rememberMe" />
                <label className="tw:text-sm tw:!mb-0" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
              <Link className="tw:text-sm tw:!text-inherit tw:!no-underline tw:hover:!underline">
                Forgot Password
              </Link>
            </div>

            <button className="tw:!mt-3 tw:px-3 tw:py-2 tw:bg-dark-purple tw:hover:bg-dark-purple/80 tw:!text-white tw:!rounded">
              Submit
            </button>

            <div className="tw:relative tw:py-3 tw:text-center tw:text-sm tw:after:absolute tw:after:inset-0 tw:after:top-1/2 tw:after:z-0 tw:after:flex tw:after:items-center tw:after:border-t tw:after:border-muted">
              <span className="tw:relative tw:z-10 tw:bg-white tw:px-2 tw:font-medium tw:text-muted-foreground tw:select-none">
                OR
              </span>
            </div>

            <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-4">
              <button className="tw:justify-center tw:flex tw:items-center tw:gap-2 tw:px-3 tw:py-2 tw:!rounded tw:shadow tw:border tw:border-muted">
                <FcGoogle size={20} />
                <span>Login with Google</span>
              </button>
              <button className="tw:justify-center tw:flex tw:items-center tw:gap-2 tw:px-3 tw:py-2 tw:!rounded tw:shadow tw:border tw:border-muted">
                <FaApple size={20} />
                <span>Login with Apple</span>
              </button>
            </div>
          </fieldset>
        </form>

        <div className="tw:mt-4 tw:flex tw:flex-wrap tw:items-center tw:justify-center tw:gap-1 tw:text-center">
          <span className="tw:text-secondary">Don&apos;t have an account?</span>
          <Link
            href="#"
            className="tw:!no-underline tw:!text-dark-purple tw:hover:!underline tw:focus-visible:underline tw:focus-visible:outline-hidden"
          >
            Sign Up
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default Header;

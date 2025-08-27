import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Modal } from "@/components/ui/modal";
import { LucideX, X } from "lucide-react";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { TfiWorld } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import RegionModal from "@/components/RegionModal/RegionModal";
import { useCurrency } from "@/context/CurrencyContext";
import { useLocationContext } from "@/context/userLocationContext";
import { useTranslation } from "react-i18next";
import getSymbolFromCurrency from "currency-symbol-map";
import NewLoginForm from "@/components/ui/auth/new-login-form";
import NewRegisterForm from "@/components/ui/auth/new-register-form";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [openAuthModal, setAuthModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)", {
    initializeWithValue: false,
  });
  const [openRegionModal, setOpenRegionModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const { selectedLocalCurr, currency } = useCurrency();
  const { userLocation } = useLocationContext();
  const { i18n } = useTranslation();

  const selectLocalLang =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("selectLang"))
      : null;

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
      <header className="tw:!py-0 tw:!w-full tw:!fixed tw:!top-0 tw:z-50">
        {/* Top Bar */}
        {/* <div className="tw:h-[48px] tw:flex tw:items-center tw:bg-[#353978]">
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
        </div> */}

        {/* Navigation */}
        <div className="tw:h-16 tw:md:h-[92px] tw:bg-white tw:flex tw:items-center tw:shadow">
          <div className="container">
            <div className="tw:flex tw:items-center tw:justify-between">
              <Link to="/">
                <img src="/logo.png" className="tw:w-[120px] tw:md:w-[195px]" />
              </Link>
              <div className="tw:flex tw:justify-between tw:items-center tw:gap-3 tw:md:gap-6">
                <button
                  className="tw:md:flex tw:items-center tw:md:gap-2 tw:text-xl tw:font-medium"
                  onClick={() => setOpenRegionModal(true)}
                >
                  <TfiWorld className="tw:size-5 md:tw:size-6" />
                  <span className="tw:hidden tw:md:block tw:whitespace-nowrap">
                    {(i18n?.language || selectLocalLang?.code || "en")
                      .toUpperCase()
                      .replace(/-.*/, "")}{" "}
                    -{" "}
                    {getSymbolFromCurrency(currency) ||
                      selectedLocalCurr?.symbol ||
                      userLocation?.symbol ||
                      "£"}
                  </span>
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
        <div className="tw:relative tw:w-full">
          <AnimatePresence initial={false} mode="wait">
            {showLogin ? (
              <motion.div
                key="login"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                layout
              >
                <NewLoginForm />
                <div className="tw:mt-4 tw:flex tw:flex-wrap tw:items-center tw:justify-center tw:gap-1 tw:text-center">
                  <span className="tw:text-secondary">
                    Don&apos;t have an account?
                  </span>
                  <button
                    onClick={() => setShowLogin(false)}
                    className="tw:!text-dark-purple tw:hover:!underline tw:focus-visible:underline tw:focus-visible:outline-hidden"
                  >
                    Sign Up
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                layout
              >
                <NewRegisterForm />
                <div className="tw:mt-4 tw:flex tw:flex-wrap tw:items-center tw:justify-center tw:gap-1 tw:text-center">
                  <span className="tw:text-secondary">
                    Already have an account?
                  </span>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="tw:!text-dark-purple tw:hover:!underline tw:focus-visible:underline tw:focus-visible:outline-hidden"
                  >
                    Log in
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal>

      {/* Region Settings Modal (Language/Currency/Country) */}
      <Modal isOpen={openRegionModal} onClose={setOpenRegionModal}>
        <RegionModal setModal={setOpenRegionModal} />
      </Modal>
    </>
  );
};

export default Header;

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useMediaQuery } from "usehooks-ts";
import PropTypes from "prop-types";

const SidebarContext = createContext(null);

const initialFilters = {
  stops: [],
  departureTime: { min: 0, max: 1440 }, // in minutes from midnight
  journeyDuration: { min: 0, max: 3000 }, // in minutes
  airlines: [],
  baggage: [], // Can include "checked" and "cabin"
};

export function SidebarFilterProvider({ children }) {
  const [open, setOpen] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)", {
    initializeWithValue: false,
  });
  const [filters, setFilters] = useState(initialFilters);

  // Sidebar toggler
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const newValues = new Set(prevFilters[filterType]);
      if (newValues.has(value)) {
        newValues.delete(value);
      } else {
        newValues.add(value);
      }
      return { ...prevFilters, [filterType]: Array.from(newValues) };
    });
  };

  const handleRangeChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: { min: value[0], max: value[1] },
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const state = open ? "expanded" : "collapsed";
  const contextValue = useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      filters,
      handleFilterChange,
      handleRangeChange,
      resetFilters,
      setFilters, // To set initial min/max values
    }),
    [
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      filters,
    ]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

SidebarFilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// userSidebarFilter hook
export function useSidebarFilter() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarFilter must be used within a FilterProvider.");
  }

  return context;
}

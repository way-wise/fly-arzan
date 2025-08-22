import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useMediaQuery } from "usehooks-ts";

const SidebarContext = createContext(null);

export function SidebarFilterProvider({ children }) {
  const [open, setOpen] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)", {
    initializeWithValue: false,
  });

  // Sidebar toggler
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

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
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

// userSidebarFilter hook
export function useSidebarFilter() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarFilter must be used within a FilterProvider.");
  }

  return context;
}

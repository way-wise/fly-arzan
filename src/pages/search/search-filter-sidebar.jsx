import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerHeader,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import FilterComponent from "@/components/ui/filter-component";
import { useSidebarFilter } from "@/providers/filter-sidebar-provider";

const SearchFilterSidebar = ({ flightOffersData }) => {
  const { isMobile, openMobile, setOpenMobile } = useSidebarFilter();

  if (isMobile) {
    return (
      <Drawer open={openMobile} onOpenChange={setOpenMobile}>
        <DrawerContent>
          <DrawerHeader>
            <div className="flex flex-col">
              <DrawerTitle className="text-xl font-medium sr-only">
                Brand Logo
              </DrawerTitle>
              <img src="/logo.png" />
              <DrawerDescription className="sr-only">
                Mobile sidebar navigation
              </DrawerDescription>
            </div>
            <DrawerClose>
              <X />
            </DrawerClose>
          </DrawerHeader>
          <div className="tw:p-4 tw:overflow-y-auto">
            <FilterComponent flightOffersData={flightOffersData} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return <FilterComponent flightOffersData={flightOffersData} />;
};

export default SearchFilterSidebar;

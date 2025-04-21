import { createContext, useState } from "react";

// Context banaya
export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [contextCarData, setContextCarData] = useState(null);

  return (
    <CarContext.Provider
      value={{
        contextCarData,
        setContextCarData,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

import { createContext, useState } from "react";

const PersonaSummaryContext = createContext({
  showPersonaSummaryLoader: false,
  setShowPersonaSummaryLoader: (data: any) => {},
});

const PersonaSummaryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showPersonaSummaryLoader, setShowPersonaSummaryLoader] =
    useState(false);
  return (
    <PersonaSummaryContext.Provider
      value={{ showPersonaSummaryLoader, setShowPersonaSummaryLoader }}
    >
      {children}
    </PersonaSummaryContext.Provider>
  );
};

export { PersonaSummaryContext, PersonaSummaryProvider };

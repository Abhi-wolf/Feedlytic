"use client";

const { createContext, useContext, useState } = require("react");

const FilterContext = createContext();

const initialState = {
  dateRange: "30d",
};

function FilterProvider({ children }) {
  const [dateFilter, setDateFilter] = useState(initialState.dateRange);

  return (
    <FilterContext.Provider value={{ dateFilter, setDateFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

function useFilterContext() {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }

  return context;
}

export { FilterProvider, useFilterContext };

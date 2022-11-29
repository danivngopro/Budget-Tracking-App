import { Children, createContext, useContext } from "react";

export const BudgetsContext = createContext({});

export function useBudgets() {
  return useContext(BudgetsContext);
}


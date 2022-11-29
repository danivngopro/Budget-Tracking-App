import { Children, createContext, useContext } from "react";

export const BudgetsContext = createContext<{
  budgets: any;
  expenses: any;
  getBudgetExpenses: any;
  addExpens: any;
  addBudget: any;
  deleteBudget: any;
  deleteExpense: any;
}>({
  budgets: {},
  expenses: {},
  getBudgetExpenses: () => {},
  addExpens: () => {},
  addBudget: () => {},
  deleteBudget: () => {},
  deleteExpense: () => {},
});

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";
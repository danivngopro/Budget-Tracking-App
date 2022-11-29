import { useState } from "react";
import { BudgetsContext } from "./BudgetsContext";
import {v4 as uuidV4} from "uuid";

export const BudgetsProvider = ({ children }: { children: any }) => {
  const [budgets, setBudgets] = useState<
    {
      id: string;
      name: string;
      max: string;
    }[]
  >([]);

  const [expenses, setExpenses] = useState<
    {
      id: string;
      budgetId: string;
      amount: number;
      description: string;
    }[]
  >([]);

  function getBudgetExpenses(budgetId: string) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }
  function addExpens() {}
  function addBudget() {
    setBudgets(prevBudgets => return [...prevBudgets, {id: }])
  }
  function deleteBudget() {}
  function deleteExpense() {}
  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpens,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      Children
    </BudgetsContext.Provider>
  );
};

import { useState } from "react";
import { BudgetsContext } from "./BudgetsContext";
import { v4 as uuidV4 } from "uuid";
import { IBudget } from "../interfaces/IBudget";
import { IExpense } from "../interfaces/IExpense";

export const BudgetsProvider = ({ children }: { children: any }) => {
  const [budgets, setBudgets] = useState<IBudget[]>([]);

  const [expenses, setExpenses] = useState<IExpense[]>([]);

  function getBudgetExpenses(budgetId: string) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }
  function addExpens({
    description,
    amount,
    budgetId,
  }: {
    description: string;
    amount: number;
    budgetId: string;
  }) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), budgetId, amount, description }];
    });
  }
  function addBudget({ name, max }: { name: string; max: number }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name))
        return prevBudgets;
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }
  function deleteBudget({ id }: { id: string }) {
    //Deal with uncategorized expenses
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id === id);
    });
  }
  function deleteExpense({ id }: { id: string }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id === id);
    });
  }
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

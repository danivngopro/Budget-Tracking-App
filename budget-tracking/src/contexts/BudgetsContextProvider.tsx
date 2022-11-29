import { useState } from "react";
import { BudgetsContext, UNCATEGORIZED_BUDGET_ID } from "./BudgetsContext";
import { v4 as uuidV4 } from "uuid";
import { IBudget } from "../interfaces/IBudget";
import { IExpense } from "../interfaces/IExpense";
import useLocalStorage from "../hooks/useLocalStorageHook";

export const BudgetsProvider = ({ children }: { children: any }) => {
  const [budgets, setBudgets] = useLocalStorage("Budgets", []);

  const [expenses, setExpenses] = useLocalStorage("Expenses", []);

  function getBudgetExpenses(budgetId: string) {
    return expenses.filter(
      (expense: IExpense) => expense.budgetId === budgetId
    );
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
    setExpenses((prevExpenses: IExpense[]) => {
      return [...prevExpenses, { id: uuidV4(), budgetId, amount, description }];
    });
  }
  function addBudget({ name, max }: { name: string; max: number }) {
    setBudgets((prevBudgets: IBudget[]) => {
      if (prevBudgets.find((budget) => budget.name === name))
        return prevBudgets;
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }
  function deleteBudget({ id }: { id: string }) {
    setExpenses((prevExpenses: IExpense[]) => {
      return prevExpenses.map((expense: IExpense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudgets((prevBudgets: IBudget[]) => {
      console.log(prevBudgets, id);
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }
  function deleteExpense({ id }: { id: string }) {
    setExpenses((prevExpenses: IExpense[]) => {
      console.log(prevExpenses, id);
      return prevExpenses.filter((expense) => expense.id !== id);
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
      {children}
    </BudgetsContext.Provider>
  );
};

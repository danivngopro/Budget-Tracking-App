import React from "react";
import {
  useBudgets,
} from "../contexts/BudgetsContext";
import { IBudget } from "../interfaces/IBudget";
import { IExpense } from "../interfaces/IExpense";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce(
    (total: any, expense: IExpense) => total + expense.amount,
    0
  );
  const max = budgets.reduce(
    (total: any, budget: IBudget) => total + budget.max,
    0
  );

    if(max === 0) return null;

  return (
    <BudgetCard amount={amount} name="Total" gray={true} max={max} hideButtons={true}/>
  );
}

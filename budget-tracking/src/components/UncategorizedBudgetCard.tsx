import React from "react";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import { IExpense } from "../interfaces/IExpense";
import BudgetCard from "./BudgetCard";

export default function UncategorizedBudgetCard(props: any) {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total: any, expense: IExpense) => total + expense.amount,
    0
  );

    if(amount === 0) return null;

  return (
    <BudgetCard amount={amount} name="Uncategorized" gray={true} {...props} />
  );
}

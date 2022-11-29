import { IBudget } from "../interfaces/IBudget";
import React from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import { IExpense } from "../interfaces/IExpense";
import { currencyFormatter } from "../utils/utils";

export default function ViewExpensesModal({
  budgetId,
  handleClose,
}: {
  budgetId: string;
  handleClose: any;
}) {
  const {
    getBudgetExpenses,
    budgets,
    deleteBudget,
    deleteExpense,
  } = useBudgets();

  const expenses = getBudgetExpenses(budgetId);

  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: UNCATEGORIZED_BUDGET_ID, id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget: IBudget) => budget.id === budgetId);

  return (
    <Modal show={budgetId ? true : false} onHide={handleClose}>
      <Modal.Header closeButton>
        <Stack direction="horizontal" gap={2}>
          <div>Expenses - {budget?.name}</div>
          {budgetId !== UNCATEGORIZED_BUDGET_ID && (
            <Button
              onClick={() => {
                deleteBudget(budget);
                handleClose();
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
          )}
        </Stack>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap={3}>
          {expenses.map((expense: IExpense) => (
            <Stack direction="horizontal" gap={2} key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter(expense.amount)}
              </div>
              <Button
                onClick={() => deleteExpense(expense)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

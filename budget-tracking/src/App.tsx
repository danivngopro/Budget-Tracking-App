import React, { useState } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Button, Stack } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { BudgetsProvider } from "./contexts/BudgetsContextProvider";
import { IBudget } from "./interfaces/IBudget";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState<string>("");
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState<
    string
  >("");
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId: string) {
    setShowAddExpenseModal(true);
    setAddExpenseBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button
            variant="primary"
            onClick={() => {
              setShowAddBudgetModal(true);
            }}
          >
            Add Budget
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => {
              openAddExpenseModal("");
            }}
          >
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto=fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget: IBudget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total: any, expense: { amount: any }) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                gray={false}
                onAddExpenseClick={() => {
                  openAddExpenseModal(budget.id);
                }}
                onViewExpenseClick={() => {
                  setViewExpensesModalBudgetId(budget.id);
                }}
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpenseClick={() => {
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID);
            }}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => {
          setShowAddBudgetModal(false);
        }}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => {
          setShowAddExpenseModal(false);
        }}
        defaultBudgetId={addExpenseBudgetId as string}
      />
      <ViewExpensesModal
        handleClose={() => {
          setViewExpensesModalBudgetId("");
        }}
        budgetId={viewExpensesModalBudgetId}
      />
    </>
  );
}

export default App;

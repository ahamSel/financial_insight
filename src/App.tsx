import { useState } from "react";
import Header from "./components/Header/Header";
import UnifiedForm from "./components/Unified/UnifiedForm/UnifiedForm";
import ExpenseList from "./components/Expense/ExpenseList/ExpenseList";
import WishlistList from "./components/Wishlist/WishlistList/WishlistList";
import IncomeList from "./components/Income/IncomeList/IncomeList";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

// Dummy data for expenses and wishlist
const initialExpenses = [
  {
    id: "e1",
    date: new Date(2022, 7, 14),
    title: "Grocery Shopping",
    amount: 54.32,
  },
  {
    id: "e2",
    date: new Date(2022, 2, 12),
    title: "Car Insurance",
    amount: 296.67,
  },
  {
    id: "e3",
    date: new Date(2022, 9, 29),
    title: "New Desk (Wooden)",
    amount: 450,
  },
];

const initialWishlist = [
  {
    id: "w1",
    title: "New Laptop",
    cost: 1200,
    desiredDate: new Date(2023, 5, 15),
  },
  {
    id: "w2",
    title: "Vacation to Hawaii",
    cost: 3000,
    desiredDate: new Date(2023, 11, 20),
  },
];

const initialIncome = [
  {
    id: "i1",
    date: new Date(2021, 7, 14),
    title: "Paycheck",
    amount: 2000,
    recurrence: "Bi-Weekly",
  },
  {
    id: "i2",
    date: new Date(2021, 2, 12),
    title: "Paycheck",
    amount: 2000,
  },
  {
    id: "i3",
    date: new Date(2021, 9, 29),
    title: "Grandma's Money",
    amount: 20000,
  },
];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [income, setIncome] = useState(initialIncome);

  // Add a new expense, wishlist item, or income
  const handleAddEntry = (entryData: {
    type: string;
    title: string;
    amount: number;
    date: Date;
    recurrence?: string;
  }) => {
    if (entryData.type === "expense") {
      const newExpense = {
        ...entryData,
        id: `e${expenses.length + 1}`,
      };
      setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
    } else if (entryData.type === "wishlist") {
      const newWishlistItem = {
        title: entryData.title,
        cost: entryData.amount,
        desiredDate: entryData.date,
        id: `w${wishlist.length + 1}`,
      };
      setWishlist((prevWishlist) => [newWishlistItem, ...prevWishlist]);
    } else if (entryData.type === "income") {
      const newIncome = {
        ...entryData,
        id: `i${income.length + 1}`,
      };
      setIncome((prevIncome) => [newIncome, ...prevIncome]);
    }
  };

  const removeExpenseHandler = (id: string) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  const removeWishlistItemHandler = (id: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== id)
    );
  };

  const removeIncomeHandler = (id: string) => {
    setIncome((prevIncome) =>
      prevIncome.filter((incomeItem) => incomeItem.id !== id)
    );
  };

  return (
    <div>
      <Header />
      <main>
        <Dashboard expenses={expenses} />
        <UnifiedForm onAddEntry={handleAddEntry} />
        <div className="lists-container">
          <ExpenseList items={expenses} onRemove={removeExpenseHandler} />
          <WishlistList
            items={wishlist}
            onRemoveItem={removeWishlistItemHandler}
          />
          <IncomeList items={income} onRemove={removeIncomeHandler} />
        </div>
      </main>
    </div>
  );
}

export default App;

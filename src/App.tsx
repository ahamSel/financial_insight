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
  const [insights, setInsights] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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

  const simulateTypingEffect = (text: string, index = 0) => {
    if (index < text.length) {
      setInsights((prev) => prev + text[index]);
      setTimeout(() => simulateTypingEffect(text, index + 1), 25);
    }
  };

  const getFinancialInsights = async () => {
    if (expenses.length === 0 || wishlist.length === 0 || income.length === 0) {
      alert(
        "You need at least 1 income, expense, and wishlist item to get insights."
      );
      return;
    }

    setIsLoading(true);

    const financialData = { expenses, wishlist, income };

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/financial-insights",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(financialData),
        }
      );
      const responseData = await response.json();
      const cleanedInsights = responseData.insights.replace(/\n +/g, "\n");
      setInsights("");
      simulateTypingEffect(cleanedInsights);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <main>
        <UnifiedForm onAddEntry={handleAddEntry} />
        <div className="lists-container">
          <ExpenseList items={expenses} onRemove={removeExpenseHandler} />
          <WishlistList
            items={wishlist}
            onRemoveItem={removeWishlistItemHandler}
          />
          <IncomeList items={income} onRemove={removeIncomeHandler} />
        </div>
        <button onClick={getFinancialInsights} disabled={isLoading}>
          Get Insights
        </button>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <textarea
            value={insights}
            readOnly
            className="insights-textarea"
          ></textarea>
        )}
      </main>
    </div>
  );
}

export default App;

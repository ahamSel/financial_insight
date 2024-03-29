import React, { useState } from "react";
import styles from "./UnifiedForm.module.css";

const recurrenceOptions = [
  "One-Time",
  "Daily",
  "Weekly",
  "Bi-Weekly",
  "Monthly",
  "Yearly",
];

interface UnifiedFormProps {
  onAddEntry: (entryData: {
    type: string;
    title: string;
    amount: number;
    date: Date;
    recurrence?: string;
  }) => void;
}

const UnifiedForm: React.FC<UnifiedFormProps> = ({ onAddEntry }) => {
  const [selectedType, setSelectedType] = useState("Expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [recurrence, setRecurrence] = useState(recurrenceOptions[0]);

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setDate("");
    setError("");
  };

  const validateForm = () => {
    if (title.trim().length === 0) {
      setError("Please enter a title.");
      return false;
    }

    if (amount.trim().length === 0 || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return false;
    }

    if (!date) {
      setError("Please enter a valid date.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    const entryData = {
      type: selectedType,
      title,
      amount: parseFloat(amount),
      date: new Date(date),
      ...(selectedType !== "Wishlist Item" && { recurrence }),
    };

    onAddEntry(entryData);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formStyles}>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className={styles.selectStyles}
      >
        <option value="Expense">Expense</option>
        <option value="Wishlist Item">Wishlist Item</option>
        <option value="Income">Income</option>
      </select>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className={styles.inputStyles}
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder={
          selectedType === "Wishlist Item" ? "Cost ($)" : "Amount ($)"
        }
        className={styles.inputStyles}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={styles.inputStyles}
      />

      {(selectedType === "Income" || selectedType === "Expense") && (
        <select
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
          className={styles.selectStyles}
        >
          {recurrenceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {error && <p className={styles.errorStyles}>{error}</p>}

      <button type="submit" className={styles.buttonStyles}>
        {`Add ${selectedType === "Wishlist Item" ? "Item" : selectedType}`}
      </button>
    </form>
  );
};

export default UnifiedForm;

import React from "react";
import styles from "./ExpenseItem.module.css";

interface ExpenseItemProps {
  id: string;
  date: Date;
  title: string;
  amount: number;
  recurrence?: string;
  onRemove: (id: string) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = (props) => {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <li className={styles.expenseItem}>
      <div className={styles.expenseDate}>
        <div className={styles.expenseDateMonth}>{month}</div>
        <div className={styles.expenseDateYear}>{year}</div>
        <div className={styles.expenseDateDay}>{day}</div>
      </div>
      <div className={styles.expenseDescription}>
        <h2>{props.title}</h2>
        <div className={styles.expenseAmount}>${props.amount.toFixed(2)}</div>
        {props.recurrence && props.recurrence !== "One-Time" && (
          <div className={styles.expenseRecurrence}>{props.recurrence}</div>
        )}
      </div>
      <button
        className={styles.closeButton}
        onClick={() => props.onRemove(props.id)}
      >
        &#x2715;
      </button>
    </li>
  );
};

export default ExpenseItem;

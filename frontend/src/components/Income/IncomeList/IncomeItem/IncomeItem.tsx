import React from "react";
import styles from "./IncomeItem.module.css";

interface IncomeItemProps {
  id: string;
  date: Date;
  title: string;
  amount: number;
  recurrence?: string;
  onRemove: (id: string) => void;
}

const IncomeItem: React.FC<IncomeItemProps> = (props) => {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <li className={styles.incomeItem}>
      <div className={styles.incomeDate}>
        <div className={styles.incomeDateMonth}>{month}</div>
        <div className={styles.incomeDateYear}>{year}</div>
        <div className={styles.incomeDateDay}>{day}</div>
      </div>
      <div className={styles.incomeDescription}>
        <h2>{props.title}</h2>
        <div className={styles.incomeAmount}>${props.amount.toFixed(2)}</div>
        {props.recurrence && props.recurrence !== "One-Time" && (
          <div className={styles.incomeRecurrence}>{props.recurrence}</div>
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

export default IncomeItem;

import React from "react";
import ExpenseItem from "./ExpenseItem/ExpenseItem";
import styles from "./ExpenseList.module.css";

type ExpenseData = {
  id: string;
  date: Date;
  title: string;
  amount: number;
  recurrence?: string;
};

type ExpenseListProps = {
  items: ExpenseData[];
  onRemove: (id: string) => void;
};

const ExpenseList: React.FC<ExpenseListProps> = (props) => {
  if (props.items.length === 0) {
    return <h2 className={styles.expensesListFallback}>No expenses added.</h2>;
  }

  return (
    <ul className={styles.expensesList}>
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          id={expense.id}
          date={expense.date}
          title={expense.title}
          amount={expense.amount}
          recurrence={expense.recurrence}
          onRemove={props.onRemove}
        />
      ))}
    </ul>
  );
};

export default ExpenseList;

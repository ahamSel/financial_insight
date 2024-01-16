import React from "react";
import IncomeItem from "./IncomeItem/IncomeItem";
import styles from "./IncomeList.module.css";

interface IncomeData {
  id: string;
  date: Date;
  title: string;
  amount: number;
  recurrence?: string;
}

interface IncomeListProps {
  items: IncomeData[];
  onRemove: (id: string) => void;
}

const IncomeList: React.FC<IncomeListProps> = (props) => {
  if (props.items.length === 0) {
    return <h2 className={styles.incomeListFallback}>No income submitted.</h2>;
  }

  return (
    <ul className={styles.incomeList}>
      {props.items.map((income) => (
        <IncomeItem
          key={income.id}
          id={income.id}
          date={income.date}
          title={income.title}
          amount={income.amount}
          recurrence={income.recurrence}
          onRemove={props.onRemove}
        />
      ))}
    </ul>
  );
};

export default IncomeList;

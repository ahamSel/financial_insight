import React from "react";
import styles from "./Dashboard.module.css";

type DashboardProps = {
  expenses: {
    id: string;
    date: Date;
    title: string;
    amount: number;
  }[];
};

const Dashboard: React.FC<DashboardProps> = ({ expenses }) => {
  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  return (
    <div className={styles.dashboard}>
      <div className={styles.totalExpenses}>
        <h2>Total Expenses</h2>
        <p>${totalExpenses.toFixed(2)}</p>
      </div>
      {/* Future enhancement here: charts or graphs */}
    </div>
  );
};

export default Dashboard;

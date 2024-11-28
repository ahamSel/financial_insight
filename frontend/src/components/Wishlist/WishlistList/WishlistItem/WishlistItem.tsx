import React from "react";
import styles from "./WishlistItem.module.css";

interface WishlistItemProps {
  id: string;
  title: string;
  cost: number;
  desiredDate: Date;
  onRemove: (id: string) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({
  id,
  title,
  cost,
  desiredDate,
  onRemove,
}) => {
  const month = desiredDate.toLocaleString("en-US", { month: "long" });
  const day = desiredDate.toLocaleString("en-US", { day: "2-digit" });
  const year = desiredDate.getFullYear();

  return (
    <li className={styles.wishlistItem}>
      <div className={styles.itemDetails}>
        <h3>{title}</h3>
        <p className={styles.cost}>${cost.toFixed(2)}</p>
      </div>
      <div className={styles.date}>
        <p>{`${day} ${month} ${year}`}</p>
      </div>
      <button onClick={() => onRemove(id)} className={styles.removeButton}>
        &#x2715;
      </button>
    </li>
  );
};

export default WishlistItem;

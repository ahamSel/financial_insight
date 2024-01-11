import React from "react";
import WishlistItem from "./WishlistItem/WishlistItem";
import styles from "./WishlistList.module.css";

interface WishlistData {
  id: string;
  title: string;
  cost: number;
  desiredDate: Date;
}

interface WishlistListProps {
  items: WishlistData[];
  onRemoveItem: (id: string) => void;
}

const WishlistList: React.FC<WishlistListProps> = ({ items, onRemoveItem }) => {
  if (items.length === 0) {
    return <h2 className={styles.emptyList}>Your wishlist is empty.</h2>;
  }

  return (
    <ul className={styles.wishlistList}>
      {items.map((item) => (
        <WishlistItem
          key={item.id}
          id={item.id}
          title={item.title}
          cost={item.cost}
          desiredDate={item.desiredDate}
          onRemove={onRemoveItem}
        />
      ))}
    </ul>
  );
};

export default WishlistList;

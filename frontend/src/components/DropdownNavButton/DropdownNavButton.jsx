import Link from "next/link";
import styles from "./DropdownNavButton.module.css";

export default function DropdownNavButton({ href, label, onClick }) {
  return (
    <Link href={href} className={styles.btn} onClick={onClick}>
      {label}
    </Link>
  );
}

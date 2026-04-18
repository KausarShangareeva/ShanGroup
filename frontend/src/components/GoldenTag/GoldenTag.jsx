import Flag from "react-world-flags";
import styles from "./GoldenTag.module.css";

export default function GoldenTag({ label = "Золотая виза ОАЭ" }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tag}>
        <Flag code="AE" style={{ width: 20, height: 20, borderRadius: 6 }} />
        <span>{label}</span>
      </div>
    </div>
  );
}

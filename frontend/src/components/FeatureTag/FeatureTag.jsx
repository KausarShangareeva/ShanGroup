import TagIcon from "@/components/TagIcon/TagIcon";
import styles from "./FeatureTag.module.css";

export default function FeatureTag({ children, emoji, tint }) {
  return (
    <span className={styles.tag} data-tint={tint}>
      {emoji && <TagIcon icon={emoji} size={20} />}
      {children}
    </span>
  );
}

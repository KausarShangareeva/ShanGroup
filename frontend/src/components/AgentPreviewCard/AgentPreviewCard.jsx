import Link from "next/link";
import styles from "./AgentPreviewCard.module.css";

import Icon from "@/components/Icon/Icon";
/**
 * Карточка агента для сеток — используется в индексной странице /authors
 * и в секции «Наши агенты» на детальной странице профиля.
 *
 * @param {object} agent — объект из authors.json (ожидаются поля slug, name, role, avatar).
 */
export default function AgentPreviewCard({ agent }) {
  return (
    <Link href={`/authors/${agent.slug}`} className={styles.card}>
      <div className={styles.photoWrap}>
        <img src={agent.avatar} alt={agent.name} className={styles.photo} />
      </div>
      <p className={styles.name}>{agent.name}</p>
      <p className={styles.role}>{agent.role}</p>
      <div className={styles.socials}>
        <span className={styles.socialDot}>
          <Icon name="phone" size={12}  />
        </span>
        <span className={styles.socialDot}>
          <Icon name="mail" size={12}  />
        </span>
        <span className={styles.socialDot}>
          <Icon name="send" size={12}  />
        </span>
        <span className={styles.socialDot}>
          <Icon name="instagram" size={12}  />
        </span>
      </div>
    </Link>
  );
}

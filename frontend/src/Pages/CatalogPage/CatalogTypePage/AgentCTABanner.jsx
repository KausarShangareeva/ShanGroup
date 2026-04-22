import Link from "next/link";
import agent from "@/data/agent.json";
import styles from "./AgentCTABanner.module.css";

export default function AgentCTABanner() {
  return (
    <div className={styles.wrap}>
      <div className={styles.noise} />

      <div className={styles.left}>
        <p className={styles.eyebrow}>800+ объектов в базе</p>
        <h2 className={styles.headline}>
          <span className={styles.gold}>Подберу объект</span>
          {" "}из полной базы данных
        </h2>
        <blockquote className={styles.body}>
          По вашим критериям мы подберём лучшие варианты с расчётами
          по доходности, условиями рассрочки и визовыми преимуществами.
        </blockquote>
        <Link href="/contacts" className={styles.cta}>
          Выбрать объект
          <span className={styles.ctaGrain} />
        </Link>
      </div>

      <div className={styles.right}>
        <img src={agent.avatar} alt={agent.name} className={styles.avatar} />
        <div className={styles.agentTag}>
          <strong className={styles.agentName}>{agent.name}</strong>
          <span className={styles.agentRole}>· ведущий менеджер</span>
        </div>
      </div>
    </div>
  );
}

import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';
import styles from './AgentCard.module.css';

export default function AgentCard({ photo, name, role, phone, email }) {
  return (
    <div className={styles.card}>
      <div className={styles.photoWrap}>
        <Image src={photo} alt={name} fill className={styles.photo} sizes="120px" />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>
        <div className={styles.contacts}>
          {phone && (
            <a href={`tel:${phone}`} className={styles.contact}>
              <Phone size={15} /> {phone}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className={styles.contact}>
              <Mail size={15} /> {email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

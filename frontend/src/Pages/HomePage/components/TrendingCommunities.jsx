import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Button from "@/components/Button/Button";
import styles from "./TrendingCommunities.module.css";

const COMMUNITIES = [
  {
    name: "Palm Jumeirah",
    developer: "Nakheel",
    href: "/communities/palm-jumeirah",
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775553608/Palm_Jumeirah_ftxtay.png",
  },
  {
    name: "Emaar South",
    developer: "Emaar",
    href: "/communities/emaar-south",
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775553608/Emaar_South_g0wrwv.png",
  },
  {
    name: "Jumeirah Village Circle",
    developer: "Nakheel",
    href: "/communities/jumeirah-village-circle",
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775553608/Jumeirah_Village_Circle_kip8nj.png",
  },
  {
    name: "Maritime City",
    developer: "Dubai Properties",
    href: "/communities/maritime-city",
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775553611/Maritime_city_pr2aqc.png",
  },
  {
    name: "Grand Polo Club & Resort",
    developer: "Emaar",
    href: "/communities/grand-polo-club",
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775553612/Grand_Polo_Club_Resort_yu0wnw.png",
  },
  {
    name: "Dubai Creek Harbour",
    developer: "Emaar",
    href: "/communities/creek-harbour",
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775553613/Dubai_Creek_Harbour_qi1iqb.png",
  },
  {
    name: "DAMAC Lagoons",
    developer: "DAMAC",
    href: "/communities/damac-lagoons",
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775553614/Damac_Lagoons_jegefn.png",
  },
  {
    name: "Palm Jebel Ali",
    developer: "Nakheel",
    href: "/communities/palm-jebel-ali",
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775553614/Palm_Jebel_Ali_et0om8.png",
  },
  {
    name: "The Oasis",
    developer: "Emaar",
    href: "/communities/the-oasis",
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775553614/The_Oasis_ajzkkq.png",
  },
  {
    name: "Emaar Beachfront",
    developer: "Emaar",
    href: "/communities/emaar-beachfront",
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775553614/Emaar_Beachfront_rh2hlz.png",
  },
  {
    name: "DAMAC Islands 2",
    developer: "DAMAC",
    href: "/communities/damac-islands-2",
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775553615/Damac_Islands_2_xovwrc.png",
  },
  {
    name: "The Heights",
    developer: "Emaar",
    href: "/communities/the-heights",
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775553615/The_Heights_fese1x.png",
  },
  {
    name: "The Valley",
    developer: "Emaar",
    href: "/communities/the-valley",
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775553616/The_VALLEY_deiivy.png",
  },
  {
    name: "DAMAC Hills 2",
    developer: "DAMAC",
    href: "/communities/damac-hills-2",
    img: "https://res.cloudinary.com/dxp7ppipg/image/upload/q_auto/f_auto/v1775553616/Damac_Hills_2_ainaac.png",
  },
];

export default function TrendingCommunities() {
  return (
    <section className={styles.section}>
      <div className={styles.noise} />
      <div className={styles.inner}>
        <Container>
          <SectionTitle
            title="Популярные районы Дубая"
            subtitle="Лучшие жилые районы ОАЭ — от островных вилл до высоток в даунтауне"
            align="center"
            dark
          />

          <div className={styles.grid}>
            {COMMUNITIES.map(({ name, developer, href, img }) => (
              <Link key={href} href={href} className={styles.card}>
                <img src={img} alt={name} className={styles.img} />
                <div className={styles.overlay}>
                  <p className={styles.developer}>{developer}</p>
                  <h3 className={styles.name}>{name}</h3>
                </div>
                <div className={styles.arrow}>
                  <ArrowUpRight size={15} strokeWidth={2} />
                </div>
              </Link>
            ))}
            <div className={styles.moreCell}>
              <Button label="Все районы" href="/communities" />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

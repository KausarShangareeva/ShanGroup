import { cookies } from "next/headers";
import localFont from "next/font/local";
import {
  Montserrat,
  Abril_Fatface,
  Bodoni_Moda,
  Marck_Script,
  Cormorant_Garamond,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "../styles/globals.css";
import Navigation from "@/components/layout/Navigation";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import FloatingActions from "@/components/FloatingActions/FloatingActions";
import Footer from "@/components/layout/Footer";
import I18nProvider from "@/context/I18nProvider";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
  display: "swap",
});

const marckScript = Marck_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marck",
  display: "swap",
});

const belarus = localFont({
  src: [
    {
      path: "../../public/fonts/Belarus/Belarus-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-belarus",
  display: "swap",
});


const gothic60 = localFont({
  src: [
    {
      path: "../../public/fonts/Gothic/Gothic60-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-gothic60",
  display: "swap",
});

const kuzanyan = localFont({
  src: [
    {
      path: "../../public/fonts/Kuzanyan/Kuzanyan Antiqua 1957.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Kuzanyan/Kuzanyan Antiqua Italic 1957.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-kuzanyan",
  display: "swap",
});

const leotaro = localFont({
  src: [
    {
      path: "../../public/fonts/Leotaro/Leotaro-Regular_0.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-leotaro",
  display: "swap",
});

const mavoble = localFont({
  src: [
    {
      path: "../../public/fonts/Mavoble/Mavoble-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Mavoble/Mavoble-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mavoble",
  display: "swap",
});

const preciosa = localFont({
  src: [
    {
      path: "../../public/fonts/Preciosa/Preciosa.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Preciosa/Preciosa Valeria.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-preciosa",
  display: "swap",
});

const gtEesti = localFont({
  src: [
    {
      path: "../../public/fonts/GT-Eesti/GT-Eesti-Display-UltraLight-Trial.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/GT-Eesti/GT-Eesti-Display-UltraLight-Italic-Trial.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/GT-Eesti/GT-Eesti-Display-Light-Trial.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/GT-Eesti/GT-Eesti-Display-Light-Italic-Trial.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/GT-Eesti/GT-Eesti-Display-Regular-Trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GT-Eesti/GT-Eesti-Display-Regular-Italic-Trial.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/GT-Eesti/GT-Eesti-Display-Medium-Trial.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GT-Eesti/GT-Eesti-Display-Medium-Italic-Trial.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/GT-Eesti/GT-Eesti-Display-Bold-Trial.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/GT-Eesti/GT-Eesti-Display-Bold-Italic-Trial.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/GT-Eesti/GT-Eesti-Display-UltraBold-Trial.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/GT-Eesti/GT-Eesti-Display-UltraBold-Italic-Trial.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-gt-eesti",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "ShanGroup — Недвижимость в Дубае",
  description: "Премиальная недвижимость в Дубае. Апартаменты, виллы, инвестиции.",
};

// Theme is read from a cookie so the server can render <html data-theme="...">
// on the very first response — no FOUC and no inline boot-script (Next.js 16
// warns about <script> inside React components). The useTheme hook on the
// client keeps the cookie + localStorage in sync after a manual toggle.
export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("shan-theme")?.value === "dark" ? "dark" : "light";

  return (
    <html
      lang="ru"
      data-theme={theme}
      suppressHydrationWarning
      className={`${gtEesti.variable} ${montserrat.variable} ${cormorant.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${abrilFatface.variable} ${bodoniModa.variable} ${marckScript.variable} ${belarus.variable} ${gothic60.variable} ${kuzanyan.variable} ${leotaro.variable} ${mavoble.variable} ${preciosa.variable}`}
    >
      <body>
        <I18nProvider>
          <Navigation />
          <Breadcrumb />
          <main>{children}</main>
          <Footer />
          <FloatingActions />
        </I18nProvider>
      </body>
    </html>
  );
}

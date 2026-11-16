import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Montserrat } from "next/font/google";
import { wedding } from "@/config/wedding";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const title = `${wedding.couple.bride.firstName} & ${wedding.couple.groom.firstName} — Wedding Invitation`;
const description = `${wedding.inviteLine}, we invite you to celebrate the wedding of ${wedding.couple.bride.fullName} and ${wedding.couple.groom.fullName} on ${wedding.displayDate} at ${wedding.venue.name}, ${wedding.venue.address}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: title,
  keywords: [
    "wedding invitation",
    "wedding card",
    wedding.couple.bride.firstName,
    wedding.couple.groom.firstName,
    wedding.couple.hashtag,
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: title,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#a97f3f",
  width: "device-width",
  initialScale: 1,
};

const themeScript = `(function(){try{var t=localStorage.getItem("wc-theme");var v=["ivory-gold","maroon-gold","blush-rosegold","emerald-gold","midnight-gold"];if(t&&v.indexOf(t)>-1){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={wedding.theme}
      className={`${cormorant.variable} ${greatVibes.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}

import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Ibrahim Portfolio",
  description: "BSIT graduate specializing in web development, QA, and practical digital solutions.",
  openGraph: {
    title: "Ibrahim Portfolio",
    description: "BSIT graduate specializing in web development, QA, and practical digital solutions.",
    url: "https://ibrahim-portfolio.vercel.app",
    siteName: "Ibrahim Portfolio",
    images: [
      {
        url: "/images/about/profile.png",
        width: 1200,
        height: 630,
        alt: "Ibrahim Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Portfolio",
    description: "BSIT graduate specializing in web development, QA, and practical digital solutions.",
    images: ["/images/about/profile.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Retro fonts: Press Start 2P (heading), VT323 + Silkscreen (labels), Space Mono + Share Tech Mono (body) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Silkscreen:wght@400;700&family=Space+Mono:wght@400;700&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
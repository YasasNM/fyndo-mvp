import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Fyndo — Find the real spots",
  description:
    "Sri Lanka's video-first local discovery platform. Hidden food gems, real prices, real videos.",
};

function PlayPin() {
  return (
    <svg className="pin" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M120 22 C67 22 32 60 32 106 C32 156 78 194 112 218 C117 221.5 123 221.5 128 218 C162 194 208 156 208 106 C208 60 173 22 120 22 Z"
        fill="#FF8A1E"
      />
      <path
        d="M100 72 L162 108 A6 6 0 0 1 162 118 L100 154 A6 6 0 0 1 91 148 L91 78 A6 6 0 0 1 100 72 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="logo">
              <PlayPin />
              <span>
                fynd<span className="o">o</span>
              </span>
            </Link>
            <span className="header-badge">
              <span className="dot" aria-hidden="true"></span>
              Colombo · beta
            </span>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="container">
            <span className="footer-brand">
              <PlayPin />
              <span>
                fynd<span className="o">o</span>
              </span>
            </span>
            <nav className="footer-links">
              <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <Link href="/">All spots</Link>
            </nav>
            <span className="footer-note">
              Fyndo — find the real spots. Built in Sri Lanka 🇱🇰 App coming soon.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}

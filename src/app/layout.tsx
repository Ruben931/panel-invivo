import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MuiThemeProvider from "./MuiThemeProvider";
import NavigationDock from "./components/NavigationDock";
import { NavbarProvider } from "./context/NavbarContext";
import Box from "@mui/material/Box";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "INVIVO Panel - Gestion de Chantiers",
  description: "Plateforme de gestion des chantiers de construction professionnels",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="/next.svg" />
        <meta name="msapplication-TileImage" content="/next.svg" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable}`}> 
        <MuiThemeProvider>
          <NavbarProvider>
            <NavigationDock />
            <Box sx={{ pt: '70px', minHeight: '100vh' }}>
              {children}
            </Box>
          </NavbarProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
}

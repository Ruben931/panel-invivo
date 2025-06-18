"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { 
      main: "#323d82",
      light: "#4a5294",
      dark: "#1a2142",
      contrastText: "#ffffff"
    },
    secondary: { 
      main: "#00a0dd",
      light: "#00d4ff",
      dark: "#0066aa",
      contrastText: "#ffffff"
    },
    background: { 
      default: "#fafbff", 
      paper: "rgba(255, 255, 255, 0.9)" 
    },
    text: { 
      primary: "#1a202c",
      secondary: "#4a5568"
    },
    grey: {
      50: "#f7fafc",
      100: "#edf2f7",
      200: "#e2e8f0",
      300: "#cbd5e0",
      400: "#a0aec0",
      500: "#718096",
      600: "#4a5568",
      700: "#2d3748",
      800: "#1a202c",
      900: "#171923"
    }
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { 
      fontWeight: 800, 
      fontSize: "clamp(2.5rem, 5vw, 4rem)", 
      letterSpacing: "-0.04em",
      lineHeight: 1.1
    },
    h2: { 
      fontWeight: 700, 
      fontSize: "clamp(2rem, 4vw, 3rem)", 
      letterSpacing: "-0.03em",
      lineHeight: 1.2
    },
    h3: { 
      fontWeight: 700, 
      fontSize: "clamp(1.5rem, 3vw, 2.25rem)", 
      letterSpacing: "-0.02em",
      lineHeight: 1.3
    },
    h4: { 
      fontWeight: 600, 
      fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)", 
      letterSpacing: "-0.01em",
      lineHeight: 1.4
    },
    h5: { 
      fontWeight: 600, 
      fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
      lineHeight: 1.5
    },
    h6: { 
      fontWeight: 600, 
      fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
      lineHeight: 1.6
    },
    body1: { 
      fontSize: "1rem", 
      lineHeight: 1.7,
      letterSpacing: "0.01em"
    },
    body2: { 
      fontSize: "0.875rem", 
      lineHeight: 1.6,
      letterSpacing: "0.01em"
    },
  },
  shape: { borderRadius: 24 },
  shadows: [
    "none",
    "0px 1px 3px rgba(50, 61, 130, 0.04), 0px 1px 2px rgba(50, 61, 130, 0.06)",
    "0px 4px 6px rgba(50, 61, 130, 0.05), 0px 2px 4px rgba(50, 61, 130, 0.06)",
    "0px 10px 15px rgba(50, 61, 130, 0.08), 0px 4px 6px rgba(50, 61, 130, 0.05)",
    "0px 20px 25px rgba(50, 61, 130, 0.1), 0px 10px 10px rgba(50, 61, 130, 0.04)",
    "0px 25px 50px rgba(50, 61, 130, 0.15), 0px 12px 25px rgba(50, 61, 130, 0.08)",
    "0px 32px 64px rgba(50, 61, 130, 0.2), 0px 16px 32px rgba(50, 61, 130, 0.1)",
    ...Array(18).fill("0px 32px 64px rgba(50, 61, 130, 0.25)")
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(50, 61, 130, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 160, 221, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(50, 61, 130, 0.02) 0%, transparent 50%)
          `,
          backgroundAttachment: 'fixed'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          background: "rgba(255, 255, 255, 0.7)",
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          "&:hover": {
            transform: "translateY(-12px) scale(1.02)",
            boxShadow: "0px 32px 64px rgba(50, 61, 130, 0.25), 0px 16px 32px rgba(50, 61, 130, 0.15)",
            border: "1px solid rgba(0, 160, 221, 0.3)",
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          textTransform: "none",
          fontWeight: 600,
          padding: "14px 28px",
          fontSize: "1rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            transition: "left 0.5s",
          },
          "&:hover:before": {
            left: "100%",
          }
        },
        contained: {
          background: "linear-gradient(135deg, #323d82 0%, #4a5294 50%, #323d82 100%)",
          backgroundSize: "200% 200%",
          boxShadow: "0px 8px 24px rgba(50, 61, 130, 0.4)",
          "&:hover": {
            backgroundPosition: "right center",
            transform: "translateY(-3px)",
            boxShadow: "0px 16px 32px rgba(50, 61, 130, 0.5)",
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          background: "rgba(255, 255, 255, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }
      }
    }
  }
});

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{
        minHeight: "100vh",
        background: `
          linear-gradient(135deg, #fafbff 0%, #f0f4ff 100%),
          radial-gradient(circle at 10% 20%, rgba(50, 61, 130, 0.1) 0%, transparent 20%),
          radial-gradient(circle at 80% 80%, rgba(0, 160, 221, 0.1) 0%, transparent 20%),
          radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.8) 0%, transparent 50%)
        `,
        backgroundAttachment: 'fixed',
        position: 'relative',
        "&::before": {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23323d82' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          zIndex: -1
        }
      }}>
        {children}
      </div>
    </ThemeProvider>
  );
} 
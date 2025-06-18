"use client";
import { useState } from "react";
import { useNavbar } from "../context/NavbarContext";
import { 
  Drawer, 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  IconButton,
  Divider,
  Avatar,
  Chip
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { 
  Home, 
  Construction, 
  Inventory, 
  Groups, 
  Menu, 
  Close,
  Dashboard,
  Notifications
} from "@mui/icons-material";

const navigationItems = [
  { 
    id: "home", 
    label: "Tableau de bord", 
    href: "/", 
    icon: Dashboard,
    badge: null
  },
  { 
    id: "chantiers", 
    label: "Chantiers", 
    href: "/chantiers", 
    icon: Construction,
    badge: "12"
  },
  { 
    id: "entrepots", 
    label: "Entrepôts", 
    href: "/entrepots", 
    icon: Inventory,
    badge: "4"
  },
  { 
    id: "reunions", 
    label: "Réunions", 
    href: "/reunions", 
    icon: Groups,
    badge: "3"
  }
];

export default function NavigationDock() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isNavbarVisible, hideNavbar, showNavbar } = useNavbar();

  const getCurrentItem = () => {
    return navigationItems.find(item => item.href === pathname) || navigationItems[0];
  };

  return (
    <>
      {/* Top Bar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 70,
          background: "rgba(255, 255, 255, 0.95)",
          borderBottom: "1px solid rgba(50, 61, 130, 0.1)",
          zIndex: 1300,
          display: "flex",
          alignItems: "center",
          px: 3,
          transform: (isOpen || !isNavbarVisible) ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.3s ease"
        }}
      >
        {/* Menu Button */}
        <IconButton
          onClick={() => {
            setIsOpen(true);
            hideNavbar();
          }}
          sx={{
            mr: 2,
            background: "rgba(50, 61, 130, 0.05)",
            "&:hover": {
              background: "rgba(50, 61, 130, 0.1)",
            }
          }}
        >
          <Menu sx={{ color: "primary.main" }} />
        </IconButton>

        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Box
            component="img"
            src="/next.svg"
            alt="Logo"
            sx={{
              height: 55,
              width: "auto",
              maxWidth: 280,
              objectFit: "contain",
              filter: "invert(1)"
            }}
            onError={(e) => {
              console.log("Image failed to load");
              e.target.style.display = 'none';
            }}
          />
        </Box>

        {/* Page Actuelle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {getCurrentItem().label}
          </Typography>
          <IconButton size="small">
            <Notifications sx={{ fontSize: 20, color: "text.secondary" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Sidebar */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          showNavbar();
        }}
        PaperProps={{
          sx: {
            width: 280,
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 254, 0.98) 100%)",
            border: "none",
            boxShadow: "0 20px 60px rgba(50, 61, 130, 0.15)"
          }
        }}
      >
        {/* Header Sidebar */}
        <Box sx={{ p: 3, borderBottom: "1px solid rgba(50, 61, 130, 0.1)" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>
              Navigation
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => {
                setIsOpen(false);
                showNavbar();
              }}
              sx={{ 
                background: "rgba(50, 61, 130, 0.05)",
                "&:hover": { background: "rgba(50, 61, 130, 0.1)" }
              }}
            >
              <Close sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Accédez rapidement à toutes vos sections
          </Typography>
        </Box>

        {/* Navigation Items */}
        <List sx={{ px: 2, py: 2 }}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => {
                    router.push(item.href);
                    setIsOpen(false);
                    showNavbar();
                  }}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    px: 2,
                    background: isActive 
                      ? "linear-gradient(135deg, rgba(50, 61, 130, 0.1) 0%, rgba(0, 160, 221, 0.05) 100%)" 
                      : "transparent",
                    border: isActive ? "1px solid rgba(50, 61, 130, 0.2)" : "1px solid transparent",
                    "&:hover": {
                      background: isActive 
                        ? "linear-gradient(135deg, rgba(50, 61, 130, 0.15) 0%, rgba(0, 160, 221, 0.1) 100%)"
                        : "rgba(50, 61, 130, 0.05)",
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Icon 
                      sx={{ 
                        color: isActive ? "primary.main" : "text.secondary",
                        fontSize: 22
                      }} 
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "primary.main" : "text.primary",
                      fontSize: "0.95rem"
                    }}
                  />
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        background: isActive ? "primary.main" : "rgba(50, 61, 130, 0.1)",
                        color: isActive ? "white" : "primary.main"
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ mx: 2, my: 2 }} />

        {/* Résumé rapide */}
        <Box sx={{ px: 3, py: 2, mt: "auto" }}>
          <Box 
            sx={{ 
              p: 2, 
              borderRadius: 3, 
              background: "linear-gradient(135deg, rgba(0, 160, 221, 0.05) 0%, rgba(50, 61, 130, 0.05) 100%)",
              border: "1px solid rgba(0, 160, 221, 0.1)"
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, color: "primary.main", mb: 1 }}>
              📊 Résumé du jour
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>
              • 3 livraisons prévues aujourd'hui
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>
              • 2 alertes de stock à traiter
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
              • 1 réunion à 14h00
            </Typography>
          </Box>
        </Box>
      </Drawer>

      {/* Overlay pour mobile */}
      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.2)",
            zIndex: 1200
          }}
          onClick={() => {
            setIsOpen(false);
            showNavbar();
          }}
        />
      )}
    </>
  );
} 
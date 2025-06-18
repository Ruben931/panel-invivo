"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

interface NavbarContextType {
  isNavbarVisible: boolean;
  hideNavbar: () => void;
  showNavbar: () => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const hideNavbar = () => setIsNavbarVisible(false);
  const showNavbar = () => setIsNavbarVisible(true);

  return (
    <NavbarContext.Provider value={{ isNavbarVisible, hideNavbar, showNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
} 
'use client'

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes'; // Hook to access theme
import { Moon, Sun } from 'lucide-react'; // Icons for dark and light theme
import { Button } from '@/components/ui/button'; // Custom button component

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme(); // Hook to get and set the current theme
  const [mounted, setMounted] = useState(false); // Local state to track if component is mounted

  // Set the mounted state to true once the component is mounted on the client side
  useEffect(() => {
    setMounted(true); // This will trigger a re-render once the component is mounted
  }, []);

  // If the component isn't mounted yet, return null to avoid mismatched HTML during SSR
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} // Toggle the theme
      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {/* Sun and Moon icons with transitions */}
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span> {/* Screen reader accessibility */}
    </Button>
  );
};

export default ThemeToggle;

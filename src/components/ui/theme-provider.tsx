'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { type ThemeProviderProps } from 'next-themes'

// Dynamically import ThemeProvider from next-themes to disable SSR
const NextThemesProvider = dynamic(
	() => import('next-themes').then((e) => e.ThemeProvider),
	{
		ssr: false,  // Ensures ThemeProvider is only used on the client-side
	}
)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

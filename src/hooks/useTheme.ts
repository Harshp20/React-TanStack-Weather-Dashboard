import { createContext, useContext } from "react";
import type { ResolvedTheme, ThemeMode } from "@/lib/theme";

type ThemeProviderState = {
	/** User preference: light, dark, or system. */
	theme: ThemeMode;
	/** Effective appearance after resolving system preference. */
	resolvedTheme: ResolvedTheme;
	setTheme: (theme: ThemeMode) => void;
};

export const ThemeProviderContext = createContext<ThemeProviderState | null>(
	null,
);

export function useTheme() {
	const context = useContext(ThemeProviderContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}

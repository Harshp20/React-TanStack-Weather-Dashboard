import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	applyTheme,
	getStoredTheme,
	setStoredTheme,
	type ThemeMode,
} from "@/lib/theme";

const STORAGE_KEY = "weather-dashboard-theme";

type ThemeProviderProps = Readonly<{
	children: React.ReactNode;
	defaultTheme?: ThemeMode;
	storageKey?: string;
}>;

type ThemeProviderState = {
	theme: ThemeMode;
	setTheme: (theme: ThemeMode) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | null>(null);

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
	const [theme, setThemeState] = useState<ThemeMode>(() => {
		if (typeof window === "undefined") return defaultTheme;
		const stored = localStorage.getItem(storageKey) as ThemeMode | null;
		if (stored === "light" || stored === "dark" || stored === "system") {
			return stored;
		}
		return getStoredTheme();
	});

	const setTheme = useCallback(
		(next: ThemeMode) => {
			localStorage.setItem(storageKey, next);
			setStoredTheme(next);
			applyTheme(next);
			setThemeState(next);
		},
		[storageKey],
	);

	useEffect(() => {
		applyTheme(theme);

		const media = globalThis.matchMedia("(prefers-color-scheme: dark)");
		const onSystemChange = () => {
			if (theme === "system") applyTheme("system");
		};

		media.addEventListener("change", onSystemChange);
		return () => media.removeEventListener("change", onSystemChange);
	}, [theme]);

	const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

	return (
		<ThemeProviderContext.Provider value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeProviderContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}

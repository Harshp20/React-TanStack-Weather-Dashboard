import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	useSyncExternalStore,
} from "react";
import {
	applyResolvedTheme,
	applyTheme,
	getStoredTheme,
	getSystemTheme,
	type ResolvedTheme,
	setStoredTheme,
	subscribeSystemTheme,
	type ThemeMode,
} from "@/lib/theme";

const STORAGE_KEY = "weather-dashboard-theme";

type ThemeProviderProps = Readonly<{
	children: React.ReactNode;
	defaultTheme?: ThemeMode;
	storageKey?: string;
}>;

type ThemeProviderState = {
	/** User preference: light, dark, or system. */
	theme: ThemeMode;
	/** Effective appearance after resolving system preference. */
	resolvedTheme: ResolvedTheme;
	setTheme: (theme: ThemeMode) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | null>(null);

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
	const [theme, setThemeState] = useState<ThemeMode>(() => {
		if (typeof globalThis.window === "undefined") return defaultTheme;
		const stored = localStorage.getItem(storageKey) as ThemeMode | null;
		if (stored === "light" || stored === "dark" || stored === "system") {
			return stored;
		}
		return getStoredTheme();
	});

	const systemTheme = useSyncExternalStore(
		subscribeSystemTheme,
		getSystemTheme,
		() => "light" as ResolvedTheme,
	);

	const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;

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
		applyResolvedTheme(resolvedTheme);
	}, [resolvedTheme]);

	const value = useMemo(
		() => ({ theme, resolvedTheme, setTheme }),
		[theme, resolvedTheme, setTheme],
	);

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

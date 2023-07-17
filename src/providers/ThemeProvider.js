import {createContext, useMemo, useState} from 'react';

export const ThemeContext = createContext({ isLightTheme: true });

export const ThemeProvider = ({ children }) => {
	const [isLightTheme, setIsThemeLight] = useState(
		localStorage.getItem('isLight') === 'true'
	);

	const value = useMemo(
		() => ({ isLightTheme, setIsThemeLight }),
		[isLightTheme]
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

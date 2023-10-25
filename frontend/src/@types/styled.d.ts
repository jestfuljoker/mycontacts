import 'styled-components';
import type theme from '../assets/styles/themes/default';

type ThemeType = typeof theme;

declare module 'styled-components' {
	export interface DefaultTheme extends ThemeType {}
}

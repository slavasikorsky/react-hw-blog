import { DefaultTheme, createGlobalStyle } from "styled-components";

interface CustomTheme extends DefaultTheme {
	value: {
		PRIMARY_TEXT_COLOR: string;
		PRIMARY_BG_COLOR: string;
	};
}

const GlobalStyle = createGlobalStyle<{ theme: CustomTheme }>`
  body {
	color: ${(props) => props.theme.value.PRIMARY_TEXT_COLOR};
	background-color: ${(props) => props.theme.value.PRIMARY_BG_COLOR};
  }
`;

export default GlobalStyle;

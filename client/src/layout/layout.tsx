import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import Header from "../features/Header";
import Footer from "../features/Footer";
import { RootState } from "../store/store";
import GlobalStyle from "../styles/GlobalStyles";

type LayoutProps = {
	children: JSX.Element | JSX.Element[];
};

const PageLayout = styled.div`
	min-height: 80vh;
`;

function Layout({ children }: LayoutProps) {
	const theme = useSelector((state: RootState) => state.theme);
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Header />
			<PageLayout>{children || <Outlet />}</PageLayout>
			<Footer />
		</ThemeProvider>
	);
}

export default Layout;

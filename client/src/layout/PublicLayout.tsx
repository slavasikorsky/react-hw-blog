import { Outlet } from "react-router-dom";

import Footer from "../features/Footer";
import Header from "../features/Header";

type LayoutProps = {
	children?: JSX.Element | JSX.Element[];
};

function PublicLayout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			{children || <Outlet />}
			<Footer />
		</>
	);
}

export default PublicLayout;

PublicLayout.defaultProps = {
	children: null,
};

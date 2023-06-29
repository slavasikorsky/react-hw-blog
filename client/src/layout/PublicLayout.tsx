import { Outlet } from "react-router-dom";
import Footer from "../features/Footer";
import Header from "../features/Header";
import MetaContent from "../components/MetaContent";

type LayoutProps = {
	children?: JSX.Element | JSX.Element[];
};

function PublicLayout({ children }: LayoutProps) {
	return (
		<>
			<MetaContent />
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

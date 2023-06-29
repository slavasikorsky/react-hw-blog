import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import Footer from "../features/Footer";

import Header from "../features/Header";
import Sidebar from "../features/Sidebar";
import Wrapper from "../components/Wrapper";
import MetaContent from "../components/MetaContent";

type LayoutProps = {
	children?: JSX.Element;
};

const DashboardWrapper = styled.div`
	box-shadow: 1px 4px 10px 1px #ccc;
	border-radius: 5px;
	padding: 20px 10px;
	margin: 20px 0;
	width: 100%;
`;

function PrivateLayout({ children }: LayoutProps) {
	return (
		<>
			<MetaContent />
			<Header />
			<Container>
				<Wrapper>
					<Sidebar />
					<DashboardWrapper>
						{children || <Outlet />}
					</DashboardWrapper>
				</Wrapper>
			</Container>
			<Footer />
		</>
	);
}

export default PrivateLayout;

PrivateLayout.defaultProps = {
	children: null,
};

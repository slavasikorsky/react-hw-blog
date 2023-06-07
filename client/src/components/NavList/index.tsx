import styled from "styled-components";
import NavItem from "./NavItem";
import { IMenuItem } from "../../types/types";

type NavListProps = {
	dataList: IMenuItem[];
	orientation?: string;
};

const NavListBlock = styled.ul`
	display: flex;
	margin: 0;
	padding: 0;
	flex-flow: ${(props) =>
		props.orientation === "vertical" ? "column" : "wrap"};
`;

function NavList({ dataList, orientation }: NavListProps) {
	return (
		<NavListBlock orientation={orientation}>
			{dataList.map((item) => (
				<NavItem key={item.text} url={item.url} text={item.text} />
			))}
		</NavListBlock>
	);
}

export default NavList;

NavList.defaultProps = {
	orientation: "horizontal",
};

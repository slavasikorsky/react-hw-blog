import { Link } from "react-router-dom";
import styled from "styled-components";
import { IMenuItem } from "../../../types/types";

const NavbarItem = styled(Link)`
	font-size: 1rem;
	text-decoration: underline;
	margin: 0 20px;
`;

function NavItem({ url, text }: IMenuItem) {
	return (
		<NavbarItem key={text} to={url}>
			{text}
		</NavbarItem>
	);
}

export default NavItem;

import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
	link: string;
	children: JSX.Element | JSX.Element[] | string | undefined;
	onClick?: () => void;
	rest?: JSX.Element | JSX.Element[];
}

const LinkElement = styled(Link)`
	border-radius: 8px;
	border: 1px solid transparent;
	padding: 0.6rem 1.2rem;
	font-size: 1rem;
	font-family: inherit;
	background-color: #fff;
	color: #646cff;
	cursor: pointer;
	transition: all 0.25s linear;
	&:hover {
		border-color: #646cff;
		opacity: 0.7;
		text-decoration: underline;
	}
`;

type LinkProps = Props;

function LinkBlock({ link, children, onClick, ...rest }: LinkProps) {
	return (
		<LinkElement target="_blank" to={link} onClick={onClick} {...rest}>
			{children}
		</LinkElement>
	);
}

export default LinkBlock;

LinkBlock.defaultProps = {
	onClick: null,
	rest: null,
};

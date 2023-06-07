import styled from "styled-components";

interface Props {
	children: string;
	onClick?: () => void;
	rest?: JSX.Element | JSX.Element[];
}

const ButtonElement = styled.button`
	border-radius: 8px;
	border: 1px solid transparent;
	padding: 0.6rem 1.2rem;
	font-size: 1rem;
	font-family: inherit;
	background-color: #2d42d1;
	cursor: pointer;
	transition: all 0.25s linear;
	&:hover {
		border-color: #515151;
		opacity: 0.7;
	}
`;

type ButtonProps = Props;

function Button({ children, onClick, ...rest }: ButtonProps) {
	return (
		<ButtonElement type="button" onClick={onClick} {...rest}>
			{children}
		</ButtonElement>
	);
}

export default Button;

Button.defaultProps = {
	onClick: false,
	rest: null,
};

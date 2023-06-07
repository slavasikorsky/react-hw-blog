import styled from "styled-components";

type ContainerProps = {
	children: JSX.Element | JSX.Element[];
};

const Block = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

function Wrapper({ children }: ContainerProps) {
	return <Block>{children}</Block>;
}

export default Wrapper;

import { ReactNode } from "react";
import styled from "styled-components";

type ContainerProps = {
	children: ReactNode;
};

const Block = styled.div`
	width: 100%;
	max-width: 1000px;
	margin: 0 auto;
	padding: 0 20px;
`;

function Container({ children }: ContainerProps) {
	return <Block>{children}</Block>;
}

export default Container;

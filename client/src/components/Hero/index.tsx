import styled from "styled-components";
import LinkElement from "../LinkElement";

type HeroProps = {
	title: string;
	image: string;
	linkText?: string;
	linkURL?: string;
};

const HeroContainer = styled.div`
	width: 100%;
	height: 300px;
	padding: 20px;
	display: flex;
	flex-flow: column;
	align-items: center;
	justify-content: center;
	position: relative;
	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: 0.4;
	}
`;

const HeroImage = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const HeroTitle = styled.h3`
	z-index: 1;
	font-size: 3rem;
	color: #fff;
`;

const LinkBlock = styled(LinkElement)`
	z-index: 2;
`;

function Hero({ title, image, linkText, linkURL }: HeroProps) {
	return (
		<HeroContainer>
			<HeroImage src={image} alt={title} />
			<HeroTitle>{title}</HeroTitle>
			{linkURL && <LinkBlock link={linkURL}>{linkText}</LinkBlock>}
		</HeroContainer>
	);
}

export default Hero;

Hero.defaultProps = {
	linkURL: null,
	linkText: null,
};

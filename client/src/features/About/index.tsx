import Container from "../../components/Container";
import Hero from "../../components/Hero";
import HeroImage from "../../assets/images/hero.jpg";
import Text from "../../components/Text";
import Slider from "../../components/Swiper";
import slider from "../../data/slider";

function About() {
	return (
		<Container>
			<h1>About page</h1>
			<Hero
				title="Hero title"
				image={HeroImage}
				linkText="Buy now"
				linkURL="http://google.com/"
			/>
			<Text
				title="Heading text"
				text="lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet"
			/>
			<Slider sliderData={slider} />
		</Container>
	);
}

export default About;

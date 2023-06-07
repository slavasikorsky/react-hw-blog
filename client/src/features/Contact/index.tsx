import Container from "../../components/Container";
import FormCustom from "../../components/FormCustom";
import Social from "../../components/Social";
import social from "../../data/social";
import contactForm from "../../data/contactForm";

function Contact() {
	return (
		<Container>
			<h1>Contact page</h1>
			<FormCustom inputs={contactForm} />
			<Social socialList={social} />
		</Container>
	);
}

export default Contact;
